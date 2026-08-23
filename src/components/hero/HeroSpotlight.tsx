import React from 'react';
import { motion } from 'motion/react';
import {
  ChevronRight,
  Sparkles,
  PieChart,
  Wallet,
  MessageSquare,
  Clock,
  ShieldCheck,
  MoreHorizontal
} from 'lucide-react';
import {
  AreaSpark,
  CardLabel,
  CurvedArrow,
  DeltaPill,
  Donut,
  DotGrid,
  EASE_OUT,
  FloatCard,
  IconPlate,
  Progress,
  Sparkline
} from './heroBits';

interface HeroSpotlightProps {
  onNavigate: (page: string, param?: string) => void;
  onOpenBookCall: () => void;
}

const SEGMENTS = [
  { label: 'Growth & ads', value: 42, color: '#7C3AED' },
  { label: 'Creative', value: 35, color: '#A78BFA' },
  { label: 'Web & AI', value: 23, color: '#FBBF24' }
];

/* ── The five floating cards, each defined once and placed twice (absolute on desktop,
      stacked in a grid on smaller screens) so there is only one copy of the content. ── */

const OverviewCard: React.FC<{ delay?: number; className?: string }> = ({ delay, className }) => (
  <FloatCard delay={delay} className={className}>
    <div className="mb-3 flex items-center gap-2">
      <IconPlate bg="#F3E8FF" color="#7C3AED">
        <PieChart className="h-3.5 w-3.5" />
      </IconPlate>
      <span className="text-xs font-extrabold text-slate-900">Where the hours go</span>
    </div>
    <div className="flex items-center gap-3.5">
      <Donut segments={SEGMENTS} size={78} />
      <ul className="min-w-0 flex-1 space-y-1.5">
        {SEGMENTS.map((s) => (
          <li key={s.label} className="flex items-center gap-1.5 text-[10px]">
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: s.color }}
            />
            <span className="truncate font-semibold text-slate-600">{s.label}</span>
            <span className="ml-auto font-extrabold text-slate-900">{s.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  </FloatCard>
);

const LeadsCard: React.FC<{ delay?: number; className?: string }> = ({ delay, className }) => (
  <FloatCard delay={delay} className={className}>
    <CardLabel>Qualified leads</CardLabel>
    <div className="mt-1 flex items-end justify-between gap-3">
      <div className="flex items-baseline gap-2">
        <span className="text-xl font-black tracking-tight text-slate-900">1 248</span>
        <DeltaPill>+18%</DeltaPill>
      </div>
      <Sparkline className="h-6 w-16 shrink-0" />
    </div>
  </FloatCard>
);

const PipelineCard: React.FC<{ delay?: number; className?: string }> = ({ delay, className }) => (
  <FloatCard delay={delay} className={className}>
    <div className="mb-2 flex items-center gap-2">
      <IconPlate bg="#EEF2FF" color="#5B61FE">
        <Wallet className="h-3.5 w-3.5" />
      </IconPlate>
      <CardLabel>Ad spend managed</CardLabel>
    </div>
    <div className="mb-2.5 flex items-baseline gap-2">
      <span className="text-xl font-black tracking-tight text-slate-900">$248K</span>
      <DeltaPill>+22%</DeltaPill>
    </div>
    <Progress pct={72} color="#7C3AED" />
  </FloatCard>
);

const PerformanceCard: React.FC<{ delay?: number; className?: string }> = ({ delay, className }) => (
  <FloatCard delay={delay} className={className}>
    <div className="mb-1 flex items-center justify-between">
      <span className="text-xs font-extrabold text-slate-900">Performance</span>
      <MoreHorizontal className="h-3.5 w-3.5 text-slate-300" />
    </div>
    <AreaSpark id="hero-spotlight-area" className="h-16 w-full" />
    <div className="mt-2 border-t border-slate-100 pt-2">
      <CardLabel>Blended ROAS this month</CardLabel>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-xl font-black tracking-tight text-slate-900">4.2×</span>
        <DeltaPill>+12%</DeltaPill>
      </div>
    </div>
  </FloatCard>
);

const TILES = [
  { icon: MessageSquare, label: 'Slack sync', bg: '#EEF2FF', color: '#5B61FE' },
  { icon: Clock, label: '48h turnaround', bg: '#FFFBEB', color: '#D97706' },
  { icon: ShieldCheck, label: 'No lock-in', bg: '#FFF1F2', color: '#E11D48' }
];

const TilesCard: React.FC<{ delay?: number; className?: string }> = ({ delay, className }) => (
  <FloatCard delay={delay} className={className} hoverLift={false}>
    <div className="grid grid-cols-3 gap-2">
      {TILES.map(({ icon: Icon, label, bg, color }) => (
        <div key={label} className="flex flex-col items-center gap-1.5 text-center">
          <IconPlate bg={bg} color={color} size="md">
            <Icon className="h-4 w-4" />
          </IconPlate>
          <span className="text-[9.5px] font-bold leading-tight text-slate-600">{label}</span>
        </div>
      ))}
    </div>
  </FloatCard>
);

export const HeroSpotlight: React.FC<HeroSpotlightProps> = ({ onNavigate, onOpenBookCall }) => {
  return (
    <section className="relative overflow-hidden border-b border-slate-100 bg-[#FDFCFF] pb-14 pt-10 text-slate-900 sm:pb-20 sm:pt-14">
      {/* Ambient wash. Radial gradients, not blurred discs — a filter pass here would land on
          the first frame of the first scroll. */}
      <div
        className="pointer-events-none absolute -right-[380px] -top-[420px] h-[1100px] w-[1100px]"
        style={{
          background:
            'radial-gradient(circle, rgba(124,58,237,0.10) 0%, rgba(124,58,237,0.05) 42%, transparent 72%)'
        }}
      />
      <div
        className="pointer-events-none absolute -left-[420px] top-[180px] h-[1000px] w-[1000px]"
        style={{
          background:
            'radial-gradient(circle, rgba(91,97,254,0.08) 0%, rgba(91,97,254,0.04) 42%, transparent 72%)'
        }}
      />

      {/* Corner dot ornaments */}
      <DotGrid
        id="spot-dots-tl"
        className="pointer-events-none absolute left-3 top-8 hidden h-24 w-24 opacity-70 sm:block"
      />
      <DotGrid
        id="spot-dots-tr"
        className="pointer-events-none absolute right-4 top-24 hidden h-20 w-28 opacity-60 lg:block"
      />
      <DotGrid
        id="spot-dots-amber"
        color="#FCD34D"
        className="pointer-events-none absolute right-8 top-[46%] hidden h-24 w-20 opacity-70 xl:block"
      />
      <DotGrid
        id="spot-dots-bl"
        className="pointer-events-none absolute bottom-10 left-6 hidden h-20 w-24 opacity-50 lg:block"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Centred headline stack ─────────────────────────────────────────── */}
        <div className="relative mx-auto max-w-3xl text-center">
          <CurvedArrow
            className="pointer-events-none absolute -right-6 top-[42%] hidden h-20 w-28 xl:block"
            dir="in-right"
          />
          <CurvedArrow
            className="pointer-events-none absolute -left-8 bottom-2 hidden h-20 w-28 xl:block"
            dir="in-left"
          />

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="text-[2.35rem] font-black leading-[1.06] tracking-[-0.035em] text-slate-900 sm:text-5xl lg:text-[3.65rem]"
          >
            Your whole digital team,
            <br />
            on one subscription{' '}
            <Sparkles
              className="ml-0.5 inline-block h-[0.78em] w-[0.78em] -translate-y-[0.06em] text-[#8B5CF6]"
              strokeWidth={2.4}
              aria-hidden="true"
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12, ease: EASE_OUT }}
            className="mx-auto mt-5 max-w-xl text-sm font-medium leading-relaxed text-slate-500 sm:text-[0.95rem]"
          >
            Growth ads, creative, web platforms and AI automation — run by one synchronized squad.
            <br className="hidden sm:block" /> No recruiting, no retainers, no long-term lock-in.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22, ease: EASE_OUT }}
            className="mt-8 flex flex-col items-center gap-3"
          >
            {/* Single amber pill with the dark arrow badge — the reference's one clear action. */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('free-trial')}
              className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#FBBF24] pl-7 pr-2 py-2 text-sm font-extrabold text-slate-900 shadow-[0_16px_34px_-12px_rgba(217,119,6,0.55)] transition-colors duration-200 hover:bg-[#F59E0B]"
            >
              <span>Start 7-day free trial</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white">
                <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </motion.button>

            <button
              onClick={onOpenBookCall}
              className="cursor-pointer text-xs font-bold text-slate-500 underline decoration-slate-300 decoration-2 underline-offset-4 transition-colors duration-200 hover:text-slate-900"
            >
              or book a 15-minute strategy call
            </button>
          </motion.div>
        </div>

        {/* ── Collage ────────────────────────────────────────────────────────── */}
        <div className="relative mx-auto mt-12 max-w-5xl sm:mt-16">
          {/* Centre visual */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.18, ease: EASE_OUT }}
            className="mx-auto w-full max-w-[19rem] sm:max-w-sm lg:max-w-md"
          >
            <div className="relative overflow-hidden rounded-[2.25rem] bg-gradient-to-b from-[#F5F3FF] to-[#EEF2FF] ring-1 ring-white/80 shadow-[0_40px_90px_-40px_rgba(76,29,149,0.45)]">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80"
                alt="The Webants squad working through a client sprint"
                width={900}
                height={1080}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="aspect-[5/6] w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=900&q=80';
                }}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#FDFCFF] via-[#FDFCFF]/50 to-transparent" />
            </div>
          </motion.div>

          {/* Desktop: cards float over the visual's edges, as in the reference. */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            <OverviewCard delay={0.34} className="pointer-events-auto absolute left-0 top-2 w-[15.5rem]" />
            <LeadsCard delay={0.42} className="pointer-events-auto absolute left-4 top-[13.5rem] w-[13.5rem]" />
            <PipelineCard delay={0.5} className="pointer-events-auto absolute bottom-4 left-0 w-[14.5rem]" />
            <PerformanceCard delay={0.38} className="pointer-events-auto absolute right-0 top-6 w-[16rem]" />
            <TilesCard delay={0.46} className="pointer-events-auto absolute bottom-6 right-2 w-[15rem]" />
          </div>

          {/* Below lg the cards cannot float — stack them honestly instead of shrinking them. */}
          <div className="mt-8 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:hidden">
            <OverviewCard delay={0.3} />
            <PerformanceCard delay={0.36} />
            <LeadsCard delay={0.42} />
            <PipelineCard delay={0.48} />
            <TilesCard delay={0.54} className="sm:col-span-2" />
          </div>
        </div>
      </div>
    </section>
  );
};
