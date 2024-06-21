import express from "express";
import { deleteUser, testRoute, updateUser } from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyUser.js";


const router = express.Router();

router.get("/", testRoute);
router.put("/update/:id", verifyToken, updateUser)
router.delete("/delete/:id", verifyToken, deleteUser)

export default router;
