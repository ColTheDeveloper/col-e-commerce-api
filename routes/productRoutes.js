import express from "express"
import { createProduct, deleteAProduct, getAProduct, getAllProducts, updateAProduct } from "../controllers/productControllers.js"
//import isLoggedin from "../middleware/isLoggedInMiddleware.js"
import authCheck from "../middleware/authMiddleware.js"

const router= express.Router()


router.post("/v1/product",authCheck,createProduct)
router.get("/v1/products",getAllProducts)
router.get("/v1/product/:productId",getAProduct)
router.put("/v1/product/:productId",authCheck,updateAProduct)
router.delete("/v1/product/:productId",authCheck,deleteAProduct)

export default router