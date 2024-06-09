import mongoose from "mongoose";

const colorSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true,
        lowercase: true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
},{timestamps:true})

const colorModel= mongoose.model("color", colorSchema)

export default colorModel