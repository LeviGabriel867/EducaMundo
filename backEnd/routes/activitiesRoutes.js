import express from "express";
import { createActivity, downloadActivityPDF, listActivities } from "../controllers/activitiesController.js";
import upload from "../middlewares/upload.js";
const router = express.Router();

router.get("/", listActivities);
router.post("/single", upload.single("image"), createActivity);
router.get("/download/:id", downloadActivityPDF);

export default router;
