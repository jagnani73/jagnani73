"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CtaTerm } from "@/components/shared/cta-term";
import type { Plate } from "@/utils/types/case.types";

// Two-digit plate label, e.g. "03".
const plateNo = (n: number): string => String(n + 1).padStart(2, "0");

export const PlateViewer = ({
  plates,
  cta,
  next,
}: {
  plates: Plate[];
  cta?: { label: string; href: string };
  next: { slug: string; title: string };
}) => {
  const [i, setI] = useState(0);
  const [fits, setFits] = useState<Record<number, "cover" | "contain">>({});
  const [big, setBig] = useState(-1);
  const [closing, setClosing] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const closeBig = () => {
    setClosing(true);
    setTimeout(() => {
      setBig(-1);
      setClosing(false);
      triggerRef.current?.focus();
    }, 210);
  };

  useEffect(() => {
    if (big < 0) return;
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeBig();
      // No interactive children — trap focus on the dialog.
      if (e.key === "Tab") e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [big]);

  const open = big >= 0 ? plates[big] : undefined;
  const bigPlate = open?.kind === "img" ? open : null;
  const fade = closing ? "plFadeOut" : "plFadeIn";
  const zoom = closing ? "plZoomOut" : "plZoomIn";

  return (
    <div className="grid items-stretch gap-3.5 px-4 pt-4 pb-5 rail:[grid-template-columns:minmax(0,640px)_1fr] rail:gap-6 rail:px-11 rail:pt-5 rail:pb-6">
      <div className="relative aspect-video overflow-hidden rounded-md border border-rule bg-panel">
        {plates.map((pl, j) => {
          const vis = i === j;
          const common = `absolute inset-0 transition-opacity duration-[450ms] ${
            vis ? "opacity-100" : "pointer-events-none opacity-0"
          }`;
          if (pl.kind === "img") {
            const fit = pl.fit ?? fits[j] ?? "cover";
            return (
              <button
                key={j}
                type="button"
                onClick={(e) => {
                  triggerRef.current = e.currentTarget;
                  setBig(j);
                }}
                aria-label={`open ${pl.cap}`}
                className={`${common} cursor-zoom-in border-0 bg-transparent p-0`}
              >
                <Image
                  src={pl.src}
                  alt={pl.cap}
                  fill
                  sizes="(max-width: 1200px) 100vw, 640px"
                  className={
                    fit === "contain"
                      ? "object-contain object-center"
                      : "object-cover object-top"
                  }
                  onLoad={(e) => {
                    const img = e.currentTarget;
                    const r = img.naturalWidth / img.naturalHeight;
                    if (r < 1.25 && !pl.fit) {
                      setFits((f) => (f[j] ? f : { ...f, [j]: "contain" }));
                    }
                  }}
                />
              </button>
            );
          }
          return (
            <pre
              key={j}
              className={`${common} m-0 overflow-auto p-4 font-mono text-[11px] leading-[1.75] text-tx2 rail:p-[18px] rail:text-[12.5px]`}
            >
              {pl.code}
            </pre>
          );
        })}
      </div>

      <div className="flex min-w-0 flex-col">
        {plates.map((pl, j) => (
          <button
            key={j}
            onClick={() => setI(j)}
            className={`border-b border-rule px-3 py-2.5 text-left font-mono text-[13.5px] transition-colors ${
              i === j ? "bg-pri-a08 text-sig" : "text-tx2 hover:text-sig"
            }`}
          >
            plate {plateNo(j)}: {pl.cap}
          </button>
        ))}
        <div className="mt-auto flex flex-col items-start gap-3.5 px-3 pt-4 pb-1">
          <CtaTerm href={`/record/${next.slug}`}>
            next study: <span className="uppercase">{next.title}</span>
          </CtaTerm>
          {cta ? (
            <CtaTerm href={cta.href} external>
              {cta.label}
            </CtaTerm>
          ) : null}
        </div>
      </div>

      {bigPlate ? (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`plate ${plateNo(big)}: ${bigPlate.cap}, enlarged`}
          tabIndex={-1}
          onClick={closeBig}
          className="fixed inset-0 z-1000 flex cursor-zoom-out flex-col items-center justify-center gap-4 outline-none"
          style={{
            background: "rgba(8,9,10,0.9)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            animation: `${fade} 0.22s ease forwards`,
          }}
        >
          <div
            className="relative"
            style={{
              width: "92vw",
              height: "82vh",
              animation: `${zoom} 0.28s cubic-bezier(0.22,1,0.36,1) forwards`,
            }}
          >
            <Image
              src={bigPlate.src}
              alt={bigPlate.cap}
              fill
              sizes="92vw"
              className="object-contain"
            />
          </div>
          <span
            className="font-mono text-[12.5px] text-tx2"
            style={{ animation: `${fade} 0.3s ease forwards` }}
          >
            plate {plateNo(big)}: {bigPlate.cap}
            <span className="text-tx3"> · esc or click to close</span>
          </span>
        </div>
      ) : null}
    </div>
  );
};
