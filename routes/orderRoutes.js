import express from "express"
import { createOrder, getAllOrders, getAnOrder, updateOrderStatus } from "../controllers/orderControllers.js"
//import isLoggedin from "../middleware/isLoggedInMiddleware.js"
import authCheck from "../middleware/authMiddleware.js"


const router= express.Router()


router.post("/v1/order",authCheck,createOrder)
router.get("/v1/orders",authCheck,getAllOrders)
router.get("/v1/order/:id",authCheck,getAnOrder)
router.put("/v1/order/update/:id", authCheck,updateOrderStatus )


export default router