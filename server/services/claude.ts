import Anthropic from "@anthropic-ai/sdk";
import type { ScrapedArticle, DeepDive } from "../../shared/types.js";

const CHAPTERS_LIST = `1. Thinking Like an Economist (Econ Thinking)
2. Comparative Advantage (Comp. Advantage)
3. Supply and Demand (Supply & Demand)
4. Elasticity
5. Demand
6. Perfectly Competitive Supply (Perfect Competition)
7. Efficiency, Exchange, and the Invisible Hand in Action (Invisible Hand)
8. Monopoly, Oligopoly, and Monopolistic Competition (Market Power)
9. Games and Strategic Behaviour (Game Theory)
10. Behavioural Economics (Behavioural Econ)
11. Externalities, Property Rights, and the Environment (Externalities)
12. The Economics of Information (Info Economics)
13. Labour Markets, Poverty, and Income Distribution (Labour Markets)
14. Public Goods and Tax Policy (Public Goods)
15. International Trade and Trade Policy (Trade Policy)`;

const client = new Anthropic();

interface ClaudeAnalysis {
  simplifiedContent: string;
  tags: number[];
  tagExplanation: string;
  deepDives: DeepDive[];
}

export async function analyzeArticle(article: ScrapedArticle): Promise<ClaudeAnalysis> {
  const contentPreview = article.content.slice(0, 4000);

  const prompt = `You are an economics professor who explains complex news to beginners. Your goal is to make any reader understand the economic forces at play.

Article Title: ${article.title}
Source: ${article.source}
Article Content:
${contentPreview}

Analyze this article and respond with ONLY valid JSON (no markdown, no backticks) in this exact structure:

{
  "simplifiedContent": "Rewrite the article in simple, easy-to-understand language (3-5 paragraphs). Explain the underlying economic forces and chain of cause-and-effect. For example: 'Fewer cars are being made because the materials to build them cost more, which happened because the government added extra taxes (called tariffs) on imported goods, and global supply chains are still disrupted from conflicts in Europe.' Wrap 4-6 key economic terms in double curly braces like {{Tariffs}} or {{Supply Chain}}. These should be important economics concepts that deserve deeper explanation.",
  "tags": [15, 3],
  "tagExplanation": "Brief explanation of why these economics topics apply to this article",
  "deepDives": [
    {
      "term": "Tariffs",
      "definition": "A simple, clear definition of the term",
      "context": "How this term specifically relates to what's happening in this article",
      "simpleAnalogy": "An everyday analogy that makes this concept click (e.g., 'It's like adding a toll booth on a highway - it makes crossing more expensive and slower')",
      "whyItMatters": "Why understanding this concept matters for understanding the bigger economic picture",
      "historicalContext": "A brief historical example or precedent that helps frame this concept"
    }
  ]
}

Available Economics Topics (use chapter IDs, pick up to 3 most relevant):
${CHAPTERS_LIST}

Rules:
- simplifiedContent must be written for someone with NO economics background
- Every {{term}} in simplifiedContent MUST have a matching entry in deepDives
- tags array: 1-3 chapter IDs (numbers only)
- deepDives: one object per highlighted term
- Keep explanations conversational and jargon-free
- Focus on the chain of economic cause-and-effect`;

  let message;
  try {
    message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      messages: [{ role: "user", content: prompt }],
    });
  } catch (err: any) {
    if (err?.status === 400 || err?.status === 401 || err?.status === 403) {
      throw new Error("Anthropic API key is invalid or has insufficient credits. Check your .env file.");
    }
    throw new Error(`Claude API error: ${err?.message || "Unknown error"}`);
  }

  const text = message.content[0].type === "text" ? message.content[0].text : "";
  const cleanText = text.replace(/```json\n?|\n?```/g, "").trim();

  let analysis: ClaudeAnalysis;
  try {
    analysis = JSON.parse(cleanText);
  } catch {
    throw new Error("Failed to parse Claude response as JSON");
  }

  // Validate and sanitize
  if (!analysis.simplifiedContent || !Array.isArray(analysis.tags) || !Array.isArray(analysis.deepDives)) {
    throw new Error("Invalid response structure from Claude");
  }

  analysis.tags = analysis.tags.filter((t: number) => t >= 1 && t <= 15).slice(0, 3);
  analysis.tagExplanation = analysis.tagExplanation || "";

  return analysis;
}
