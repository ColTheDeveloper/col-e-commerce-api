import mongoose from "mongoose";

const categorySchema= new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    image:{
        type:String,
        required:true,
        default:"hahaha.jpg"
    },
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }
    ]
},{timestamps:true})

const categoryModel= mongoose.model("category", categorySchema)

export default categoryModel