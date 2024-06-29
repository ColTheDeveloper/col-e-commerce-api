import express from "express"
import { getUserProfile, loginUser, registerUser, updateShippingAddress } from "../controllers/userControllers.js"
//import isLoggedin from "../middleware/isLoggedInMiddleware.js"
import authCheck from "../middleware/authMiddleware.js"

const router= express.Router()

router.post("/v1/user/register",registerUser)
router.post("/v1/user/login",loginUser)
router.get("/v1/user/profile",authCheck,getUserProfile)
router.put("/v1/user/update/shipping",authCheck,updateShippingAddress)


export default router