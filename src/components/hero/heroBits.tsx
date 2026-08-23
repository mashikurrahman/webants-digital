import React from 'react';
import { motion, type Transition } from 'motion/react';

/*
  Shared primitives for the two new hero compositions (HeroCentered, HeroSpotlight).

  Every decorative element here is drawn with SVG or a CSS gradient — never `filter: blur()`.
  The site-wide scroll pass removed every blur filter from the page because each one forces its
  own composited layer and re-runs while it is on screen; the hero is the worst possible place to
  put one back, since it is on screen for the very first flick of the scroll wheel.
*/

const EASE_OUT: Transition['ease'] = [0.22, 1, 0.36, 1];

/** A pattern of small dots. Corner ornament in the reference composition. */
export const DotGrid: React.FC<{
  id: string;
  className?: string;
  color?: string;
  gap?: number;
  dot?: number;
}> = ({ id, className, color = '#C7C9F5', gap = 16, dot = 2 }) => (
  <svg className={className} aria-hidden="true" focusable="false">
    <defs>
      <pattern id={id} width={gap} height={gap} patternUnits="userSpaceOnUse">
        <circle cx={dot} cy={dot} r={dot} fill={color} />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#${id})`} />
  </svg>
);

/**
 * The hand-drawn dashed arrow that points at the call to action. `dir` flips the curve so one
 * can sweep in from the upper right and its mirror can rise from the lower left.
 */
export const CurvedArrow: React.FC<{
  className?: string;
  color?: string;
  dir?: 'in-right' | 'in-left';
}> = ({ className, color = '#A5A8F0', dir = 'in-right' }) => (
  <svg
    className={className}
    viewBox="0 0 120 80"
    fill="none"
    aria-hidden="true"
    focusable="false"
    style={dir === 'in-left' ? { transform: 'scaleX(-1)' } : undefined}
  >
    <path
      d="M112 8C104 40 82 62 44 66"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="6 7"
    />
    <path
      d="M56 56L42 66.5L54 74"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

/**
 * Three-segment donut. Drawn with one `stroke-dasharray` per ring rather than arc paths, so the
 * gap between segments is a single `strokeDashoffset` and the whole thing is four DOM nodes.
 */
export const Donut: React.FC<{ segments: DonutSegment[]; size?: number }> = ({
  segments,
  size = 84
}) => {
  const r = 32;
  const circumference = 2 * Math.PI * r;
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
  let offset = 0;

  return (
    <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden="true" focusable="false">
      <circle cx="40" cy="40" r={r} fill="none" stroke="#F1F5F9" strokeWidth="11" />
      {segments.map((s) => {
        const len = (s.value / total) * circumference;
        const dash = `${Math.max(len - 3, 0)} ${circumference - Math.max(len - 3, 0)}`;
        const node = (
          <circle
            key={s.label}
            cx="40"
            cy="40"
            r={r}
            fill="none"
            stroke={s.color}
            strokeWidth="11"
            strokeLinecap="round"
            strokeDasharray={dash}
            strokeDashoffset={-offset}
            transform="rotate(-90 40 40)"
          />
        );
        offset += len;
        return node;
      })}
    </svg>
  );
};

/** Tiny upward trend line that sits beside a headline number. */
export const Sparkline: React.FC<{ color?: string; className?: string }> = ({
  color = '#7C3AED',
  className
}) => (
  <svg
    className={className}
    viewBox="0 0 64 24"
    fill="none"
    preserveAspectRatio="none"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M1 20L11 15L20 17.5L30 9.5L40 12L51 4.5L63 2"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Smooth filled area chart — the "Engagement" card in the reference. */
export const AreaSpark: React.FC<{ id: string; color?: string; className?: string }> = ({
  id,
  color = '#7C3AED',
  className
}) => (
  <svg
    className={className}
    viewBox="0 0 240 72"
    fill="none"
    preserveAspectRatio="none"
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity="0.22" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </linearGradient>
    </defs>
    <path
      d="M2 52C18 52 26 30 42 30C58 30 62 48 78 48C94 48 100 20 118 20C136 20 138 44 154 44C170 44 176 24 192 24C208 24 214 40 238 34V70H2V52Z"
      fill={`url(#${id})`}
    />
    <path
      d="M2 52C18 52 26 30 42 30C58 30 62 48 78 48C94 48 100 20 118 20C136 20 138 44 154 44C170 44 176 24 192 24C208 24 214 40 238 34"
      stroke={color}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** The green "+18%" chip. */
export const DeltaPill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center rounded-lg bg-emerald-50 px-1.5 py-0.5 text-[10px] font-extrabold text-emerald-700 ring-1 ring-emerald-100">
    {children}
  </span>
);

/** Horizontal progress track. */
export const Progress: React.FC<{ pct: number; color?: string }> = ({
  pct,
  color = '#7C3AED'
}) => (
  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
    <div
      className="h-full rounded-full"
      style={{ width: `${Math.min(Math.max(pct, 0), 100)}%`, backgroundColor: color }}
    />
  </div>
);

/** Small square icon plate used in card headers and the three-tile row. */
export const IconPlate: React.FC<{
  children: React.ReactNode;
  bg: string;
  color: string;
  size?: 'sm' | 'md';
}> = ({ children, bg, color, size = 'sm' }) => (
  <span
    className={`inline-flex shrink-0 items-center justify-center rounded-xl ${
      size === 'sm' ? 'h-7 w-7' : 'h-9 w-9'
    }`}
    style={{ backgroundColor: bg, color }}
  >
    {children}
  </span>
);

/**
 * The floating white card. One shared recipe — hairline ring, one soft shadow, one radius — so
 * the five cards read as a set instead of five separate decisions.
 *
 * `delay` staggers the entrance. The hero is above the fold on load, so these use `animate`
 * rather than `whileInView`; there is no scroll trigger to wait for and an IntersectionObserver
 * per card would just be overhead.
 */
export const FloatCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hoverLift?: boolean;
}> = ({ children, className = '', delay = 0, hoverLift = true }) => (
  <motion.div
    initial={{ opacity: 0, y: 14, scale: 0.97 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.55, delay, ease: EASE_OUT }}
    whileHover={hoverLift ? { y: -4 } : undefined}
    className={`rounded-2xl border border-slate-200/70 bg-white p-3.5 shadow-[0_18px_44px_-20px_rgba(17,24,39,0.18)] transition-shadow duration-300 hover:shadow-[0_26px_60px_-22px_rgba(17,24,39,0.24)] ${className}`}
  >
    {children}
  </motion.div>
);

/** Small caps label used above every headline number. */
export const CardLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
    {children}
  </span>
);

export { EASE_OUT };
