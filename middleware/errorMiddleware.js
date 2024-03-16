export const createError=(status,message)=>{
    const err=new Error()

    err.status=status
    err.message=message

    return err
}

export const routeNotFound=(req,res,next)=>{
    const err= new Error(`Route ${req.originalUrl} not found`)
    next(err)
}

