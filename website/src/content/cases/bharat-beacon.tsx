import type { CaseData } from "@/utils/types/case.types";

// "IN THE WILD" section omitted until screenshots are supplied.
export const bharatBeaconCase: CaseData = {
  slug: "bharat-beacon",
  title: "BHARAT BEACON",
  docTitle: "Bharat Beacon — Case Study",
  seoDescription:
    "Disaster response mapped live — IoT distress signals pinpointed for the authorities. Best first-year team, Code2Create 4.0.",
  badge: "CODE2CREATE 4.0 · BEST 1ST-YR TEAM",
  deck: (
    <>
      disaster response, mapped live — IoT distress signals{" "}
      <span className="text-tx">pinpointed for the authorities</span>
    </>
  ),
  fig: "beacon",
  sections: [
    {
      type: "split",
      n: "01",
      title: "THE PROBLEM",
      note: "crises move faster than dashboards",
      serif: (
        <>
          In a disaster, authorities need to see{" "}
          <span className="text-tx">where help is needed, right now</span> — not
          after the reports are collated.
        </>
      ),
      body: "Bharat Beacon tackles disaster management across three phases — preemptive risk mitigation, mid-crisis response, and post-crisis recovery. It's an IoT-driven system where physical devices transmit distress signals to a central platform. Built at Code2Create 4.0 by ACM VIT, where the team won Best First Year Team.",
    },
    {
      type: "arch",
      n: "02",
      title: "THE ARCHITECTURE",
      note: "IoT signals → a live map",
      body: (
        <>
          I built the{" "}
          <strong className="font-semibold text-tx">Government Portal</strong>: a
          real-time dashboard plotting incoming distress calls as pinpoints on an
          interactive <strong className="font-semibold text-tx">MapBox</strong>{" "}
          map. To stay current without a persistent connection, I used HTTP polling
          to continuously fetch the latest device signals and metadata.
        </>
      ),
      flow: [
        { stage: "SIGNAL", role: "IoT devices transmit distress", tech: ["IoT"] },
        { stage: "POLL", role: "fetch latest signals + metadata", tech: ["HTTP polling"] },
        { stage: "MAP", role: "plot pinpoints in real time", tech: ["MapBox API"] },
        { stage: "RESPOND", role: "authorities triage live emergencies", tech: ["dashboard"] },
      ],
      stack: "JavaScript · Node · MapBox API · HTTP polling",
    },
    {
      type: "cards",
      n: "03",
      title: "WHAT I BUILT",
      note: "the government portal",
      intro: (
        <>
          I owned the authorities&apos; view — a{" "}
          <span className="font-mono text-sig">live geographic overview</span> of
          every active emergency:
        </>
      ),
      cards: [
        { name: "live distress map", desc: "MapBox pinpoints for each incoming signal" },
        { name: "HTTP polling", desc: "fresh signals without a persistent socket" },
        { name: "device metadata", desc: "context attached to every distress call" },
        { name: "three-phase model", desc: "mitigation, response, and recovery" },
      ],
    },
  ],
  next: "claude-controller",
};
