import mongoose from "mongoose"


const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Order"
        }
    ],
    wishlists:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Wishlist"
        }
    ],
    hasShippingAddress:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    shippingAddress:{
        firstName:{
            type:String
        },
        lastName:{
            type:String
        },
        address:{
            type:String
        },
        city:{
            type:String
        },
        postalCode:{
            type:String
        },
        state:{
            type:String
        },
        country:{
            type:String
        },
        phoneNumber:{
            type:String
        },
    }
},{timestamps:true})

const userModel=mongoose.model("User",userSchema)

export default userModel;