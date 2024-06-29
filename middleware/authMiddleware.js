import getTokenFromHeader from "../utils/getTokenFromHeader.js"
import verifyToken from "../utils/verifyToken.js"
import { createError } from "./errorMiddleware.js"
import jwt from "jsonwebtoken"

const authCheck=async(req,res,next)=>{
    try {
        const token= req.headers.authorization.split(" ")[1]
        if(!token)return next(createError(403,"No token found, you are not authorized"))
    
        jwt.verify(token,process.env.JWT_KEY,(err,decoded)=>{
            if(err)return next(createError(403,"Token expired, Please login again!"))
                console.log(decoded.isAdmin)
            req.userId=decoded.id
            req.isAdmin=decoded.isAdmin
    
            next()
        })
        
    } catch (error) {
        next(error)
    }
}

export default authCheck