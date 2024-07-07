import express from "express"
import { createCoupon, deleteACoupon, getACoupon, getAllCoupon, updateACoupon } from "../controllers/couponControllers.js"
import authCheck from "../middleware/authMiddleware.js"


const router= express.Router()

router.post("/v1/coupon", authCheck ,createCoupon)
router.get("/v1/coupons",getAllCoupon)
router.get("/v1/coupon/:code",getACoupon)
router.put("/v1/coupon/update/:id",authCheck, updateACoupon)
router.delete("/v1/coupon/delete/:id",authCheck, deleteACoupon)



export default router