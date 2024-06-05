import { createCategory, deleteACategory, getACategory, getAllCategories, updateACategory } from "../controllers/categoryControllers.js";
import isLoggedin from "../middleware/isLoggedInMiddleware.js";
import express from "express"

const router=express.Router();

router.post("/v1/category",isLoggedin,createCategory)
router.get("/v1/categories",getAllCategories)
router.get("/v1/category/:id",getACategory)
router.put("/v1/category/:id",isLoggedin,updateACategory)
router.delete("/v1/category/:id",isLoggedin,deleteACategory)


export default router;