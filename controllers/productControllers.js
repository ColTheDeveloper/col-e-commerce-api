import { createError } from "../middleware/errorMiddleware.js";
import productModel from "../models/productModel.js";


//@desc    Create new product
//@route   POST /api/v1/product
//@access  Private/Admin

export const createProduct=async(req,res,next)=>{
    const {name,description,brand,colors,category,sizes,price,totalQuantity}=req.body
    try {
        const productExist=await productModel.findOne({name})
        if(productExist)return next(createError(400,"Product name already existed!"))

        const createdProduct= await productModel.create({
            name,
            description,
            colors,
            category,
            sizes,
            user:req.userId,
            price,
            totalQuantity,
            brand
        })

        res.status(201).json({
            successful:true,
            status:201,
            data:createdProduct
        })
        
    } catch (err) {
        next(err)       
    }
}