import mongoose from "mongoose"
import { createError } from "../middleware/errorMiddleware.js"


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
    timestamps:true,
    toJSON:{virtuals:true},
})

couponSchema.virtual("isExpired").get(function(){
    return this.endDate< Date.now()
})

couponSchema.virtual("daysLeft").get(function(){
    const daysLeft= Math.ceil((this.endDate - Date.now())/(1000 * 60 * 60 *24)) +" "+"Days Left"
    return daysLeft
})

couponSchema.pre("validate",function(next){
    if(this.endDate < this.startDate){
        next(createError(400,"End date cannot be greater than start date!"))
    }
    next()
})

couponSchema.pre("validate",function(next){
    if(this.startDate < Date.now()){
        next(createError(400,"Start date cannot be less than today!"))
    }
    next()
})

couponSchema.pre("validate",function(next){
    if(this.discount <=0 < this.discount>=100){
        next(createError(400,"Discount cannot be greater than 100 or less than 0!"))
    }
    next()
})

const couponModel= mongoose.model("Coupon",couponSchema)

export default couponModel