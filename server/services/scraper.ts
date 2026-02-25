import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
import type { ScrapedArticle } from "../../shared/types.js";

export async function scrapeArticle(url: string): Promise<ScrapedArticle> {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch article: ${response.status} ${response.statusText}`);
  }

  const html = await response.text();
  const dom = new JSDOM(html, { url });
  const reader = new Readability(dom.window.document);
  const article = reader.parse();

  if (!article || !article.textContent) {
    throw new Error("Could not extract article content from the URL");
  }

  const hostname = new URL(url).hostname.replace("www.", "");

  return {
    title: article.title || "Untitled Article",
    content: article.textContent.trim(),
    source: hostname,
  };
}
