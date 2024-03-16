import express from "express"
import { createProduct } from "../controllers/productControllers.js"
import isLoggedin from "../middleware/isLoggedInMiddleware.js"

const router= express.Router()


router.post("/v1/product",isLoggedin,createProduct)




export default router