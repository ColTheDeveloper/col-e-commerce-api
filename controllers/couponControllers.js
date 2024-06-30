import { createError } from "../middleware/errorMiddleware.js"
import couponModel from "../models/couponModel.js"


//@desc     Create New Coupon
//@route    POST  /api/v1/coupons
//@access   Admin


export const createCoupon= async(req,res,next)=>{
    const {code,startDate,endDate,discount}= req.body
    try {
        const existedCoupon= await couponModel.findOne({code})
        if(existedCoupon)return next(createError(400,"Coupon code already existed!"))

        if(isNaN(discount)) return next(createError(400,"Discount must be a number!"))

        if(!req.isAdmin) return next(createError(400,"Action forbidden!"))
        const createdCoupon= await couponModel.create ({
            code:code.toUpperCase(),
            startDate,
            endDate,
            discount,
        })

        res.status(200).json({
            success:true,
            message:"Coupon created!",
            data: createdCoupon
        })
    } catch (error) {
        next(error)
    }
}


//@desc     Get All Coupons
//@route    GET api/v1/coupons
//@access   Public

export const getAllCoupon=async(req,res,next)=>{
    try {
        const allCoupon= await couponModel.find()

        res.status(200).json({
            success:true,
            message:"Coupon Fetched Successfully!",
            data:allCoupon
        })
    } catch (error) {
        next(error)
    }
}



//@desc     Get A Coupons
//@route    GET api/v1/coupon/:id
//@access   Public
export const getACoupon=async(req,res,next)=>{
    try {
        const foundCoupon= await couponModel.findOne({code:req.params.code.toUpperCase()})
        if(!foundCoupon) return next(createError(404,"Coupon not found!"))
        res.status(200).json({
            success:true,
            message:"Coupon fetch successfully!",
            data:foundCoupon
        })
    } catch (error) {
        next(error)
    }
}


//@desc     Update A Coupons
//@route    PUT api/v1/coupon/:id
//@access   Admin

export const updateACoupon= async(req,res,next)=>{
    const {code,startDate,endDate,discount}=req.body
    try {
        if(!req.isAdmin) return next(createError(403,"Action forbidden!"))

        const couponExisted= await couponModel.findOne({code:code.toUpperCase()})
        if(couponExisted) return next(createError(404,"Coupon code already existed!"))

        const editedCoupon= await couponModel.findByIdAndUpdate(req.params.id,{
            code:code.toUpperCase(),
            startDate,
            endDate,
            discount,
        },{
            new:true
        })

        res.status(200).json({
            success:true,
            message:"Coupon updated!",
            data:editedCoupon
        })
    } catch (error) {
        next(error)
    }
}


//@desc     DELETE A Coupons
//@route    DELETE api/v1/coupon/:id
//@access   Admin

export const deleteACoupon=async(req,res,next)=>{
    try {
        if(!req.isAdmin) return next(createError(403,"Action forbidden!"))
        
        await couponModel.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success:true,
            message:"Coupon deleted successfully!",
            data:null
        })
    } catch (error) {
        next(error)
    }
}