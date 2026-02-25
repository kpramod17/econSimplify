import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
import type { ScrapedArticle } from "../../shared/types.js";

export async function scrapeArticle(url: string): Promise<ScrapedArticle> {
  let response;
  try {
    response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1",
      },
      redirect: "follow",
    });
  } catch (err: any) {
    throw new Error(
      `Could not connect to ${new URL(url).hostname}. The site may be blocking automated requests. Try a different source.`
    );
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch article: ${response.status} ${response.statusText}`);
  }

  const html = await response.text();
  const dom = new JSDOM(html, { url });
  const reader = new Readability(dom.window.document);
  const article = reader.parse();

  if (!article || !article.textContent || article.textContent.trim().length < 100) {
    throw new Error(
      "Could not extract article content. The site may require JavaScript or block scraping. Try a different source."
    );
  }

  const hostname = new URL(url).hostname.replace("www.", "");

  return {
    title: article.title || "Untitled Article",
    content: article.textContent.trim(),
    source: hostname,
  };
}
