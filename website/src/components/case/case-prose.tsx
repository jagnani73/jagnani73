"use client";

import ReactMarkdown from "react-markdown";

// Renders a project's markdown description for derived (non-authored) case pages.
export const CaseProse = ({ markdown }: { markdown: string }) => (
  <div className="max-w-[860px]">
    <ReactMarkdown
      components={{
        p: ({ children }) => (
          <p className="mb-4 text-[16px] leading-[1.75] text-tx2">{children}</p>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-tx">{children}</strong>
        ),
        em: ({ children }) => <em className="italic">{children}</em>,
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pri underline-offset-2 hover:underline"
          >
            {children}
          </a>
        ),
        ul: ({ children }) => (
          <ul className="mb-4 list-disc space-y-1 pl-5 text-[15px] text-tx2">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-4 list-decimal space-y-1 pl-5 text-[15px] text-tx2">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="leading-[1.6]">{children}</li>,
        code: ({ children }) => (
          <code className="rounded bg-panel px-1.5 py-0.5 font-mono text-[13px] text-sig">
            {children}
          </code>
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
  </div>
);
