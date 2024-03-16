import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const MONGODB_URI=process.env.MONGODB_URI

const connectDB= async()=>{
    try {
        const connected=await mongoose.connect(MONGODB_URI)
        console.log(`Database is connected at ${connected.connection.host} `)
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB