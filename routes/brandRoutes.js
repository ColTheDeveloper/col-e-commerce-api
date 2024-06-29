import express from "express"
import { createABrand, deleteABrand, getABrand, getAllBrand, updateABrand } from "../controllers/brandControllers.js"
//import isLoggedin from "../middleware/isLoggedInMiddleware.js"
import authCheck from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/v1/brand",authCheck,createABrand)

router.get("/v1/brands",getAllBrand)

router.get("/v1/brand/:id",getABrand)

router.put("/v1/brand/:id",authCheck,updateABrand)

router.delete("/v1/brand/:id",authCheck,deleteABrand)



export default router