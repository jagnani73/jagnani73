"use client";

export const BackToTop = ({ className }: { className?: string }) => {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={
        className ??
        "cursor-pointer font-mono text-[11px] tracking-[0.1em] text-tx2 transition-colors hover:text-sig"
      }
    >
      BACK TO TOP ↑
    </button>
  );
};
