import { createCategory, deleteACategory, getACategory, getAllCategories, updateACategory } from "../controllers/categoryControllers.js";
import authCheck from "../middleware/authMiddleware.js";
import express from "express"

const router=express.Router();

router.post("/v1/category",authCheck,createCategory)
router.get("/v1/categories",getAllCategories)
router.get("/v1/category/:id",getACategory)
router.put("/v1/category/:id",authCheck,updateACategory)
router.delete("/v1/category/:id",authCheck,deleteACategory)


export default router;