// Module-scope RNG helpers. Keeping Math.random() out of component/hook bodies
// satisfies the React Compiler purity rule (react-hooks/purity) while still
// allowing per-interaction randomness in event handlers and effects.

/** Integer in [0, n). */
export const rnd = (n: number): number => Math.floor(Math.random() * n);

/** Raw float in [0, 1). */
export const rndf = (): number => Math.random();

/** Float in [min, min + span). */
export const rndBetween = (min: number, span: number): number =>
  min + Math.random() * span;
