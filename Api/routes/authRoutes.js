import express from "express";
import { signInOrUpWithGoogle, signinUser, signupUser } from "../controllers/authController.js";
import { signoutUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/signin", signinUser);
router.post("/google", signInOrUpWithGoogle);
router.get("/signout", signoutUser)



export default router
