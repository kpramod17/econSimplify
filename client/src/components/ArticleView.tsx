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
    <div className="animate-fade-in-up">
      {/* Title */}
      <h2 className="mb-5 font-serif text-3xl leading-snug text-[#e8e8e3]">
        {result.title}
      </h2>

      {/* Topic Tags */}
      <TopicTags tags={result.tags} explanation={result.tagExplanation} />

      {/* Toggle */}
      <div className="mb-8 mt-6 flex gap-6 border-b border-white/[0.06]">
        <button
          onClick={() => setView("simplified")}
          className={`pb-3 text-xs font-medium tracking-wide transition-colors ${
            view === "simplified"
              ? "tab-active text-[#e8e8e3]"
              : "text-[#555] hover:text-[#888]"
          }`}
        >
          Simplified
        </button>
        <button
          onClick={() => setView("original")}
          className={`pb-3 text-xs font-medium tracking-wide transition-colors ${
            view === "original"
              ? "tab-active text-[#e8e8e3]"
              : "text-[#555] hover:text-[#888]"
          }`}
        >
          Original
        </button>
      </div>

      {/* Content */}
      {view === "simplified" ? (
        <div>
          <p className="mb-5 text-[11px] uppercase tracking-widest text-[#444]">
            Click underlined terms for deep dives
          </p>
          <SimplifiedContent
            content={result.simplifiedContent}
            onTermClick={onTermClick}
          />
        </div>
      ) : (
        <div className="whitespace-pre-line text-sm leading-[1.8] text-[#888]">
          {result.originalContent}
        </div>
      )}
    </div>
  );
}
