import jwt from "jsonwebtoken"
import { createError } from "../middleware/errorMiddleware.js"
const verifyToken=async(token,)=>{
    try {
        return jwt.verify(token,process.env.JWT_KEY,(err,decoded)=>{
            if(err) return next(createError(403,"Token expired,Please login again!"))
    

            return decoded
    
        })
    } catch (err) {
        next(err)
    }

}

export default verifyToken