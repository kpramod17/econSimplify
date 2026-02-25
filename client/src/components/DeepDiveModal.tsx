import { useEffect } from "react";
import type { DeepDive } from "@shared/types";
import { X, BookOpen, MapPin, Lightbulb, AlertCircle, Clock } from "lucide-react";

interface DeepDiveModalProps {
  deepDive: DeepDive;
  onClose: () => void;
}

const sections = [
  { key: "definition" as const, label: "Definition", icon: BookOpen },
  { key: "context" as const, label: "Context", icon: MapPin },
  { key: "simpleAnalogy" as const, label: "Simple Analogy", icon: Lightbulb },
  { key: "whyItMatters" as const, label: "Why it Matters", icon: AlertCircle },
  { key: "historicalContext" as const, label: "Historical Context", icon: Clock },
];

export default function DeepDiveModal({ deepDive, onClose }: DeepDiveModalProps) {
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4 rounded-t-xl">
          <h3 className="text-lg font-bold text-gray-900">
            Deep Dive: {deepDive.term}
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sections */}
        <div className="px-6 py-4 space-y-5">
          {sections.map(({ key, label, icon: Icon }) => (
            <div key={key}>
              <div className="mb-1.5 flex items-center gap-2">
                <Icon className="h-4 w-4 text-blue-600" />
                <h4 className="text-sm font-semibold text-gray-900">{label}</h4>
              </div>
              <p className="text-sm leading-relaxed text-gray-600">
                {deepDive[key]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
