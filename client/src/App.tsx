import { useState } from "react";
import type { SimplifyResponse } from "@shared/types";
import UrlInput from "./components/UrlInput";
import ArticleView from "./components/ArticleView";
import DeepDiveModal from "./components/DeepDiveModal";
import { BookOpen, Plus } from "lucide-react";

export default function App() {
  const [result, setResult] = useState<SimplifyResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);

  async function handleSimplify(url: string) {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/simplify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to simplify article");
      }

      const data: SimplifyResponse = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function handleNewThread() {
    setResult(null);
    setError(null);
    setSelectedTerm(null);
  }

  const selectedDeepDive = result?.deepDives.find(
    (d) => d.term.toLowerCase() === selectedTerm?.toLowerCase()
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">EconSimplify</h1>
          </div>
          {result && (
            <button
              onClick={handleNewThread}
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              <Plus className="h-4 w-4" />
              New Thread
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-3xl px-4 py-8">
        {!result && !loading && (
          <UrlInput onSubmit={handleSimplify} error={error} />
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
            <p className="mt-4 text-sm text-gray-500">
              Simplifying article... this may take a moment
            </p>
          </div>
        )}

        {result && (
          <ArticleView
            result={result}
            onTermClick={(term) => setSelectedTerm(term)}
          />
        )}
      </main>

      {/* Deep Dive Modal */}
      {selectedDeepDive && (
        <DeepDiveModal
          deepDive={selectedDeepDive}
          onClose={() => setSelectedTerm(null)}
        />
      )}
    </div>
  );
}
