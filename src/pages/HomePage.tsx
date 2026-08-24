import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { siteContent, VideoTestimonial } from '../data/siteContent';
import { ClientLogos } from '../components/ClientLogos';
import { ProblemComparison } from '../components/ProblemComparison';
import { ProcessSection } from '../components/ProcessSection';
import { KokonutServicesSection } from '../components/kokonutui/card-stack';
import { VideoTestimonialsSection } from '../components/VideoTestimonialsSection';
import { IntegrationFlowCta } from '../components/IntegrationFlowCta';
import { WorkLedger } from '../components/WorkLedger';
import { ProjectsBentoGrid } from '../components/ProjectsBentoGrid';
import { HeroCentered } from '../components/hero/HeroCentered';


interface HomePageProps {
  onNavigate: (page: string, param?: string) => void;
  onOpenBookCall: () => void;
  onSelectVideo?: (video: VideoTestimonial) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenBookCall, onSelectVideo }) => {
  const [calcAdSpend, setCalcAdSpend] = useState<number>(10000);
  const [calcFreelancers, setCalcFreelancers] = useState<number>(2);

  /*
    ROI-calculator spotlight, coalesced to one animation frame.

    `mousemove` can fire several times between paints, and each event here used to do a
    `getBoundingClientRect()` (a forced synchronous layout) followed by a setState — which
    re-rendered this whole page. Interleaved read-then-write across events is also a layout
    thrash loop, and it fires while scrolling whenever the pointer happens to rest on the card.

    The spotlight is pure decoration, so it skips React entirely and writes CSS custom
    properties straight to the node. It measures inside the frame rather than caching on
    pointer-enter, so the rect stays correct as the card moves under the scroller.
  */
  const calcCardRef = useRef<HTMLDivElement>(null);
  const calcPointer = useRef({ x: 0, y: 0 });
  const calcFrame = useRef(0);

  useEffect(() => () => {
    if (calcFrame.current) cancelAnimationFrame(calcFrame.current);
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

  return (
    <div className="space-y-0 text-slate-900 bg-white relative">
      
      {/* ─── 1. HERO SECTION ─── */}
      <HeroCentered onNavigate={onNavigate} onOpenBookCall={onOpenBookCall} />

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

      {/* ─── 7. SELECTED WORK: BENTO GRID ─── */}
      <ProjectsBentoGrid onNavigate={onNavigate} />

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
