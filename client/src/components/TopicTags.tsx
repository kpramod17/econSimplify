import { CHAPTERS, CHAPTER_COLORS } from "../lib/constants";

interface TopicTagsProps {
  tags: number[];
  explanation: string;
}

export default function TopicTags({ tags, explanation }: TopicTagsProps) {
  if (tags.length === 0) return null;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tagId) => {
          const chapter = CHAPTERS.find((c) => c.id === tagId);
          if (!chapter) return null;
          const colors = CHAPTER_COLORS[tagId] || "bg-gray-100 text-gray-800 border-gray-200";
          return (
            <span
              key={tagId}
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${colors}`}
            >
              Ch{chapter.id}: {chapter.shortName}
            </span>
          );
        })}
      </div>
      {explanation && (
        <p className="mt-2 text-xs text-gray-500">{explanation}</p>
      )}
    </div>
  );
}
