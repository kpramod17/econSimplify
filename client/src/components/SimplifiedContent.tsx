interface SimplifiedContentProps {
  content: string;
  onTermClick: (term: string) => void;
}

export default function SimplifiedContent({ content, onTermClick }: SimplifiedContentProps) {
  const paragraphs = content.split(/\n\n+/);

  return (
    <div className="space-y-6">
      {paragraphs.map((paragraph, pIndex) => {
        const parts = paragraph.split(/(\{\{[^}]+\}\})/g);

        return (
          <p
            key={pIndex}
            className="text-sm leading-[1.85] text-[#999]"
          >
            {parts.map((part, i) => {
              const match = part.match(/^\{\{(.+)\}\}$/);
              if (match) {
                const term = match[1];
                return (
                  <span
                    key={`${pIndex}-${i}`}
                    className="highlight-term"
                    onClick={() => onTermClick(term)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") onTermClick(term);
                    }}
                  >
                    {term}
                  </span>
                );
              }
              return <span key={`${pIndex}-${i}`}>{part}</span>;
            })}
          </p>
        );
      })}
    </div>
  );
}
