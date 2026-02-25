import { Router } from "express";
import { scrapeArticle } from "./services/scraper.js";
import { analyzeArticle } from "./services/claude.js";
import type { SimplifyResponse } from "../shared/types.js";

const router = Router();

router.post("/api/simplify", async (req, res) => {
  const { url } = req.body;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    new URL(url);
  } catch {
    return res.status(400).json({ error: "Invalid URL format" });
  }

  try {
    console.log(`[SIMPLIFY] Scraping: ${url}`);
    const article = await scrapeArticle(url);
    console.log(`[SIMPLIFY] Scraped "${article.title}" (${article.content.length} chars)`);

    console.log(`[SIMPLIFY] Analyzing with Claude...`);
    const analysis = await analyzeArticle(article);
    console.log(`[SIMPLIFY] Analysis complete - ${analysis.tags.length} tags, ${analysis.deepDives.length} terms`);

    const response: SimplifyResponse = {
      title: article.title,
      originalContent: article.content,
      simplifiedContent: analysis.simplifiedContent,
      tags: analysis.tags,
      tagExplanation: analysis.tagExplanation,
      deepDives: analysis.deepDives,
    };

    res.json(response);
  } catch (error: any) {
    console.error(`[SIMPLIFY] Error: ${error.message}`);
    res.status(500).json({ error: error.message || "Failed to simplify article" });
  }
});

export default router;
