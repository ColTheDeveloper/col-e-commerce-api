import mongoose from "mongoose";

const brandSchema= new mongoose.Schema({
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

const brandModel= mongoose.model("brand", brandSchema)

export default brandModel