import mongoose from "mongoose";

const colorSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true,
        lowercase: true,
    }
},{timestamps:true})

const colorModel= mongoose.model("color", colorSchema)

export default colorModel