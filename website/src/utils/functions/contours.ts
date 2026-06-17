// Marching-squares iso-line generator shared by the live masthead band
// (band-canvas.tsx, redrawn each frame) and the static OG card
// (opengraph-image.tsx). Both must trace the SAME geometry so the social card
// matches the live header — keeping the algorithm here is the only way to
// guarantee that without the two copies silently drifting apart.

/** Grid spacing in px; smaller = smoother lines, more work. */
export const CONTOUR_CELL = 13;

/** Iso-values traced, low→high. Index 3 is the emphasized line in both consumers. */
export const CONTOUR_LEVELS = [-0.28, -0.08, 0.12, 0.32, 0.52] as const;

/** A line segment `[x1, y1, x2, y2]`. */
export type Segment = [number, number, number, number];

/**
 * Iso-line segments of scalar field `f` over a `W`×`H` area — one array per
 * level (same order as `levels`). Each consumer supplies its own field `f` (the
 * band adds a cursor bump; the OG card uses a fixed `t`) and styles the levels.
 */
export const contourSegments = (
  W: number,
  H: number,
  f: (x: number, y: number) => number,
  levels: readonly number[] = CONTOUR_LEVELS,
  cell: number = CONTOUR_CELL,
): Segment[][] => {
  const cols = Math.ceil(W / cell) + 1;
  const rows = Math.ceil(H / cell) + 1;
  const grid: number[][] = [];
  for (let j = 0; j <= rows; j++) {
    grid.push([]);
    for (let i = 0; i <= cols; i++) grid[j].push(f(i * cell, j * cell));
  }

  return levels.map((lvl) => {
    const segs: Segment[] = [];
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const a = grid[j][i];
        const b = grid[j][i + 1];
        const c = grid[j + 1][i + 1];
        const d = grid[j + 1][i];
        const x = i * cell;
        const y = j * cell;
        const pts: [number, number][] = [];
        const lerp = (p: number, q: number) => (lvl - p) / (q - p);
        if (a < lvl !== b < lvl) pts.push([x + cell * lerp(a, b), y]);
        if (b < lvl !== c < lvl) pts.push([x + cell, y + cell * lerp(b, c)]);
        if (d < lvl !== c < lvl) pts.push([x + cell * lerp(d, c), y + cell]);
        if (a < lvl !== d < lvl) pts.push([x, y + cell * lerp(a, d)]);
        if (pts.length === 2) {
          segs.push([pts[0][0], pts[0][1], pts[1][0], pts[1][1]]);
        }
      }
    }
    return segs;
  });
};
