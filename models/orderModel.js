import mongoose from "mongoose"


const randomText= Math.random().toString(36).substring(7).toLocaleUpperCase();
const randomNumber= Math.floor(1000 + Math.random() *  90000)
const orderSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    orderItems:[
        {
            type:Object,
            required:true
        }
    ],
    shippingAddress:{
        type:Object,
        required:true
    },
    orderNumber:{
        type:String,
        required:true,
        default: randomText + randomNumber
    },
    paymentStatus:{
        type:String,
        default:"Not Paid"
    },
    paymentMethod:{
        type:String,
        default:"Not specified"
    },
    totalPrice:{
        type:Number,
        default:0.0
    },
    currency:{
        type:String,
        default:"Not specified"
    },
    orderStatus:{
        type:String,
        default:"pending",
        enum:["pending","processing","shipped","delivered"]
    },
    deliveredAt:{
        type:Date,
    }
},{timestamps:true})


const orderModel=mongoose.model("Order",orderSchema)

export default orderModel