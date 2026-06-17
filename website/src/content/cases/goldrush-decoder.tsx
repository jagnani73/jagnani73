import type { CaseDetail } from "@/utils/types/case.types";
import { FigDecoder } from "@/components/canvas/figs/fig-decoder";

const DECODER_CODE = `GoldRushDecoder.on(
  "uniswap-v3:Swap",
  ["base-mainnet"],
  async (log, tx, chain, covalent) => {
    const { sender, amount0, amount1 } =
      decodeEventLog(log);

    return {
      name: "Swap",
      protocol: { name: "Uniswap V3" },
      ...await enrichWithPricing(
        amount0, amount1, covalent,
      ),
    };
  },
);`;

export const goldrushDecoderCase: CaseDetail = {
  seoDescription:
    "Raw EVM logs in, structured human-readable events out — one endpoint, 200+ chains, enriched with metadata and pricing. Open source.",
  badge: "OPEN SOURCE · 200+ CHAINS",
  deck: (
    <>
      raw EVM logs in, <span className="text-tx">structured human events</span>{" "}
      out — one endpoint, 200+ chains, enriched with metadata and pricing
    </>
  ),
  fig: FigDecoder,
  figAlt: "a raw event log decoding into a named, enriched event",
  sections: {
    split: {
      note: "logs are opaque by default",
      serif: (
        <>
          On-chain, everything is an event — but raw logs are{" "}
          <span className="text-tx">
            packed hex: topics and data, no names, no meaning
          </span>{" "}
          without the ABI and context to read them.
        </>
      ),
      body: "GoldRush Decoder solves this at the infrastructure level: a single REST endpoint takes a chain name and a transaction hash, and returns an array of fully structured, labelled event objects — enriched with token metadata and USD pricing — across 200+ EVM chains. I built it from the ground up at Covalent.",
    },
    arch: {
      note: "a decoder registry · protocol-name:EventName",
      body: (
        <>
          At startup, <strong className="font-semibold text-tx">initDecoder</strong>{" "}
          scans a protocol directory and builds a map of decoder keys — strings
          like <strong className="font-semibold text-tx">uniswap-v3:Swap</strong>{" "}
          — to handlers registered via{" "}
          <strong className="font-semibold text-tx">.on()</strong>. Each handler
          gets the raw log, the full transaction, and the Covalent client for live
          enrichment. A fallback decoder guarantees the API always returns
          something meaningful.
        </>
      ),
      flow: [
        { stage: "REGISTER", role: "scan protocols, build the key map", tech: ["initDecoder", ".on()"] },
        { stage: "MATCH", role: "log → the right decoder, or fallback", tech: ["decoder registry"] },
        { stage: "DECODE", role: "typed, named event object", tech: ["TypeScript"] },
        { stage: "ENRICH", role: "token metadata + USD pricing", tech: ["Covalent API"] },
      ],
      stack: "TypeScript · Node · Express · Covalent API · CLI scaffolding",
    },
    cards: {
      note: "batched-parallel log processing",
      intro: (
        <>
          A single transaction can emit dozens of logs from different protocols —
          awaiting each decoder serially was unacceptably slow. I redesigned the
          execution model to{" "}
          <span className="font-mono text-sig">fan out decoder calls in parallel batches</span>{" "}
          while preserving original log order in the response:
        </>
      ),
      cards: [
        { name: "parallel batches", desc: "decoder invocations fanned out, not serialized" },
        { name: "order preserved", desc: "responses re-sequenced to original log order" },
        { name: "fallback decoder", desc: "unknown events still return meaning" },
        { name: "contributor CLI", desc: "yarn add-config scaffolds a new protocol in one command" },
      ],
    },
    plates: {
      note: "code · the decoder API",
      plates: [
        { kind: "code", code: DECODER_CODE, cap: "registering a protocol decoder" },
        { kind: "img", src: "https://res.cloudinary.com/jagnani73/image/upload/v1766564974/jagnani73/projects/goldrush-decoder/8abf9959-854f-41f2-8b9d-55c48e00866c.png", cap: "the decoder, documented" },
      ],
      cta: { label: "view the source ↗", href: "https://github.com/covalenthq/goldrush-decoder" },
    },
  },
};
