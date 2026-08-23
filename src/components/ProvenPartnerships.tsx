import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  CheckCircle2,
  Star,
  Zap,
  ArrowUpRight,
  TrendingUp,
  Users,
  Clock,
  Award
} from 'lucide-react';

/* ─── BRAND TOOLKIT SVG LOGOS ─── */
const BRAND_LOGOS: { id: string; name: string; metric: string; logo: React.ReactNode }[] = [
  {
    id: 'shopify', name: 'Shopify', metric: '4.8x Revenue',
    logo: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12z" />
      </svg>
    )
  },
  {
    id: 'slack', name: 'Slack', metric: '< 15min SLA',
    logo: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.528 2.528 0 0 1 2.522-2.52h2.52v2.52zm1.261 0a2.528 2.528 0 0 1 2.52-2.52 2.528 2.528 0 0 1 2.522 2.52v5.042A2.528 2.528 0 0 1 8.823 22.7a2.528 2.528 0 0 1-2.52-2.52v-5.042z" />
      </svg>
    )
  },
  {
    id: 'webflow', name: 'Webflow', metric: '99 Speed Score',
    logo: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M22.5 4.5l-3.3 12.3c-.2.7-.8 1.2-1.5 1.2h-3.6c-.6 0-1.2-.4-1.4-.9L9.5 8.9l-3.2 8.3c-.2.5-.8.9-1.4.9H1.5L4.8 4.5c.2-.7.8-1.2 1.5-1.2h3.6c.6 0 1.2.4 1.4.9l3.2 8.3 3.2-8.3c.2-.5.8-.9 1.4-.9h3.6c.7 0 1.3.5 1.4 1.2z" />
      </svg>
    )
  },
  {
    id: 'hubspot', name: 'HubSpot', metric: '100% Sync',
    logo: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M18.8 8.1c-.6 0-1.1-.3-1.4-.8l-4.1 2.2c0 .2.1.5.1.7 0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4c.9 0 1.7.3 2.3.8l4.1-2.2c-.1-.3-.2-.6-.2-.9 0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3zm-9.4 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
      </svg>
    )
  },
  {
    id: 'zapier', name: 'Zapier', metric: '40+ Hrs Saved',
    logo: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 0c-.8 0-1.5.7-1.5 1.5v7.6L4.8 3.4c-.6-.6-1.5-.6-2.1 0s-.6 1.5 0 2.1l5.7 5.7H1.5C.7 11.2 0 11.9 0 12.7s.7 1.5 1.5 1.5h6.9l-5.7 5.7c-.6.6-.6 1.5 0 2.1s1.5.6 2.1 0l5.7-5.7v6.9c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-7.6l5.7 5.7c.6.6 1.5.6 2.1 0s.6-1.5 0-2.1l-5.7-5.7h6.9c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5h-6.9l5.7-5.7c.6-.6.6-1.5 0-2.1s-1.5-.6-2.1 0l-5.7 5.7V1.5C13.5.7 12.8 0 12 0z" />
      </svg>
    )
  },
  {
    id: 'klaviyo', name: 'Klaviyo', metric: '+38% Retention',
    logo: (
      <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 'meta', name: 'Meta Ads', metric: '+142% ROAS',
    logo: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v7.005C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    )
  },
  {
    id: 'google', name: 'Google', metric: 'Top 3% Partner',
    logo: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.053 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
      </svg>
    )
  }
];

/* ─── LIVE COUNTER STATS ─── */
const STATS = [
  { icon: TrendingUp, value: '142%', label: 'Avg ROAS Lift', suffix: '' },
  { icon: Users, value: '50+', label: 'Active Brands', suffix: '' },
  { icon: Clock, value: '48h', label: 'Avg Turnaround', suffix: '' },
  { icon: Award, value: '100%', label: 'Job Success Rate', suffix: '' },
];

/* ─── ANIMATED COUNTER HOOK ─── */
function useCountUp(target: number, duration: number = 1800, inView: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, inView]);
  return count;
}

/* ─── STAT CARD ─── */
const StatCard: React.FC<{ icon: React.ComponentType<{ className?: string }>; value: string; label: string; delay: number }> = ({ icon: Icon, value, label, delay }) => {
  const numericPart = parseInt(value.replace(/\D/g, ''), 10);
  const suffix = value.replace(/\d/g, '');
  const [inView, setInView] = useState(false);
  const count = useCountUp(numericPart, 1600, inView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onViewportEnter={() => setInView(true)}
      className="flex items-center gap-3 sm:gap-4"
    >
      <div className="w-10 h-10 rounded-xl bg-[#5B61FE]/10 flex items-center justify-center shrink-0">
        <Icon className="w-4.5 h-4.5 text-[#5B61FE]" />
      </div>
      <div className="text-left">
        <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
          {count}{suffix}
        </div>
        <div className="text-[11px] font-semibold text-slate-500 mt-0.5">{label}</div>
      </div>
    </motion.div>
  );
};


export const ProvenPartnerships: React.FC = () => {
  return (
    <div className="relative w-full select-none overflow-visible">

      {/* ══════════════════════════════════════════════════════════════════════════
          LAYER 1 — LUMINOUS HORIZON DIVIDER
          A dark navy band with a radial indigo glow sits between the hero and
          the trust section. The bottom edge dissolves into the white section
          through layered flowing SVG curves with a glowing gradient stroke —
          creating an aurora-horizon effect unique to the WebAnts brand.
          ══════════════════════════════════════════════════════════════════════════ */}

      <div className="relative w-full bg-[#0B1120] overflow-hidden">

        {/* ── Dark-band radial glow (brand indigo center bloom) ── */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-[#5B61FE]/[0.07] rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[500px] h-[250px] bg-[#7C3AED]/[0.06] rounded-full blur-[80px]" />
        </div>

        {/* ── Fine dot-matrix texture ── */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.25]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(91,97,254,0.35) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* ── Horizontal glowing accent line ── */}
        <div className="relative z-10 flex items-center justify-center py-8 sm:py-10">
          <div className="flex items-center gap-4 w-full max-w-3xl px-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#5B61FE]/40 to-transparent" />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#5B61FE]/20 bg-[#5B61FE]/[0.06] backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#5B61FE] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5B61FE]/80 whitespace-nowrap">
                Trusted Ecosystem
              </span>
            </motion.div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#5B61FE]/40 to-transparent" />
          </div>
        </div>

        {/* ── Layered flowing curves (the "horizon" transition) ── */}
        <div className="relative w-full leading-none -mb-px">
          <svg
            className="w-full h-20 sm:h-28 md:h-36 block"
            viewBox="0 0 1440 140"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Gradient for the glowing primary curve stroke */}
              <linearGradient id="horizon-stroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#5B61FE" stopOpacity="0" />
                <stop offset="20%" stopColor="#5B61FE" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.8" />
                <stop offset="80%" stopColor="#5B61FE" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#5B61FE" stopOpacity="0" />
              </linearGradient>
              {/* Soft glow filter for the stroke */}
              <filter id="horizon-glow" x="-4%" y="-40%" width="108%" height="180%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
              </filter>
            </defs>

            {/* Back layer: very subtle, slightly offset curve */}
            <path
              d="M0,80 C240,110 480,50 720,70 C960,90 1200,40 1440,60 L1440,140 L0,140 Z"
              fill="#F8FAFC"
              opacity="0.3"
            />

            {/* Mid layer: secondary curve at partial opacity */}
            <path
              d="M0,90 C320,60 640,100 960,65 C1120,50 1280,75 1440,55 L1440,140 L0,140 Z"
              fill="#F1F5F9"
              opacity="0.5"
            />

            {/* Primary layer: the solid white fill */}
            <path
              d="M0,95 C360,70 600,110 900,72 C1100,50 1300,80 1440,60 L1440,140 L0,140 Z"
              fill="white"
            />

            {/* Glowing gradient stroke along the primary edge (glow pass) */}
            <path
              d="M0,95 C360,70 600,110 900,72 C1100,50 1300,80 1440,60"
              fill="none"
              stroke="url(#horizon-stroke)"
              strokeWidth="3"
              filter="url(#horizon-glow)"
            />

            {/* Crisp gradient stroke along the primary edge */}
            <path
              d="M0,95 C360,70 600,110 900,72 C1100,50 1300,80 1440,60"
              fill="none"
              stroke="url(#horizon-stroke)"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════════
          LAYER 2 — TRUST & PARTNERSHIPS CONTENT
          Clean white section with a headline, animated stat counters,
          scrolling logo marquee, and verification credentials.
          ══════════════════════════════════════════════════════════════════════════ */}

      <section className="bg-white pt-10 sm:pt-14 pb-16 sm:pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          {/* ── Headline ── */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight"
            >
              Powering growth for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B61FE] to-[#7C3AED]">
                ambitious brands.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed"
            >
              From local service companies to scaling D2C brands — we embed as your
              digital execution squad across every discipline.
            </motion.p>
          </div>

          {/* ── Stat counters row ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-3xl mx-auto pt-2">
            {STATS.map((s, i) => (
              <StatCard key={s.label} icon={s.icon} value={s.value} label={s.label} delay={i * 0.08} />
            ))}
          </div>

          {/* ── Brand logo marquee ── */}
          <div className="relative w-full overflow-hidden py-6">
            {/* Edge fade masks */}
            <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-white via-white/90 to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-white via-white/90 to-transparent z-20 pointer-events-none" />

            <div className="animate-marquee flex gap-5 sm:gap-7 w-max items-center">
              {[...BRAND_LOGOS, ...BRAND_LOGOS, ...BRAND_LOGOS].map((b, idx) => (
                <div
                  key={`${b.id}-${idx}`}
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#F8FAFC] hover:bg-white border border-slate-100 hover:border-[#5B61FE]/30 hover:shadow-lg hover:shadow-indigo-500/[0.04] transition-all duration-300 group cursor-default shrink-0"
                >
                  <div className="w-9 h-9 rounded-xl bg-white group-hover:bg-[#EEF2FF] border border-slate-200/60 group-hover:border-[#5B61FE]/20 flex items-center justify-center text-slate-400 group-hover:text-[#5B61FE] transition-all shadow-xs">
                    {b.logo}
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                        {b.name}
                      </span>
                      <ArrowUpRight className="w-3 h-3 text-slate-300 group-hover:text-[#5B61FE] opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-slate-400 group-hover:text-[#5B61FE]/70 transition-colors block">
                      {b.metric}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Verification badges ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="pt-4 border-t border-slate-100"
          >
            <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-xs font-semibold text-slate-500">
              <span className="inline-flex items-center gap-1.5 hover:text-[#5B61FE] transition-colors">
                <ShieldCheck className="w-4 h-4 text-[#5B61FE]" />
                Google Verified Partner
              </span>
              <span className="text-slate-200 hidden sm:inline">|</span>
              <span className="inline-flex items-center gap-1.5 hover:text-[#5B61FE] transition-colors">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                Upwork Top Rated Plus · 100% JSS
              </span>
              <span className="text-slate-200 hidden sm:inline">|</span>
              <span className="inline-flex items-center gap-1.5 hover:text-[#5B61FE] transition-colors">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Meta Certified Media Buyers
              </span>
              <span className="text-slate-200 hidden sm:inline">|</span>
              <span className="inline-flex items-center gap-1.5 hover:text-[#5B61FE] transition-colors">
                <Zap className="w-4 h-4 text-[#7C3AED]" />
                Shopify & Webflow Experts
              </span>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
};
