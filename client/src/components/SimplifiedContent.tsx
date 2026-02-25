interface SimplifiedContentProps {
  content: string;
  onTermClick: (term: string) => void;
}

export default function SimplifiedContent({ content, onTermClick }: SimplifiedContentProps) {
  // Split content on {{term}} markers and render highlighted terms
  const parts = content.split(/(\{\{[^}]+\}\})/g);

  return (
    <div className="text-sm leading-relaxed text-gray-700">
      {parts.map((part, i) => {
        const match = part.match(/^\{\{(.+)\}\}$/);
        if (match) {
          const term = match[1];
          return (
            <span
              key={i}
              className="highlight-term"
              onClick={() => onTermClick(term)}
            >
              {term}
            </span>
          );
        }
        // Render newlines as paragraphs
        const paragraphs = part.split(/\n\n+/);
        return paragraphs.map((p, j) => (
          <span key={`${i}-${j}`}>
            {j > 0 && <br className="mb-3 block content-['']" />}
            {j > 0 && <br />}
            {p}
          </span>
        ));
      })}
    </div>
  );
}
