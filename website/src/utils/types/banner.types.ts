// Profile-banner shapes. The banner is authored in design units (1584x396,
// LinkedIn's nominal layout size) and multiplied by a scale at render time.
import type { ThemeName } from "./theme.types";

export type BannerVariantKey =
  | "a-masthead"
  | "b-safe"
  | "c-dark"
  | "d-quiet"
  | "e-centred";

/** Vertical rhythm of the type stack, in design units. */
export interface BannerRhythm {
  eyebrow: number;
  name: number;
  tagline: number;
  footline: number;
}

export interface BannerVariant {
  key: BannerVariantKey;
  label: string;
  theme: ThemeName;
  /** Left edge of the type column; the avatar overlaps the lower-left. */
  textX: number;
  y: BannerRhythm;
  nameSize: number;
  taglineSize: number;
  /** Drop the eyebrow + footline for a quieter, type-only composition. */
  chrome: boolean;
  /** Six scrim alpha stops, left→right. Lower lets more contour through. */
  scrim: readonly [number, number, number, number, number, number];
  centred?: boolean;
}

export type XBannerVariantKey = "x-line" | "x-bare";

/**
 * X headers are 1500x500 and X already renders the display name, handle and bio
 * directly beneath, so these carry one line rather than an identity block.
 */
export interface XBannerVariant {
  key: XBannerVariantKey;
  label: string;
  /**
   * Prefix the line with the observer's latitude, derived from the sky actually
   * being drawn. Never write the coordinate by hand — the point of putting it
   * on the banner is that it is true.
   */
  coord: boolean;
  /** The rest of the line, set after the coordinate. */
  caption?: string;
  /** Render the @handle top-left. */
  handle: boolean;
}
