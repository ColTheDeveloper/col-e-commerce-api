import dotenv from "dotenv"
dotenv.config()
import express from "express"
import connectDB from "../config/db.js";
import userRoutes from "../routes/userRoutes.js"
import productRoutes from "../routes/productRoutes.js"
import categoryRoutes from "../routes/categoryRoutes.js"
import brandRoutes from "../routes/brandRoutes.js"
import colorRoutes from "../routes/colorRoutes.js"
import { routeNotFound } from "../middleware/errorMiddleware.js";




connectDB()
const app=express()

app.use(express.json())

app.use("/api",userRoutes)
app.use("/api",productRoutes)
app.use("/api",categoryRoutes)
app.use("/api",brandRoutes)
app.use("/api",colorRoutes)


app.use(routeNotFound)
app.use((err,req,res,next)=>{
    const status=err.status || 500
    const message=err.message || "Something went wrong!"

    return res.status(status).json({
        success:false,
        message,
        data:null
    })
})
export default app;