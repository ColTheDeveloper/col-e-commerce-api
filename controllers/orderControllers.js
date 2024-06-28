import { createError } from "../middleware/errorMiddleware.js"
import orderModel from "../models/orderModel.js"
import productModel from "../models/productModel.js"
import userModel from "../models/userModel.js"
import https from 'https'
import dotenv from "dotenv"
import stripe from "stripe"
import crypto from "crypto"
import axios from "axios"

dotenv.config()

const stripe= new stripe(process.env.STRIPE_KEY)


export const createOrder=async(req,res,next)=>{
    const {orderItems, shippingAddress,totalPrice}=req.body
    try {
        const foundUser=await userModel.findById(req.userId)
        if(!foundUser)return next(createError(400,"User not found!"))

        if(!foundUser.hasShippingAddress) return next(createError(400,"You don't have a shipping address!"))

        if(orderItems.length<=0) return next(createError(400,"No order placed!"))

        const createdOrder=await orderModel.create({
            user: foundUser._id,
            orderItems,
            shippingAddress,
            totalPrice,
        })
        //console.log(createdOrder)
        

        const products= await productModel.find({_id:{$in:orderItems}})
        console.log(products)

        orderItems.map(async(order)=>{
            const product= products.find((product)=>{
                return product.id.toString()===order._id.toString()
            })
            if(product){
                product.totalSold += order.totalBuyingQuantity
            }
            await product.save()
        })

        console.log(createdOrder.orderNumber)
        
        const session = await stripe.checkout.sessions.create({
            line_items: [
              {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price_data:{
                    currency:"usd",
                    product_data:{
                        name:'Hats',
                        description:"Best hats"
                    },
                    unit_amount:10 * 100
                },
                quantity: 2,
                
              },
            ],
            mode: 'payment',
            success_url: `http://localhost:3000/success.html`,
            cancel_url: `http://localhost:3000/cancel.html`,
        });

        // paystackReq.write(params)
        // paystackReq.end()

        foundUser.orders.push(createdOrder._id)
        await foundUser.save()

        // const {password,...user}=foundUser._doc
        res.json({url:session.url})

        // res.json({
        //     success: true,
        //     message:"Order is created successfully",
        //     data:{order:createdOrder,user}
        // })

    } catch (error) {
        console.log(error)
        next(error)
    }
}


export const paymentWebhook=(req, res) => {
//     const hash = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET_KEY).update(JSON.stringify(req.body)).digest('hex');

//     console.log(req.headers['x-paystack-signature'])
//     console.log(hash)
//     console.log(req.body.event)
//     //if (hash == req.headers['x-paystack-signature']) {
//         console.log("is it in")
//         // Retrieve the request's body
        
//         const event = req.body;

//     // Do something with event  
//     console.log(event)
        console.log(req.body)
// //}
//     console.log("is it in2")

    res.sendStatus(200);
}