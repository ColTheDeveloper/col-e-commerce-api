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
        // const page=parseInt(req.query.page)?parseInt(req.query.page): 1
        // const limit=parseInt(req.query.limit)?parseInt(req.query.limit): 10
        // const startIndex=(page-1)*limit
        // const endIndex= page*limit
        // const totalProduct=productModel.countDocuments()

        // productsData.skip(startIndex).limit(limit)

        const allProducts= await productsData

        res.status(200).json({
            successful:true,
            status:200,
            data:allProducts
        })
    } catch (err) {
        next(err)
    }
}


//@desc    Get a product
//@route   GET /api/v1/product/:id
//@access  Public