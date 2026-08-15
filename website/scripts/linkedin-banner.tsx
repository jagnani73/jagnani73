// Writes every profile-banner variant to disk, for comparing them side by side
// or uploading one to LinkedIn.
//
//   pnpm tsx scripts/linkedin-banner.tsx [outDir] [scale]
//
// The variant table and the renderer live in src/utils/functions/banner.tsx,
// shared with the /linkedin-banner.png route so the two can't drift. Tune a
// variant there, not here.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  BANNER_H,
  BANNER_SAFE,
  BANNER_VARIANTS,
  BANNER_W,
  DEFAULT_SCALE,
  MAX_SCALE,
  X_BANNER_VARIANTS,
  X_H,
  X_W,
  renderBanner,
  renderXBanner,
} from "../src/utils/functions/banner";

const main = async () => {
  const outDir = process.argv[2] ?? "D:/Work/linkedin-banners";
  const scale = Number(process.argv[3] ?? DEFAULT_SCALE);
  if (!Number.isInteger(scale) || scale < 1 || scale > MAX_SCALE) {
    throw new Error(
      `scale must be a whole number from 1 to ${MAX_SCALE}, got ${process.argv[3]}`,
    );
  }

  mkdirSync(outDir, { recursive: true });

  for (const v of Object.values(BANNER_VARIANTS)) {
    const img = await renderBanner(v.key, scale);
    const path = join(outDir, `${v.key}@${scale}x.png`);
    const buf = Buffer.from(await img.arrayBuffer());
    writeFileSync(path, buf);
    console.log(
      `${v.key.padEnd(12)} ${BANNER_W * scale}x${BANNER_H * scale}  ${(buf.length / 1024).toFixed(0).padStart(5)} KB  -> ${path}`,
    );
  }

  for (const v of Object.values(X_BANNER_VARIANTS)) {
    const img = await renderXBanner(v.key, scale);
    const path = join(outDir, `${v.key}@${scale}x.png`);
    const buf = Buffer.from(await img.arrayBuffer());
    writeFileSync(path, buf);
    console.log(
      `${v.key.padEnd(12)} ${X_W * scale}x${X_H * scale}  ${(buf.length / 1024).toFixed(0).padStart(5)} KB  -> ${path}`,
    );
  }

  console.log(
    `\nsafe zone (design units): x ${BANNER_SAFE.x0}-${BANNER_SAFE.x1}, y ${BANNER_SAFE.y0}-${BANNER_SAFE.y1}`,
  );
};

main();
