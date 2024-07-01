import mongoose from "mongoose";

const categorySchema= new mongoose.Schema({
    name:{
        type: String,
        required: true,
        lowercase: true,
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