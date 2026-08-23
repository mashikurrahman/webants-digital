import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowUpRight, ChevronDown, ChevronRight, Terminal } from 'lucide-react';
import { siteContent, EVIDENCE_META, type CaseStudy, type ProjectEvidence } from '../data/siteContent';
import {
  EVIDENCE_UI as TIER_UI,
  EVIDENCE_ORDER,
  BRAND_ACCENT as FALLBACK_ACCENT,
  hexA,
  softGlow,
  parseLayer,
  citationFor
} from '../lib/evidence';

/*
  Selected work, on the same light plate as the rest of the landing page.

  Two things drive the layout:

  1. Light, not dark. The only dark surface left is the media viewport itself — a screenshot or a
     blueprint is a *screen*, and keeping that one rectangle near-black reads as a device rather
     than as a dark band cut into a light page. Everything around it uses the light evidence
     tokens (`lightBg` / `lightBorder` / `onLight`) that WorkPage already ships, so the homepage
     panel and the portfolio page speak the same language.

  2. One screen, not two. The old arrangement stacked the stage on top of the dossier inside a
     9-column well, which ran to ~1550px — you could never see a project and its evidence at the
     same time. Now the index is a horizontal pager, and the stage and the dossier sit side by
     side (7/5), so the section resolves in ~865px: it fits a 1080p viewport under the sticky
     header, and nothing is squeezed to get there.
*/

interface WorkLedgerProps {
  onNavigate: (page: string, param?: string) => void;
}

const AUTOPLAY_MS = 5200;
const STEP_REVEAL_MS = 300;

export const WorkLedger: React.FC<WorkLedgerProps> = ({ onNavigate }) => {
  const reduced = useReducedMotion();
  const projects = siteContent.caseStudies;

  const [activeId, setActiveId] = useState<string>(projects[0]?.id ?? '');
  const [pinned, setPinned] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);
  const [hoverTier, setHoverTier] = useState<ProjectEvidence | null>(null);
  const [filterTier, setFilterTier] = useState<ProjectEvidence | null>(null);
  const [buildOpen, setBuildOpen] = useState<boolean>(false);
  const [revealed, setRevealed] = useState<number>(0);
  const [pointer, setPointer] = useState<{ x: number; y: number; w: number; h: number } | null>(null);

  const railRefs = useRef<(HTMLButtonElement | null)[]>([]);

  /*
    Cursor tracking on the media viewport, coalesced to one animation frame. `mousemove` fires
    several times between paints, and each event was doing a `getBoundingClientRect()` (forced
    synchronous layout) then a setState that re-rendered the whole ledger — including the
    screenshot parallax. Read-then-write interleaved across events also thrashes layout, and this
    fires during scrolling too, whenever the pointer rests on the panel.

    It measures the viewport rather than the whole card, so the parallax and the spotlight are
    both expressed as a fraction of the media box and stay correct at any column width.
  */
  const mediaRef = useRef<HTMLDivElement>(null);
  const pointerRaw = useRef({ x: 0, y: 0 });
  const frame = useRef(0);

  useEffect(() => () => {
    if (frame.current) cancelAnimationFrame(frame.current);
  }, []);

  const trackMedia = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    pointerRaw.current.x = e.clientX;
    pointerRaw.current.y = e.clientY;
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const node = mediaRef.current;
      if (!node) return;
      const r = node.getBoundingClientRect();
      setPointer({
        x: pointerRaw.current.x - r.left,
        y: pointerRaw.current.y - r.top,
        w: r.width || 1,
        h: r.height || 1
      });
    });
  }, []);

  const leaveMedia = useCallback(() => {
    if (frame.current) {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
    }
    setPointer(null);
  }, []);

  const tiers = useMemo(
    () =>
      EVIDENCE_ORDER.map((tier) => ({
        tier,
        count: projects.filter((p) => p.evidence === tier).length
      })).filter((t) => t.count > 0),
    [projects]
  );

  const visible = useMemo(
    () => (filterTier ? projects.filter((p) => p.evidence === filterTier) : projects),
    [projects, filterTier]
  );

  const active = useMemo(
    () => visible.find((p) => p.id === activeId) ?? projects.find((p) => p.id === activeId) ?? projects[0],
    [visible, projects, activeId]
  );

  const accent = active?.accent || FALLBACK_ACCENT;
  const tier: ProjectEvidence = active?.evidence ?? 'reconstructed';
  const tierUi = TIER_UI[tier];
  const TierIcon = tierUi.icon;
  const citation = active ? citationFor(active) : { href: undefined, label: '' };
  const steps = active?.buildSteps ?? [];

  const deployedCount = tiers.find((t) => t.tier === 'deployment-verified')?.count ?? 0;
  const sourceCount = tiers.find((t) => t.tier === 'source-verified')?.count ?? 0;

  const revealedStack = useMemo(() => {
    if (!buildOpen) return new Set<string>();
    return new Set(
      steps.slice(0, revealed).map((s) => s.stack).filter((s): s is string => Boolean(s))
    );
  }, [buildOpen, steps, revealed]);

  // Advance on its own until the visitor takes control, then never again.
  useEffect(() => {
    if (pinned || paused || reduced || hoverTier || buildOpen || visible.length < 2) return;
    const timer = setInterval(() => {
      setActiveId((current) => {
        const i = visible.findIndex((p) => p.id === current);
        return visible[(i + 1) % visible.length].id;
      });
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [pinned, paused, reduced, hoverTier, buildOpen, visible]);

  // The build sequence types itself out, one step at a time.
  useEffect(() => {
    if (!buildOpen) {
      setRevealed(0);
      return;
    }
    if (reduced) {
      setRevealed(steps.length);
      return;
    }
    setRevealed(0);
    let n = 0;
    const timer = setInterval(() => {
      n += 1;
      setRevealed(n);
      if (n >= steps.length) clearInterval(timer);
    }, STEP_REVEAL_MS);
    return () => clearInterval(timer);
  }, [buildOpen, active?.id, reduced, steps.length]);

  const select = useCallback((id: string) => {
    setPinned(true);
    setActiveId(id);
  }, []);

  const toggleFilter = useCallback(
    (t: ProjectEvidence) => {
      setPinned(true);
      setHoverTier(null);
      const next = filterTier === t ? null : t;
      setFilterTier(next);
      const list = next ? projects.filter((p) => p.evidence === next) : projects;
      if (!list.some((p) => p.id === activeId)) setActiveId(list[0].id);
    },
    [filterTier, projects, activeId]
  );

  const onRailKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const i = visible.findIndex((p) => p.id === active?.id);
    let next = -1;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % visible.length;
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i - 1 + visible.length) % visible.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = visible.length - 1;
    if (next < 0) return;
    e.preventDefault();
    select(visible[next].id);
    railRefs.current[next]?.focus();
  };

  if (!active) return null;

  const dimmedByLegend = (p: CaseStudy) => Boolean(hoverTier) && p.evidence !== hoverTier;

  return (
    <section
      id="work-ledger"
      className="relative isolate overflow-hidden border-y border-slate-200/70 bg-gradient-to-b from-[#F7F8FF] via-white to-[#F7F8FF] py-12 font-body text-slate-900 sm:py-14"
    >
      {/* Ambient brand wash, plus a cross-fading one in the active project's own accent. Both are
          gradients rather than blurred discs — see `softGlow` — and both are pitched low enough
          to read as a tint on white rather than a coloured cloud. */}
      <div
        className="pointer-events-none absolute left-[-500px] top-[-360px] h-[1200px] w-[1200px]"
        style={{ background: softGlow(FALLBACK_ACCENT, 0.07) }}
      />
      <AnimatePresence mode="sync">
        <motion.div
          key={accent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="pointer-events-none absolute right-[-520px] top-[-300px] h-[1240px] w-[1240px]"
          style={{ background: softGlow(accent, 0.08) }}
        />
      </AnimatePresence>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="flex items-center gap-3 font-mono text-[10.5px] font-bold uppercase tracking-[0.28em] text-[#5B61FE]">
              <span>Selected work</span>
              <span className="h-px w-8 bg-slate-300" />
              <span className="text-slate-400">{projects.length} projects</span>
            </p>
            {/*
              Same steps as the services section's h2 (`lg:text-[2.6rem] xl:text-[2.9rem]`), which
              is this heading's nearest neighbour in the page rhythm. It is smaller than the old
              56px, but matching an existing section beats inventing a size — the page already
              runs 46–60px for its display headings.
            */}
            <h2 className="mt-3 text-3xl font-black leading-[1.04] tracking-[-0.03em] text-slate-900 sm:text-4xl lg:text-[2.6rem] xl:text-[2.9rem]">
              The work, and the{' '}
              <span className="italic text-[#5B61FE]" style={{ fontFamily: 'var(--font-heading)' }}>
                evidence
              </span>{' '}
              for it.
            </h2>
            <p className="mt-3.5 text-sm leading-relaxed text-slate-600">
              {deployedCount} are running in production and open straight from this panel.{' '}
              {sourceCount} ship as readable source — every entry says what the build proves, and
              what it does not prove yet.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 lg:items-end">
            {/* The evidence legend is the filter. Hovering it dims everything on the other tier. */}
            <div className="flex flex-wrap items-center gap-2">
              {tiers.map(({ tier: t, count }) => {
                const ui = TIER_UI[t];
                const Icon = ui.icon;
                const isOn = filterTier === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onMouseEnter={() => setHoverTier(t)}
                    onMouseLeave={() => setHoverTier(null)}
                    onFocus={() => setHoverTier(t)}
                    onBlur={() => setHoverTier(null)}
                    onClick={() => toggleFilter(t)}
                    aria-pressed={isOn}
                    title={EVIDENCE_META[t].note}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B61FE]/50"
                    style={{
                      borderColor: isOn ? ui.lightBorder : '#E2E8F0',
                      backgroundColor: isOn ? ui.lightBg : '#FFFFFF',
                      color: isOn ? ui.onLight : '#64748B'
                    }}
                  >
                    <Icon className="h-3.5 w-3.5" style={{ color: isOn ? ui.onLight : '#94A3B8' }} />
                    <span>{EVIDENCE_META[t].label}</span>
                    <span className="tabular-nums opacity-60">{count}</span>
                  </button>
                );
              })}
              {filterTier && (
                <button
                  type="button"
                  onClick={() => toggleFilter(filterTier)}
                  className="cursor-pointer rounded-full px-2.5 py-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-slate-400 transition-colors hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B61FE]/50"
                >
                  Clear
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => onNavigate('work')}
              className="group inline-flex cursor-pointer items-center gap-1.5 text-xs font-bold text-[#5B61FE] transition-colors hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B61FE]/50"
            >
              <span>Open the full index</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* ── Index pager ────────────────────────────────────────────────────────
            A row of project numbers, not a list of names. Thirteen names either wrap into a
            block as tall as the stage or hide inside a scroller; thirteen numbers fit on one
            line, and the tick under each one is its evidence tier — so the pager doubles as a
            map of the mix, and the legend's hover-dim lands on it. The dossier is the readout. */}
        <div
          className="mt-7 flex items-center gap-3"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <span className="hidden shrink-0 font-mono text-[9.5px] font-bold uppercase tracking-[0.2em] text-slate-400 sm:block">
            Index
          </span>
          <div
            role="listbox"
            aria-label="Project index"
            tabIndex={-1}
            onKeyDown={onRailKeyDown}
            className="-mx-4 flex flex-1 gap-1.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
          >
            {visible.map((p, i) => {
              const isActive = p.id === active.id;
              const rowAccent = p.accent || FALLBACK_ACCENT;
              const rowTier = TIER_UI[p.evidence ?? 'reconstructed'];
              return (
                <button
                  key={p.id}
                  ref={(el) => {
                    railRefs.current[i] = el;
                  }}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  aria-label={`${p.client} — ${p.category}`}
                  title={`${p.client} · ${p.category}`}
                  onMouseEnter={() => setActiveId(p.id)}
                  onFocus={() => setActiveId(p.id)}
                  onClick={() => select(p.id)}
                  className="group flex shrink-0 cursor-pointer flex-col items-center gap-1.5 rounded-xl transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B61FE]/50"
                  style={{ opacity: dimmedByLegend(p) ? 0.28 : 1 }}
                >
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-xl border bg-white font-mono text-[11px] font-bold tabular-nums transition-[color,border-color,box-shadow] duration-200"
                    style={{
                      borderColor: isActive ? hexA(rowAccent, 0.5) : '#E2E8F0',
                      color: isActive ? rowAccent : '#94A3B8',
                      boxShadow: isActive
                        ? `0 10px 22px -12px ${hexA(rowAccent, 0.85)}`
                        : '0 1px 2px rgba(15,23,42,0.04)'
                    }}
                  >
                    {p.number ?? String(i + 1).padStart(2, '0')}
                  </span>
                  {/* Evidence tick — widens on the active project. */}
                  <span
                    className="h-[2px] rounded-full transition-all duration-300"
                    style={{
                      background: rowTier.onLight,
                      width: isActive ? '1.5rem' : '0.625rem',
                      opacity: isActive ? 1 : 0.4
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Body: the project on the left, the evidence for it on the right ─── */}
        <div
          className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* ── Stage ────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-7">
            <div
              className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-shadow duration-700"
              style={{ boxShadow: `0 28px 70px -30px ${hexA(accent, 0.35)}, 0 2px 6px rgba(15,23,42,0.05)` }}
            >
              {/* Chrome bar: the citation, live and clickable. */}
              <div className="flex items-center gap-3 border-b border-slate-200/80 bg-slate-50/70 px-4 py-2.5">
                <span className="flex shrink-0 gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-slate-300" />
                  <span className="h-2 w-2 rounded-full bg-slate-200" />
                  <span className="h-2 w-2 rounded-full bg-slate-100" />
                </span>

                {citation.href ? (
                  <a
                    href={citation.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    title={citation.href}
                    className="group flex min-w-0 items-center gap-2 rounded-md px-2 py-1 font-mono text-[11px] text-slate-500 transition-colors hover:bg-white hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B61FE]/50"
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: tierUi.onLight }}
                    />
                    <span className="truncate">{citation.label}</span>
                    <ArrowUpRight className="h-3 w-3 shrink-0 opacity-40 transition-opacity group-hover:opacity-100" />
                  </a>
                ) : (
                  <span className="flex min-w-0 items-center gap-2 px-2 py-1 font-mono text-[11px] text-slate-400">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
                    <span className="truncate">{citation.label}</span>
                  </span>
                )}

                <span
                  className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[9.5px] font-bold uppercase tracking-[0.14em]"
                  style={{
                    borderColor: tierUi.lightBorder,
                    backgroundColor: tierUi.lightBg,
                    color: tierUi.onLight
                  }}
                  title={EVIDENCE_META[tier].note}
                >
                  <TierIcon className="h-3 w-3" />
                  <span className="hidden sm:inline">{EVIDENCE_META[tier].label}</span>
                  <span className="sm:hidden">{EVIDENCE_META[tier].short}</span>
                </span>
              </div>

              {/* Viewport. The one dark surface in the section: a screenshot where one exists,
                  the architecture where there is no interface to photograph. */}
              <div
                ref={mediaRef}
                className="relative aspect-[16/10] w-full overflow-hidden bg-[#070A18]"
                onMouseMove={trackMedia}
                onMouseLeave={leaveMedia}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.35 }}
                    className="absolute inset-0"
                  >
                    {active.image ? (
                      <>
                        <img
                          src={active.image}
                          alt={`${active.client} - ${active.title}, captured from the live deployment`}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover object-top"
                          style={{
                            transform: pointer
                              ? `scale(1.045) translate3d(${((pointer.x / pointer.w) - 0.5) * -14}px, ${
                                  ((pointer.y / pointer.h) - 0.5) * -10
                                }px, 0)`
                              : 'scale(1.02)',
                            transition: 'transform 400ms cubic-bezier(0.22,1,0.36,1)'
                          }}
                        />
                        {!reduced && (
                          <motion.div
                            className="pointer-events-none absolute inset-0"
                            style={{
                              background:
                                'linear-gradient(105deg, transparent 36%, rgba(255,255,255,0.10) 48%, transparent 60%)'
                            }}
                            animate={{ x: ['-130%', '130%'] }}
                            transition={{
                              duration: 2.6,
                              repeat: Infinity,
                              repeatDelay: 4.4,
                              ease: 'easeInOut'
                            }}
                          />
                        )}
                      </>
                    ) : (
                      <ArchitectureView
                        layers={active.architecture ?? []}
                        accent={accent}
                        reduced={Boolean(reduced)}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Cursor spotlight in the active accent — inside the screen, where a warm glow
                    over near-black reads as light rather than as a smudge on white. */}
                <div
                  className="pointer-events-none absolute z-20 h-[360px] w-[360px] rounded-full transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle, ${hexA(accent, 0.16)} 0%, transparent 70%)`,
                    left: `${(pointer?.x ?? 0) - 180}px`,
                    top: `${(pointer?.y ?? 0) - 180}px`,
                    opacity: pointer ? 1 : 0
                  }}
                />
              </div>
            </div>
          </div>

          {/* ── Dossier ──────────────────────────────────────────────────────── */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: reduced ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -6 }}
                transition={{ duration: reduced ? 0 : 0.3 }}
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-mono text-[11px] font-bold tabular-nums" style={{ color: accent }}>
                    {active.number ?? '--'}
                    <span className="text-slate-400"> / {String(projects.length).padStart(2, '0')}</span>
                  </span>
                  <h3 className="text-2xl font-black tracking-[-0.02em] text-slate-900">
                    {active.client}
                  </h3>
                </div>
                <p className="mt-1 text-[15px] font-medium text-slate-500">{active.title}</p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                  {active.industry}
                </p>

                <p className="mt-4 text-[13.5px] leading-relaxed text-slate-600">{active.summary}</p>

                <ul className="mt-4 space-y-2">
                  {active.results.map((r) => (
                    <li key={r} className="flex gap-3">
                      <span
                        className="mt-[9px] h-[2px] w-3.5 shrink-0 rounded-full"
                        style={{ background: accent }}
                      />
                      <span className="text-[13px] leading-relaxed text-slate-500">{r}</span>
                    </li>
                  ))}
                </ul>

                {active.maturity && (
                  <div className="mt-4 rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-[0_2px_6px_rgba(15,23,42,0.04)]">
                    <p className="mb-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
                      Scope
                    </p>
                    <p className="text-[12px] leading-relaxed text-slate-500">{active.maturity}</p>
                  </div>
                )}

                {active.stack && active.stack.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {active.stack.map((s) => {
                      const lit = revealedStack.has(s.name);
                      return (
                        <span
                          key={s.name}
                          title={`${s.name} - ${s.layer}`}
                          className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] transition-[color,background-color,border-color,box-shadow] duration-300"
                          style={{
                            borderColor: lit ? hexA(accent, 0.45) : '#E2E8F0',
                            backgroundColor: lit ? hexA(accent, 0.08) : '#FFFFFF',
                            color: lit ? accent : '#64748B',
                            boxShadow: lit ? `0 6px 16px -8px ${hexA(accent, 0.6)}` : 'none'
                          }}
                        >
                          <span className="font-bold">{s.name}</span>
                          <span className="text-[8.5px] uppercase tracking-[0.1em] opacity-55">
                            {s.layer}
                          </span>
                        </span>
                      );
                    })}
                  </div>
                )}

                {/* Actions */}
                <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-200/80 pt-4">
                  <button
                    type="button"
                    onClick={() => onNavigate('project-detail', active.id)}
                    className="group inline-flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-bold text-white transition-transform duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#5B61FE]/60"
                    style={{ backgroundColor: accent, boxShadow: `0 12px 28px -12px ${hexA(accent, 0.75)}` }}
                  >
                    <span>Read the case study</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </button>

                  {steps.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setPinned(true);
                        setBuildOpen((v) => !v);
                      }}
                      aria-expanded={buildOpen}
                      aria-controls="build-sequence-panel"
                      className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B61FE]/60"
                    >
                      <Terminal className="h-3.5 w-3.5" style={{ color: accent }} />
                      <span>Build</span>
                      <span className="tabular-nums text-slate-400">{steps.length}</span>
                      <ChevronDown
                        className="h-3.5 w-3.5 transition-transform duration-300"
                        style={{ transform: buildOpen ? 'rotate(180deg)' : 'none' }}
                      />
                    </button>
                  )}

                  {citation.href && (
                    <a
                      href={citation.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 rounded-xl px-2 py-2.5 text-[12.5px] font-bold text-slate-400 transition-colors hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B61FE]/60"
                    >
                      <span>{active.liveUrl ? 'Live build' : 'Source'}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Build sequence: opt-in, so it costs the section no resting height ── */}
        <AnimatePresence initial={false}>
          {buildOpen && steps.length > 0 && (
            <motion.div
              id="build-sequence-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-6 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_18px_44px_-24px_rgba(15,23,42,0.14)] sm:p-6">
                <div className="mb-5 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                  <Terminal className="h-3.5 w-3.5" style={{ color: accent }} />
                  <span>build sequence</span>
                  <span className="h-px flex-1 bg-slate-200" />
                  <span className="tabular-nums" style={{ color: accent }}>
                    {String(Math.min(revealed, steps.length)).padStart(2, '0')}
                  </span>
                  <span className="tabular-nums text-slate-300">
                    / {String(steps.length).padStart(2, '0')}
                  </span>
                </div>

                {/* Single column on purpose: the spine is only honest if the steps run in one
                    order, and this panel is opt-in, so its height costs the section nothing. */}
                <div className="relative pl-8">
                  {/* Spine, and the segment already walked. */}
                  <span className="absolute bottom-1 left-[7px] top-1 w-px bg-slate-200" />
                  <motion.span
                    className="absolute left-[7px] top-1 w-px"
                    style={{ background: accent }}
                    animate={{ height: `${(Math.min(revealed, steps.length) / steps.length) * 100}%` }}
                    transition={{ duration: reduced ? 0 : 0.3 }}
                  />

                  <ol className="space-y-4">
                    {steps.map((step, i) => {
                      const shown = i < revealed;
                      return (
                        <motion.li
                          key={`${active.id}-${step.title}`}
                          className="relative"
                          animate={{ opacity: shown ? 1 : 0.25, x: shown ? 0 : -4 }}
                          transition={{ duration: reduced ? 0 : 0.3 }}
                        >
                          <span
                            className="absolute -left-8 top-[6px] h-[15px] w-[15px] rounded-full border-2 transition-[background-color,border-color,box-shadow] duration-300"
                            style={{
                              borderColor: shown ? accent : '#E2E8F0',
                              backgroundColor: shown ? accent : '#FFFFFF',
                              boxShadow: shown ? `0 0 0 4px ${hexA(accent, 0.12)}` : 'none'
                            }}
                          />
                          <div className="flex flex-wrap items-baseline gap-x-2.5">
                            <span className="font-mono text-[10px] font-bold tabular-nums text-slate-300">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <h4 className="text-[13.5px] font-bold text-slate-900">{step.title}</h4>
                            {step.stack && (
                              <span
                                className="rounded-full border px-2 py-[1px] font-mono text-[9px] uppercase tracking-[0.1em] transition-colors duration-300"
                                style={{
                                  borderColor: shown ? hexA(accent, 0.4) : '#E2E8F0',
                                  color: shown ? accent : '#94A3B8'
                                }}
                              >
                                {step.stack}
                              </span>
                            )}
                          </div>
                          <p className="mt-1 max-w-3xl text-[12.5px] leading-relaxed text-slate-500">
                            {step.detail}
                          </p>
                        </motion.li>
                      );
                    })}
                  </ol>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

/**
 * Source-verified projects have no interface to photograph, so the stage renders
 * their architecture instead: one row per layer, with a pulse walking down the spine.
 */
const ArchitectureView: React.FC<{ layers: string[]; accent: string; reduced: boolean }> = ({
  layers,
  accent,
  reduced
}) => {
  const cycle = Math.max(3.6, layers.length * 0.85);

  if (layers.length === 0) {
    return (
      <div className="flex h-full items-center justify-center px-8 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-slate-600">
        Architecture not published
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Blueprint grid + a wash of the project's accent. */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
          backgroundSize: '38px 38px'
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-2/3"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${hexA(accent, 0.16)} 0%, transparent 70%)` }}
      />

      <div className="relative flex h-full flex-col justify-center gap-2 px-5 py-5 sm:gap-2.5 sm:px-8 lg:px-12">
        <p className="mb-1 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-slate-600">
          Data flow
        </p>

        {/* Spine with a travelling pulse — the same beam language as the CTA, no node graph. */}
        <div className="pointer-events-none absolute bottom-6 left-[26px] top-14 w-px bg-white/[0.1] sm:left-[42px] lg:left-[58px]">
          {!reduced && (
            /*
              The pulse travels on a full-height carrier so the motion is a transform, not `top`.
              Animating `top: 0% -> 100%` re-ran layout on every frame of a loop that never
              stops; translating the carrier by 100% of its own height lands the dot on exactly
              the same two points and stays on the compositor.
            */
            <motion.span
              className="absolute inset-0"
              animate={{ y: ['0%', '100%'] }}
              transition={{ duration: cycle, repeat: Infinity, ease: 'linear' }}
            >
              <span
                className="absolute -left-[3.5px] top-0 h-2 w-2 rounded-full"
                style={{ background: accent, boxShadow: `0 0 14px ${accent}` }}
              />
            </motion.span>
          )}
        </div>

        {layers.map((line, i) => {
          const steps = parseLayer(line);
          return (
            <motion.div
              key={`${i}-${line}`}
              className="relative ml-3 rounded-xl border bg-white/[0.035] px-3 py-2 backdrop-blur-sm sm:ml-5 sm:px-4 sm:py-2.5"
              style={{ borderColor: 'rgba(255,255,255,0.1)' }}
              animate={
                reduced
                  ? {}
                  : {
                      borderColor: [
                        'rgba(255,255,255,0.1)',
                        hexA(accent, 0.6),
                        'rgba(255,255,255,0.1)'
                      ],
                      backgroundColor: [
                        'rgba(255,255,255,0.035)',
                        hexA(accent, 0.1),
                        'rgba(255,255,255,0.035)'
                      ]
                    }
              }
              transition={{
                duration: cycle,
                repeat: Infinity,
                ease: 'easeInOut',
                times: [0, 0.08, 0.3],
                delay: (i / layers.length) * cycle
              }}
            >
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                {steps.map((step, j) => (
                  <React.Fragment key={j}>
                    {j > 0 && (
                      <ChevronRight
                        className="h-3 w-3 shrink-0"
                        style={{ color: hexA(accent, 0.7) }}
                      />
                    )}
                    <span className="flex items-center gap-2">
                      {step.map((sibling, k) => (
                        <React.Fragment key={k}>
                          {k > 0 && <span className="h-3 w-px bg-white/20" />}
                          <span className="font-mono text-[10px] text-slate-300 sm:text-[11.5px]">
                            {sibling}
                          </span>
                        </React.Fragment>
                      ))}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
