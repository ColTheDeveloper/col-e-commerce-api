import { createError } from "../middleware/errorMiddleware.js"

const getTokenFromHeader=(req,next)=>{
    try {
        const token= req.headers.authorization.split(" ")[1]
        if(!token)return next(createError(403,"No token found,you are not authorized!"))
    
        return token
        
    } catch (err) {
        next(err)
    }
}
export default getTokenFromHeader