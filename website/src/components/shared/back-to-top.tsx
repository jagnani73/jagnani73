"use client";

import { useEffect, useState } from "react";

// Renders only once the page is actually scrolled down — at the top there's
// nothing to go back to, so the button would be a no-op (e.g. a short page, or a
// large viewport whose footer is already on screen). Places itself in the
// footer's right grid column, like FooterArcadeCta does for the centre column.
export const BackToTop = () => {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const update = () => setShown(window.scrollY > 4);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  if (!shown) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="cursor-pointer font-mono text-[11px] tracking-[0.1em] text-tx2 transition-colors hover:text-sig rail:col-start-3 rail:justify-self-end"
    >
      BACK TO TOP ↑
    </button>
  );
};
