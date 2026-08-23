import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  TrendingUp,
  Palette,
  Code2,
  Bot,
  Zap,
  Clock,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  PieChart,
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

interface HeroCenteredProps {
  onNavigate: (page: string, param?: string) => void;
  onOpenBookCall: () => void;
}

type DeptKey = 'growth' | 'creative' | 'tech' | 'ai' | 'ops';

/*
  Same five disciplines, same headline metrics and deliverables as the classic hero's Live Squad
  Terminal — only the composition changes. The terminal's tab interaction survives as the chip row
  under the sub-copy, so the section is still something the visitor can poke at.

  Everything here is sized to fit a single viewport. The sticky header stack above it is an
  announcement bar (~33px) plus an 80px bar, so the section reserves `100svh - 7rem` at lg and
  centres its content in that box. The composition is ~740px tall at full size, which clears a
  1080p screen; shorter laptops are handled by the `.hero-fit` zoom steps in index.css, so the
  whole thing scales proportionally rather than any one axis being squeezed.
*/
const DEPTS: Record<
  DeptKey,
  {
    chip: string;
    title: string;
    metric: string;
    metricLabel: string;
    delta: string;
    turnaround: string;
    share: number;
    deliverables: string[];
    color: string;
    bgLight: string;
    icon: React.ElementType;
    route: string;
  }
> = {
  growth: {
    chip: 'Growth',
    title: 'Growth & Performance Ads',
    metric: '+142%',
    metricLabel: 'Avg ROAS lift',
    delta: '+18%',
    turnaround: '48 – 72 hours',
    share: 74,
    deliverables: ['Google & Meta ads management', 'High-converting landing pages', 'Lead routing & CRM tracking'],
    color: '#5B61FE',
    bgLight: '#EEF2FF',
    icon: TrendingUp,
    route: 'growth'
  },
  creative: {
    chip: 'Creative',
    title: 'Creative Studio & Video',
    metric: '90+',
    metricLabel: 'Assets shipped / month',
    delta: '+24%',
    turnaround: '24 – 48 hours',
    share: 88,
    deliverables: ['Performance ad creatives', 'Short-form video (Reels/TikTok)', 'Brand guidelines & identity'],
    color: '#D97706',
    bgLight: '#FFFBEB',
    icon: Palette,
    route: 'creative'
  },
  tech: {
    chip: 'Web',
    title: 'Web & Shopify Platforms',
    metric: '99/100',
    metricLabel: 'Lighthouse speed score',
    delta: '+12%',
    turnaround: '3 – 5 days',
    share: 62,
    deliverables: ['Custom Next.js / React apps', 'Shopify store customization', 'Figma to code implementation'],
    color: '#7C3AED',
    bgLight: '#F5F3FF',
    icon: Code2,
    route: 'technology'
  },
  ai: {
    chip: 'AI & Auto',
    title: 'AI Systems & Automations',
    metric: '40+',
    metricLabel: 'Hours saved / week',
    delta: '+31%',
    turnaround: '24 – 72 hours',
    share: 69,
    deliverables: ['Zapier & Make pipelines', 'AI chatbots & lead qualifiers', 'CRM pipeline auto-sync'],
    color: '#0284C7',
    bgLight: '#F0F9FF',
    icon: Bot,
    route: 'ai-automation'
  },
  ops: {
    chip: 'Slack Ops',
    title: 'Digital Operations & Support',
    metric: '< 15min',
    metricLabel: 'Slack response SLA',
    delta: '+9%',
    turnaround: 'Real-time daily',
    share: 94,
    deliverables: ['Direct Slack / Loom sync', 'Dedicated project management', 'Weekly sprint reviews'],
    color: '#16A34A',
    bgLight: '#F0FDF4',
    icon: Zap,
    route: 'digital-operations'
  }
};

const ORDER: DeptKey[] = ['growth', 'creative', 'tech', 'ai', 'ops'];

const ALLOCATION = [
  { label: 'Growth & ads', value: 42, color: '#5B61FE' },
  { label: 'Creative', value: 35, color: '#818CF8' },
  { label: 'Web & AI', value: 23, color: '#7C3AED' }
];

const GUARANTEES = [
  { icon: Clock, label: '48–72h turnarounds', bg: '#EEF2FF', color: '#5B61FE' },
  { icon: MessageSquare, label: 'Direct Slack sync', bg: '#F5F3FF', color: '#7C3AED' },
  { icon: ShieldCheck, label: 'No long-term lock-in', bg: '#F0FDF4', color: '#16A34A' }
];

/* ── Floating cards ─────────────────────────────────────────────────────────────
   Four, not five. The sprint-turnaround card was the accessory to remove: its number
   already reads in the board header and its progress bar moved onto the metric card, so
   cutting it buys ~150px of collage height — the difference between fitting and not. */

const AllocationCard: React.FC<{ delay?: number; className?: string }> = ({ delay, className }) => (
  <FloatCard delay={delay} className={className} pad="p-3">
    <div className="mb-2 flex items-center gap-2">
      <IconPlate bg="#EEF2FF" color="#5B61FE">
        <PieChart className="h-3.5 w-3.5" />
      </IconPlate>
      <span className="text-[11px] font-extrabold text-slate-900">Squad allocation</span>
    </div>
    <div className="flex items-center gap-3">
      <Donut segments={ALLOCATION} size={62} />
      <ul className="min-w-0 flex-1 space-y-1">
        {ALLOCATION.map((s) => (
          <li key={s.label} className="flex items-center gap-1.5 text-[9.5px]">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="truncate font-semibold text-slate-600">{s.label}</span>
            <span className="ml-auto font-extrabold text-slate-900">{s.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  </FloatCard>
);

const MetricCard: React.FC<{ dept: DeptKey; delay?: number; className?: string }> = ({
  dept,
  delay,
  className
}) => {
  const d = DEPTS[dept];
  return (
    <FloatCard delay={delay} className={className} pad="p-3">
      <CardLabel>{d.metricLabel}</CardLabel>
      <div className="mb-2 mt-0.5 flex items-end justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={dept}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              className="text-lg font-black tracking-tight"
              style={{ color: d.color }}
            >
              {d.metric}
            </motion.span>
          </AnimatePresence>
          <DeltaPill>{d.delta}</DeltaPill>
        </div>
        <Sparkline color={d.color} className="h-5 w-14 shrink-0" />
      </div>
      <Progress pct={d.share} color={d.color} />
    </FloatCard>
  );
};

const DeliverablesCard: React.FC<{ dept: DeptKey; delay?: number; className?: string }> = ({
  dept,
  delay,
  className
}) => {
  const d = DEPTS[dept];
  return (
    <FloatCard delay={delay} className={className} pad="p-3">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-[11px] font-extrabold text-slate-900">Sprint targets</span>
        <MoreHorizontal className="h-3.5 w-3.5 text-slate-300" />
      </div>
      <AreaSpark id="hero-centered-area" color={d.color} className="h-9 w-full" />
      <ul className="mt-1.5 space-y-1 border-t border-slate-100 pt-1.5">
        {d.deliverables.map((item) => (
          <li key={item} className="flex items-center gap-1.5 text-[9.5px] font-bold text-slate-600">
            <CheckCircle2 className="h-3 w-3 shrink-0" style={{ color: d.color }} />
            <span className="truncate">{item}</span>
          </li>
        ))}
      </ul>
    </FloatCard>
  );
};

const GuaranteesCard: React.FC<{ delay?: number; className?: string }> = ({ delay, className }) => (
  <FloatCard delay={delay} className={className} hoverLift={false} pad="p-3">
    <div className="grid grid-cols-3 gap-2">
      {GUARANTEES.map(({ icon: Icon, label, bg, color }) => (
        <div key={label} className="flex flex-col items-center gap-1 text-center">
          <IconPlate bg={bg} color={color}>
            <Icon className="h-3.5 w-3.5" />
          </IconPlate>
          <span className="text-[9px] font-bold leading-tight text-slate-600">{label}</span>
        </div>
      ))}
    </div>
  </FloatCard>
);

/* ── The code-built centrepiece: a browser frame around a live department board. ── */

const DeviceBoard: React.FC<{ dept: DeptKey; onOpen: () => void }> = ({ dept, onOpen }) => {
  const d = DEPTS[dept];
  const Icon = d.icon;
  const bars = [38, 55, 46, 72, 61, 88, 79];

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white shadow-[0_36px_80px_-36px_rgba(30,27,75,0.42)]">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-3.5 py-2">
        <span className="flex gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
        </span>
        <span className="mx-auto flex items-center gap-1.5 rounded-md bg-white px-2.5 py-0.5 text-[9px] font-bold text-slate-400 ring-1 ring-slate-200/80">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          webants.app / squad-board
        </span>
      </div>

      <div className="space-y-3 p-3.5">
        {/* Board header */}
        <div className="flex items-center gap-2.5">
          <IconPlate bg={d.bgLight} color={d.color} size="md">
            <Icon className="h-4 w-4" />
          </IconPlate>
          <div className="min-w-0 flex-1">
            <AnimatePresence mode="wait" initial={false}>
              <motion.h3
                key={dept}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.22 }}
                className="truncate text-[13px] font-extrabold leading-tight text-slate-900"
              >
                {d.title}
              </motion.h3>
            </AnimatePresence>
            <span className="text-[9.5px] font-semibold text-slate-400">
              Active sprint · {d.turnaround}
            </span>
          </div>
          <span
            className="rounded-md px-1.5 py-0.5 text-[8.5px] font-extrabold uppercase tracking-wider"
            style={{ backgroundColor: d.bgLight, color: d.color }}
          >
            Live
          </span>
        </div>

        {/* Weekly output bars */}
        <div className="rounded-xl bg-slate-50/70 p-3 ring-1 ring-slate-100">
          <div className="mb-2 flex items-baseline justify-between gap-2">
            <CardLabel>Weekly output</CardLabel>
            <span className="truncate text-[9.5px] font-extrabold" style={{ color: d.color }}>
              {d.metric} {d.metricLabel.toLowerCase()}
            </span>
          </div>
          <div className="flex h-[3.25rem] items-end gap-1.5">
            {bars.map((h, i) => (
              <motion.span
                key={i}
                className="flex-1 rounded"
                style={{ backgroundColor: d.color, opacity: 0.25 + (i / bars.length) * 0.7 }}
                initial={{ height: '12%' }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.5, delay: 0.05 * i, ease: EASE_OUT }}
              />
            ))}
          </div>
        </div>

        {/* Two stat tiles */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-slate-50/70 p-2 ring-1 ring-slate-100">
            <CardLabel>Open tickets</CardLabel>
            <span className="block text-sm font-black text-slate-900">3</span>
          </div>
          <div className="rounded-lg bg-slate-50/70 p-2 ring-1 ring-slate-100">
            <CardLabel>Shipped this week</CardLabel>
            <span className="block text-sm font-black text-slate-900">17</span>
          </div>
        </div>

        <button
          onClick={onOpen}
          className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-slate-900 py-2 text-[10.5px] font-extrabold text-white transition-colors duration-200 hover:bg-slate-800"
        >
          <span>Open {d.chip} department</span>
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};

export const HeroCentered: React.FC<HeroCenteredProps> = ({ onNavigate, onOpenBookCall }) => {
  const [dept, setDept] = useState<DeptKey>('growth');
  const active = DEPTS[dept];

  return (
    <section className="relative flex flex-col justify-center overflow-hidden border-b border-slate-100 bg-gradient-to-b from-[#F9F9FE] via-white to-[#F8FAFC] pb-10 pt-7 text-slate-900 sm:pb-12 sm:pt-8 lg:min-h-[calc(100svh_-_7rem)] lg:pb-9 lg:pt-8">
      <div
        className="pointer-events-none absolute -right-[380px] -top-[420px] h-[1100px] w-[1100px]"
        style={{
          background:
            'radial-gradient(circle, rgba(91,97,254,0.10) 0%, rgba(91,97,254,0.05) 42%, transparent 72%)'
        }}
      />
      <div
        className="pointer-events-none absolute -left-[420px] top-[120px] h-[1000px] w-[1000px]"
        style={{
          background:
            'radial-gradient(circle, rgba(124,58,237,0.08) 0%, rgba(124,58,237,0.04) 42%, transparent 72%)'
        }}
      />

      <DotGrid
        id="cent-dots-tl"
        className="pointer-events-none absolute left-3 top-6 hidden h-20 w-20 opacity-70 sm:block"
      />
      <DotGrid
        id="cent-dots-tr"
        className="pointer-events-none absolute right-4 top-16 hidden h-16 w-24 opacity-60 lg:block"
      />
      <DotGrid
        id="cent-dots-bl"
        className="pointer-events-none absolute bottom-6 left-5 hidden h-16 w-20 opacity-50 lg:block"
      />

      <div className="hero-fit relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-4xl text-center xl:max-w-5xl">
          <CurvedArrow
            className="pointer-events-none absolute -right-4 top-[62%] hidden h-16 w-24 xl:block"
            dir="in-right"
          />
          <CurvedArrow
            className="pointer-events-none absolute -left-6 bottom-[12%] hidden h-16 w-24 xl:block"
            dir="in-left"
          />

          {/*
            No forced <br>: `text-balance` settles this into two lines at every step of the scale,
            and on a short laptop the `.hero-fit` zoom step scales the whole composition rather
            than reflowing the headline out from under the collage. The size steps match the
            classic hero's h1 (54px / 60px) so the two variants read at the same weight — the
            container widens at xl because 60px needs the extra room to stay at two lines.
          */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.04, ease: EASE_OUT }}
            className="mx-auto max-w-[54rem] text-balance text-[2rem] font-black leading-[1.05] tracking-tight text-slate-900 sm:text-[2.75rem] lg:text-[54px] xl:max-w-[58rem] xl:text-[60px]"
          >
            Your dedicated squad for{' '}
            <span className="bg-gradient-to-r from-[#5B61FE] to-[#7C3AED] bg-clip-text text-transparent">
              growth, creative,
            </span>{' '}
            web &amp; AI systems.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12, ease: EASE_OUT }}
            className="mx-auto mt-4 max-w-xl text-pretty text-sm font-medium leading-relaxed text-slate-500 lg:text-[0.95rem]"
          >
            Replace fragmented freelancers and slow agencies with{' '}
            <strong className="font-bold text-slate-700">one synchronized team</strong> — paid ads,
            creative, web platforms and automation, on a flexible subscription.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: EASE_OUT }}
            className="mt-6 flex flex-col items-center gap-2"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('free-trial')}
              className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#5B61FE] py-1.5 pl-7 pr-2 text-sm font-extrabold text-white shadow-[0_16px_34px_-12px_rgba(79,70,229,0.6)] transition-colors duration-200 hover:bg-[#4F46E5]"
            >
              <span>Start 7-day free trial</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#4F46E5]">
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </motion.button>

            <button
              onClick={onOpenBookCall}
              className="cursor-pointer text-xs font-bold text-slate-500 underline decoration-slate-300 decoration-2 underline-offset-4 transition-colors duration-200 hover:text-slate-900"
            >
              or book a 15-minute strategy call
            </button>
          </motion.div>

          {/* The Live Squad Terminal's tab row, kept as the section's interaction. */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28, ease: EASE_OUT }}
            className="mt-6 inline-flex flex-wrap items-center justify-center gap-0.5 rounded-2xl bg-white/80 p-1 ring-1 ring-slate-200/80"
          >
            {ORDER.map((key) => {
              const isOn = key === dept;
              return (
                <button
                  key={key}
                  onClick={() => setDept(key)}
                  aria-pressed={isOn}
                  className="cursor-pointer rounded-xl px-3 py-1.5 text-[11px] font-extrabold transition-[color,background-color,box-shadow] duration-200"
                  style={
                    isOn
                      ? { backgroundColor: DEPTS[key].bgLight, color: DEPTS[key].color }
                      : { color: '#94A3B8' }
                  }
                >
                  {DEPTS[key].chip}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/*
          Collage. The container is narrowed to 48rem at lg so the 15rem cards actually overlap the
          20rem board's edges the way the reference does, instead of sitting in their own columns.
          The absolutely-placed cards contribute no height, so the board alone sets it.
        */}
        <div className="relative mx-auto mt-8 max-w-5xl lg:mt-7 lg:max-w-[48rem]">
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT }}
            className="mx-auto w-full max-w-[20rem] sm:max-w-sm lg:max-w-[20rem]"
          >
            <DeviceBoard dept={dept} onOpen={() => onNavigate(active.route)} />
          </motion.div>

          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            <AllocationCard delay={0.36} className="pointer-events-auto absolute left-0 top-0 w-[15rem]" />
            <MetricCard dept={dept} delay={0.44} className="pointer-events-auto absolute left-6 top-[10.75rem] w-[13.5rem]" />
            <DeliverablesCard dept={dept} delay={0.4} className="pointer-events-auto absolute right-0 top-0 w-[15.5rem]" />
            <GuaranteesCard delay={0.48} className="pointer-events-auto absolute bottom-0 right-6 w-[14.5rem]" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
            <AllocationCard delay={0.3} />
            <DeliverablesCard dept={dept} delay={0.36} />
            <MetricCard dept={dept} delay={0.42} />
            <GuaranteesCard delay={0.48} />
          </div>
        </div>
      </div>
    </section>
  );
};
