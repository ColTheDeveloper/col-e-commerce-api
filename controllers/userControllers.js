import { createError } from "../middleware/errorMiddleware.js"
import userModel from "../models/userModel.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js"



//@desc Register user
//@route POST /api/v1/user/register
//@access Private/Admin
export const registerUser=async(req,res,next)=>{

    const {fullName, email}=req.body
    try {
        const userExist= await userModel.findOne({email})
        if(userExist)return next(createError(400,"User already existed"))

        const salt= await bcrypt.genSalt(10)
        const hashPassword= await bcrypt.hash(req.body.password,salt)

        const createdUser= await userModel.create({
            fullName,
            email,
            password:hashPassword
        })
        const {password,...user}=createdUser._doc
        res.status(201).json({
            success:true,
            message:"User successfully registered!",
            data:null
        })
    } catch (err) {
        next(err)
    }
}


//@desc Login user
//@route /api/v1/user/login
//@access Public
export const loginUser=async(req,res,next)=>{
    const {email}=req.body
    try {
        const foundUser=await userModel.findOne({email})
        if(!foundUser)return next(createError(400,"Incorrect email or password"))

        const passwordIsTheSame= await bcrypt.compare(req.body.password,foundUser.password)
        if(!passwordIsTheSame) return next(createError(400,"Incorrect email or password"))

        const {password,...user}=foundUser._doc

        const token=generateToken(foundUser._id,foundUser.isAdmin)

        res.status(200).json({
            success:true,
            message:"User successfully login!",
            data:{user,token}
        })
    } catch (err) {
        next(err)
    }

}

//@desc Get user profile
//@route GET /api/v1/user/profile
//@access Private

export const getUserProfile=async(req,res,next)=>{
    try {
        const foundUser= await userModel.findById(req.userId).populate("orders")
        if(!foundUser) return next(createError(401,"Unauthorized!"))

        const {password, ...user}=foundUser._doc

        res.status(200).json({
            success:true,
            message:"User data fetched successfully!",
            data:user
        })

    } catch (error) {
        next(error)
    }
}


//@desc   Update user shipping address
//@route  PUT /api/v1/user/update/shipping
//@access Private


export const updateShippingAddress=async(req,res,next)=>{
    const {firstName,lastName, address, city, postalCode, state,country, phoneNumber}=req.body
    try {
        const user= await userModel.findByIdAndUpdate(req.userId,{
            shippingAddress:{
                firstName,
                lastName,
                address,
                city,
                postalCode,
                state,
                country,
                phoneNumber,
            },
            hasShippingAddress:true,
        },{new:true})

        res.status(200).json({
            success:true,
            message:"Shipping address has been updated successfully!",
            data:user
        })
    } catch (error) {
        next(error)
    }
}