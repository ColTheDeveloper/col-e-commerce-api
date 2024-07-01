import { createError } from "../middleware/errorMiddleware.js"
import brandModel from "../models/brandModel.js"



export const createABrand=async(req,res,next)=>{
    try {
        const {name}=req.body

        if(!req.isAdmin) return next(createError(403,"Action forbidden!"))

        const foundBrand= await brandModel.findOne({name})
        if(foundBrand) next(createError(400,"Brand already existed!"))

        const createdBrand= await brandModel.create({
            name,
            user:req.userId
        })

        res.status(201).json({
            success:true,
            message:"Brand successfully created!",
            data: createdBrand
        })
    } catch (error) {
        next(error)
    }
}

export const getAllBrand=async (req,res,next)=>{
    try {
        const getAllBrand= await brandModel.find();

        res.status(200).json({
            success:true,
            message:"All brand have been fetched successfully!",
            data:getAllBrand
        })
    } catch (error) {
        next(error)
    }
}


//@desc   Get a brand
//@route  GET /api/v1/brand/:id
//@access Public

export const getABrand= async (req,res,next)=>{
    try {
        const brand= await brandModel.findById(req.params.id)

        if(!brand) return next(createError(404,"Brand not found!"))

        res.status(200).json({
            success:true,
            message:"Brand fetched successfully",
            data:brand
        })
    } catch (error) {
        next(error)
    }
}


//@desc     Update a brand
//@route    PUT /api/v1/brand/:id
//@access   Admin

export const updateABrand= async (req,res,next)=>{
    const {name}= req.body
    try {
        if(!req.isAdmin) return next(createError(403,"Action forbidden!"))
        const updatedBrand= await brandModel.findByIdAndUpdate(
            req.params.id,
            {name},
            {new:true}
        )

        if(!updatedBrand) return next(createError(400,"Bad Request"))

        res.status(200).json({
            success:true,
            message:"Brand has been updated!",
            category:updatedBrand
        })
    } catch (error) {
        next(error)
    }
}



//@desc      Delete a brand
//@route     DELETE /api/v1/brand/:id
//@access    Admin

export  const deleteABrand= async (req,res,next)=>{
    try {
        if(!req.isAdmin) return next(createError(403,"Action forbidden!"))
        await brandModel.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success:true,
            message:"Brand is deleted successfully!",
            data:null
        })
    } catch (error) {
        next(error)
    }
}