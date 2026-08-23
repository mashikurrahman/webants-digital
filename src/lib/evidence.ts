import { Github, Globe, Layers, type LucideIcon } from 'lucide-react';
import { type CaseStudy, type ProjectEvidence } from '../data/siteContent';

/**
 * Shared presentation for the evidence tiers. The taxonomy itself lives in
 * siteContent (EVIDENCE_META); this file only decides how it looks and reads.
 * Green means "running in production", indigo means "readable source".
 */
export const EVIDENCE_UI: Record<
  ProjectEvidence,
  { icon: LucideIcon; color: string; onLight: string; lightBg: string; lightBorder: string; verb: string }
> = {
  'deployment-verified': {
    icon: Globe,
    color: '#4ADE80',
    onLight: '#15803D',
    lightBg: '#F0FDF4',
    lightBorder: '#BBF7D0',
    verb: 'Open the live build'
  },
  'source-verified': {
    icon: Github,
    color: '#A5B4FC',
    onLight: '#4338CA',
    lightBg: '#EEF2FF',
    lightBorder: '#C7D2FE',
    verb: 'Read the source'
  },
  reconstructed: {
    icon: Layers,
    color: '#FBBF24',
    onLight: '#B45309',
    lightBg: '#FFFBEB',
    lightBorder: '#FDE68A',
    verb: 'See the reconstruction'
  }
};

export const EVIDENCE_ORDER: ProjectEvidence[] = [
  'deployment-verified',
  'source-verified',
  'reconstructed'
];

export const BRAND_ACCENT = '#5B61FE';

/** Turn a hex into rgba() so one accent token can drive borders, glows and washes. */
export const hexA = (hex: string, alpha: number): string => {
  const raw = hex.replace('#', '');
  const full = raw.length === 3 ? raw.split('').map((c) => c + c).join('') : raw;
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return `rgba(91, 97, 254, ${alpha})`;
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
};

/**
 * A radial-gradient that reproduces what `filter: blur(σ)` does to a solid disc — without
 * the filter pass. Large ambient blobs were the most expensive paint on the dark sections:
 * a 140px gaussian forces its own composited layer, gets downsampled and re-blurred, and
 * re-runs whenever anything above it changes (the accent blob cross-fades, so that was every
 * frame of an 800ms transition). A gradient paints the same falloff once.
 *
 * CSS `blur(σ)` is a gaussian with standard deviation σ, so a disc of radius R fades from
 * ~0.86·alpha at the centre, through exactly 0.5·alpha at r = R, to ~0 by r = R + 3σ.
 * `edge` is where r = R lands inside the element, i.e. R / (R + 3σ) — which also makes one σ
 * come out as (1 - edge) / 3 of the box radius.
 *
 * The element must be sized to the full R + 3σ extent and re-centred, because a blur bleeds
 * outward past its box and a gradient is clipped to it. Worked example — a 520px disc with
 * `blur-[130px]`: R = 260, σ = 130, extent = 650, so the div becomes 1300px and `edge` = 0.4.
 */
export const softGlow = (hex: string, alpha: number, edge = 0.4): string => {
  const sigma = (1 - edge) / 3;
  // Centre value of a blurred disc: 1 - exp(-(R/σ)² / 2). Only ~0.865 at R/σ = 2, and it
  // droops further as the disc gets small relative to σ, so scale the inner stops to match.
  const ratio = (3 * edge) / (1 - edge);
  const droop = (1 - Math.exp(-(ratio * ratio) / 2)) / 0.865;
  const at = (k: number) => `${((edge + k * sigma) * 100).toFixed(1)}%`;
  return (
    `radial-gradient(circle, ` +
    `${hexA(hex, alpha * 0.865 * droop)} 0%, ` +
    `${hexA(hex, alpha * 0.84 * droop)} ${at(-1)}, ` +
    `${hexA(hex, alpha * 0.69 * droop)} ${at(-0.5)}, ` +
    `${hexA(hex, alpha * 0.5)} ${at(0)}, ` +
    `${hexA(hex, alpha * 0.31)} ${at(0.5)}, ` +
    `${hexA(hex, alpha * 0.16)} ${at(1)}, ` +
    `${hexA(hex, alpha * 0.02)} ${at(2)}, ` +
    `transparent 100%)`
  );
};

/** ' -> ' is a flow between steps; ' / ' separates siblings inside one step. */
export const parseLayer = (line: string): string[][] =>
  line.split(' -> ').map((step) => step.split(' / ').map((s) => s.trim()).filter(Boolean));

/**
 * How a project cites itself. A repository is named by its own repo name — the
 * owner handle stays in the href rather than being printed on the page.
 */
export const citationFor = (p: CaseStudy): { href?: string; label: string } => {
  const href = p.liveUrl || p.repoUrl || p.notebookUrl;
  if (!href) return { label: p.sourceLabel || 'source not published' };
  if (p.sourceLabel) return { href, label: p.sourceLabel };
  const stripped = href.replace(/^https?:\/\//, '').replace(/\/+$/, '');
  if (p.repoUrl) return { href, label: stripped.split('/').pop() || stripped };
  return { href, label: stripped };
};
