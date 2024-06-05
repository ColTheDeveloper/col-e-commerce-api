import { createError } from "../middleware/errorMiddleware.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";


//@desc    Create new product
//@route   POST /api/v1/product
//@access  Private/Admin

export const createProduct=async(req,res,next)=>{
    const {name,description,brand,colors,category,sizes,price,totalQuantity}=req.body
    try {
        const productExist=await productModel.findOne({name})
        if(productExist){
            res.status(200).json({
                success:false,
                message:"Product name already existed!",
                data:null
            })
        }

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
            success:true,
            message:"Product created successfully",
            data:null
        })

    } catch (err) {
        next(err)
    }
}


//@desc    Get all product
//@route   GET /api/v1/product
//@access  Public


export const getAllProducts=async(req,res,next)=>{
    try {
        let productsData=productModel.find()

        //search product with name
        if(req.query.name){
            productsData.find({name:{$regex:req.query.name, $options:"i"}})
        }

        //search product with brand
        if(req.query.brand){
            productsData.find({brand:{$regex:req.query.brand, $options:"i"}})
        }

        //search product with sizes
        if(req.query.sizes){
            productsData.find({sizes:{$regex:req.query.sizes, $options:"i"}})
        }

        //search product with colors
        if(req.query.colors){
            productsData.find({colors:{$regex:req.query.colors, $options:"i"}})
        }

        //search product with category
        if(req.query.category){
            productsData.find({category:{$regex:req.query.category, $options:"i"}})
        }

        //search product with price range
        if(req.query.priceRange){
            const priceRange=req.query.price.split("-")
            productsData.find({price:{$gte:priceRange[0], $lte:priceRange[1]}})
        }
        //pagination
        const page=parseInt(req.query.page)?parseInt(req.query.page): 1

        const limit=parseInt(req.query.limit)?parseInt(req.query.limit): 10

        const startIndex=(page-1)*limit

        const endIndex= page*limit

        const totalProduct= await productModel.countDocuments()

        //const totalProduct=12

        const products=await productsData.skip(startIndex).limit(limit)

        const pagination={}

        if(endIndex>totalProduct){
            pagination.next={
                page:page + 1,
                limit
            }
        }

        if(startIndex>0){
            pagination.prev={
                page:page - 1,
                limit
            }
        }
        //const products=  allProducts

        res.status(200).json({
            success:true,
            message:"All product fetch successfully!",
            data:{
                products,
                results:products.length,
                pagination,
                totalProduct
            }
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
}


//@desc    Get a product
//@route   GET /api/v1/product/:id
//@access  Public

export const getAProduct= async(req,res,next)=>{
    try {
        const productId=req.params.productId
        const product= await productModel.findById(req.params.productId)

        if(!product) return next(createError(404,"Product not found!"))

        res.status(200).json({
            successful:true,
            status:200,
            data:product
        })
    } catch (err) {
        next(err)
    }
}


//@desc    update a product
//@route   PUT /api/v1/product/:id
//@access  Private/Admin

export const updateAProduct= async(req,res,next)=>{
    const productId=req.params.productId
    try {
        const {name,description,category,sizes,colors,user,price,totalQuantity,brand}=req.body
        const product=await productModel.findByIdAndUpdate(productId,{
            name,
            description,
            brand,
            colors,
            category,
            sizes,
            user,
            totalQuantity,
            price
        },{
            new:true
        })
        res.status(200).json({
            success:true,
            message:"Product updated successfully!",
            data:null
        })
    } catch (err) {
        next(err)
    }

}

//@desc delete a product
//@route DELETE /api/v1/product/:id
//@access  Admin

export const deleteAProduct= async(req,res,next)=>{
    try {
        const productId= req.params.productId
        const user= await userModel.findById(req.userId)

        if(user.isAdmin){
            await productModel.findByIdAndDelete(productId)
            res.status(200).json({
                success:true,
                message:"Product deleted successfully",
                data:null
            })
        }else{
            res.status(200).json({
                success:false,
                message:"Only an admin can delete a product!",
                data:null
            })
        }

    } catch (err) {
        next(err)
    }
}