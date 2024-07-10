import { createError } from "../middleware/errorMiddleware.js"
import orderModel from "../models/orderModel.js"
import productModel from "../models/productModel.js"
import userModel from "../models/userModel.js"
import https from 'https'
import dotenv from "dotenv"
import stripe from "stripe"
import crypto from "crypto"
import axios from "axios"
import couponModel from "../models/couponModel.js"

dotenv.config()
//console.log(process.env.STRIPE_KEY)

const Stripe= new stripe(process.env.STRIPE_KEY)



export const createOrder=async(req,res,next)=>{
    const {orderItems, totalPrice}=req.body
    const {coupon}= req.query
    try {
        if(!req.isAdmin) return next(createError(403,"Action forbidden!"))

        const foundCoupon= await couponModel.findOne({code:coupon?.toUpperCase()})
        if(foundCoupon){
            if(foundCoupon.isExpired) return next(createError(400,"Coupon has expired!"))
        }
        
        const discount= foundCoupon?.discount/100

        const foundUser=await userModel.findById(req.userId)
        if(!foundUser)return next(createError(400,"User not found!"))

        if(!foundUser.hasShippingAddress) return next(createError(400,"You don't have a shipping address!"))

        if(orderItems.length<=0) return next(createError(400,"No order placed!"))

        const createdOrder=await orderModel.create({
            user: foundUser._id,
            orderItems,
            shippingAddress:foundUser.shippingAddress,
            totalPrice: foundCoupon? totalPrice - totalPrice * discount : totalPrice,
        })
        //console.log(createdOrder)

        const products= await productModel.find({_id:{$in:orderItems}})
        //console.log(products)

        orderItems.map(async(order)=>{
            const product= products.find((product)=>{
                return product.id.toString()===order._id.toString()
            })
            if(product){
                product.totalSold += order.buyingQuantity
            }
            await product.save()
        })

        //console.log(createdOrder.orderNumber)
        const convertedOrders= orderItems.map((item)=>{
            return{
                price_data:{
                    currency:"usd",
                    product_data:{
                        name:item.name,
                        description:item.description
                    },
                    unit_amount:item.price * 100
                },
                quantity: item.buyingQuantity,
            }
        })

        const session = await Stripe.checkout.sessions.create({
            line_items: convertedOrders,
            metadata:{
                orderId:JSON.stringify(createdOrder._id)
            },
            mode: 'payment',
            success_url: `http://localhost:3000/success.html`,
            cancel_url: `http://localhost:3000/cancel.html`,
        });


        foundUser.orders.push(createdOrder._id)
        await foundUser.save()

        res.status(200).json({
            success: true,
            message:"URL for stripe payment generated!",
            data:session.url
        })


    } catch (error) {
        console.log(error)
        next(error)
    }
}



//@desc     get All Orders
//@route    GET /api/v1/orders
//@access   private

export const getAllOrders=async(req,res,next)=>{
    try {
        if(!req.isAdmin) return next(createError(403,"Action forbidden!"))
        const allOrders= await orderModel.find()
        res.status(200).json({
            success:true,
            message:"Order fetch successfully!",
            data:allOrders
        })
    } catch (error) {
        next(error)
    }
}


//@desc     get An Order
//@route    GET /api/v1/order/:id
//@access   private/Admin

export const getAnOrder= async(req,res,next)=>{
    const id=req.params.id
    try {
        if(!req.isAdmin) return next(createError(403,"Action forbidden!"))
        const foundOrder= await orderModel.findById(id)
        if(!foundOrder) return next(createError(400,"Order not found!"))

        res.status(200).json({
            success:true,
            message:"Order fetch successfully",
            data:foundOrder
        })
    } catch (error) {
        next(error)
    }
}


//@desc     update order status
//@route    PUT /api/v1/order/update/:id
//@access   Admin

export const updateOrderStatus= async(req,res,next)=>{
    const {orderStatus}= req.body
    try {
        if(!req.isAdmin) return next(createError(403,"Action forbidden!"))
        const updatedOrder= await orderModel.findByIdAndUpdate(req.params.id,{
            orderStatus
        },{
            new: true
        })

        res.status(200).json({
            success: true,
            message:"Order updated successfully!",
            data:updatedOrder
        })
    } catch (error) {
        next(error)
    }
}


//@desc     get sum of sales
//@route    GET /api/v1/orders/sales/sum
//@access   Admin

export const getOrderStat=async(req,res,next)=>{
    try {
        if(!req.isAdmin) return next(createError(403,"Action forbidden!"))
        const orderStat= await orderModel.aggregate([
            {
                $group:{
                    _id:null,
                    totalSales:{
                        $sum:"$totalPrice"
                    },
                    minimumSale:{
                        $min: "$totalPrice"
                    },
                    maximumSale:{
                        $max: "$totalPrice"
                    },
                    averageSale:{
                        $avg:"$totalPrice"
                    }
                }
            }
        ])

        res.status(200).json({
            success:true,
            message:"Total stat fetched successfully!",
            data:orderStat
        })
    } catch (error) {
        next(error)
    }
}
