import express from "express";
import summarizeArticle from "../controllers/summarizeArticle.js";

const router = express.Router();

router.post("/summarize-article", summarizeArticle);

export default router;
