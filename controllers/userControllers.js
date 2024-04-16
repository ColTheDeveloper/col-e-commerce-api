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
        if(userExist) return next(createError(404,"User aleady existed!"))

        const salt= await bcrypt.genSalt(10)
        const hashPassword= await bcrypt.hash(req.body.password,salt)

        const createdUser= await userModel.create({
            fullName,
            email,
            password:hashPassword
        })
        const {password,...user}=createdUser._doc
        res.status(201).json({
            successful:true,
            status:201,
            data:user
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
        if(!foundUser)return next(createError(400,"Incorrect email or password!"))

        const passwordIsTheSame= await bcrypt.compare(req.body.password,foundUser.password)
        if(!passwordIsTheSame) return next(createError(400,"Incorrect email or password!"))

        const {password,...user}=foundUser._doc

        res.status(200).json({
            successful:true,
            status:200,
            data:user,
            token:generateToken(foundUser._id)
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