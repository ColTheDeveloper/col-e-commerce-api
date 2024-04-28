import express from "express"
import { createProduct, deleteAProduct, getAProduct, getAllProducts, updateAProduct } from "../controllers/productControllers.js"
import isLoggedin from "../middleware/isLoggedInMiddleware.js"

const router= express.Router()


router.post("/v1/product",isLoggedin,createProduct)
router.get("/v1/products",getAllProducts)
router.get("/v1/product/:productId",getAProduct)
router.put("/v1/product/:productId",updateAProduct)
router.get("/v1/product/:productId",isLoggedin,deleteAProduct)

export default router