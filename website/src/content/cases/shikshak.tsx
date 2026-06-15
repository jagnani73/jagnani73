import type { CaseData } from "@/content/case-types";

export const shikshakCase: CaseData = {
  slug: "shikshak",
  title: "SHIKSHAK",
  docTitle: "Shikshak — Case Study",
  badge: "HACK THIS FALL 2020 · 1ST",
  ogImage:
    "https://res.cloudinary.com/jagnani73/image/upload/v1714473789/jagnani73/projects/shikshak/screenshot-calibrate_1_kaglgd.png",
  deck: (
    <>
      the online classroom, rebuilt without video — a blackboard streamed as
      pixels, <span className="text-tx">~85% less data</span>
    </>
  ),
  fig: "board",
  sections: [
    {
      type: "split",
      n: "01",
      title: "THE PROBLEM",
      note: "3GB/day put class out of reach",
      serif: (
        <>
          Remote learning meant video calls burning{" "}
          <span className="text-tx">upwards of 3GB of mobile data a day</span> —
          putting class out of reach for rural and low-income students.
        </>
      ),
      body: 'Shikshak ("teacher" in Hindi) rethinks the online classroom from scratch. Instead of streaming video, a teacher writes on a physical blackboard; a real-time ML pipeline detects the board, isolates its surface, and converts the content into a compact pixel array — about 85% less data than raw video. Won First Position at Hack This Fall 2020.',
    },
    {
      type: "arch",
      n: "02",
      title: "THE ARCHITECTURE",
      note: "OpenCV → pixel array → Socket.IO",
      body: (
        <>
          An ML pipeline (
          <strong className="font-semibold text-tx">OpenCV, Canny edge detection</strong>
          ) finds the board&apos;s corners and converts the surface to a
          pixel-mapped array —{" "}
          <strong className="font-semibold text-tx">~85% smaller</strong> than
          video. That array streams over Socket.IO, where the Canvas API rebuilds
          the board; WebRTC carries audio-only so teacher and students stay in
          voice contact.
        </>
      ),
      flow: [
        { stage: "DETECT", role: "find + isolate the blackboard", tech: ["OpenCV", "Canny"] },
        { stage: "COMPRESS", role: "surface → pixel array, ~85% smaller", tech: ["imutils"] },
        { stage: "STREAM", role: "push the array in real time", tech: ["Socket.IO"] },
        { stage: "REBUILD", role: "canvas redraw + audio-only voice", tech: ["Canvas API", "WebRTC"] },
      ],
      stack: "React · TypeScript · OpenCV · Socket.IO · WebRTC · Canvas API",
    },
    {
      type: "cards",
      n: "03",
      title: "THE HARD PART",
      note: "audio-only, in sync",
      intro: (
        <>
          I built the full frontend — the teacher calibration interface and the
          student canvas. The trickiest piece was{" "}
          <span className="font-mono text-sig">WebRTC audio</span>: constraining
          the peer connection to audio only while keeping it synced with the
          Socket.IO data channel:
        </>
      ),
      cards: [
        { name: "board calibration", desc: "teacher sets the boundary before a session" },
        { name: "pixel-stream canvas", desc: "student-side reconstruction of the board" },
        { name: "audio-only WebRTC", desc: "voice without the video overhead" },
        { name: "data-channel sync", desc: "keeping audio aligned with the pixel stream" },
      ],
    },
    {
      type: "plates",
      n: "04",
      title: "IN THE WILD",
      note: "plates 01–02 · the classroom",
      plates: [
        { kind: "img", src: "https://res.cloudinary.com/jagnani73/image/upload/v1714473789/jagnani73/projects/shikshak/screenshot-calibrate_1_kaglgd.png", cap: "board calibration" },
        { kind: "img", src: "https://res.cloudinary.com/jagnani73/image/upload/v1714473783/jagnani73/projects/shikshak/screenshot-preview_1_lsp63m.png", cap: "the reconstructed board" },
      ],
      cta: { label: "view the source ↗", href: "https://github.com/jagnani73/shikshak" },
    },
  ],
  next: "fren",
};
