import express from "express";
import { testRoute, updateUser } from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", testRoute);
router.post("/update/:id", verifyToken, updateUser)

export default router;
