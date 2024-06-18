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
},{
    timestamps:true,
    toJSON:{virtuals:true}
})

productSchema.virtual("remainingQty").get(function(){
    const product= this
    return product.totalQuantity-product.totalSold
})

productSchema.virtual("totalReviews").get(function(){
    const product= this
    console.log(product)
    return product.reviews.length
})

productSchema.virtual("averageRating").get(function(){
    let totalRating=0;
    const product= this;

    product.reviews.forEach(review=>{
        totalRating+=review.rating
    })

    const averageRating= Number(totalRating/product.reviews.length).toFixed(1)

    return averageRating
})
const productModel= mongoose.model("Product",productSchema)

export default productModel;