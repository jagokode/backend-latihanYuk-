import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";
const router = express.Router();

// login
router.post("/login", loginUser);

// register
router.post("/register", registerUser);

export default router;
