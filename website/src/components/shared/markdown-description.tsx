"use client";

import ReactMarkdown from "react-markdown";
import { stripMarkdown } from "@/utils/functions";

interface MarkdownDescriptionProps {
  content: string;
  truncate?: boolean;
}

export const MarkdownDescription: React.FC<MarkdownDescriptionProps> = ({
  content,
  truncate,
}) => {
  if (truncate) {
    return (
      <p className="mt-8 text-justify line-clamp-3">{stripMarkdown(content)}</p>
    );
  }

  return (
    <div className="mt-8 text-justify space-y-3">
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="leading-relaxed">{children}</p>,
          strong: ({ children }) => (
            <strong className="font-bold text-cultured">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-cultured/80">{children}</em>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-5 space-y-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-5 space-y-1">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownDescription;
