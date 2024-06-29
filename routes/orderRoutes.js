import express from "express"
import { createOrder, getAllOrders, getAnOrder, updateOrderStatus } from "../controllers/orderControllers.js"
import isLoggedin from "../middleware/isLoggedInMiddleware.js"


const router= express.Router()


router.post("/v1/order",isLoggedin,createOrder)
router.get("/v1/orders",isLoggedin,getAllOrders)
router.get("/v1/order/:id",isLoggedin,getAnOrder)
router.put("/v1/order/update/:id", isLoggedin,updateOrderStatus )


export default router