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
  const [stageMouse, setStageMouse] = useState<{ x: number; y: number } | null>(null);

  const railRefs = useRef<(HTMLButtonElement | null)[]>([]);

  /*
    Stage cursor tracking, coalesced to one animation frame. `mousemove` fires several times
    between paints, and each event was doing a `getBoundingClientRect()` (forced synchronous
    layout) then a setState that re-rendered the whole ledger — including the screenshot
    parallax. Read-then-write interleaved across events also thrashes layout. This fires during
    scrolling too, whenever the pointer rests on the stage.
  */
  const stageRef = useRef<HTMLDivElement>(null);
  const stagePointer = useRef({ x: 0, y: 0 });
  const stageFrame = useRef(0);

  useEffect(() => () => {
    if (stageFrame.current) cancelAnimationFrame(stageFrame.current);
  }, []);

  const trackStage = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    stagePointer.current.x = e.clientX;
    stagePointer.current.y = e.clientY;
    if (stageFrame.current) return;
    stageFrame.current = requestAnimationFrame(() => {
      stageFrame.current = 0;
      const node = stageRef.current;
      if (!node) return;
      const r = node.getBoundingClientRect();
      setStageMouse({ x: stagePointer.current.x - r.left, y: stagePointer.current.y - r.top });
    });
  }, []);

  const leaveStage = useCallback(() => {
    if (stageFrame.current) {
      cancelAnimationFrame(stageFrame.current);
      stageFrame.current = 0;
    }
    setStageMouse(null);
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
      className="relative isolate overflow-hidden bg-[#070A18] py-20 sm:py-24 font-body text-slate-200"
    >
      {/* Plate edges: a hairline and a short lift at the top so the dark band has a lid. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/[0.14]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#101736] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/[0.08]" />

      {/* Ambient brand aurora, plus a cross-fading blob in the active project's own accent.
          Both are gradients, not blurred discs — see `softGlow`. The boxes are 2.5x the old
          520/560px and pulled back by R + 3σ so the glow sits in exactly the same place. */}
      <div
        className="pointer-events-none absolute left-[-550px] top-1/3 -mt-[390px] h-[1300px] w-[1300px]"
        style={{ background: softGlow(FALLBACK_ACCENT, 0.13) }}
      />
      <AnimatePresence mode="sync">
        <motion.div
          key={accent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="pointer-events-none absolute right-[-548px] top-1/4 -mt-[420px] h-[1400px] w-[1400px]"
          style={{ background: softGlow(accent, 0.17) }}
        />
      </AnimatePresence>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 font-mono text-[10.5px] font-bold uppercase tracking-[0.28em] text-[#8B93FF]">
              <span>Selected work</span>
              <span className="h-px w-8 bg-white/20" />
              <span className="text-slate-500">{projects.length} projects</span>
            </p>
            <h2 className="mt-4 text-4xl font-black leading-[1.02] tracking-[-0.03em] text-white sm:text-5xl lg:text-[3.5rem]">
              The work, and the{' '}
              <span className="italic text-[#A5B4FC]" style={{ fontFamily: 'var(--font-heading)' }}>
                evidence
              </span>{' '}
              for it.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-[15px]">
              {deployedCount} of these are running in production and open from this panel.{' '}
              {sourceCount} ship as readable source. Every entry states what the build proves, and
              what it does not prove yet.
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 lg:items-end">
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
                    className="inline-flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                    style={{
                      borderColor: isOn ? hexA(ui.color, 0.6) : 'rgba(255,255,255,0.12)',
                      backgroundColor: isOn ? hexA(ui.color, 0.12) : 'rgba(255,255,255,0.03)',
                      color: isOn ? ui.color : '#94A3B8'
                    }}
                  >
                    <Icon className="h-3.5 w-3.5" style={{ color: ui.color }} />
                    <span>{EVIDENCE_META[t].label}</span>
                    <span className="tabular-nums" style={{ color: hexA(ui.color, 0.75) }}>
                      {count}
                    </span>
                  </button>
                );
              })}
              {filterTier && (
                <button
                  type="button"
                  onClick={() => toggleFilter(filterTier)}
                  className="cursor-pointer rounded-full px-2.5 py-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-slate-500 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  Clear
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => onNavigate('work')}
              className="group inline-flex cursor-pointer items-center gap-1.5 text-xs font-bold text-[#A5B4FC] transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <span>Open the full index</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* ── Body ───────────────────────────────────────────────────────────── */}
        <div
          className="mt-12 grid grid-cols-1 gap-6 lg:mt-14 lg:grid-cols-12 lg:gap-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Index rail — vertical on desktop, a scrolling strip on mobile. */}
          <div className="lg:col-span-3">
            <p className="mb-3 hidden font-mono text-[9.5px] font-bold uppercase tracking-[0.22em] text-slate-500 lg:block">
              Index
            </p>
            <div
              role="listbox"
              aria-label="Project index"
              tabIndex={-1}
              onKeyDown={onRailKeyDown}
              className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:px-0 lg:pb-0"
            >
              {visible.map((p, i) => {
                const isActive = p.id === active.id;
                const rowAccent = p.accent || FALLBACK_ACCENT;
                return (
                  <button
                    key={p.id}
                    ref={(el) => {
                      railRefs.current[i] = el;
                    }}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onMouseEnter={() => setActiveId(p.id)}
                    onFocus={() => setActiveId(p.id)}
                    onClick={() => select(p.id)}
                    className="group relative shrink-0 cursor-pointer overflow-hidden rounded-lg px-3 py-2 text-left transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 lg:w-full lg:px-3"
                    style={{
                      backgroundColor: isActive ? 'rgba(255,255,255,0.055)' : 'transparent',
                      opacity: dimmedByLegend(p) ? 0.22 : 1
                    }}
                  >
                    {/* Active marker: a bar in the project's own accent. */}
                    <span
                      className="absolute bottom-0 left-0 h-[2px] w-full origin-left transition-transform duration-300 lg:bottom-auto lg:left-0 lg:top-0 lg:h-full lg:w-[2px] lg:origin-top"
                      style={{
                        background: rowAccent,
                        transform: isActive ? 'scale(1)' : 'scaleX(0)'
                      }}
                    />
                    <span className="flex items-baseline gap-2.5">
                      <span
                        className="font-mono text-[10px] font-bold tabular-nums transition-colors"
                        style={{ color: isActive ? rowAccent : '#64748B' }}
                      >
                        {p.number ?? String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`whitespace-nowrap text-[13px] font-bold transition-colors lg:whitespace-normal ${
                          isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                        }`}
                      >
                        {p.client}
                      </span>
                    </span>
                    <span className="mt-0.5 hidden font-mono text-[9.5px] uppercase tracking-[0.14em] text-slate-600 lg:block">
                      {p.category}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stage + dossier */}
          <div className="lg:col-span-9">
            {/* ── Stage ──────────────────────────────────────────────────────── */}
            <div
              ref={stageRef}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-md transition-shadow duration-700"
              style={{ boxShadow: `0 40px 110px -45px ${hexA(accent, 0.45)}` }}
              onMouseMove={trackStage}
              onMouseLeave={leaveStage}
            >
              {/* Hairline highlight along the top edge of the glass. */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

              {/* Cursor spotlight in the active accent. */}
              <div
                className="pointer-events-none absolute z-20 h-[420px] w-[420px] rounded-full transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle, ${hexA(accent, 0.13)} 0%, transparent 70%)`,
                  left: `${(stageMouse?.x ?? 0) - 210}px`,
                  top: `${(stageMouse?.y ?? 0) - 210}px`,
                  opacity: stageMouse ? 1 : 0
                }}
              />

              {/* Chrome bar: the citation, live and clickable. */}
              <div className="relative z-10 flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
                <span className="flex shrink-0 gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-white/20" />
                  <span className="h-2 w-2 rounded-full bg-white/15" />
                  <span className="h-2 w-2 rounded-full bg-white/10" />
                </span>

                {citation.href ? (
                  <a
                    href={citation.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    title={citation.href}
                    className="group flex min-w-0 items-center gap-2 rounded-md px-2 py-1 font-mono text-[11px] text-slate-300 transition-colors hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: tierUi.color, boxShadow: `0 0 8px ${tierUi.color}` }}
                    />
                    <span className="truncate">{citation.label}</span>
                    <ArrowUpRight className="h-3 w-3 shrink-0 opacity-40 transition-opacity group-hover:opacity-100" />
                  </a>
                ) : (
                  <span className="flex min-w-0 items-center gap-2 px-2 py-1 font-mono text-[11px] text-slate-500">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-600" />
                    <span className="truncate">{citation.label}</span>
                  </span>
                )}

                <span
                  className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[9.5px] font-bold uppercase tracking-[0.14em]"
                  style={{
                    borderColor: hexA(tierUi.color, 0.35),
                    backgroundColor: hexA(tierUi.color, 0.1),
                    color: tierUi.color
                  }}
                  title={EVIDENCE_META[tier].note}
                >
                  <TierIcon className="h-3 w-3" />
                  <span className="hidden sm:inline">{EVIDENCE_META[tier].label}</span>
                  <span className="sm:hidden">{EVIDENCE_META[tier].short}</span>
                </span>
              </div>

              {/* Viewport: a real screenshot where one exists, the architecture where it doesn't. */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#05070F]">
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
                            transform: stageMouse
                              ? `scale(1.045) translate3d(${((stageMouse.x / 900) - 0.5) * -14}px, ${
                                  ((stageMouse.y / 560) - 0.5) * -10
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
              </div>
            </div>

            {/* ── Dossier ────────────────────────────────────────────────────── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: reduced ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -6 }}
                transition={{ duration: reduced ? 0 : 0.3 }}
                className="mt-7"
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-mono text-[11px] font-bold tabular-nums" style={{ color: accent }}>
                    {active.number ?? '--'}
                    <span className="text-slate-600"> / {String(projects.length).padStart(2, '0')}</span>
                  </span>
                  <h3 className="text-2xl font-black tracking-[-0.02em] text-white sm:text-[1.75rem]">
                    {active.client}
                  </h3>
                  <span className="text-lg font-medium text-slate-400 sm:text-xl">{active.title}</span>
                </div>
                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                  {active.industry}
                </p>

                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-5 sm:gap-8">
                  <div className="sm:col-span-3">
                    <p className="text-[14px] leading-relaxed text-slate-300">{active.summary}</p>
                    <ul className="mt-5 space-y-2.5">
                      {active.results.map((r) => (
                        <li key={r} className="flex gap-3">
                          <span
                            className="mt-[9px] h-[2px] w-3.5 shrink-0 rounded-full"
                            style={{ background: accent }}
                          />
                          <span className="text-[13px] leading-relaxed text-slate-400">{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="sm:col-span-2 space-y-4">
                    {active.maturity && (
                      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
                        <p className="mb-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
                          Scope
                        </p>
                        <p className="text-[12px] leading-relaxed text-slate-400">{active.maturity}</p>
                      </div>
                    )}

                    {active.stack && active.stack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {active.stack.map((s) => {
                          const lit = revealedStack.has(s.name);
                          return (
                            <span
                              key={s.name}
                              title={`${s.name} - ${s.layer}`}
                              className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] transition-[color,background-color,border-color,box-shadow] duration-300"
                              style={{
                                borderColor: lit ? hexA(accent, 0.55) : 'rgba(255,255,255,0.1)',
                                backgroundColor: lit ? hexA(accent, 0.12) : 'rgba(255,255,255,0.025)',
                                color: lit ? '#FFFFFF' : '#94A3B8',
                                boxShadow: lit ? `0 0 14px -2px ${hexA(accent, 0.5)}` : 'none'
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
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-7 flex flex-wrap items-center gap-2.5 border-t border-white/[0.08] pt-6">
                  <button
                    type="button"
                    onClick={() => onNavigate('project-detail', active.id)}
                    className="group inline-flex cursor-pointer items-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-bold text-white transition-transform duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                    style={{ backgroundColor: accent, boxShadow: `0 10px 30px -12px ${hexA(accent, 0.9)}` }}
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
                      className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-4 py-2.5 font-mono text-[11.5px] font-bold uppercase tracking-[0.1em] text-slate-300 transition-colors hover:border-white/25 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                    >
                      <Terminal className="h-3.5 w-3.5" style={{ color: accent }} />
                      <span>Build sequence</span>
                      <span className="tabular-nums text-slate-500">{steps.length}</span>
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
                      className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-[12.5px] font-bold text-slate-400 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                    >
                      <span>{active.liveUrl ? 'Open the live build' : 'Read the source'}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* ── Build sequence: the payoff, one true step at a time ─────────── */}
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
                  <div className="mt-5 rounded-2xl border border-white/10 bg-[#04060E]/85 p-4 backdrop-blur-sm sm:p-6">
                    <div className="mb-5 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                      <Terminal className="h-3.5 w-3.5" style={{ color: accent }} />
                      <span>build sequence</span>
                      <span className="h-px flex-1 bg-white/[0.08]" />
                      <span className="tabular-nums" style={{ color: accent }}>
                        {String(Math.min(revealed, steps.length)).padStart(2, '0')}
                      </span>
                      <span className="tabular-nums text-slate-600">
                        / {String(steps.length).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="relative pl-8">
                      {/* Spine, and the segment already walked. */}
                      <span className="absolute bottom-1 left-[7px] top-1 w-px bg-white/[0.09]" />
                      <motion.span
                        className="absolute left-[7px] top-1 w-px"
                        style={{ background: accent }}
                        animate={{ height: `${(Math.min(revealed, steps.length) / steps.length) * 100}%` }}
                        transition={{ duration: reduced ? 0 : 0.3 }}
                      />

                      <ol className="space-y-5">
                        {steps.map((step, i) => {
                          const shown = i < revealed;
                          return (
                            <motion.li
                              key={`${active.id}-${step.title}`}
                              className="relative"
                              animate={{ opacity: shown ? 1 : 0.2, x: shown ? 0 : -4 }}
                              transition={{ duration: reduced ? 0 : 0.3 }}
                            >
                              <span
                                className="absolute -left-8 top-[6px] h-[15px] w-[15px] rounded-full border-2 transition-[background-color,border-color,box-shadow] duration-300"
                                style={{
                                  borderColor: shown ? accent : 'rgba(255,255,255,0.18)',
                                  backgroundColor: shown ? accent : '#04060E',
                                  boxShadow: shown ? `0 0 12px ${hexA(accent, 0.75)}` : 'none'
                                }}
                              />
                              <div className="flex flex-wrap items-baseline gap-x-2.5">
                                <span className="font-mono text-[10px] font-bold tabular-nums text-slate-600">
                                  {String(i + 1).padStart(2, '0')}
                                </span>
                                <h4 className="text-[13.5px] font-bold text-white">{step.title}</h4>
                                {step.stack && (
                                  <span
                                    className="rounded-full border px-2 py-[1px] font-mono text-[9px] uppercase tracking-[0.1em] transition-colors duration-300"
                                    style={{
                                      borderColor: shown ? hexA(accent, 0.5) : 'rgba(255,255,255,0.1)',
                                      color: shown ? accent : '#64748B'
                                    }}
                                  >
                                    {step.stack}
                                  </span>
                                )}
                              </div>
                              <p className="mt-1 max-w-3xl text-[12.5px] leading-relaxed text-slate-400">
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
        </div>
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
