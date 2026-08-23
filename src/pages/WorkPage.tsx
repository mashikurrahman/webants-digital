import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowUpRight, ChevronRight } from 'lucide-react';
import { siteContent, EVIDENCE_META, type CaseStudy, type ProjectEvidence } from '../data/siteContent';
import {
  EVIDENCE_UI,
  EVIDENCE_ORDER,
  BRAND_ACCENT,
  hexA,
  softGlow,
  parseLayer,
  citationFor
} from '../lib/evidence';

interface WorkPageProps {
  onNavigate?: (page: string, param?: string) => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({ onNavigate }) => {
  const projects = siteContent.caseStudies;

  const [tierFilter, setTierFilter] = useState<ProjectEvidence | 'all'>('all');
  const [disciplineFilter, setDisciplineFilter] = useState<string>('All');

  // Both filter sets are derived from the data, so a tab can never be empty.
  const tiers = useMemo(
    () =>
      EVIDENCE_ORDER.map((tier) => ({
        tier,
        count: projects.filter((p) => p.evidence === tier).length
      })).filter((t) => t.count > 0),
    [projects]
  );

  const disciplines = useMemo(() => {
    const seen: string[] = [];
    projects.forEach((p) => {
      if (p.category && !seen.includes(p.category)) seen.push(p.category);
    });
    return seen;
  }, [projects]);

  const filtered = useMemo(
    () =>
      projects.filter(
        (p) =>
          (tierFilter === 'all' || p.evidence === tierFilter) &&
          (disciplineFilter === 'All' || p.category === disciplineFilter)
      ),
    [projects, tierFilter, disciplineFilter]
  );

  const groups = useMemo(
    () =>
      EVIDENCE_ORDER.map((tier) => ({
        tier,
        items: filtered.filter((p) => p.evidence === tier)
      })).filter((g) => g.items.length > 0),
    [filtered]
  );

  const open = (id: string) => onNavigate?.('project-detail', id);

  return (
    <div className="bg-white pb-24 font-body text-slate-900">
      {/* ── Masthead ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-slate-200/70 bg-gradient-to-b from-[#F7F8FF] to-white pb-14 pt-10 sm:pb-16 sm:pt-16">
        {/* Gradient, not a 110px blurred disc — see `softGlow`. */}
        <div
          className="pointer-events-none absolute right-[-426px] top-[-426px] h-[1080px] w-[1080px]"
          style={{ background: softGlow(BRAND_ACCENT, 0.07, 210 / 540) }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p className="flex items-center gap-3 font-mono text-[10.5px] font-bold uppercase tracking-[0.28em] text-[#5B61FE]">
              <span>Portfolio</span>
              <span className="h-px w-8 bg-slate-300" />
              <span className="text-slate-400">{projects.length} projects</span>
            </p>
            <h1 className="mt-4 text-4xl font-black leading-[1.03] tracking-[-0.03em] text-slate-900 sm:text-5xl lg:text-[3.5rem]">
              Every project, filed by the{' '}
              <span className="italic text-[#5B61FE]" style={{ fontFamily: 'var(--font-heading)' }}>
                evidence
              </span>{' '}
              behind it.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-[15px]">
              We group the work by how you can check it, not by how we would like it framed. Some of
              these are running in production and open from this page. Some ship as readable source.
              Each entry states what the build proves — and what it does not prove yet.
            </p>
          </motion.div>

          {/* Tier control — the primary axis of the page. */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mt-9 flex flex-wrap items-center gap-2"
          >
            <button
              type="button"
              onClick={() => setTierFilter('all')}
              aria-pressed={tierFilter === 'all'}
              className={`cursor-pointer rounded-full border px-4 py-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B61FE]/50 ${
                tierFilter === 'all'
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              All evidence
              <span className="ml-2 tabular-nums opacity-60">{projects.length}</span>
            </button>

            {tiers.map(({ tier, count }) => {
              const ui = EVIDENCE_UI[tier];
              const Icon = ui.icon;
              const isOn = tierFilter === tier;
              return (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setTierFilter(tier)}
                  aria-pressed={isOn}
                  title={EVIDENCE_META[tier].note}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B61FE]/50"
                  style={{
                    borderColor: isOn ? ui.lightBorder : '#E2E8F0',
                    backgroundColor: isOn ? ui.lightBg : '#FFFFFF',
                    color: isOn ? ui.onLight : '#64748B'
                  }}
                >
                  <Icon className="h-3.5 w-3.5" style={{ color: isOn ? ui.onLight : '#94A3B8' }} />
                  <span>{EVIDENCE_META[tier].label}</span>
                  <span className="tabular-nums opacity-60">{count}</span>
                </button>
              );
            })}
          </motion.div>

          {/* Discipline is the secondary axis. */}
          <div className="mt-4 flex flex-wrap items-center gap-x-1 gap-y-2">
            <span className="mr-2 font-mono text-[9.5px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Discipline
            </span>
            {['All', ...disciplines].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDisciplineFilter(d)}
                aria-pressed={disciplineFilter === d}
                className={`cursor-pointer rounded-lg px-2.5 py-1.5 text-[12px] font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B61FE]/50 ${
                  disciplineFilter === d
                    ? 'bg-[#EEF2FF] text-[#5B61FE]'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Grouped grid ─────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {groups.length === 0 && (
          <p className="py-24 text-center font-mono text-[12px] uppercase tracking-[0.2em] text-slate-400">
            No projects in this combination
          </p>
        )}

        {groups.map(({ tier, items }) => {
          const ui = EVIDENCE_UI[tier];
          const Icon = ui.icon;
          return (
            <section key={tier} className="pt-14 sm:pt-16">
              <div className="flex flex-col gap-3 border-b border-slate-200/80 pb-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="flex items-center gap-2.5 text-lg font-black tracking-[-0.02em] text-slate-900 sm:text-xl">
                    <Icon className="h-4 w-4" style={{ color: ui.onLight }} />
                    {EVIDENCE_META[tier].label}
                    <span className="font-mono text-[11px] font-bold tabular-nums text-slate-400">
                      {String(items.length).padStart(2, '0')}
                    </span>
                  </h2>
                  <p className="mt-1.5 max-w-2xl text-[13px] leading-relaxed text-slate-500">
                    {EVIDENCE_META[tier].note}
                  </p>
                </div>
              </div>

              <motion.div layout className="grid grid-cols-1 gap-6 pt-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
                <AnimatePresence mode="popLayout">
                  {items.map((cs) => (
                    <ProjectCard key={cs.id} project={cs} onOpen={() => open(cs.id)} />
                  ))}
                </AnimatePresence>
              </motion.div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

/* ── Card ───────────────────────────────────────────────────────────────────── */

const ProjectCard: React.FC<{ project: CaseStudy; onOpen: () => void }> = ({ project, onOpen }) => {
  const accent = project.accent || BRAND_ACCENT;
  const tier: ProjectEvidence = project.evidence ?? 'reconstructed';
  const ui = EVIDENCE_UI[tier];
  const Icon = ui.icon;
  const citation = citationFor(project);
  const stack = project.stack ?? [];
  const shownStack = stack.slice(0, 4);
  const restStack = stack.length - shownStack.length;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_20px_50px_-15px_rgba(15,23,42,0.08)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-[0_30px_70px_-20px_rgba(15,23,42,0.16)]"
    >
      {/* Media: a real screenshot, or the architecture where there is no interface. */}
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open the ${project.client} case study`}
        className="relative block aspect-[16/10] w-full cursor-pointer overflow-hidden bg-[#070A18] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/70"
      >
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.client} - ${project.title}, captured from the live deployment`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.06]"
          />
        ) : (
          <BlueprintPreview layers={project.architecture ?? []} accent={accent} />
        )}

        {/* Evidence pill and the project number sit on the media, not in the body. */}
        <span
          className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em] backdrop-blur-md"
          style={{
            borderColor: hexA(ui.color, 0.4),
            backgroundColor: 'rgba(7,10,24,0.72)',
            color: ui.color
          }}
        >
          <Icon className="h-3 w-3" />
          {EVIDENCE_META[tier].short}
        </span>
        <span className="absolute right-3 top-3 rounded-md bg-black/45 px-2 py-1 font-mono text-[10px] font-bold tabular-nums text-white/85 backdrop-blur-md">
          {project.number ?? '--'}
        </span>

        {project.image && (
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#070A18]/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        )}
      </button>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.18em] text-slate-400">
          {project.industry}
        </p>
        <h3 className="mt-2 text-[17px] font-black leading-snug tracking-[-0.015em] text-slate-900">
          {project.client}
          <span className="ml-1.5 font-semibold text-slate-500">{project.title}</span>
        </h3>
        <p className="mt-2.5 text-[13px] leading-relaxed text-slate-600">{project.summary}</p>

        <ul className="mt-4 space-y-2">
          {project.results.map((r) => (
            <li key={r} className="flex gap-2.5">
              <span
                className="mt-[8px] h-[2px] w-3 shrink-0 rounded-full"
                style={{ background: accent }}
              />
              <span className="text-[12.5px] leading-relaxed text-slate-500">{r}</span>
            </li>
          ))}
        </ul>

        {shownStack.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {shownStack.map((s) => (
              <span
                key={s.name}
                title={`${s.name} - ${s.layer}`}
                className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[9.5px] font-bold text-slate-600"
              >
                {s.name}
              </span>
            ))}
            {restStack > 0 && (
              <span className="px-1 py-0.5 font-mono text-[9.5px] font-bold text-slate-400">
                +{restStack}
              </span>
            )}
          </div>
        )}

        {/* Footer sits flush at the bottom whatever the copy length. */}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
          <button
            type="button"
            onClick={onOpen}
            className="inline-flex cursor-pointer items-center gap-1.5 text-[12.5px] font-bold text-slate-900 transition-colors hover:text-[#5B61FE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B61FE]/50"
          >
            <span>Read the case study</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>

          {citation.href ? (
            <a
              href={citation.href}
              target="_blank"
              rel="noreferrer noopener"
              title={citation.href}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex max-w-[45%] items-center gap-1 font-mono text-[10.5px] text-slate-400 transition-colors hover:text-[#5B61FE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B61FE]/50"
            >
              <span className="truncate">{citation.label}</span>
              <ArrowUpRight className="h-3 w-3 shrink-0" />
            </a>
          ) : (
            <span className="max-w-[45%] truncate font-mono text-[10.5px] text-slate-300">
              {citation.label}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
};

/**
 * Source-verified projects have no interface to photograph, so the card shows the
 * shape of the system instead of a stock photo standing in for one.
 */
const BlueprintPreview: React.FC<{ layers: string[]; accent: string }> = ({ layers, accent }) => {
  const rows = layers.slice(0, 5);

  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-2/3"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${hexA(accent, 0.2)} 0%, transparent 70%)` }}
      />

      {rows.length === 0 ? (
        <div className="relative flex h-full items-center justify-center font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600">
          Architecture not published
        </div>
      ) : (
        <div className="relative flex h-full flex-col justify-center gap-1.5 px-5 py-6">
          <p className="mb-1 font-mono text-[8.5px] font-bold uppercase tracking-[0.22em] text-slate-500">
            Data flow
          </p>
          {rows.map((line, i) => (
            <div
              key={i}
              className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 rounded-lg border border-white/[0.09] bg-white/[0.04] px-2.5 py-1.5 transition-colors duration-500 group-hover:border-white/[0.16]"
            >
              {parseLayer(line).map((step, j) => (
                <React.Fragment key={j}>
                  {j > 0 && (
                    <ChevronRight className="h-2.5 w-2.5 shrink-0" style={{ color: hexA(accent, 0.8) }} />
                  )}
                  <span className="font-mono text-[9.5px] leading-tight text-slate-300">
                    {step.join(' / ')}
                  </span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
