import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Layers,
  Share2,
  ShieldCheck,
  Target,
  Terminal,
  Zap
} from 'lucide-react';
import { siteContent, EVIDENCE_META, type CaseStudy, type ProjectEvidence } from '../data/siteContent';
import { EVIDENCE_UI, BRAND_ACCENT, hexA, softGlow, parseLayer, citationFor } from '../lib/evidence';

interface ProjectDetailPageProps {
  projectId: string;
  onNavigate: (page: string, param?: string) => void;
  onOpenBookCall: () => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  projectId,
  onNavigate,
  onOpenBookCall
}) => {
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const study = siteContent.caseStudies.find((cs) => cs.id === projectId) || siteContent.caseStudies[0];

  const accent = study.accent || BRAND_ACCENT;
  const tier: ProjectEvidence = study.evidence ?? 'reconstructed';
  const ui = EVIDENCE_UI[tier];
  const TierIcon = ui.icon;
  const citation = citationFor(study);
  const steps = study.buildSteps ?? [];
  const layers = study.architecture ?? [];

  const stackByLayer = useMemo(() => {
    const grouped = new Map<string, string[]>();
    (study.stack ?? []).forEach((s) => {
      const bucket = grouped.get(s.layer) ?? [];
      bucket.push(s.name);
      grouped.set(s.layer, bucket);
    });
    return Array.from(grouped.entries());
  }, [study]);

  // Same discipline first, then anything else, so the rail is never short.
  const related = useMemo(() => {
    const others = siteContent.caseStudies.filter((c) => c.id !== study.id);
    const sameField = others.filter((c) => c.category === study.category);
    const rest = others.filter((c) => c.category !== study.category);
    return [...sameField, ...rest].slice(0, 3);
  }, [study]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="bg-white pb-24 font-body text-slate-900">
      {/* ── Breadcrumb bar ───────────────────────────────────────────────────── */}
      <div className="border-b border-slate-200/70 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3.5 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => onNavigate('work')}
            className="inline-flex cursor-pointer items-center gap-2 text-[12.5px] font-bold text-slate-600 transition-colors hover:text-[#5B61FE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B61FE]/50"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>All work</span>
          </button>

          <div className="hidden items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-slate-400 sm:flex">
            <span>{study.category}</span>
            <ChevronRight className="h-3 w-3" />
            <span className="font-bold text-slate-900">{study.client}</span>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-1.5 text-[11.5px] font-bold text-slate-600 transition-colors hover:bg-[#EEF2FF] hover:text-[#5B61FE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B61FE]/50"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>{copiedLink ? 'Link copied' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* ── Hero plate ───────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#070A18] pb-14 pt-12 text-slate-200 sm:pb-16 sm:pt-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#101736] to-transparent" />
        {/* Hero glow, as gradients rather than 130-140px blurred discs — see `softGlow`. */}
        <div
          className="pointer-events-none absolute right-[-548px] top-[-420px] h-[1360px] w-[1360px]"
          style={{ background: softGlow(accent, 0.18, 260 / 680) }}
        />
        <div
          className="pointer-events-none absolute bottom-[-390px] left-[-550px] h-[1200px] w-[1200px]"
          style={{ background: softGlow(BRAND_ACCENT, 0.13, 210 / 600) }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12"
          >
            <div className="lg:col-span-7">
              <p className="flex flex-wrap items-center gap-3 font-mono text-[10.5px] font-bold uppercase tracking-[0.22em]">
                <span className="tabular-nums" style={{ color: accent }}>
                  {study.number ?? '--'}
                </span>
                <span className="h-px w-6 bg-white/20" />
                <span className="text-slate-400">{study.industry}</span>
              </p>

              <h1 className="mt-4 text-3xl font-black leading-[1.05] tracking-[-0.03em] text-white sm:text-4xl lg:text-[3.1rem]">
                {study.client}
                <span className="mt-1.5 block text-xl font-medium text-slate-400 sm:text-2xl lg:text-[1.6rem]">
                  {study.title}
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-300">{study.summary}</p>

              <div className="mt-7 flex flex-wrap items-center gap-2.5">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em]"
                  style={{
                    borderColor: hexA(ui.color, 0.35),
                    backgroundColor: hexA(ui.color, 0.1),
                    color: ui.color
                  }}
                  title={EVIDENCE_META[tier].note}
                >
                  <TierIcon className="h-3.5 w-3.5" />
                  {EVIDENCE_META[tier].label}
                </span>

                {citation.href ? (
                  <a
                    href={citation.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    title={citation.href}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 font-mono text-[10.5px] text-slate-300 transition-colors hover:border-white/25 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                  >
                    <span className="max-w-[16rem] truncate">{citation.label}</span>
                    <ArrowUpRight className="h-3 w-3 shrink-0" />
                  </a>
                ) : (
                  <span className="inline-flex items-center rounded-full border border-white/10 px-3 py-1.5 font-mono text-[10.5px] text-slate-500">
                    {citation.label}
                  </span>
                )}

                <span className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-[10.5px] text-slate-400">
                  {study.category}
                </span>
              </div>
            </div>

            {/* What was delivered, straight from the record. */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-md">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Delivered
                </p>
                <ul className="mt-4 space-y-3">
                  {study.results.map((r) => (
                    <li key={r} className="flex gap-3">
                      <CheckCircle2 className="mt-[2px] h-4 w-4 shrink-0" style={{ color: accent }} />
                      <span className="text-[13px] leading-relaxed text-slate-300">{r}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-1.5 border-t border-white/[0.08] pt-5">
                  {study.services.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10.5px] font-bold text-slate-400"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={onOpenBookCall}
                  className="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-3 text-[13px] font-bold text-white transition-transform duration-200 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  style={{ backgroundColor: accent, boxShadow: `0 12px 34px -14px ${hexA(accent, 0.95)}` }}
                >
                  <Zap className="h-4 w-4" />
                  <span>Talk about a build like this</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* The artifact itself: a capture where there is an interface, the system where there isn't. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="relative mt-12 overflow-hidden rounded-2xl border border-white/10 bg-[#05070F]"
            style={{ boxShadow: `0 50px 120px -50px ${hexA(accent, 0.5)}` }}
          >
            <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
              <span className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="h-2 w-2 rounded-full bg-white/10" />
              </span>
              <span className="truncate font-mono text-[11px] text-slate-400">{citation.label}</span>
            </div>

            <div className="relative aspect-[16/10] w-full sm:aspect-[16/8]">
              {study.image ? (
                <img
                  src={study.image}
                  alt={`${study.client} - ${study.title}, captured from the live deployment`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <ArchitecturePlate layers={layers} accent={accent} />
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Narrative ────────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 pt-16 lg:grid-cols-12 lg:gap-14">
          <div className="space-y-14 lg:col-span-8">
            {study.overview && (
              <Block eyebrow="Background" title="What this project was">
                <p className="whitespace-pre-line text-[14.5px] leading-relaxed text-slate-600">
                  {study.overview}
                </p>
              </Block>
            )}

            {study.requirements && study.requirements.length > 0 && (
              <Block eyebrow="Brief" title="What the build had to do" icon={Target} accent={accent}>
                <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {study.requirements.map((req, i) => (
                    <li
                      key={req}
                      className="flex gap-3 rounded-xl border border-slate-200/80 bg-slate-50/70 p-4"
                    >
                      <span
                        className="font-mono text-[10px] font-bold tabular-nums"
                        style={{ color: accent }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[13px] leading-relaxed text-slate-600">{req}</span>
                    </li>
                  ))}
                </ol>
              </Block>
            )}

            {(study.challenge || study.solution) && (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {study.challenge && (
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.4 }}
                    className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.08)]"
                  >
                    <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.2em] text-slate-400">
                      The problem
                    </p>
                    <p className="mt-3 text-[13.5px] leading-relaxed text-slate-600">{study.challenge}</p>
                  </motion.div>
                )}
                {study.solution && (
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.4, delay: 0.08 }}
                    className="rounded-2xl border p-6 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.08)]"
                    style={{ borderColor: hexA(accent, 0.28), backgroundColor: hexA(accent, 0.04) }}
                  >
                    <p
                      className="font-mono text-[9.5px] font-bold uppercase tracking-[0.2em]"
                      style={{ color: accent }}
                    >
                      The approach
                    </p>
                    <p className="mt-3 text-[13.5px] leading-relaxed text-slate-700">{study.solution}</p>
                  </motion.div>
                )}
              </div>
            )}

            {layers.length > 0 && (
              <Block eyebrow="System" title="How it is put together" icon={Layers} accent={accent}>
                <div className="space-y-2">
                  {layers.map((line, i) => (
                    <motion.div
                      key={line}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.35, delay: i * 0.06 }}
                      className="flex items-start gap-4 rounded-xl border border-slate-200/80 bg-white p-4"
                    >
                      <span className="mt-[1px] font-mono text-[9.5px] font-bold tabular-nums text-slate-400">
                        L{i + 1}
                      </span>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        {parseLayer(line).map((step, j) => (
                          <React.Fragment key={j}>
                            {j > 0 && (
                              <ChevronRight
                                className="h-3.5 w-3.5 shrink-0"
                                style={{ color: hexA(accent, 0.8) }}
                              />
                            )}
                            <span className="flex items-center gap-2">
                              {step.map((sibling, k) => (
                                <React.Fragment key={k}>
                                  {k > 0 && <span className="h-3 w-px bg-slate-300" />}
                                  <span className="font-mono text-[12px] text-slate-700">{sibling}</span>
                                </React.Fragment>
                              ))}
                            </span>
                          </React.Fragment>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Block>
            )}

            {steps.length > 0 && (
              <Block
                eyebrow={`${steps.length} steps`}
                title="The build sequence"
                icon={Terminal}
                accent={accent}
              >
                <div className="relative pl-9">
                  <span className="absolute bottom-2 left-[9px] top-2 w-px bg-slate-200" />
                  <ol className="space-y-6">
                    {steps.map((step, i) => (
                      <motion.li
                        key={step.title}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-70px' }}
                        transition={{ duration: 0.35 }}
                        className="relative"
                      >
                        <span
                          className="absolute -left-9 top-[5px] flex h-[19px] w-[19px] items-center justify-center rounded-full border-2 bg-white font-mono text-[8px] font-bold"
                          style={{ borderColor: accent, color: accent }}
                        >
                          {i + 1}
                        </span>
                        <div className="flex flex-wrap items-baseline gap-x-2.5">
                          <h4 className="text-[14.5px] font-bold text-slate-900">{step.title}</h4>
                          {step.stack && (
                            <span
                              className="rounded-full border px-2 py-[1px] font-mono text-[9.5px] uppercase tracking-[0.1em]"
                              style={{ borderColor: hexA(accent, 0.4), color: accent }}
                            >
                              {step.stack}
                            </span>
                          )}
                        </div>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{step.detail}</p>
                      </motion.li>
                    ))}
                  </ol>
                </div>
              </Block>
            )}

            {study.qualityBar && study.qualityBar.items.length > 0 && (
              <Block
                eyebrow="Non-functional"
                title={study.qualityBar.label}
                icon={ShieldCheck}
                accent={accent}
              >
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {study.qualityBar.items.map((item) => (
                    <div
                      key={item}
                      className="flex gap-2.5 rounded-xl border border-slate-200/80 bg-white p-3.5"
                    >
                      <CheckCircle2 className="mt-[1px] h-4 w-4 shrink-0" style={{ color: accent }} />
                      <span className="text-[12.5px] leading-relaxed text-slate-600">{item}</span>
                    </div>
                  ))}
                </div>
              </Block>
            )}
          </div>

          {/* ── Sidebar: the honest column ─────────────────────────────────────── */}
          <aside className="lg:col-span-4">
            <div className="space-y-5 lg:sticky lg:top-24">
              {stackByLayer.length > 0 && (
                <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.08)]">
                  <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    Stack
                  </p>
                  <dl className="mt-4 space-y-3">
                    {stackByLayer.map(([layer, names]) => (
                      <div
                        key={layer}
                        className="flex items-baseline justify-between gap-4 border-b border-slate-100 pb-3 last:border-0 last:pb-0"
                      >
                        <dt className="shrink-0 font-mono text-[9.5px] uppercase tracking-[0.14em] text-slate-400">
                          {layer}
                        </dt>
                        <dd className="text-right text-[12.5px] font-bold text-slate-800">
                          {names.join(', ')}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {study.maturity && (
                <div className="rounded-2xl border border-slate-200/90 bg-slate-50/80 p-5">
                  <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.2em] text-slate-500">
                    Scope of the work
                  </p>
                  <p className="mt-3 text-[12.5px] leading-relaxed text-slate-600">{study.maturity}</p>
                </div>
              )}

              {study.deployment && (
                <div className="rounded-2xl border border-slate-200/90 bg-white p-5">
                  <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    How it ships
                  </p>
                  <p className="mt-3 text-[12.5px] leading-relaxed text-slate-600">{study.deployment}</p>
                </div>
              )}

              {study.outcome && (
                <div
                  className="rounded-2xl border p-5"
                  style={{ borderColor: hexA(accent, 0.3), backgroundColor: hexA(accent, 0.05) }}
                >
                  <p
                    className="font-mono text-[9.5px] font-bold uppercase tracking-[0.2em]"
                    style={{ color: accent }}
                  >
                    What it proves
                  </p>
                  <p className="mt-3 text-[12.5px] leading-relaxed text-slate-700">{study.outcome}</p>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* ── Related ─────────────────────────────────────────────────────────── */}
        <div className="mt-20 border-t border-slate-200/80 pt-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#5B61FE]">
                Next
              </p>
              <h3 className="mt-2 text-2xl font-black tracking-[-0.02em] text-slate-900">
                More of the same discipline
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('work')}
              className="group inline-flex cursor-pointer items-center gap-1.5 text-[12.5px] font-bold text-[#5B61FE] transition-colors hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B61FE]/50"
            >
              <span>All work</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {related.map((cs, idx) => (
              <RelatedCard
                key={cs.id}
                project={cs}
                delay={idx * 0.07}
                onOpen={() => onNavigate('project-detail', cs.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Pieces ─────────────────────────────────────────────────────────────────── */

const Block: React.FC<{
  eyebrow: string;
  title: string;
  icon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accent?: string;
  children: React.ReactNode;
}> = ({ eyebrow, title, icon: Icon, accent = BRAND_ACCENT, children }) => (
  <motion.section
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
  >
    <div className="mb-5 flex items-center gap-3 border-b border-slate-200/80 pb-4">
      {Icon && <Icon className="h-4 w-4 shrink-0" style={{ color: accent }} />}
      <h3 className="text-xl font-black tracking-[-0.02em] text-slate-900">{title}</h3>
      <span className="ml-auto shrink-0 font-mono text-[9.5px] font-bold uppercase tracking-[0.2em] text-slate-400">
        {eyebrow}
      </span>
    </div>
    {children}
  </motion.section>
);

const ArchitecturePlate: React.FC<{ layers: string[]; accent: string }> = ({ layers, accent }) => {
  if (layers.length === 0) {
    return (
      <div className="flex h-full items-center justify-center font-mono text-[11px] uppercase tracking-[0.2em] text-slate-600">
        Architecture not published
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
          backgroundSize: '38px 38px'
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-2/3"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${hexA(accent, 0.18)} 0%, transparent 70%)` }}
      />
      <div className="relative flex h-full flex-col justify-center gap-2 px-5 py-6 sm:px-10 lg:px-16">
        <p className="mb-1 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-slate-500">
          Data flow
        </p>
        {layers.map((line, i) => (
          <motion.div
            key={line}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="rounded-xl border border-white/[0.1] bg-white/[0.035] px-3.5 py-2.5 backdrop-blur-sm"
          >
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              {parseLayer(line).map((step, j) => (
                <React.Fragment key={j}>
                  {j > 0 && (
                    <ChevronRight className="h-3 w-3 shrink-0" style={{ color: hexA(accent, 0.75) }} />
                  )}
                  <span className="flex items-center gap-2">
                    {step.map((sibling, k) => (
                      <React.Fragment key={k}>
                        {k > 0 && <span className="h-3 w-px bg-white/20" />}
                        <span className="font-mono text-[10.5px] text-slate-300 sm:text-[12px]">
                          {sibling}
                        </span>
                      </React.Fragment>
                    ))}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const RelatedCard: React.FC<{ project: CaseStudy; delay: number; onOpen: () => void }> = ({
  project,
  delay,
  onOpen
}) => {
  const accent = project.accent || BRAND_ACCENT;
  const tier: ProjectEvidence = project.evidence ?? 'reconstructed';
  const ui = EVIDENCE_UI[tier];
  const Icon = ui.icon;

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay }}
      onClick={onOpen}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white text-left shadow-[0_20px_50px_-20px_rgba(15,23,42,0.08)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-24px_rgba(15,23,42,0.16)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B61FE]/50"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#070A18]">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.client} - ${project.title}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.06]"
          />
        ) : (
          <div className="flex h-full flex-col justify-center gap-1.5 px-4">
            <div
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                backgroundSize: '28px 28px'
              }}
            />
            {(project.architecture ?? []).slice(0, 4).map((line, i) => (
              <span
                key={i}
                className="relative truncate rounded-md border border-white/[0.09] bg-white/[0.04] px-2 py-1 font-mono text-[9px] text-slate-300"
              >
                {line.replace(/ -> /g, ' > ')}
              </span>
            ))}
          </div>
        )}
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
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.18em] text-slate-400">
          {project.category}
        </p>
        <h4 className="mt-2 text-[15px] font-black leading-snug tracking-[-0.015em] text-slate-900">
          {project.client}
          <span className="ml-1.5 font-semibold text-slate-500">{project.title}</span>
        </h4>
        <p className="mt-2 line-clamp-2 text-[12.5px] leading-relaxed text-slate-600">
          {project.summary}
        </p>
        <span
          className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-bold transition-transform duration-200 group-hover:translate-x-0.5"
          style={{ color: accent }}
        >
          Read the case study
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </motion.button>
  );
};
