import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Target, 
  CheckCircle2, 
  DollarSign
} from 'lucide-react';

interface GrowthEngineCtaProps {
  onStartTrial: () => void;
  onBookCall: () => void;
}

export const GrowthEngineCta: React.FC<GrowthEngineCtaProps> = ({
  onStartTrial,
  onBookCall
}) => {
  const [monthlyBudget, setMonthlyBudget] = useState<number>(10000);
  const [targetRoas, setTargetRoas] = useState<number>(4.2);

  const projectedRevenue = monthlyBudget * targetRoas;
  const projectedLeads = Math.round(monthlyBudget / 45); // ~$45 CPL
  const projectedCustomers = Math.round(projectedLeads * 0.18); // 18% close rate

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#FAFCFF] via-[#F4F7FF] to-[#FAFCFF] border-t border-slate-200/80 font-body">
      {/* Soft Ambient Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(91,90,254,0.06)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-[#5B61FE]/20 bg-white/90 backdrop-blur-sm text-[#5B61FE] text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase shadow-xs"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Interactive ROAS Accelerometer</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
            Calculate your customer acquisition velocity <br className="hidden sm:block" />
            at <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B61FE] via-[#7C3AED] to-[#5B61FE]">target scale.</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Drag the sliders below to simulate full-funnel customer generation, CAC reduction, and monthly revenue return.
          </p>
        </div>

        {/* Interactive Funnel Accelerator Console */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-xl shadow-indigo-500/5 p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Interactive Input Sliders (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Monthly Ad Budget Slider */}
            <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="flex justify-between items-center text-xs font-extrabold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-[#5B61FE]" />
                  <span>Planned Monthly Ad Spend:</span>
                </span>
                <span className="text-base font-black font-mono text-[#5B61FE]">
                  ${monthlyBudget.toLocaleString()} / mo
                </span>
              </div>
              <input 
                type="range"
                min="2500"
                max="50000"
                step="2500"
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#5B61FE]"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 font-bold">
                <span>$2.5k / mo</span>
                <span>$25k / mo</span>
                <span>$50k / mo</span>
              </div>
            </div>

            {/* Target ROAS Target */}
            <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="flex justify-between items-center text-xs font-extrabold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-[#5B61FE]" />
                  <span>Target Return on Ad Spend (ROAS):</span>
                </span>
                <span className="text-base font-black font-mono text-[#5B61FE]">
                  {targetRoas.toFixed(1)}x ROAS
                </span>
              </div>
              <input 
                type="range"
                min="2.5"
                max="6.0"
                step="0.1"
                value={targetRoas}
                onChange={(e) => setTargetRoas(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#5B61FE]"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 font-bold">
                <span>2.5x (Baseline)</span>
                <span>4.2x (WebAnts Benchmark)</span>
                <span>6.0x (Peak Season)</span>
              </div>
            </div>

            {/* Dynamic Funnel Stage Breakdown */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-100 text-center">
                <div className="text-[10px] font-bold uppercase text-[#5B61FE]">High-Intent Clicks</div>
                <div className="text-lg font-black font-mono text-slate-900 mt-0.5">
                  {Math.round(monthlyBudget / 1.8).toLocaleString()}
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-100 text-center">
                <div className="text-[10px] font-bold uppercase text-[#5B61FE]">Qualified Leads</div>
                <div className="text-lg font-black font-mono text-slate-900 mt-0.5">
                  ~{projectedLeads.toLocaleString()}
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-100 text-center">
                <div className="text-[10px] font-bold uppercase text-[#5B61FE]">Closed Customers</div>
                <div className="text-lg font-black font-mono text-slate-900 mt-0.5">
                  ~{projectedCustomers.toLocaleString()}
                </div>
              </div>
            </div>

          </div>

          {/* Right: Projected Commercial Return Box (5 Cols) */}
          <div className="lg:col-span-5 bg-[#0B1120] rounded-3xl p-6 sm:p-8 text-white shadow-2xl text-left flex flex-col justify-between space-y-6 relative overflow-hidden border border-white/10">
            
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#5B61FE]/25 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-white/10 text-cyan-300 border border-white/10">
                  Forecasted Output
                </span>
                <span className="text-xs font-mono font-bold text-cyan-300">
                  Zero Spend Markups
                </span>
              </div>

              <div>
                <div className="text-xs uppercase font-mono text-slate-400 font-bold tracking-wider">
                  Projected Monthly Revenue Generated
                </div>
                <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-400 mt-1">
                  ${Math.round(projectedRevenue).toLocaleString()}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span>Google Ads PMax + Meta CAPI full-funnel tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span>Custom A/B landing pages included (Sub-second speed)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span>Live Looker Studio executive telemetry dashboard</span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 pt-2 relative z-10">
              <button
                onClick={onStartTrial}
                className="w-full py-4 rounded-2xl bg-[#5B61FE] hover:bg-[#4F46E5] text-white font-black text-xs sm:text-sm shadow-xl shadow-indigo-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Scale Growth: Start 7-Day Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onBookCall}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15 transition-colors cursor-pointer text-center"
              >
                Book Free Acquisition Audit Call
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
