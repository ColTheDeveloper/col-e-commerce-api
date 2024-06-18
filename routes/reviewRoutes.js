import express from "express"
import isLoggedin from "../middleware/isLoggedInMiddleware.js"
import { createAReview } from "../controllers/reviewControllers.js"


const router = express.Router()


router.post("/v1/review/:productId",isLoggedin,createAReview)


export default router