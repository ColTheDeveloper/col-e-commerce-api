import { createError } from "../middleware/errorMiddleware.js"
import userModel from "../models/userModel.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js"
import getTokenFromHeader from "../utils/getTokenFromHeader.js"
import verifyToken from "../utils/verifyToken.js"


//@desc Register user
//@route POST /api/v1/user/register
//@access Private/Admin
export const registerUser=async(req,res,next)=>{

    const {fullName, email}=req.body
    try {
        const userExist= await userModel.findOne({email})
        if(userExist){
            res.status(200).json({
                success:false,
                message:"User already existed!",
                data:null
            })
        }

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
        if(!foundUser){
            res.status(200).json({
                success:false,
                message:"Incorrect email or password!",
                data:null
            })
        }

        const passwordIsTheSame= await bcrypt.compare(req.body.password,foundUser.password)
        if(!passwordIsTheSame) {
            res.status(200).json({
                success:false,
                message:"Incorrect email or password!",
                data:null
            })
        }

        const {password,...user}=foundUser._doc

        const token=generateToken(foundUser._id)

        res.status(200).json({
            successful:true,
            status:200,
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
        res.json(req.userId)

    } catch (error) {

    }
}


//@desc   Update user shipping address
//@route  PUT /api/v1/user/update/shipping
//@access Private


export const updateShippingAddress=async(req,res,next)=>{
    const {firstName,lastName, address, city, postalCode, province, phone}=req.body
    try {
        const user= await userModel.findByIdAndUpdate(req.userId,{
            shippingAddress:{
                firstName,
                lastName,
                address,
                city,
                postalCode,
                province,
                phone
            },
            hasShippingAddress:true,
        },{new:true})

        res.status(200).json({
            success:true,
            message:"Shipping address has been updated successfully!",
            data:user
        })
    } catch (error) {
        
    }
}