import getTokenFromHeader from "../utils/getTokenFromHeader.js"
import verifyToken from "../utils/verifyToken.js"
import { createError } from "./errorMiddleware.js"
import jwt from "jsonwebtoken"

const authCheck=async(req,res,next)=>{
    try {
        if(!req.headers.authorization)return next(createError(401,"Unauthorized!"))
        const token= req.headers.authorization.split(" ")[1]
        if(!token)return next(createError(401,"Unauthorized!"))
    
        jwt.verify(token,process.env.JWT_KEY,(err,decoded)=>{
            if(err)return next(createError(401,"Unauthorized!"))
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