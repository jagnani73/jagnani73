// The "YJ" mark — single inline SVG, theme-coloured via the --logo-ink token
// (gold on dark, ink on paper). Geometry is the current logo (logo.svg), grouped
// into the four pieces the splash assembles: two halves, each a chevron + a bar.
// `animate` plays the CSS assembly choreography (see globals.css → "Animated mark");
// without it the same paths render as the static, assembled mark.

type MarkMode = "splash" | "loop" | "hover";

interface MarkProps {
  size?: number;
  /** Play the assembly animation. Otherwise render the static assembled mark. */
  animate?: boolean;
  /** splash = assemble once + hold · loop = assemble↔disassemble · hover = one round-trip. */
  mode?: MarkMode;
  className?: string;
  label?: string;
}

export const Mark = ({
  size = 120,
  animate = false,
  mode = "splash",
  className,
  label = "YJ",
}: MarkProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 1080 1080"
    role="img"
    aria-label={label}
    fill="currentColor"
    style={{ color: "var(--logo-ink)" }}
    className={[
      animate ? "mark-animate" : "",
      animate && mode !== "splash" ? `mark-${mode}` : "",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
  >
    {/* Left half — opens the sequence (bar rises + blinks, chevron swings in) */}
    <g className="mark-half-b">
      <g className="mark-chev-b">
        <path d="M536.538 323.411L491.979 278.429C489.621 276.049 485.78 276.031 483.4 278.389L300.188 459.882C297.808 462.24 297.789 466.081 300.147 468.461L344.707 513.442C347.065 515.823 350.906 515.841 353.286 513.483L536.498 331.989C538.878 329.632 538.896 325.791 536.538 323.411Z" />
        <path d="M352.341 513.66L397.323 469.1C399.703 466.743 399.721 462.902 397.363 460.522L215.87 277.31C213.512 274.929 209.671 274.911 207.291 277.269L162.31 321.829C159.929 324.186 159.911 328.027 162.269 330.407L343.763 513.62C346.12 516 349.961 516.018 352.341 513.66Z" />
      </g>
      <path
        className="mark-bar-b"
        d="M383.515 518.827H315.24C311.89 518.827 309.174 521.542 309.174 524.893V800.525C309.174 803.875 311.89 806.591 315.24 806.591H383.515C386.865 806.591 389.581 803.875 389.581 800.525V524.893C389.581 521.542 386.865 518.827 383.515 518.827Z"
      />
    </g>

    {/* Right half — fades + slides in, then its bar rises and chevron drops */}
    <g className="mark-half-a">
      <path
        className="mark-bar-a"
        d="M765.685 273H697.41C694.06 273 691.344 275.716 691.344 279.066V554.698C691.344 558.049 694.06 560.765 697.41 560.765H765.685C769.036 560.765 771.751 558.049 771.751 554.698V279.066C771.751 275.716 769.036 273 765.685 273Z"
      />
      <g className="mark-chev-a">
        <path d="M918.73 611.534L874.171 566.552C871.813 564.172 867.972 564.154 865.592 566.512L682.38 748.005C679.999 750.363 679.981 754.204 682.339 756.584L726.899 801.566C729.257 803.946 733.097 803.964 735.477 801.606L918.69 620.113C921.07 617.755 921.088 613.914 918.73 611.534Z" />
        <path d="M734.511 801.804L779.492 757.244C781.872 754.887 781.89 751.046 779.533 748.666L598.039 565.453C595.681 563.073 591.84 563.055 589.46 565.413L544.479 609.973C542.099 612.33 542.081 616.171 544.438 618.551L725.932 801.763C728.29 804.144 732.131 804.162 734.511 801.804Z" />
      </g>
    </g>
  </svg>
);
