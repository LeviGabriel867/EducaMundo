import express from "express";
import { uploadVideos, getVideosWithTitles } from "../controllers/videosController.js";
const router = express.Router();

router.post("/upload", uploadVideos);
router.get("/withTitles", getVideosWithTitles);

export default router;
