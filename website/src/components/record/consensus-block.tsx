// F · CONSENSUS — validator dots orbit, then collapse inward and confirm once
// the year holds in the reading band.
export const ConsensusBlock = ({
  conf,
  mob,
}: {
  conf: boolean;
  mob?: boolean;
}) => {
  const sc = mob ? 0.7 : 1;
  return (
    <div
      style={{
        width: 34 * sc,
        height: 34 * sc,
        position: "relative",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 34,
          height: 34,
          transform: `scale(${sc})`,
          transformOrigin: "top left",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 7,
            top: 7,
            width: 20,
            height: 20,
            boxSizing: "border-box",
            border: `1.5px solid ${conf ? "var(--pri)" : "var(--rule-strong)"}`,
            background: conf ? "var(--pri-a18)" : "transparent",
            transition: "all 0.45s",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 13.5,
            top: 13.5,
            width: 7,
            height: 7,
            background: "var(--sig)",
            opacity: conf ? 1 : 0,
            transition: "opacity 0.35s 0.3s",
          }}
        />
        <div className={`absolute inset-0 ${conf ? "" : "animate-ba-spin"}`}>
          {[0, 1, 2, 3, 4].map((i) => {
            const a = (i / 5) * Math.PI * 2;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: "var(--sig)",
                  left: 17 + Math.cos(a) * (conf ? 0 : 15) - 2,
                  top: 17 + Math.sin(a) * (conf ? 0 : 15) - 2,
                  opacity: conf ? 0 : 0.9,
                  transition: "all 0.5s cubic-bezier(0.5,0,0.75,1)",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
