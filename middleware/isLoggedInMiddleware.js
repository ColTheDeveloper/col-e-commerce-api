import getTokenFromHeader from "../utils/getTokenFromHeader.js"
import verifyToken from "../utils/verifyToken.js"
import { createError } from "./errorMiddleware.js"
import jwt from "jsonwebtoken"

const isLoggedin=async(req,res,next)=>{
    // try {
    //     const token=getTokenFromHeader(req,next)
    //     console.log(token)
    //     const decodedUser=await verifyToken(token,next)
    //     console.log(!!decodedUser)
    //     //if(decodedUser==undefined)return next(createError(403,"Token expired,Please login again!"))
    //     req.userId=decodedUser.id
    
    //     next()
        
    // } catch (err) {
    //     next(err)
    // }
    const token= req.headers.authorization.split(" ")[1]
    if(!token)return next(createError(403,"No token found, you are not authorized"))

    jwt.verify(token,process.env.JWT_KEY,(err,decoded)=>{
        if(err)return next(createError(403,"Token expired, Please login again!"))

        req.userId=decoded.id

        next()
    })
}

export default isLoggedin