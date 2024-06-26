import express from "express"
//import isLoggedin from "../middleware/isLoggedInMiddleware.js"
import { createAColor, deleteAColor, getAColor, getAllColor, updateAColor } from "../controllers/colorControllers.js"
import authCheck from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/v1/color",authCheck,createAColor)

router.get("/v1/colors",getAllColor)

router.get("/v1/color/:id",getAColor)

router.put("/v1/color/:id",authCheck,updateAColor)

router.delete("/v1/color/:id",authCheck,deleteAColor)



export default router