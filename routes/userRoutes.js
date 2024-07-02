import express from "express"
import { getUserProfile, loginUser, registerUser, updateShippingAddress } from "../controllers/userControllers.js"
//import isLoggedin from "../middleware/isLoggedInMiddleware.js"
import authCheck from "../middleware/authMiddleware.js"

const router= express.Router()

/**
 * @swagger
 * /api/v1/user/register:
 *   post:
 *     summary: Register A User
 *     tags:
 *       API V1
 *     responses:
 *       200:
 *         description: A list of examples
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The example ID
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: The example name
 *                     example: Example Name
 */

router.post("/v1/user/register",registerUser)
router.post("/v1/user/login",loginUser)
router.get("/v1/user/profile",authCheck,getUserProfile)
router.put("/v1/user/update/shipping",authCheck,updateShippingAddress)


export default router