import express from "express"
import { createABrand, deleteABrand, getABrand, getAllBrand, updateABrand } from "../controllers/brandControllers.js"
import isLoggedin from "../middleware/isLoggedInMiddleware.js"

const router = express.Router()

router.post("/v1/brand",isLoggedin,createABrand)

router.get("/v1/brands",getAllBrand)

router.get("/v1/brand/:id",getABrand)

router.put("/v1/brand/:id",isLoggedin,updateABrand)

router.delete("/v1/brand/:id",isLoggedin,deleteABrand)



export default router