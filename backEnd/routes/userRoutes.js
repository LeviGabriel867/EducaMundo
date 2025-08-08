import express from "express";
import { getUserById } from "../controllers/userController.js";
import checkToken from "../middlewares/checkToken.js";
const router = express.Router();

router.get(":id", checkToken, getUserById);

export default router;
