import express from "express";
import { signInOrUpWithGoogle, signinUser, signupUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/signin", signinUser);
router.post("/google", signInOrUpWithGoogle);


export default router
