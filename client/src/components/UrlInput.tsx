import { useState } from "react";
import { ArrowRight } from "lucide-react";

interface UrlInputProps {
  onSubmit: (url: string) => void;
  error: string | null;
}

export default function UrlInput({ onSubmit, error }: UrlInputProps) {
  const [url, setUrl] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim());
    }
  }

  return (
    <div className="flex flex-col items-center py-28 animate-fade-in-up">
      {/* Hero heading */}
      <h2 className="mb-3 text-center font-serif text-5xl leading-[1.15] text-[#e8e8e3] sm:text-6xl">
        understand<br />
        <span className="italic">economics</span>
      </h2>
      <p className="mb-12 max-w-sm text-center text-sm leading-relaxed text-[#555]">
        Paste any article. Get a clear, jargon-free explanation{" "}
        with deep dives into key concepts.
      </p>

      {/* Input */}
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="flex items-center gap-3 border-b border-white/10 pb-3">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste an article URL"
            className="flex-1 bg-transparent text-sm text-[#e8e8e3] placeholder-[#444] outline-none"
            required
          />
          <button
            type="submit"
            className="flex items-center gap-1.5 rounded-full bg-[#e8e8e3] px-4 py-2 text-xs font-medium text-[#0a0a0a] transition-opacity hover:opacity-80"
          >
            Simplify
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </form>

      {error && (
        <p className="mt-6 text-xs text-red-400/80">
          {error}
        </p>
      )}
    </div>
  );
}
