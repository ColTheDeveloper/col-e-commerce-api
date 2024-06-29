import express from "express"
//import isLoggedin from "../middleware/isLoggedInMiddleware.js"
import { createAReview } from "../controllers/reviewControllers.js"
import authCheck from "../middleware/authMiddleware.js"


const router = express.Router()


router.post("/v1/review/:productId",authCheck,createAReview)


export default router