"use client";

import { useEffect } from "react";
import "./globals.css";

// Last-resort boundary: replaces the root layout (own <html>/<body>, no rail or
// next/font vars), so it's self-contained — inline styles + globals.css tokens.
const GlobalError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        style={{
          minHeight: "100vh",
          margin: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 18,
          padding: "0 24px",
          textAlign: "center",
          background: "var(--bg)",
          color: "var(--tx)",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
        }}
      >
        <p
          style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--tx3)" }}
        >
          ERROR — THE PRESS JAMMED
        </p>
        <h1
          style={{ margin: 0, fontSize: "clamp(56px,16vw,140px)", lineHeight: 0.9 }}
        >
          5 · 0 · 0
        </h1>
        <p style={{ fontSize: 16, color: "var(--tx2)" }}>
          something broke between the wire and the page
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: 13,
            color: "var(--tx2)",
            background: "transparent",
            border: "1px solid var(--rule-strong)",
            borderRadius: 2,
            padding: "8px 16px",
          }}
        >
          ↻ try again
        </button>
      </body>
    </html>
  );
};

export default GlobalError;
