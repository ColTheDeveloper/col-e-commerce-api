

//@desc     Create New Coupon
//@route    POST  /api/v1/coupons
//@access   Admin

import couponModel from "../models/couponModel"

export const createCoupon= async(req,res)=>{
    const {code,startDate,endDate,discount}= req.body
    try {
        const createdCoupon= await couponModel.create ({
            code,
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