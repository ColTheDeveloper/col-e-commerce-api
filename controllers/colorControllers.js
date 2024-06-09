import { createError } from "../middleware/errorMiddleware.js"
import colorModel from "../models/colorModel.js"



export const createAColor=async(req,res,next)=>{
    try {
        const {name}=req.body

        const foundColor= await colorModel.findOne({name})
        if(foundColor) next(createError(400,"Color already existed!"))

        const createdColor= await colorModel.create({
            name,
            user:req.userId
        })

        res.status(201).json({
            success:true,
            message:"Color successfully created!",
            data: createdColor
        })
    } catch (error) {
        next(error)
    }
}

export const getAllColor=async (req,res,next)=>{
    try {
        const getAllColor= await colorModel.find();

        res.status(200).json({
            success:true,
            message:"All color have been fetched successfully!",
            data:getAllColor
        })
    } catch (error) {
        next(error)
    }
}


//@desc   Get a color
//@route  GET /api/v1/color/:id
//@access Public

export const getAColor= async (req,res,next)=>{
    try {
        const color= await colorModel.findById(req.params.id)

        if(!color) return next(createError(400,"Color not found!"))

        res.status(200).json({
            success:true,
            message:"Color fetched successfully",
            data:color
        })
    } catch (error) {
        next(error)
    }
}


//@desc     Update a color
//@route    PUT /api/v1/color/:id
//@access   Private/Admin

export const updateAColor= async (req,res,next)=>{
    const {name}= req.body
    try {
        const updatedColor= await colorModel.findByIdAndUpdate(
            req.params.id,
            {name},
            {new:true}
        )

        if(!updatedColor) return next(createError(400, "Color is not updated!"))

        res.status(200).json({
            success:true,
            message:"Color has been updated!",
            data:updatedColor
        })
    } catch (error) {
        next(error)
    }
}



//@desc      Delete a color
//@route     DELETE /api/v1/color/:id
//@access    Private/Admin

export  const deleteAColor= async (req,res,next)=>{
    try {
        await colorModel.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success:true,
            message:"Color is deleted successfully!",
            data:null
        })
    } catch (error) {
        next(error)
    }
}