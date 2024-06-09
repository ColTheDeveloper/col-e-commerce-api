import { createError } from "../middleware/errorMiddleware.js";
import categoryModel from "../models/categoryModel.js";


//@desc   Create new category
//@route  POST  /api/v1/category
//@access Private/Admin

export const createCategory=async(req,res,next)=>{
    try {
        const {name}=req.body;

        const existedCategory= await categoryModel.findOne({name})

        if(existedCategory) return next(createError(400,"Category already existed!"))

        const createdCategory= await categoryModel.create({
            name,
            user: req.userId,

        })

        res.status(200).json({
            success:true,
            message:"A new category is created successfully!",
            data:createdCategory
        })
    } catch (err) {
        next(err)
    }
}


//@desc   Get all categories
//@route  GET /api/v1/categories
//@access Public

export const getAllCategories=async (req,res,next)=>{
    try {
        const getAllCategories= await categoryModel.find();

        res.status(200).json({
            success:true,
            message:"All category have been fetched successfully!",
            categories:getAllCategories
        })
    } catch (error) {
        next(error)
    }
}



//@desc   Get a category
//@route  GET /api/v1/category/:id
//@access Public

export const getACategory= async (req,res,next)=>{
    try {
        const category= await categoryModel.findById(req.params.id)

        if(!category) return next(createError(400,"Category not found!"))

        res.status(200).json({
            success:true,
            message:"Category fetched succssfully",
            category:category
        })
    } catch (error) {
        next(error)
    }
}


//@desc     Update a category
//@route    PUT /api/v1/category/:id
//@access   Private/Admin

export const updateACategory= async (req,res,next)=>{
    const {name}= req.body
    try {
        const updatedCategory= await categoryModel.findByIdAndUpdate(
            req.params.id,
            {name},
            {new:true}
        )

        if(!updatedCategory) return next(createError(400, "Category is not updated!"))

        res.status(200).json({
            success:true,
            message:"Category has been updated!",
            category:updatedCategory
        })
    } catch (error) {
        next(error)
    }
}



//@desc      Delete a category
//@route     DELETE /api/v1/category/:id
//@access    Private/Admin

export  const deleteACategory= async (req,res,next)=>{
    try {
        await categoryModel.findByIdAndDelete(req.params.id)



        res.status(200).json({
            success:true,
            message:"Category is deleted successfully!",
            data:null
        })
    } catch (error) {
        next(error)
    }
}