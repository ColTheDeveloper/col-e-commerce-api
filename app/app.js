import dotenv from "dotenv"
dotenv.config()
import express from "express"
import connectDB from "../config/db.js";
import userRoutes from "../routes/userRoutes.js"
import productRoutes from "../routes/productRoutes.js"
import categoryRoutes from "../routes/categoryRoutes.js"
import brandRoutes from "../routes/brandRoutes.js"
import colorRoutes from "../routes/colorRoutes.js"
import reviewRoutes from "../routes/reviewRoutes.js"
import orderRoutes from "../routes/orderRoutes.js"
import { routeNotFound } from "../middleware/errorMiddleware.js";
import bodyParser from "body-parser";
import cors from "cors"
import Stripe from "stripe";
import orderModel from "../models/orderModel.js";




connectDB()
const app=express()
const stripe= new Stripe(process.env.STRIPE_KEY)


// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_1018948e9a44e1e1841e3f1bbbd9573c8734c4e2a9b3216550f07a7c3c001ae0";

app.post('/webhook', express.raw({type: 'application/json'}), async(request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    //console.log(event)
  } catch (err) {
    //console.log(err)
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object
      const {orderId}=session.metadata
      const paymentStatus= session.payment_status
      const paymentMethod= session.payment_method_types[0]
      const currency= session.currency
      const totalAmount=session.amount_total/100

      const order= await orderModel.findByIdAndUpdate(JSON.parse(orderId),{
        totalPrice:totalAmount,
        currency,
        paymentStatus,
        paymentMethod,
      },{new:true})

      console.log(order)
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

app.use(express.json())
app.use(bodyParser.json())
app.use(cors({
    origin:"*",
    methods:["GET","POST","PUT","DELETE"]
}))

app.use("/api",userRoutes)
app.use("/api",productRoutes)
app.use("/api",categoryRoutes)
app.use("/api",brandRoutes)
app.use("/api",colorRoutes)
app.use("/api",reviewRoutes)
app.use("/api",orderRoutes)









app.use(routeNotFound)
app.use((err,req,res,next)=>{
    const status=err.status || 500
    const message=err.message || "Something went wrong!"

    return res.status(status).json({
        success:false,
        message,
        data:null
    })
})
export default app;