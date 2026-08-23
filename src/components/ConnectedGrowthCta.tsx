import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  Paintbrush, 
  Code2, 
  Sparkles, 
  Users2,
  Target,
  Link2,
  TrendingUp,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Lock,
  Users,
  ShieldCheck
} from 'lucide-react';

interface ConnectedGrowthCtaProps {
  onNavigate: (page: string) => void;
  onBookCall: () => void;
}

export const ConnectedGrowthCta: React.FC<ConnectedGrowthCtaProps> = ({ onNavigate, onBookCall }) => {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#FAFCFF] via-[#F4F7FF] to-[#FAFCFF] py-20 lg:py-28 overflow-hidden font-body">
      {/* Soft Ambient Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(91,90,254,0.06)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">

        {/* ── 1. SECTION HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 max-w-3xl mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-[#5B5AFE]/20 bg-white/80 backdrop-blur-sm text-[#5B5AFE] text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase shadow-sm">
            THE CONNECTED GROWTH SYSTEM
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
            Turn all the pieces into <br className="hidden sm:block" />
            one <span className="text-[#5B5AFE]">growth system.</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            WebAnts connects Growth, Creative, Technology, AI & Automation and Digital Operations into one powerful engine that drives consistent growth for your business.
          </p>
        </motion.div>

        {/* ── 2. VISUAL CONNECTED ECOSYSTEM DIAGRAM ── */}
        <div className="relative w-full max-w-[940px] mx-auto min-h-[460px] sm:min-h-[540px] flex items-center justify-center my-4">

          {/* SVG Connector Splines with Glow */}
          <svg
            viewBox="0 0 940 540"
            fill="none"
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="curve-glow-l" x1="1" y1="0.5" x2="0" y2="0.5">
                <stop offset="0%" stopColor="#5B5AFE" stopOpacity="0.6" />
                <stop offset="60%" stopColor="#8585FF" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#5B5AFE" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="curve-glow-r" x1="0" y1="0.5" x2="1" y2="0.5">
                <stop offset="0%" stopColor="#5B5AFE" stopOpacity="0.6" />
                <stop offset="60%" stopColor="#8585FF" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#5B5AFE" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="curve-glow-b" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop offset="0%" stopColor="#5B5AFE" stopOpacity="0.6" />
                <stop offset="60%" stopColor="#8585FF" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#5B5AFE" stopOpacity="0.05" />
              </linearGradient>

              <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Concentric Orbit Rings */}
            <circle cx="470" cy="270" r="230" stroke="#5B5AFE" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="4 6" />
            <circle cx="470" cy="270" r="170" stroke="#5B5AFE" strokeOpacity="0.1" strokeWidth="1" />
            <circle cx="470" cy="270" r="115" stroke="#5B5AFE" strokeOpacity="0.18" strokeWidth="1.5" />

            {/* ── Spline Lines ── */}
            {/* 01 Growth (Top Left ~180, 110) */}
            <g>
              <path d="M 470,270 C 370,270 290,140 180,110" stroke="url(#curve-glow-l)" strokeWidth="2.5" strokeOpacity="0.8" />
              <path d="M 470,270 C 360,250 280,120 180,110" stroke="#8585FF" strokeOpacity="0.3" strokeWidth="0.8" />
              <path d="M 470,270 C 380,290 300,160 180,110" stroke="#5B5AFE" strokeOpacity="0.25" strokeWidth="0.8" />
              <circle cx="280" cy="165" r="2.5" fill="#5B5AFE" />
            </g>

            {/* 02 Creative (Mid Left ~140, 340) */}
            <g>
              <path d="M 470,270 C 370,270 260,330 140,340" stroke="url(#curve-glow-l)" strokeWidth="2.5" strokeOpacity="0.8" />
              <path d="M 470,270 C 360,250 250,310 140,340" stroke="#8585FF" strokeOpacity="0.3" strokeWidth="0.8" />
              <path d="M 470,270 C 380,280 270,360 140,340" stroke="#5B5AFE" strokeOpacity="0.25" strokeWidth="0.8" />
              <circle cx="240" cy="325" r="2.5" fill="#5B5AFE" />
            </g>

            {/* 03 Technology (Top Right ~760, 110) */}
            <g>
              <path d="M 470,270 C 570,270 650,140 760,110" stroke="url(#curve-glow-r)" strokeWidth="2.5" strokeOpacity="0.8" />
              <path d="M 470,270 C 580,250 660,120 760,110" stroke="#8585FF" strokeOpacity="0.3" strokeWidth="0.8" />
              <path d="M 470,270 C 560,290 640,160 760,110" stroke="#5B5AFE" strokeOpacity="0.25" strokeWidth="0.8" />
              <circle cx="660" cy="165" r="2.5" fill="#5B5AFE" />
            </g>

            {/* 04 AI & Automation (Mid Right ~800, 340) */}
            <g>
              <path d="M 470,270 C 570,270 680,330 800,340" stroke="url(#curve-glow-r)" strokeWidth="2.5" strokeOpacity="0.8" />
              <path d="M 470,270 C 580,250 690,310 800,340" stroke="#8585FF" strokeOpacity="0.3" strokeWidth="0.8" />
              <path d="M 470,270 C 560,280 670,360 800,340" stroke="#5B5AFE" strokeOpacity="0.25" strokeWidth="0.8" />
              <circle cx="700" cy="325" r="2.5" fill="#5B5AFE" />
            </g>

            {/* 05 Digital Operations (Bottom Center ~470, 480) */}
            <g>
              <path d="M 470,270 C 470,360 470,420 470,480" stroke="url(#curve-glow-b)" strokeWidth="2.5" strokeOpacity="0.8" />
              <path d="M 470,270 C 455,360 460,420 470,480" stroke="#8585FF" strokeOpacity="0.3" strokeWidth="0.8" />
              <path d="M 470,270 C 485,360 480,420 470,480" stroke="#5B5AFE" strokeOpacity="0.25" strokeWidth="0.8" />
              <circle cx="470" cy="410" r="2.5" fill="#5B5AFE" />
            </g>
          </svg>

          {/* ── Central WebAnts Logo Hub ── */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10">
            {/* Outer Soft Halo */}
            <div className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-[#5B5AFE]/10 blur-xl animate-pulse" />
            
            {/* Inner White Orb with Glassmorphism */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-white/90 backdrop-blur-md shadow-[0_10px_40px_-10px_rgba(91,90,254,0.35)] border-2 border-white flex items-center justify-center p-5"
            >
              <img 
                src="/WebAnts.svg" 
                alt="WebAnts Digital" 
                width="465"
                height="96"
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-contain drop-shadow-sm" 
              />
            </motion.div>
          </div>

          {/* ── Node 01: Growth (Top Left) ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="absolute top-[4%] sm:top-[6%] left-[2%] sm:left-[6%] flex items-center gap-3 sm:gap-4 z-20"
          >
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow-[0_8px_25px_-5px_rgba(91,90,254,0.25)] border border-slate-100 flex items-center justify-center text-[#5B5AFE] shrink-0">
              <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#5B5AFE] rounded-full ring-2 ring-white" />
            </div>
            <div className="text-left">
              <div className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-wider">
                <span className="text-[#5B5AFE] mr-1.5">01</span>GROWTH
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-medium leading-tight mt-0.5">
                SEO, Ads &<br className="hidden sm:block"/> Lead Systems
              </div>
            </div>
          </motion.div>

          {/* ── Node 02: Creative (Mid Left) ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute top-[56%] sm:top-[54%] left-[0%] sm:left-[3%] flex items-center gap-3 sm:gap-4 z-20"
          >
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow-[0_8px_25px_-5px_rgba(91,90,254,0.25)] border border-slate-100 flex items-center justify-center text-[#5B5AFE] shrink-0">
              <Paintbrush className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#5B5AFE] rounded-full ring-2 ring-white" />
            </div>
            <div className="text-left">
              <div className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-wider">
                <span className="text-[#5B5AFE] mr-1.5">02</span>CREATIVE
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-medium leading-tight mt-0.5">
                Branding & Video<br className="hidden sm:block"/> Subscriptions
              </div>
            </div>
          </motion.div>

          {/* ── Node 03: Technology (Top Right) ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="absolute top-[4%] sm:top-[6%] right-[2%] sm:right-[6%] flex items-center gap-3 sm:gap-4 flex-row-reverse sm:flex-row text-right sm:text-left z-20"
          >
            <div className="text-right">
              <div className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-wider">
                <span className="text-[#5B5AFE] mr-1.5">03</span>TECHNOLOGY
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-medium leading-tight mt-0.5">
                Websites & Shopify<br className="hidden sm:block"/> Platforms
              </div>
            </div>
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow-[0_8px_25px_-5px_rgba(91,90,254,0.25)] border border-slate-100 flex items-center justify-center text-[#5B5AFE] shrink-0">
              <Code2 className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="absolute bottom-0 left-0 sm:left-auto sm:right-0 w-3 h-3 bg-[#5B5AFE] rounded-full ring-2 ring-white" />
            </div>
          </motion.div>

          {/* ── Node 04: AI & Automation (Mid Right) ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="absolute top-[56%] sm:top-[54%] right-[0%] sm:right-[3%] flex items-center gap-3 sm:gap-4 flex-row-reverse sm:flex-row text-right sm:text-left z-20"
          >
            <div className="text-right">
              <div className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-wider">
                <span className="text-[#5B5AFE] mr-1.5">04</span>AI & AUTOMATION
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-medium leading-tight mt-0.5">
                Chatbots & CRM<br className="hidden sm:block"/> Pipelines
              </div>
            </div>
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow-[0_8px_25px_-5px_rgba(91,90,254,0.25)] border border-slate-100 flex items-center justify-center text-[#5B5AFE] shrink-0">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="absolute bottom-0 left-0 sm:left-auto sm:right-0 w-3 h-3 bg-[#5B5AFE] rounded-full ring-2 ring-white" />
            </div>
          </motion.div>

          {/* ── Node 05: Digital Operations (Bottom Center) ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute bottom-[0%] left-1/2 -translate-x-1/2 flex flex-col items-center text-center gap-2 z-20"
          >
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow-[0_8px_25px_-5px_rgba(91,90,254,0.25)] border border-slate-100 flex items-center justify-center text-[#5B5AFE] shrink-0">
              <Users2 className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="absolute top-0 right-0 w-3 h-3 bg-[#5B5AFE] rounded-full ring-2 ring-white" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-wider">
                <span className="text-[#5B5AFE] mr-1.5">05</span>DIGITAL OPERATIONS
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-medium leading-tight">
                Social & Content Management
              </div>
            </div>
          </motion.div>

        </div>

        {/* ── 3. FLOATING ACTION CARD ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-5xl bg-white rounded-3xl shadow-[0_20px_50px_-15px_rgba(15,23,42,0.07)] border border-slate-100/90 p-6 sm:p-8 lg:p-10 mt-12 sm:mt-16 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-6 w-full">
            
            {/* Left Column (5 cols on lg) */}
            <div className="lg:col-span-5 space-y-2.5 text-center lg:text-left">
              <div className="text-[11px] font-extrabold tracking-[0.18em] text-[#5B5AFE] uppercase flex items-center gap-2 justify-center lg:justify-start">
                <span className="w-1 h-3.5 bg-[#5B5AFE] rounded-full inline-block" />
                <span>ONE PARTNER. ONE SYSTEM. ENDLESS GROWTH.</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                You focus on your business. <br />
                <span className="text-[#5B5AFE]">We connect everything else.</span>
              </h3>
            </div>

            {/* Middle 3 Pillars (4 cols on lg) */}
            <div className="lg:col-span-4 flex items-center justify-around border-y lg:border-y-0 lg:border-x border-slate-100 py-5 lg:py-2 px-2 lg:px-4 w-full">
              <div className="flex flex-col items-center text-center gap-1.5 px-2">
                <Target className="w-5 h-5 text-[#5B5AFE]" />
                <div className="font-bold text-slate-900 text-xs sm:text-sm">Strategy</div>
                <div className="text-[10px] text-slate-500 leading-tight">Aligned to your business goals</div>
              </div>

              <div className="flex flex-col items-center text-center gap-1.5 px-2">
                <Link2 className="w-5 h-5 text-[#5B5AFE]" />
                <div className="font-bold text-slate-900 text-xs sm:text-sm">Systems</div>
                <div className="text-[10px] text-slate-500 leading-tight">Connected for maximum impact</div>
              </div>

              <div className="flex flex-col items-center text-center gap-1.5 px-2">
                <TrendingUp className="w-5 h-5 text-[#5B5AFE]" />
                <div className="font-bold text-slate-900 text-xs sm:text-sm">Growth</div>
                <div className="text-[10px] text-slate-500 leading-tight">Measured, optimized & scaled</div>
              </div>
            </div>

            {/* Right Action Buttons (3 cols on lg) */}
            <div className="lg:col-span-3 flex flex-col items-center lg:items-end justify-center gap-3 w-full">
              <button
                onClick={() => onNavigate('free-trial')}
                className="w-full sm:w-auto lg:w-full bg-[#5B5AFE] hover:bg-[#4F46E5] text-white rounded-xl px-6 py-3.5 font-bold text-xs sm:text-sm transition-[background-color,box-shadow,transform] duration-200 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 cursor-pointer whitespace-nowrap active:scale-[0.98]"
              >
                <span>Build My Growth System</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </button>
              <button
                onClick={onBookCall}
                className="text-[#5B5AFE] hover:text-[#4F46E5] font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer py-0.5"
              >
                <span>Book a free strategy call</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </button>
            </div>

          </div>
        </motion.div>

        {/* ── 4. TRUST & CREDIBILITY BAR ── */}
        <div className="w-full max-w-5xl mt-8 pt-6 border-t border-slate-200/60 flex flex-wrap items-center justify-center gap-x-8 sm:gap-x-12 gap-y-3 text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#5B5AFE]" />
            <span>Trusted by ambitious brands</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#5B5AFE]" />
            <span>Transparent & data-driven</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#5B5AFE]" />
            <span>Human-led. Tech-powered.</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#5B5AFE]" />
            <span>Secure. Reliable. Scalable.</span>
          </div>
        </div>

      </div>
    </section>
  );
};
