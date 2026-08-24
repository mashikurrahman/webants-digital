import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Target, 
  Search, 
  Megaphone, 
  MapPin, 
  Layers, 
  BarChart3, 
  Sliders, 
  Check, 
  ExternalLink,
  Zap,
  Clock
} from 'lucide-react';
import { siteContent } from '../data/siteContent';
import { GrowthEngineCta } from '../components/cta/GrowthEngineCta';

interface GrowthPageProps {
  onNavigate: (page: string, param?: string) => void;
  onOpenBookCall: () => void;
}

export const GrowthPage: React.FC<GrowthPageProps> = ({ onNavigate, onOpenBookCall }) => {
  const growthData = siteContent.serviceLines.find(s => s.id === 'growth')!;

  // Interactive ROAS Simulator State
  const [adSpend, setAdSpend] = useState<number>(10000);
  const [targetRoas, setTargetRoas] = useState<number>(3.8);
  const [activeGrowthTab, setActiveGrowthTab] = useState<string>('google-ads');

  const projectedRevenue = Math.round(adSpend * targetRoas);
  const estimatedLeads = Math.round(adSpend / 45);

  const growthDisciplines = [
    {
      id: 'google-ads',
      title: 'Google Search & PMax Ads',
      icon: Search,
      badge: 'Immediate Buyer Intent',
      headline: 'Capture prospects at the exact moment they search for your solution.',
      points: [
        'Negative keyword sculpting to eliminate ad budget waste',
        'Dynamic keyword insertion & high-intent ad group segmentation',
        'Performance Max multi-asset feeds with custom audience signals',
        'Conversion value tracking integrated with your CRM'
      ],
      metric: '3.8x - 5.2x',
      metricLabel: 'Average ROAS Range'
    },
    {
      id: 'meta-ads',
      title: 'Meta & TikTok Performance Creative',
      icon: Megaphone,
      badge: 'Visual Storytelling',
      headline: 'Stop the scroll with high-converting video hooks, UGC, and static frameworks.',
      points: [
        'Weekly rapid creative testing (hooks, bodies, calls-to-action)',
        'Lookalike & Advantage+ custom audience segmentation',
        'Retargeting funnels tailored to cart abandoners and video viewers',
        'Direct integration with Facebook Conversions API (CAPI)'
      ],
      metric: '+48%',
      metricLabel: 'Creative Click-Through Lift'
    },
    {
      id: 'seo-local',
      title: 'Technical SEO & Local Map Pack',
      icon: MapPin,
      badge: 'Compounding Organic Equity',
      headline: 'Dominate local 3-pack rankings and rank #1 for high-value commercial keywords.',
      points: [
        'Google Business Profile geo-grid optimization and citation sync',
        'Core Web Vitals technical auditing (FCP, LCP, CLS)',
        'Localized landing page siloing for multi-city coverage',
        'High-authority white-hat backlink acquisition'
      ],
      metric: '#1 Rank',
      metricLabel: 'Geo-Targeted Visibility'
    },
    {
      id: 'cro-landing',
      title: 'CRO & High-Converting Landing Pages',
      icon: Target,
      badge: 'Conversion Multiplication',
      headline: 'Turn expensive paid traffic into booked appointments and qualified calls.',
      points: [
        'Sub-second page loads engineered in Next.js & Tailwind',
        'Social proof stacks, friction-free forms, and live click-to-call triggers',
        'Multi-variant A/B headline and CTA split testing',
        'Heatmap & scroll-depth analysis with PostHog / Microsoft Clarity'
      ],
      metric: '8.4%',
      metricLabel: 'Average Form Conversion'
    },
    {
      id: 'b2b-outbound',
      title: 'B2B Lead Generation & Scraping',
      icon: Layers,
      badge: 'Proactive Outbound',
      headline: 'Target verified decision-makers through personalized multi-channel outreach.',
      points: [
        'Custom verified B2B lead scraping with Apollo & Clay',
        'Secondary domain warmup to safeguard core email reputation',
        'Multi-step LinkedIn + personalized cold email sequences',
        'Instant calendar booking integration directly into Slack'
      ],
      metric: '22%+',
      metricLabel: 'Open-to-Meeting Rate'
    },
    {
      id: 'analytics',
      title: 'Attribution & Executive Reporting',
      icon: BarChart3,
      badge: 'Full Clarity',
      headline: 'Know exactly which channel, ad, and keyword generated each dollar.',
      points: [
        'Server-side tracking & multi-touch attribution modeling',
        'Live Looker Studio / Google Analytics 4 custom executive dashboards',
        'Weekly video Loom audits breaking down CAC and LTV metrics',
        'Automated Slack alerts on cost-per-acquisition anomalies'
      ],
      metric: '100%',
      metricLabel: 'Attribution Transparency'
    }
  ];

  const activeDiscipline = growthDisciplines.find(d => d.id === activeGrowthTab) || growthDisciplines[0];
  const DisciplineIcon = activeDiscipline.icon;

  return (
    <div className="bg-white text-slate-900 min-h-screen selection:bg-[#5B61FE] selection:text-white">
      
      {/* ─── 1. HIGH-IMPACT ACQUISITION COCKPIT HERO ─── */}
      <section className="relative pt-12 sm:pt-20 pb-20 overflow-hidden border-b border-slate-200/60 bg-gradient-to-b from-[#FAFCFF] via-white to-[#F8FAFC]">
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-gradient-to-bl from-emerald-500/15 via-[#5B61FE]/10 to-transparent blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-gradient-to-tr from-cyan-400/10 via-emerald-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Punchy Messaging & Quick Actions (7 Cols) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-[#5B61FE] text-xs font-black uppercase tracking-widest shadow-2xs"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Performance Acquisition Engine</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.03]"
              >
                Turn traffic into <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B61FE] via-[#7C3AED] to-[#5B61FE]">
                  predictable profit.
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg text-slate-600 font-medium max-w-xl leading-relaxed"
              >
                Google Search PMax, Meta & TikTok performance creative, and geo-targeted Local SEO. Scaled with zero ad spend markups and transparent weekly attribution telemetry.
              </motion.p>

              {/* Acquisition Channel Quick Switches */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="flex flex-wrap gap-2 pt-2"
              >
                {growthDisciplines.slice(0, 4).map((d) => {
                  const isSelected = activeGrowthTab === d.id;
                  const Icon = d.icon;

                  return (
                    <button
                      key={d.id}
                      onClick={() => setActiveGrowthTab(d.id)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#5B61FE] text-white shadow-md shadow-indigo-500/20 scale-[1.02]'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{d.title.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </motion.div>

              {/* CTAs */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 pt-4"
              >
                <button
                  onClick={() => onNavigate('free-trial')}
                  className="px-8 py-4 rounded-2xl bg-[#5B61FE] hover:bg-[#4F46E5] text-white font-black text-xs sm:text-sm shadow-xl shadow-indigo-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-2"
                >
                  <span>Start 7-Day Free Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onOpenBookCall}
                  className="px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-xs sm:text-sm border border-slate-200 shadow-xs transition-colors cursor-pointer"
                >
                  <span>Book Strategy Audit &rarr;</span>
                </button>
              </motion.div>
            </div>

            {/* Right: Interactive Live Acquisition Telemetry Cockpit (5 Cols) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="bg-gradient-to-br from-[#0B1120] via-[#0F172A] to-[#1E293B] rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-white/10 relative overflow-hidden space-y-6 text-left">
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-300 font-bold">
                      Live Telemetry Stream
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-white/10 px-2 py-0.5 rounded-md border border-white/10">
                    CAPI + GA4 SYNC
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeGrowthTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#5B61FE] to-[#7C3AED] text-white flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
                        <DisciplineIcon className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="text-xs uppercase font-mono text-slate-400 font-bold">
                          {activeDiscipline.badge}
                        </div>
                        <h3 className="text-2xl font-black text-white">
                          {activeDiscipline.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                      {activeDiscipline.headline}
                    </p>

                    <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/10">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400">Target Efficiency</div>
                        <div className="text-2xl font-black font-mono text-emerald-400 mt-0.5">
                          {activeDiscipline.metric}
                        </div>
                        <div className="text-[10px] text-slate-400">{activeDiscipline.metricLabel}</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400">Testing Cadence</div>
                        <div className="text-2xl font-black font-mono text-cyan-300 mt-0.5">
                          Weekly
                        </div>
                        <div className="text-[10px] text-slate-400">A/B Iteration Cycles</div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-[10px] font-mono text-slate-400 font-bold uppercase">Active Playbook:</div>
                      <div className="space-y-1">
                        {activeDiscipline.points.slice(0, 2).map((pt, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#5B61FE] shrink-0" />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigate('free-trial')}
                      className="w-full py-3 rounded-xl bg-[#5B61FE] hover:bg-[#4F46E5] text-white font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-indigo-500/20"
                    >
                      <span>Scale with {activeDiscipline.title.split(' ')[0]}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                </AnimatePresence>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── 2. INTERACTIVE REVENUE & ROAS SIMULATOR ─── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 sm:p-12 space-y-10">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5B61FE]">
              Interactive ROI Simulator
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Model your projected growth trajectory.
            </h2>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              Estimate expected pipeline revenue and qualified opportunities based on your target monthly ad budget.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Controls (6 Cols) */}
            <div className="lg:col-span-6 space-y-6 text-left">
              
              {/* Ad Spend Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-900">
                  <span>Monthly Media Ad Spend:</span>
                  <span className="font-mono text-[#5B61FE] text-sm font-black">
                    ${adSpend.toLocaleString()} / mo
                  </span>
                </div>
                <input 
                  type="range"
                  min="2500"
                  max="50000"
                  step="2500"
                  value={adSpend}
                  onChange={(e) => setAdSpend(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#5B61FE]"
                />
                <div className="flex justify-between text-[10px] font-bold text-slate-400 font-mono">
                  <span>$2,500</span>
                  <span>$25,000</span>
                  <span>$50,000</span>
                </div>
              </div>

              {/* Target ROAS Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-900">
                  <span>Target Return on Ad Spend (ROAS):</span>
                  <span className="font-mono text-[#5B61FE] text-sm font-black">
                    {targetRoas.toFixed(1)}x Multiple
                  </span>
                </div>
                <input 
                  type="range"
                  min="2.0"
                  max="6.0"
                  step="0.2"
                  value={targetRoas}
                  onChange={(e) => setTargetRoas(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#5B61FE]"
                />
                <div className="flex justify-between text-[10px] font-bold text-slate-400 font-mono">
                  <span>2.0x (Conservative)</span>
                  <span>3.8x (Typical Target)</span>
                  <span>6.0x (High-LTV)</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/70 text-xs text-slate-600 font-medium space-y-1.5">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#5B61FE]" />
                  <span>Transparent Squad Economics</span>
                </div>
                <p>
                  You pay the ad network directly with zero hidden markups. We charge a flat, predictable monthly squad management fee with no percentage penalty as you scale.
                </p>
              </div>

            </div>

            {/* Right Output Box (6 Cols) */}
            <div className="lg:col-span-6 bg-gradient-to-br from-[#0B1120] via-[#0F172A] to-[#1E293B] rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6">
              
              <div className="space-y-1 text-left">
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-cyan-400">
                  Projected Monthly Pipeline
                </span>
                <div className="text-3xl sm:text-5xl font-black font-mono text-emerald-400">
                  ${projectedRevenue.toLocaleString()}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-y border-white/10 py-4 text-left">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Estimated Monthly Leads</div>
                  <div className="text-xl font-black font-mono text-white mt-0.5">
                    ~{estimatedLeads} Inquiries
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Avg Cost Per Lead</div>
                  <div className="text-xl font-black font-mono text-[#5B61FE] mt-0.5">
                    ~$45.00
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-left text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Google Ads + Meta Ads synchronized campaign architecture</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Custom Next.js high-converting landing page included</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct CRM lead injection & automated SMS qualification</span>
                </div>
              </div>

              <button
                onClick={onOpenBookCall}
                className="w-full py-3.5 rounded-xl bg-[#5B61FE] hover:bg-[#4F46E5] text-white font-extrabold text-xs shadow-lg shadow-indigo-500/30 transition-all cursor-pointer text-center"
              >
                Claim Free Custom Growth Audit &rarr;
              </button>

            </div>

          </div>

        </div>
      </section>

      {/* ─── 3. SIX CORE GROWTH DISCIPLINES ─── */}
      <section className="py-20 bg-[#F8FAFC] border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5B61FE]">
              Complete Acquisition Stack
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Six synchronized growth capabilities.
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              Every channel is measured against hard revenue metrics rather than vanity impressions.
            </p>
          </div>

          {/* Discipline Navigation Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            {growthDisciplines.map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveGrowthTab(d.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeGrowthTab === d.id
                    ? 'bg-[#5B61FE] text-white font-extrabold shadow-sm scale-[1.02]'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                <d.icon className="w-3.5 h-3.5" />
                <span>{d.title}</span>
              </button>
            ))}
          </div>

          {/* Active Discipline Deep-Dive Box */}
          <motion.div
            key={activeGrowthTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left"
          >
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-indigo-50 text-[#5B61FE] border border-indigo-100">
                <DisciplineIcon className="w-3.5 h-3.5" />
                <span>{activeDiscipline.badge}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {activeDiscipline.title}
              </h3>

              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                {activeDiscipline.headline}
              </p>

              <div className="space-y-2.5 pt-2">
                {activeDiscipline.points.map((pt, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs text-center">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#5B61FE] flex items-center justify-center mx-auto shadow-2xs">
                <DisciplineIcon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-3xl font-black font-mono text-slate-900">
                  {activeDiscipline.metric}
                </div>
                <div className="text-xs uppercase font-bold text-slate-400 tracking-wider mt-0.5">
                  {activeDiscipline.metricLabel}
                </div>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Tested across multi-industry client accounts with verified weekly telemetry.
              </p>
              <button
                onClick={() => onNavigate('free-trial')}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-[#5B61FE] text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Deploy {activeDiscipline.title}
              </button>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ─── 3.5. VISUAL GROWTH ENVIRONMENTS IN ACTION ─── */}
      <section className="py-20 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#5B61FE]/20 bg-indigo-50/80 text-[#5B61FE] text-xs font-bold uppercase tracking-widest shadow-2xs">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Production In Action</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Real-time acquisition telemetry & creative labs.
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              See how our growth architects analyze conversion funnels, deploy multi-variant hooks, and scale campaigns in live production.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Visual Card 1 */}
            <div className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-200 shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80" 
                alt="Live Performance Ad Telemetry"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-left text-white space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-cyan-300 bg-white/10 px-2 py-0.5 rounded border border-white/15">
                  Multi-Channel Attribution
                </span>
                <h4 className="text-base font-bold text-white">Live Conversion Funnel Monitoring</h4>
                <p className="text-xs text-slate-300 font-medium">Server-side CAPI tracking ensuring 99.4% data fidelity.</p>
              </div>
            </div>

            {/* Visual Card 2 */}
            <div className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-200 shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" 
                alt="Growth Strategy Sprints"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-left text-white space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 bg-white/10 px-2 py-0.5 rounded border border-white/15">
                  A/B Creative Sprints
                </span>
                <h4 className="text-base font-bold text-white">Rapid Creative Hook Iteration</h4>
                <p className="text-xs text-slate-300 font-medium">Testing 8-12 visual and copy variations per channel weekly.</p>
              </div>
            </div>

            {/* Visual Card 3 */}
            <div className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-200 shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                alt="Client Slack Integration"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-left text-white space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-[#5B61FE] bg-white/10 px-2 py-0.5 rounded border border-white/15">
                  Direct Slack Sync
                </span>
                <h4 className="text-base font-bold text-white">Transparent Weekly Standups</h4>
                <p className="text-xs text-slate-300 font-medium">Executive Loom briefings and live Looker Studio telemetry.</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─── 4. TRANSPARENT GROWTH PACKAGES ─── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5B61FE]">
            Growth Plans
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Predictable growth subscriptions.
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            Transparent flat pricing. Pause, adjust, or cancel anytime with zero lock-in contracts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {growthData.packages?.map((pkg, idx) => {
            const isFeatured = idx === 1;

            return (
              <div 
                key={pkg.name}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all ${
                  isFeatured
                    ? 'bg-gradient-to-b from-[#F5F7FF] via-white to-[#F5F7FF] border-2 border-[#5B61FE] shadow-xl shadow-indigo-600/5'
                    : 'bg-white border border-slate-200 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="space-y-4">
                  {isFeatured && (
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#5B61FE] text-white">
                      Recommended
                    </span>
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{pkg.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 font-medium">{pkg.desc}</p>
                  </div>

                  <div className="text-3xl font-black text-slate-900 font-mono">
                    {pkg.price}
                  </div>

                  <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                    {pkg.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('free-trial')}
                  className={`w-full py-3.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer text-center ${
                    isFeatured
                      ? 'bg-[#5B61FE] hover:bg-[#4F46E5] text-white shadow-md shadow-indigo-500/25'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                  }`}
                >
                  Start 7-Day Free Trial &rarr;
                </button>
              </div>
            );
          })}
        </div>

      </section>

      {/* ─── 5. DYNAMIC INTERACTIVE GROWTH REVENUE ENGINE CTA ─── */}
      <GrowthEngineCta 
        onStartTrial={() => onNavigate('free-trial')}
        onBookCall={onOpenBookCall}
      />

    </div>
  );
};
