import express from "express"
import { createOrder } from "../controllers/orderControllers.js"
import isLoggedin from "../middleware/isLoggedInMiddleware.js"


const router= express.Router()


router.post("/v1/order",isLoggedin,createOrder)


export default router