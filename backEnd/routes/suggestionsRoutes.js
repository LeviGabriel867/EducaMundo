import express from "express";
import { createSuggestion, getSuggestions, deleteSuggestion, downloadSuggestionsPDF } from "../controllers/suggestionsController.js";
const router = express.Router();

router.post("/", createSuggestion);
router.get("/", getSuggestions);
router.delete("/:id", deleteSuggestion);
router.get("/download", downloadSuggestionsPDF);

export default router;
