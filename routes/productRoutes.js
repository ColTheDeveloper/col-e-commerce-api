import express from "express"
import { createProduct, getAllProducts } from "../controllers/productControllers.js"
import isLoggedin from "../middleware/isLoggedInMiddleware.js"

const router= express.Router()


router.post("/v1/product",isLoggedin,createProduct)
router.get("/v1/products",getAllProducts)




export default router