import mongoose from "mongoose"


const couponSchema= new mongoose.Schema({
    code:{
        type: String,
        required:true,
    },
    startDate:{
        type: Date,
        required:true,
    },
    endDate:{
        type: Date,
        required:true,
    },
    discount:{
        type: Number,
        required:true,
        default:0
    }
},{
    timestamps:true
})

const couponModel= mongoose.model("Coupon",couponSchema)

export default couponModel