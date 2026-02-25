import { useState } from "react";
import type { SimplifyResponse } from "@shared/types";
import SimplifiedContent from "./SimplifiedContent";
import TopicTags from "./TopicTags";

interface ArticleViewProps {
  result: SimplifyResponse;
  onTermClick: (term: string) => void;
}

export default function ArticleView({ result, onTermClick }: ArticleViewProps) {
  const [view, setView] = useState<"simplified" | "original">("simplified");

  return (
    <div>
      {/* Title */}
      <h2 className="mb-4 text-2xl font-bold text-gray-900">{result.title}</h2>

      {/* Topic Tags */}
      <TopicTags tags={result.tags} explanation={result.tagExplanation} />

      {/* Toggle */}
      <div className="mb-6 mt-4 flex gap-1 rounded-lg bg-gray-100 p-1 w-fit">
        <button
          onClick={() => setView("simplified")}
          className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
            view === "simplified"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Simplified
        </button>
        <button
          onClick={() => setView("original")}
          className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
            view === "original"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Original
        </button>
      </div>

      {/* Content */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        {view === "simplified" ? (
          <SimplifiedContent
            content={result.simplifiedContent}
            onTermClick={onTermClick}
          />
        ) : (
          <div className="whitespace-pre-line text-sm leading-relaxed text-gray-700">
            {result.originalContent}
          </div>
        )}
      </div>
    </div>
  );
}
