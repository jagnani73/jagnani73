import type { CaseDetail } from "@/utils/types/case.types";
import { FigLattice } from "@/components/canvas/figs/fig-lattice";

export const solanaMlDsa44Case: CaseDetail = {
  displayTitle: "ML-DSA-44",
  docName: "Post-Quantum Solana (ML-DSA-44)",
  seoDescription:
    "Making the Solana validator quantum-secure: payments and consensus votes signed with NIST's ML-DSA-44 post-quantum standard, proven live on-chain.",
  badge: "POST-QUANTUM · SOLANA FORK · 2026",
  deck: (
    <>
      making the Solana validator quantum-secure: payments and consensus votes
      signed with{" "}
      <span className="text-tx">NIST&apos;s post-quantum standard</span>, proven
      live on-chain
    </>
  ),
  fig: {
    component: FigLattice,
    alt: "a quantum attack on each scheme's foundation",
  },
  sections: {
    split: {
      title: "THE GOAL",
      note: "quantum-resistant by design",
      serif: (
        <>
          A large enough quantum computer forges Ed25519, and Solana signs
          everything with it.{" "}
          <span className="text-tx">
            This fork makes the validator quantum-secure, replacing its
            signatures with ML-DSA-44, the scheme NIST standardized as FIPS 204.
          </span>
        </>
      ),
      body: "And it isn't on paper. On a live validator, a SOL transfer signed with a post-quantum key confirms on-chain, and the validator's own consensus votes are signed with ML-DSA-44; the chain produces, confirms, and finalizes on them. Its payments, consensus votes, and on-chain verification are all quantum-secure. It runs on a self-hosted fork, not live-Solana-compatible by design, but the post-quantum signing it proves is real and end-to-end.",
    },
    arch: {
      title: "WHAT'S QUANTUM-SECURE",
      note: "verification, payments, and votes: all live",
      body: (
        <>
          The validator signs several things through one shared engine. This
          fork hardens the three that carry value and consensus (on-chain
          verification, user payments, and the validator&apos;s own votes),{" "}
          <strong className="font-semibold text-tx">all live</strong> on
          ML-DSA-44 and verified end to end.
        </>
      ),
      flow: [
        {
          stage: "PRECOMPILE",
          role: "apps verify a post-quantum signature on-chain",
          tech: ["fips204", "✓ live"],
        },
        {
          stage: "PAYMENTS",
          role: "the fee payer's key and address are post-quantum",
          tech: ["ML-DSA tx", "✓ live"],
        },
        {
          stage: "VOTES",
          role: "the validator's consensus votes are post-quantum; the chain finalizes",
          tech: ["consensus", "✓ live"],
        },
      ],
      stack:
        "Rust · forked solana-labs/solana v2.0.0 · fips204 0.4.6 (FIPS 204) · WSL2 · solana-test-validator",
    },
    stats: {
      title: "WHAT IT PROVES",
      note: "Ed25519 → ML-DSA-44",
      stats: [
        ["FIPS 204", "NIST post-quantum standard, implemented"],
        ["3", "signing surfaces quantum-secured"],
        ["LIVE", "payments + votes confirm and finalize"],
        ["~40×", "larger signatures, absorbed end-to-end"],
      ],
    },
    cards: {
      title: "WHAT IT TOOK",
      note: "a signature built for a system that assumed tiny ones",
      intro: (
        <>
          Putting a signature ~38× the size of Ed25519&apos;s through a
          validator built for tiny ones meant unwinding assumptions baked in
          deep, each solved so the post-quantum path runs beside the original:
        </>
      ),
      cards: [
        {
          name: "address from key",
          desc: "an account's address was literally its 32-byte key; ML-DSA's is 1312, so the address became sha256(pubkey), with the full key carried inside the tx",
        },
        {
          name: "room on the wire",
          desc: "a whole tx had to fit ~1232 bytes; the packet ceiling was raised to 8192 so a post-quantum signature fits, with every dependent assert moved in step",
        },
        {
          name: "drop-in, not a cutover",
          desc: "a 0x00 lead byte marks a post-quantum tx so it runs beside Ed25519; the chain gains quantum-secure signing with no risky hard switch, and never stops producing blocks",
        },
      ],
    },
    plates: {
      title: "VERIFIED LIVE",
      note: "real keys · real signatures · raw JSON-RPC",
      plates: [
        {
          kind: "code",
          cap: "every phase ships a live demo: proven on a throwaway validator, nothing staged",
          code: `# Payments — a SOL transfer signed post-quantum confirms on-chain
$ bash programs/ml-dsa-tests/demo-transfer.sh
  ML-DSA-44 transfer confirmed         forged transfer rejected

# Votes — the validator's own consensus votes are post-quantum
$ solana-test-validator --ml-dsa-vote /tmp/mldsa-vote.bin
  chain confirms + finalizes on ML-DSA-44 votes

# Precompile — apps verify a post-quantum signature on-chain
$ bash programs/ml-dsa-tests/demo.sh
  valid ML-DSA-44 signature accepted   tampered one rejected`,
        },
        {
          kind: "code",
          cap: "how a post-quantum transaction looks on the wire (legacy message, one signer)",
          code: `[ 0x00 ]                       marks a post-quantum tx
[ sig count ][ 2420-B ML-DSA-44 signatures ]
[ key count ][ 1312-B signer public keys   ]
[ bincode(Message) ]

address = sha256(public_key)             // 32 B — accounts-db unchanged
verify  = ML-DSA(sig) && sha256(key) == account_keys[i]`,
        },
      ],
    },
  },
};
