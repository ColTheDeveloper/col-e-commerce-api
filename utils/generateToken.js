import jwt from "jsonwebtoken"

const generateToken=(id,isAdmin)=>{
    const token=jwt.sign({id,isAdmin},process.env.JWT_KEY,{expiresIn:"7d"})
    return token
}

export default generateToken