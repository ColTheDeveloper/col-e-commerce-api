import express from "express"
import { createOrder, paymentWebhook } from "../controllers/orderControllers.js"
import isLoggedin from "../middleware/isLoggedInMiddleware.js"


const router= express.Router()


router.post("/v1/order",isLoggedin,createOrder)
router.post("/v1/order/paymentwebhook",isLoggedin,paymentWebhook)


export default router