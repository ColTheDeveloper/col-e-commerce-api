import { createError } from "../middleware/errorMiddleware.js";
import productModel from "../models/productModel.js";
import reviewModel from "../models/reviewModel.js";




// @desc     Create new review
// @route    POST /api/v1/review
// @aceess   Private/Admin

export const createAReview=async(req,res,next)=>{
    const {productId}=req.params;
    const {message,rating}= req.body
    try {
        const foundProduct= await productModel.findById(productId).populate("reviews")
        if(!foundProduct) return next(createError(400,"Product not found!"))

            console.log(foundProduct)

        //check if user already review the product
        const  hasReviewedBefore= foundProduct.reviews.find((review)=>{
            return review.user.toString() === req.userId.toString()
        })
        
        if(hasReviewedBefore) return next(createError(400,"You've already review this product!"))
        //create  the product
        const createdReview= await reviewModel.create({
            message,
            rating,
            product: foundProduct._id,
            user: req.userId,
        })



        foundProduct.reviews.push(createdReview._id)
        foundProduct.save()

        res.status(201).json({
            success:true,
            message:"Review created successfully",
            data:createdReview
        })
    } catch (error) {
        next(error)
    }
}