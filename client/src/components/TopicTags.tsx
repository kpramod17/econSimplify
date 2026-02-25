import { CHAPTERS } from "../lib/constants";

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
          return (
            <span
              key={tagId}
              className="rounded-full border border-white/[0.08] px-3 py-1 text-[11px] text-[#666]"
            >
              {chapter.shortName}
            </span>
          );
        })}
      </div>
      {explanation && (
        <p className="mt-3 text-xs leading-relaxed text-[#444]">{explanation}</p>
      )}
    </div>
  );
}
