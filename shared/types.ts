export interface DeepDive {
  term: string;
  definition: string;
  context: string;
  simpleAnalogy: string;
  whyItMatters: string;
  historicalContext: string;
}

export interface SimplifyResponse {
  title: string;
  originalContent: string;
  simplifiedContent: string;
  tags: number[];
  tagExplanation: string;
  deepDives: DeepDive[];
}

export interface SimplifyRequest {
  url: string;
}

export interface ScrapedArticle {
  title: string;
  content: string;
  source: string;
}

export interface Chapter {
  id: number;
  name: string;
  shortName: string;
}
