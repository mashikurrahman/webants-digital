import type Lenis from 'lenis';

/*
  One module-level handle on the single Lenis instance App creates.

  Two callers need it and neither can use React context cleanly: child effects run
  before the parent's, so the header subscribes before App has constructed Lenis, and
  the services walkthrough only needs it inside a click handler. A module singleton is
  read at call time, which is exactly when the instance is guaranteed to exist.

  Everything programmatic must route through here. A raw
  `window.scrollTo({ behavior: 'smooth' })` runs the browser's own scroll animation
  against Lenis's, and the two fight for the same scroll offset every frame.
*/

let instance: Lenis | null = null;
const listeners = new Set<(lenis: Lenis | null) => void>();

export const setLenis = (lenis: Lenis | null): void => {
  instance = lenis;
  listeners.forEach((fn) => fn(lenis));
};

export const getLenis = (): Lenis | null => instance;

/** Subscribe to instance creation/teardown. Fires immediately if one already exists. */
export const onLenis = (fn: (lenis: Lenis | null) => void): (() => void) => {
  listeners.add(fn);
  if (instance) fn(instance);
  return () => {
    listeners.delete(fn);
  };
};

/**
 * Animate to an absolute Y offset. Falls back to a native jump when Lenis is absent
 * or the visitor asked for reduced motion — never to native `smooth`, which would
 * double-animate.
 */
export const scrollToY = (y: number, opts?: { immediate?: boolean }): void => {
  if (instance) {
    instance.scrollTo(y, {
      // Programmatic moves want a bounded, predictable trip rather than the wheel's
      // open-ended damping, so these two are passed per call instead of globally.
      duration: opts?.immediate ? 0 : 0.9,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      immediate: opts?.immediate,
      force: true,
    });
    return;
  }
  window.scrollTo({ top: y, behavior: 'instant' });
};
