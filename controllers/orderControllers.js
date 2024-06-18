import { createError } from "../middleware/errorMiddleware.js"
import orderModel from "../models/orderModel.js"
import productModel from "../models/productModel.js"
import userModel from "../models/userModel.js"
import https from 'https'
import dotenv from "dotenv"
import crypto from "crypto"

dotenv.config()


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
        console.log(createdOrder)
        

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


        const params = JSON.stringify({
        email: foundUser.email,
        amount: totalPrice *1000,
        orderItems,
        shippingAddress
        })

        const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/transaction/initialize',
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json'
        }
        }

        const paystackReq = https.request(options, paystackRes => {
        let data = ''

        paystackRes.on('data', (chunk) => {
            data += chunk
        });

        paystackRes.on('end', () => {
            res.send(data)
            console.log(JSON.parse(data))
        })
        }).on('error', error => {
        console.error(error)
        })

        paystackReq.write(params)
        paystackReq.end()

        foundUser.orders.push(createdOrder._id)
        await foundUser.save()

        const {password,...user}=foundUser._doc

        // res.json({
        //     success: true,
        //     message:"Order is created successfully",
        //     data:{order:createdOrder,user}
        // })

    } catch (error) {
        next(error)
    }
}


export const paymentWebhook=async (req, res, next) => {
    const hash = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET_KEY).update(JSON.stringify(req.body)).digest('hex');

    console.log(req.headers['x-paystack-signature'])
    console.log(hash)
    if (hash == req.headers['x-paystack-signature']) {
        console.log("is it in")
        // Retrieve the request's body
        
        const event = req.body;

    // Do something with event  
    console.log(event)

}
console.log("is it in2")

    res.send(200);
}