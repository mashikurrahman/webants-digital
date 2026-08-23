import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { 
  ArrowRight, 
  TrendingUp, 
  Palette, 
  Code2, 
  Bot, 
  CheckCircle2, 
  Star,
  Zap,
  PhoneCall,
  ShieldCheck,
  Clock,
  MessageSquare
} from 'lucide-react';
import { siteContent, VideoTestimonial } from '../data/siteContent';
import { ClientLogos } from '../components/ClientLogos';
import { ProblemComparison } from '../components/ProblemComparison';
import { ProcessSection } from '../components/ProcessSection';
import { KokonutServicesSection } from '../components/kokonutui/card-stack';
import { VideoTestimonialsSection } from '../components/VideoTestimonialsSection';
import { IntegrationFlowCta } from '../components/IntegrationFlowCta';
import { WorkLedger } from '../components/WorkLedger';


interface HomePageProps {
  onNavigate: (page: string, param?: string) => void;
  onOpenBookCall: () => void;
  onSelectVideo?: (video: VideoTestimonial) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenBookCall, onSelectVideo }) => {
  const [activeDeptTab, setActiveDeptTab] = useState<'growth' | 'creative' | 'tech' | 'ai' | 'ops'>('growth');
  const [hoveredBarIdx, setHoveredBarIdx] = useState<number | null>(null);
  const [techChartX, setTechChartX] = useState<number | null>(null);
  const [isShieldHovered, setIsShieldHovered] = useState<boolean>(false);
  const [isAiGaugeHovered, setIsAiGaugeHovered] = useState<boolean>(false);
  const [isOpsDialHovered, setIsOpsDialHovered] = useState<boolean>(false);
  const [calcAdSpend, setCalcAdSpend] = useState<number>(10000);
  const [calcFreelancers, setCalcFreelancers] = useState<number>(2);
  const [mockupTab, setMockupTab] = useState<'figma' | 'slack' | 'sprint'>('figma');
  const [calcHovered, setCalcHovered] = useState(false);
  const [slackStep, setSlackStep] = useState(0);

  const reduceMotion = useReducedMotion();

  /*
    Two cursor trackers, both coalesced to one animation frame.

    `mousemove` can fire several times between paints, and each event here used to do a
    `getBoundingClientRect()` (a forced synchronous layout) followed by a setState — which
    re-rendered this entire 1200-line page. Interleaved read-then-write across events is also a
    layout thrash loop. Both fire while scrolling, whenever the pointer happens to rest on the
    card, so this was landing on exactly the frames that had to stay cheap.

    The ROI-calculator spotlight is pure decoration, so it skips React entirely and writes CSS
    custom properties straight to the node. The tech chart's scrubber feeds rendered text and SVG
    geometry, so it keeps state but updates at most once per frame. Both measure inside the frame
    rather than caching on pointer-enter, so the rect stays correct as the card moves under the
    scroller.
  */
  const calcCardRef = useRef<HTMLDivElement>(null);
  const calcPointer = useRef({ x: 0, y: 0 });
  const calcFrame = useRef(0);
  const techChartEl = useRef<HTMLDivElement>(null);
  const techPointerX = useRef(0);
  const techFrame = useRef(0);

  useEffect(() => () => {
    if (calcFrame.current) cancelAnimationFrame(calcFrame.current);
    if (techFrame.current) cancelAnimationFrame(techFrame.current);
  }, []);

  const trackCalcCard = (e: React.MouseEvent<HTMLDivElement>) => {
    calcPointer.current.x = e.clientX;
    calcPointer.current.y = e.clientY;
    if (calcFrame.current) return;
    calcFrame.current = requestAnimationFrame(() => {
      calcFrame.current = 0;
      const node = calcCardRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      node.style.setProperty('--calc-x', `${calcPointer.current.x - rect.left}px`);
      node.style.setProperty('--calc-y', `${calcPointer.current.y - rect.top}px`);
    });
  };

  const trackTechChart = (e: React.MouseEvent<HTMLDivElement>) => {
    techPointerX.current = e.clientX;
    if (techFrame.current) return;
    techFrame.current = requestAnimationFrame(() => {
      techFrame.current = 0;
      const node = techChartEl.current;
      if (!node) return;
      setTechChartX(techPointerX.current - node.getBoundingClientRect().left);
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setSlackStep((prev) => (prev + 1) % 4);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const departmentShowcase = {
    growth: {
      title: 'Growth & Performance Ads',
      tagline: 'Scale customer acquisition with profitable paid traffic & high-converting landing pages.',
      metrics: '+142% Avg ROAS Lift',
      deliverables: ['Google & Meta Ads Management', 'High-Converting Landing Pages', 'Lead Routing & CRM Tracking', 'Conversion Rate Optimization (CRO)'],
      turnaround: '48 - 72 Hours',
      status: 'Active Sprint',
      color: '#5B61FE',
      bgLight: '#EEF2FF',
      icon: TrendingUp,
      route: 'growth'
    },
    creative: {
      title: 'Creative Studio & Video',
      tagline: 'Standout visual identities, scroll-stopping ad creatives, and high-production motion reels.',
      metrics: '90+ Assets / Mo',
      deliverables: ['Performance Ad Creatives', 'Short-Form Video (Reels/TikTok)', 'Brand Guidelines & Identity', 'Figma UI/UX Prototypes'],
      turnaround: '24 - 48 Hours',
      status: 'In Production',
      color: '#D97706',
      bgLight: '#FFFBEB',
      icon: Palette,
      route: 'creative'
    },
    tech: {
      title: 'Web & Shopify Platforms',
      tagline: 'Blazing-fast modern web applications, headless commerce, and custom portals built to convert.',
      metrics: '99/100 Speed Score',
      deliverables: ['Custom Next.js / React Apps', 'Shopify Store Customization', 'Figma to Code Implementation', 'API Integrations & Maintenance'],
      turnaround: '3 - 5 Days',
      status: 'Deploying',
      color: '#7C3AED',
      bgLight: '#F5F3FF',
      icon: Code2,
      route: 'technology'
    },
    ai: {
      title: 'AI Systems & Automations',
      tagline: 'Automate repetitive workflows, sync leads instantly, and deploy smart customer assistants.',
      metrics: '40+ Hrs Saved / Wk',
      deliverables: ['Zapier & Make Automation Pipelines', 'AI Chatbots & Lead Qualifiers', 'CRM Pipeline Auto-Sync', 'Custom Webhooks & Scripts'],
      turnaround: '24 - 72 Hours',
      status: 'Live & Synced',
      color: '#0284C7',
      bgLight: '#F0F9FF',
      icon: Bot,
      route: 'ai-automation'
    },
    ops: {
      title: 'Digital Operations & Support',
      tagline: 'Senior digital execution team embedded directly in your Slack for fast daily turnarounds.',
      metrics: '< 15min Slack SLA',
      deliverables: ['Direct Slack / Loom Sync', 'Dedicated Project Management', 'Weekly Performance Sprint Reviews', 'Asset & Platform Maintenance'],
      turnaround: 'Real-time Daily',
      status: 'Online',
      color: '#16A34A',
      bgLight: '#F0FDF4',
      icon: Zap,
      route: 'digital-operations'
    }
  };

  const currentShowcase = departmentShowcase[activeDeptTab];
  const ActiveIcon = currentShowcase.icon;

  return (
    <div className="space-y-0 text-slate-900 bg-white relative">
      
      {/* ─── 1. HERO SECTION: CLEAN EDITORIAL LUXURY ─── */}
      <section className="bg-gradient-to-b from-[#F9F9FE] via-[#FFFFFF] to-[#F8FAFC] text-slate-900 pt-8 sm:pt-14 pb-16 sm:pb-24 relative overflow-hidden border-b border-slate-100">
        
        {/* Subtle Ambient Background Glows — radial gradients, not filter: blur().
            Boxes are ~1.4x the old blurred boxes and re-centred on the same point so
            the glow covers the same area at the same softness. */}
        <div
          className="absolute -top-[38px] -right-[38px] w-[540px] h-[540px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(238,242,255,0.60) 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-[38px] -left-[38px] w-[540px] h-[540px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(237,233,254,0.50) 0%, transparent 70%)' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Value Proposition */}
            <motion.div 
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              {/* Category Kicker */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="flex items-center justify-center lg:justify-start gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-[#5B61FE]"
              >
                <span className="w-2 h-2 rounded-full bg-[#5B61FE]" />
                <span>All-In-One Digital Execution Squad</span>
              </motion.div>

              {/* Main Punchy Headline */}
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.5 }}
                className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-black text-slate-900 tracking-tight leading-[1.1]"
              >
                Your Dedicated Squad for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B61FE] to-[#7C3AED]">
                  Growth, Creative,
                </span>{' '}
                Web & AI Systems.
              </motion.h1>

              {/* Specific Outcome-Driven Subheading */}
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium"
              >
                Replace fragmented freelancers and slow agencies with <strong>one synchronized team</strong>. We run your paid ads, craft high-converting creative, build modern web platforms, and automate operations on a flexible subscription.
              </motion.p>

              {/* Primary Action Buttons & Social Proof Stack */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
              >
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onNavigate('free-trial')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#5B61FE] hover:bg-[#4F46E5] text-white font-extrabold text-sm shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
                >
                  <span>Start 7-Day Free Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onOpenBookCall}
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200/90 shadow-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-[#5B61FE]" />
                  <span>Book Strategy Call</span>
                </motion.button>
              </motion.div>

              {/* 3 Core Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-200/70 text-left">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.4 }}
                  whileHover={{ scale: 1.04, y: -2 }}
                  className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-200/70 shadow-xs cursor-default transition-shadow hover:shadow-md"
                >
                  <Clock className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span className="text-xs font-bold text-slate-800">48-72h Turnarounds</span>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65, duration: 0.4 }}
                  whileHover={{ scale: 1.04, y: -2 }}
                  className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-200/70 shadow-xs cursor-default transition-shadow hover:shadow-md"
                >
                  <MessageSquare className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span className="text-xs font-bold text-slate-800">Direct Slack Sync</span>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75, duration: 0.4 }}
                  whileHover={{ scale: 1.04, y: -2 }}
                  className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-200/70 shadow-xs cursor-default transition-shadow hover:shadow-md"
                >
                  <ShieldCheck className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span className="text-xs font-bold text-slate-800">No Long-Term Lock-in</span>
                </motion.div>
              </div>

            </motion.div>

            {/* Right Column: Interactive Live Department Sprint Terminal */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 relative"
            >
              <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-indigo-100 shadow-2xl space-y-5 text-left relative overflow-hidden">
                
                {/* Header with Active Indicator */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono font-extrabold text-slate-900 tracking-wider">
                      LIVE SQUAD TERMINAL
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 font-mono">
                    5 Active Disciplines
                  </span>
                </div>

                {/* 5 Department Quick Tabs */}
                <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-2xl">
                  {(['growth', 'creative', 'tech', 'ai', 'ops'] as const).map((key) => {
                    const isSelected = activeDeptTab === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setActiveDeptTab(key)}
                        className={`flex-1 py-2 px-2.5 rounded-xl text-[11px] font-extrabold transition-[color,background-color,border-color,box-shadow] cursor-pointer text-center whitespace-nowrap ${
                          isSelected 
                            ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60' 
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        {key === 'growth' && 'Growth'}
                        {key === 'creative' && 'Creative'}
                        {key === 'tech' && 'Web'}
                        {key === 'ai' && 'AI & Auto'}
                        {key === 'ops' && 'Slack Ops'}
                      </button>
                    );
                  })}
                </div>

                {/* Active Department Details Box */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDeptTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-5 pt-1"
                  >
                    {/* Header Row */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-11 h-11 rounded-2xl flex items-center justify-center font-bold shadow-xs shrink-0"
                          style={{ backgroundColor: currentShowcase.bgLight, color: currentShowcase.color }}
                        >
                          <ActiveIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-base font-extrabold text-slate-900">
                            {currentShowcase.title}
                          </h3>
                          <span className="text-xs font-semibold text-slate-500 block">
                            {currentShowcase.metrics}
                          </span>
                        </div>
                      </div>

                      <span 
                        className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md border"
                        style={{ borderColor: currentShowcase.color, color: currentShowcase.color, backgroundColor: currentShowcase.bgLight }}
                      >
                        {currentShowcase.status}
                      </span>
                    </div>

                    {/* Conversational Squad Agent Bubble */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="bg-indigo-50/50 border border-indigo-100/50 rounded-2xl p-3 flex items-start gap-3 shadow-xs"
                    >
                      <div className="relative shrink-0">
                        <div className="w-8 h-8 rounded-full bg-[#5B61FE] text-white flex items-center justify-center font-extrabold text-[10px] shadow-sm font-mono">
                          WA
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
                      </div>
                      <div className="space-y-0.5 text-left">
                        <span className="text-[9px] font-mono font-extrabold text-slate-400 block uppercase tracking-wider">
                          Webants Squad Lead
                        </span>
                        <p className="text-[11px] text-slate-700 font-semibold leading-relaxed">
                          {activeDeptTab === 'growth' && "Hey! Hover over the daily bars on the right to inspect real-time growth spikes. Our latest sprint optimizations lifted active ROAS by 142%."}
                          {activeDeptTab === 'creative' && "We build standalone, scroll-stopping visual assets. Hover over the security shield to check our internal asset design validation steps."}
                          {activeDeptTab === 'tech' && "Hover anywhere along the wave graph to scan our mobile loading milestones. Keeping FCP under 0.4s prevents checkout drops."}
                          {activeDeptTab === 'ai' && "We automate repetitive business workflows. Hover over the process dial to qualify lead qualify capture and see hours saved."}
                          {activeDeptTab === 'ops' && "We embed directly in your Slack for daily sync. Hover the dial to see our real-time coverage SLA statistics."}
                        </p>
                      </div>
                    </motion.div>

                    {/* Split Grid: Deliverables Checklist (Left) & Growth Analytics Widget (Right) */}
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                      
                      {/* Left: Deliverables Checklist (2/5 Columns) */}
                      <div className="sm:col-span-2 space-y-2 bg-[#F8FAFC] p-3.5 rounded-2xl border border-slate-100 flex flex-col justify-between text-left">
                        <div className="space-y-2">
                          <span className="text-[9px] font-mono font-extrabold text-slate-400 uppercase tracking-wider block">
                            Sprint Targets:
                          </span>
                          <div className="space-y-1.5">
                            {currentShowcase.deliverables.slice(0, 3).map((item) => (
                              <div key={item} className="flex items-center gap-2 text-[10px] font-bold text-slate-700">
                                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: currentShowcase.color }} />
                                <span className="truncate">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="text-[10px] text-slate-500 font-medium pt-2 border-t border-slate-200/50">
                          Avg: <strong className="text-slate-900">{currentShowcase.turnaround}</strong>
                        </div>
                      </div>

                      {/* Right: Premium Dynamic Visual Dashboard Widget (3/5 Columns) */}
                      <div className="sm:col-span-3 bg-slate-50/50 border border-slate-200/60 rounded-2xl p-4 flex flex-col justify-between min-h-[140px] relative overflow-hidden">
                        
                        {/* ── GROWTH (ROI Rounded Bars with Tooltips) ── */}
                        {activeDeptTab === 'growth' && (
                          <div className="w-full h-full flex flex-col justify-between">
                            <div className="flex justify-between items-start text-left">
                              <div>
                                <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Total lead value</span>
                                <span className="text-lg font-black text-slate-900">$12,404.00</span>
                              </div>
                              <span className="text-[9.5px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-md border border-emerald-100 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span>+142% ROAS</span>
                              </span>
                            </div>

                            {/* SVG Bar Chart with rounded indigo bars */}
                            <div className="flex items-end justify-between gap-1.5 pt-2 h-14 relative">
                              {[30, 48, 38, 76, 52, 42, 60].map((h, i) => {
                                const dayVal = [120, 240, 180, 450, 310, 210, 380][i];
                                return (
                                  <div 
                                    key={i} 
                                    className="flex-1 flex flex-col items-center gap-1 relative group"
                                    onMouseEnter={() => setHoveredBarIdx(i)}
                                    onMouseLeave={() => setHoveredBarIdx(null)}
                                  >
                                    {/* Tooltip */}
                                    <AnimatePresence>
                                      {hoveredBarIdx === i && (
                                        <motion.div 
                                          initial={{ opacity: 0, y: 4, scale: 0.9 }}
                                          animate={{ opacity: 1, y: 0, scale: 1 }}
                                          exit={{ opacity: 0, y: 2, scale: 0.9 }}
                                          className="absolute -top-7 bg-slate-950 text-white text-[8px] font-mono font-bold px-1.5 py-0.5 rounded shadow-lg whitespace-nowrap z-25 pointer-events-none"
                                        >
                                          +{dayVal} leads
                                        </motion.div>
                                      )}
                                    </AnimatePresence>

                                    <div className="w-full bg-slate-100 rounded-full h-11 relative overflow-hidden cursor-pointer">
                                      <motion.div 
                                        initial={{ height: 0 }}
                                        animate={{ height: `${h}%` }}
                                        transition={{ duration: 0.6, delay: i * 0.05 }}
                                        className={`w-full rounded-full absolute bottom-0 transition-colors ${
                                          hoveredBarIdx === i 
                                            ? 'bg-[#4F46E5]' 
                                            : i === 3 
                                              ? 'bg-[#5B61FE]' 
                                              : 'bg-[#C7D2FE]'
                                        }`}
                                      />
                                    </div>
                                    <span className={`text-[8px] font-extrabold transition-colors ${hoveredBarIdx === i ? 'text-[#5B61FE]' : 'text-slate-400'}`}>
                                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'][i]}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* ── CREATIVE (UI Asset Quality Live Workspace Console) ── */}
                        {activeDeptTab === 'creative' && (
                          <div className="w-full h-full flex flex-col justify-between space-y-2">
                            
                            {/* Inner Header with Sub-tabs */}
                            <div className="flex justify-between items-center text-left">
                              <div>
                                <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Workspace Console</span>
                              </div>
                              
                              <div className="flex gap-1.5 p-0.5 bg-slate-100/90 border border-slate-200/40 rounded-lg">
                                {(['figma', 'slack', 'sprint'] as const).map((tab) => (
                                  <button
                                    key={tab}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setMockupTab(tab);
                                    }}
                                    className={`py-0.5 px-1.5 rounded-md text-[8px] font-black uppercase transition-[color,background-color,border-color,box-shadow] whitespace-nowrap cursor-pointer ${
                                      mockupTab === tab 
                                        ? 'bg-white text-slate-800 shadow-xs border border-slate-200/40' 
                                        : 'text-slate-500 hover:text-slate-700'
                                    }`}
                                  >
                                    {tab}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Display screen based on mockupTab */}
                            <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-2.5 min-h-[96px] text-left relative overflow-hidden flex flex-col justify-center">
                              
                              {/* 1. FIGMA SCREEN */}
                              {mockupTab === 'figma' && (
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center text-[7px] text-slate-400 font-mono">
                                    <span>🎨 checkout-mockup.fig</span>
                                    <span className="text-emerald-400">● Live editing</span>
                                  </div>
                                  <div className="relative aspect-[16/6] bg-slate-950 border border-slate-800/80 rounded-lg p-2 overflow-hidden flex items-center justify-between">
                                    <div className="w-7 h-7 rounded bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-[7px] font-bold text-white uppercase tracking-wider">
                                      Frame
                                    </div>
                                    <div className="w-16 h-4 bg-slate-800 rounded-full animate-pulse" />
                                    {/* Animated Cursor */}
                                    <motion.svg 
                                      className="absolute w-4 h-4 overflow-visible"
                                      viewBox="0 0 10 10"
                                      animate={{
                                        x: [10, 80, 50, 10],
                                        y: [8, 16, 22, 8]
                                      }}
                                      transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                      }}
                                    >
                                      <path d="M 0 0 L 8 3 L 3 8 Z" fill="#F24E1E" />
                                    </motion.svg>
                                  </div>
                                </div>
                              )}

                              {/* 2. SLACK SCREEN */}
                              {mockupTab === 'slack' && (
                                <div className="space-y-1.5 font-mono text-[8px] leading-tight text-slate-300">
                                  <div className="border-b border-slate-800 pb-1 text-[7px] text-slate-500 font-bold uppercase tracking-wider">
                                    💬 #ops-sprint-creative
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex gap-1.5 items-start">
                                      <span className="text-[#5B61FE] font-black shrink-0">Client:</span>
                                      <span>Edit the main checkout button CTA copy?</span>
                                    </div>
                                    <div className="flex gap-1.5 items-start text-emerald-400">
                                      <span className="font-black shrink-0">Squad:</span>
                                      <span>Done! Render file deployed. SLA: 12m</span>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* 3. SPRINT SCREEN (Kanban) */}
                              {mockupTab === 'sprint' && (
                                <div className="space-y-1.5">
                                  <div className="flex justify-between items-center text-[7px] text-slate-400 font-mono">
                                    <span>📋 active-sprint-04</span>
                                    <span className="text-indigo-400">48h SLA Active</span>
                                  </div>
                                  <div className="grid grid-cols-3 gap-1.5 h-14">
                                    <div className="bg-slate-950 border border-slate-800 p-1.5 rounded-lg text-[6px] font-mono font-bold text-slate-500">
                                      TODO
                                    </div>
                                    <div className="bg-slate-950 border border-slate-800 p-1.5 rounded-lg text-[6px] font-mono font-bold text-slate-500">
                                      DOING
                                    </div>
                                    <div className="bg-indigo-950/40 border border-indigo-900/60 p-1 rounded-lg text-[6px] font-mono font-bold text-indigo-400 flex flex-col justify-between">
                                      <span>DONE</span>
                                      <motion.div 
                                        initial={{ y: 8, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ repeat: Infinity, duration: 2.2, repeatDelay: 0.8 }}
                                        className="bg-white text-slate-900 border border-slate-200 rounded p-1 shadow-xs text-center"
                                      >
                                        Deploy Ads
                                      </motion.div>
                                    </div>
                                  </div>
                                </div>
                              )}

                            </div>
                          </div>
                        )}

                        {/* ── WEB / TECH (Mobile Site Speed Wave Area Chart with Scanner) ── */}
                        {activeDeptTab === 'tech' && (
                          <div
                            ref={techChartEl}
                            className="w-full h-full flex flex-col justify-between cursor-crosshair"
                            onMouseMove={trackTechChart}
                            onMouseLeave={() => setTechChartX(null)}
                          >
                            <div className="flex justify-between items-start text-left">
                              <div>
                                <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Site Performance</span>
                                <span className="text-lg font-black text-slate-900">
                                  {techChartX ? `${Math.round(85 + (techChartX / 180) * 14)} / 100` : "99 / 100 Score"}
                                </span>
                              </div>
                              <span className="text-[9.5px] font-bold px-2 py-0.5 bg-indigo-50 text-[#5B61FE] rounded-md border border-indigo-100">
                                {techChartX ? `${(0.9 - (techChartX / 180) * 0.5).toFixed(2)}s LCP` : "0.4s FCP Load"}
                              </span>
                            </div>

                            {/* SVG Wave Line Area Chart */}
                            <div className="relative h-14 w-full pt-1">
                              <svg className="w-full h-full overflow-visible" viewBox="0 0 160 50" preserveAspectRatio="none">
                                <defs>
                                  <linearGradient id="wave-grad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#5B61FE" stopOpacity="0.25" />
                                    <stop offset="100%" stopColor="#5B61FE" stopOpacity="0" />
                                  </linearGradient>
                                </defs>
                                {/* Area Fill */}
                                <path 
                                  d="M 0 45 Q 35 40 70 20 T 160 8 L 160 50 L 0 50 Z" 
                                  fill="url(#wave-grad)" 
                                />
                                {/* Line Path */}
                                <motion.path 
                                  d="M 0 45 Q 35 40 70 20 T 160 8" 
                                  stroke="#5B61FE" 
                                  strokeWidth="2.5" 
                                  fill="none"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{ duration: 0.8 }}
                                />
                                {/* Endpoint dot */}
                                <circle cx="160" cy="8" r="3" fill="#5B61FE" />

                                {/* Interactive vertical scanning ruler */}
                                {techChartX !== null && (
                                  <g>
                                    <line 
                                      x1={(techChartX / 180) * 160} 
                                      y1="0" 
                                      x2={(techChartX / 180) * 160} 
                                      y2="50" 
                                      stroke="#5B61FE" 
                                      strokeWidth="1" 
                                      strokeDasharray="2 2" 
                                    />
                                    <circle 
                                      cx={(techChartX / 180) * 160} 
                                      cy={45 - (techChartX / 180) * 23} 
                                      r="4" 
                                      fill="#5B61FE" 
                                      stroke="#FFFFFF" 
                                      strokeWidth="1.5" 
                                    />
                                  </g>
                                )}
                              </svg>
                            </div>
                          </div>
                        )}

                        {/* ── AI & AUTO (Automation Process Segment Gauge with status hover) ── */}
                        {activeDeptTab === 'ai' && (
                          <div 
                            className="w-full h-full flex items-center justify-between cursor-pointer"
                            onMouseEnter={() => setIsAiGaugeHovered(true)}
                            onMouseLeave={() => setIsAiGaugeHovered(false)}
                          >
                            <div className="text-left space-y-1 max-w-[120px]">
                              <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Automated pipelines</span>
                              <span className="text-lg font-black text-slate-900">
                                {isAiGaugeHovered ? "Auto Sync" : "80% Done"}
                              </span>
                              <p className="text-[9px] font-medium text-slate-500 leading-tight">CRM qualification & routing</p>
                            </div>

                            {/* Circle Process Segment blocks matching Card 4 in Image 1 */}
                            <div className="relative w-24 h-24 flex items-center justify-center">
                              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                {/* Base segments */}
                                <circle 
                                  cx="50" cy="50" r="34" 
                                  stroke="#EEF2FF" strokeWidth="8" strokeDasharray="6 3" 
                                  fill="none" 
                                />
                                {/* Colored active segments */}
                                <motion.circle 
                                  cx="50" cy="50" r="34" 
                                  stroke={isAiGaugeHovered ? '#4F46E5' : '#5B61FE'} 
                                  strokeWidth="8" 
                                  strokeDasharray="6 3" 
                                  strokeDashoffset="0"
                                  fill="none" 
                                  initial={{ strokeDasharray: "0 100" }}
                                  animate={{ strokeDasharray: "155 100" }}
                                  transition={{ duration: 0.7 }}
                                />
                              </svg>
                              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-900">
                                <motion.span 
                                  animate={{ scale: isAiGaugeHovered ? 1.15 : 1 }}
                                  className="text-xs font-black"
                                >
                                  40 Hrs
                                </motion.span>
                                <span className="text-[8px] font-bold text-slate-400 uppercase">Saved / Wk</span>
                              </div>

                              {/* Tooltip */}
                              <AnimatePresence>
                                {isAiGaugeHovered && (
                                  <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="absolute -top-6 bg-slate-950 text-white text-[8px] font-bold px-2 py-0.5 rounded shadow-xs whitespace-nowrap z-20 pointer-events-none"
                                  >
                                    PIPELINES RUNNING
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        )}

                        {/* ── OPS / SLACK (Slack SLA Dial Gauge with Dial movement) ── */}
                        {activeDeptTab === 'ops' && (
                          <div className="w-full h-full flex flex-col justify-between text-left relative overflow-hidden select-none">
                            <div className="flex justify-between items-center pb-2 border-b border-slate-100/60">
                              <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider font-mono">
                                💬 #ops-sprint-creative
                              </span>
                              <span className="text-[8px] font-bold px-2 py-0.5 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded flex items-center gap-1 z-10">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span>Response SLA: 9 mins</span>
                              </span>
                            </div>

                            <div className="flex-1 flex flex-col justify-end space-y-2 mt-3 min-h-[140px]">
                              {/* Step 0: Client query */}
                              {slackStep >= 0 && (
                                <motion.div 
                                  initial={{ opacity: 0, y: 5 }} 
                                  animate={{ opacity: 1, y: 0 }} 
                                  className="flex items-start gap-1.5"
                                >
                                  <span className="text-[9px] font-black text-slate-800 shrink-0 font-mono">Client:</span>
                                  <span className="text-[9.5px] text-slate-600 leading-normal font-medium bg-slate-50 border border-slate-100 px-2 py-1 rounded-xl rounded-tl-none">
                                    Hey guys, can we update the checkout CTA copy to "Start Free Trial"?
                                  </span>
                                </motion.div>
                              )}

                              {/* Step 0 typing indicator */}
                              {slackStep === 0 && (
                                <motion.div 
                                  initial={{ opacity: 0 }} 
                                  animate={{ opacity: 1 }} 
                                  className="flex items-center gap-1.5 text-slate-400 text-[8px] italic font-mono pl-8"
                                >
                                  <span className="inline-flex gap-0.5 items-center">
                                    <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce" />
                                    <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.1s' }} />
                                    <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                                  </span>
                                  <span>WebAnts Squad Lead is typing...</span>
                                </motion.div>
                              )}

                              {/* Step 1: Squad response */}
                              {slackStep >= 1 && (
                                <motion.div 
                                  initial={{ opacity: 0, y: 5 }} 
                                  animate={{ opacity: 1, y: 0 }} 
                                  className="flex items-start gap-1.5 pl-4"
                                >
                                  <span className="text-[9px] font-black text-[#5B61FE] shrink-0 font-mono">Squad Lead:</span>
                                  <span className="text-[9.5px] text-slate-700 bg-indigo-50/50 border border-indigo-100/50 px-2 py-1 rounded-xl rounded-tl-none font-medium leading-normal">
                                    Understood! Let's get that variant deployed. Designer is on it.
                                  </span>
                                </motion.div>
                              )}

                              {/* Step 1 typing indicator */}
                              {slackStep === 1 && (
                                <motion.div 
                                  initial={{ opacity: 0 }} 
                                  animate={{ opacity: 1 }} 
                                  className="flex items-center gap-1.5 text-slate-400 text-[8px] italic font-mono pl-12"
                                >
                                  <span className="inline-flex gap-0.5 items-center">
                                    <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce" />
                                    <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.1s' }} />
                                    <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                                  </span>
                                  <span>WebAnts Designer is typing...</span>
                                </motion.div>
                              )}

                              {/* Step 2: Designer delivers */}
                              {slackStep >= 2 && (
                                <motion.div 
                                  initial={{ opacity: 0, y: 5 }} 
                                  animate={{ opacity: 1, y: 0 }} 
                                  className="flex items-start gap-1.5 pl-8"
                                >
                                  <span className="text-[9px] font-black text-[#5B61FE] shrink-0 font-mono">Designer:</span>
                                  <div className="space-y-1">
                                    <span className="text-[9.5px] text-slate-700 bg-indigo-50/50 border border-indigo-100/50 px-2 py-1 rounded-xl rounded-tl-none font-medium leading-normal block">
                                      Asset updated in Figma. Check out:
                                    </span>
                                    <div className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-[8px] font-mono font-bold text-slate-500">
                                      <span>🎨 checkout-frame.fig</span>
                                    </div>
                                  </div>
                                </motion.div>
                              )}

                              {/* Step 2 typing indicator */}
                              {slackStep === 2 && (
                                <motion.div 
                                  initial={{ opacity: 0 }} 
                                  animate={{ opacity: 1 }} 
                                  className="flex items-center gap-1.5 text-slate-400 text-[8px] italic font-mono pl-16"
                                >
                                  <span className="inline-flex gap-0.5 items-center">
                                    <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce" />
                                    <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.1s' }} />
                                    <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                                  </span>
                                  <span>Deploying check...</span>
                                </motion.div>
                              )}

                              {/* Step 3: Deployment completed */}
                              {slackStep === 3 && (
                                <motion.div 
                                  initial={{ opacity: 0, y: 5 }} 
                                  animate={{ opacity: 1, y: 0 }} 
                                  className="flex items-start gap-1.5 pl-12"
                                >
                                  <span className="text-[9px] font-black text-emerald-600 shrink-0 font-mono">Squad Dev:</span>
                                  <span className="text-[9.5px] text-emerald-800 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-xl rounded-tl-none font-medium leading-normal flex items-center gap-1">
                                    <span className="font-bold">Live!</span> SLA Completed: 9 mins turnaround.
                                  </span>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        )}

                      </div>

                    </div>

                    {/* Bottom CTA trigger */}
                    <div className="pt-1 text-right">
                      <button
                        onClick={() => onNavigate(currentShowcase.route)}
                        className="text-xs font-extrabold text-[#5B61FE] hover:underline flex items-center gap-1 ml-auto cursor-pointer"
                      >
                        <span>View Department Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── 2. CLIENT TRUST LOGOS (CLEAN EDITORIAL) ─── */}
      <ClientLogos />

      {/* ─── 3. THE WEBANTS ADVANTAGE (PROBLEM VS SOLUTION) ─── */}
      <ProblemComparison onExplore={() => onNavigate('services')} />

      {/* ─── 4. CORE SERVICES: KOKONUTUI 3D CARD STACK ─── */}
      <KokonutServicesSection 
        onNavigate={onNavigate} 
        onOpenBookCall={onOpenBookCall} 
      />

      {/* ─── 5. VIDEO STORIES & FOUNDER TESTIMONIALS ─── */}
      <VideoTestimonialsSection onSelectVideo={onSelectVideo} />

      {/* ─── 6. CLIENT QUOTES (FOUNDER FEEDBACK GRID) ─── */}
      <section className="py-20 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5B61FE]">
              Client Feedback
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              What founders say about the squad.
            </h2>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              Real feedback from business leaders scaling their operations with Webants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {siteContent.testimonials.map((t, idx) => (
              <motion.div 
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-[#F8FAFC] border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-shadow flex flex-col justify-between space-y-4 cursor-default"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 font-semibold">
                      Verified Client
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed italic font-medium">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <img 
                    src={t.avatar} 
                    alt={t.author} 
                    width="40"
                    height="40"
                    loading="lazy"
                    decoding="async"
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">{t.author}</div>
                    <div className="text-[10px] text-slate-500 font-medium">{t.role}, {t.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── 7. SELECTED WORK & THE EVIDENCE FOR IT ─── */}
      <WorkLedger onNavigate={onNavigate} />

      {/* ─── 8. 5-STEP DELIVERY PROCESS ─── */}
      <ProcessSection />

      {/* ─── 9. TRANSPARENT PRICING / FLEXIBLE ENGAGEMENT ─── */}
      <section className="py-20 bg-[#F8FAFC] border-b border-slate-200/60 text-slate-900 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-3 max-w-2xl mx-auto"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5B61FE]">
              Flexible Engagement
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Choose how you want to work.
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              Transparent, predictable pricing with full pause or cancel freedom.
            </p>
          </motion.div>

          {/* Two-Column Layout: Plans Grid (Left) & ROI Calculator Widget (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
            
            {/* Left: 2x2 Plans Grid (7/12 columns) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Subscription Card (Highlighted Light Mode) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4 }}
                className="bg-gradient-to-b from-[#F5F7FF] via-white to-[#F5F7FF] rounded-3xl p-5 border-2 border-[#5B61FE] shadow-xl shadow-indigo-600/5 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#5B61FE] text-white uppercase tracking-wider">
                    Recommended
                  </span>
                  <h3 className="text-base font-bold text-slate-900">Subscription</h3>
                  <div className="text-xl font-black text-[#5B61FE]">From $1,200/mo</div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Continuous multi-department execution with direct Slack sync.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="w-full mt-4 py-2 px-4 rounded-xl bg-[#5B61FE] hover:bg-[#4F46E5] font-bold text-white text-xs shadow-md shadow-indigo-600/30 transition-colors cursor-pointer"
                >
                  View Subscription Tiers
                </button>
              </motion.div>

              {/* Fixed Project */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#EEF2FF] text-[#5B61FE] uppercase tracking-wider">
                    Defined Scope
                  </span>
                  <h3 className="text-base font-bold text-slate-900">Fixed Project</h3>
                  <div className="text-xl font-black text-slate-900">From $2,500</div>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    Defined milestones, timeline and agreed-upon deliverables.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="w-full mt-4 py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs transition-colors cursor-pointer"
                >
                  View Fixed Options
                </button>
              </motion.div>

              {/* Hourly */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#EEF2FF] text-[#5B61FE] uppercase tracking-wider">
                    On-Demand
                  </span>
                  <h3 className="text-base font-bold text-slate-900">Hourly</h3>
                  <div className="text-xl font-black text-slate-900">From $45/hr</div>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    Flexible ad-hoc support for rapid or evolving requirements.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="w-full mt-4 py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs transition-colors cursor-pointer"
                >
                  View Hourly Rates
                </button>
              </motion.div>

              {/* Enterprise */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#EEF2FF] text-[#5B61FE] uppercase tracking-wider">
                    Custom Squad
                  </span>
                  <h3 className="text-base font-bold text-slate-900">Enterprise</h3>
                  <div className="text-xl font-black text-slate-900">Custom</div>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    Dedicated systems, full squads and high-volume operations.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="w-full mt-4 py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs transition-colors cursor-pointer"
                >
                  View Enterprise
                </button>
              </motion.div>

            </div>

            {/* Right: Dynamic ROI & Savings Calculator (5/12 columns) */}
            <motion.div
              ref={calcCardRef}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onMouseMove={trackCalcCard}
              onMouseEnter={() => setCalcHovered(true)}
              onMouseLeave={() => setCalcHovered(false)}
              className="lg:col-span-5 bg-white border border-slate-200/90 shadow-xl rounded-3xl p-6 flex flex-col justify-between space-y-5 relative overflow-hidden group hover:shadow-indigo-500/10 transition-shadow duration-300"
            >
              {/* Cursor Spotlight Glow Aura */}
              <div
                className="absolute pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                style={{
                  width: '350px',
                  height: '350px',
                  background: 'radial-gradient(circle, rgba(91,97,254,0.08) 0%, transparent 70%)',
                  left: 'calc(var(--calc-x, 0px) - 175px)',
                  top: 'calc(var(--calc-y, 0px) - 175px)',
                  transform: 'translate3d(0, 0, 0)'
                }}
              />
              <div className="space-y-4 text-left relative z-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-extrabold text-slate-900 uppercase tracking-wide">
                    Squad ROI Calculator
                  </h3>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 text-[#5B61FE]">
                    Live Estimate
                  </span>
                </div>

                <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
                  Drag the sliders to estimate how much your company saves by switching from traditional agencies and freelancers to Webants.
                </p>

                {/* Slider 1: Ad Spend */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-800">
                    <span>Monthly Ads Spend</span>
                    <span className="text-[#5B61FE] font-mono">${calcAdSpend.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" 
                    min="2000" 
                    max="100000" 
                    step="2000"
                    value={calcAdSpend}
                    onChange={(e) => setCalcAdSpend(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#5B61FE]"
                  />
                  <div className="flex justify-between text-[9px] font-bold text-slate-400 font-mono">
                    <span>$2k</span>
                    <span>$100k+</span>
                  </div>
                </div>

                {/* Slider 2: Freelancer Count */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-xs font-bold text-slate-800">
                    <span>Freelancers/Agencies Hired</span>
                    <span className="text-[#5B61FE] font-mono">{calcFreelancers} {calcFreelancers === 1 ? 'Squad Item' : 'Squad Items'}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="5" 
                    step="1"
                    value={calcFreelancers}
                    onChange={(e) => setCalcFreelancers(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#5B61FE]"
                  />
                  <div className="flex justify-between text-[9px] font-bold text-slate-400 font-mono">
                    <span>1 Unit</span>
                    <span>5 Units</span>
                  </div>
                </div>

                {/* ROI Matrix outputs */}
                <div className="bg-[#F8FAFC] border border-slate-100 rounded-2xl p-4 space-y-3.5 mt-2">
                  
                  {/* Current Estimated agency cost */}
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                    <span>Traditional overhead:</span>
                    <span className="font-mono text-slate-900 line-through">
                      ${(calcFreelancers * 2500 + Math.round(calcAdSpend * 0.12)).toLocaleString()}/mo
                    </span>
                  </div>

                  {/* Money Saved Counter */}
                  <div className="flex justify-between items-center border-t border-slate-200/50 pt-2">
                    <span className="text-xs font-extrabold text-slate-900">Your Monthly Savings:</span>
                    <motion.span 
                      key={calcAdSpend + calcFreelancers}
                      initial={{ scale: 1.1, color: '#5B61FE' }}
                      animate={{ scale: 1, color: '#10B981' }}
                      className="text-lg font-black font-mono text-emerald-600"
                    >
                      ${Math.max(0, (calcFreelancers * 2500 + Math.round(calcAdSpend * 0.12)) - 3200).toLocaleString()}/mo
                    </motion.span>
                  </div>

                  {/* Additional Value metrics */}
                  <div className="grid grid-cols-2 gap-2 border-t border-slate-200/50 pt-3 text-[10px] font-bold">
                    <div className="space-y-0.5">
                      <span className="text-slate-400 uppercase tracking-wide block">Execution Speed</span>
                      <span className="text-slate-800 block text-xs">
                        {calcFreelancers >= 3 ? "4.2x Faster" : "2.8x Faster"}
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-slate-400 uppercase tracking-wide block">Avg ROAS Lift</span>
                      <span className="text-emerald-600 block text-xs">+142% Target</span>
                    </div>
                  </div>

                </div>

              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenBookCall}
                className="w-full py-3.5 rounded-2xl bg-[#5B61FE] hover:bg-[#4F46E5] text-white font-extrabold text-xs shadow-lg shadow-indigo-500/25 transition-colors cursor-pointer text-center"
              >
                Book Sprint Strategy Call & Save &rarr;
              </motion.button>
            </motion.div>

          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => onNavigate('pricing')}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#5B61FE] hover:underline cursor-pointer"
            >
              <span>View Complete Pricing Breakdown & Feature Matrix &rarr;</span>
            </button>
          </div>

        </div>
      </section>

      {/* ─── 10. INTEGRATION FLOW CTA ─── */}
      <IntegrationFlowCta 
        onNavigate={onNavigate}
        onBookCall={onOpenBookCall}
        onStartTrial={() => onNavigate('free-trial')}
      />
    </div>
  );
};
