import mongoose from "mongoose"

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    colors:{
        type:[String],
        required:true
    },
    category:{
        type:String,
        ref:"Category",
        required:true
    },
    sizes:{
        type:[String],
        emun:["S","M","L","XL","XXL"],
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    images:[
        {
            type:String,
            default:"http://gohomeOrgoHard.jpg"
        }
    ],
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    price:{
        type:Number,
        required:true
    },
    totalQuantity:{
        type:Number,
        required:true
    },
    totalSold:{
        type:Number,
        required:true,
        default:0
    },
},{timestamps:true})

const productModel= mongoose.model("Product",productSchema)

export default productModel;