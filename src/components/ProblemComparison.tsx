import React from 'react';
import { motion } from 'motion/react';
import { XCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export const ProblemComparison: React.FC<{ onExplore?: () => void }> = ({ onExplore }) => {
  return (
    <section className="py-20 sm:py-24 bg-[#F8FAFC] text-slate-900 border-b border-slate-200/60 select-none text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5B61FE]">
            The Webants Advantage
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Replace disconnected vendors with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B61FE] to-[#7C3AED]">
              one accountable partner.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Stop juggling separate agencies for design, ads, web platforms, and software.
          </p>
        </motion.div>

        {/* ── COMPARISON CARDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Traditional Approach (Light Red Card) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-3xl p-8 border border-rose-100 shadow-sm space-y-6 relative overflow-hidden text-left flex flex-col justify-between transition-shadow hover:shadow-md"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 border border-rose-100 flex items-center justify-center font-bold shrink-0">
                  <XCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">Traditional Approach</h3>
                  <p className="text-xs font-semibold text-rose-600">Fragmented execution across multiple vendors</p>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-slate-600">
                <li className="flex items-start gap-3 bg-rose-50/50 p-3 rounded-2xl border border-rose-100/60">
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-bold text-xs">Multiple disjointed teams</strong>
                    <span className="text-xs text-slate-500">Managing 3 to 5 separate agencies and unreliable freelancers.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-rose-50/50 p-3 rounded-2xl border border-rose-100/60">
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-bold text-xs">Repeated onboarding friction</strong>
                    <span className="text-xs text-slate-500">Explaining your brand identity, voice, and goals over and over.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-rose-50/50 p-3 rounded-2xl border border-rose-100/60">
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-bold text-xs">Scattered communication</strong>
                    <span className="text-xs text-slate-500">Lost messages across endless email chains, WhatsApp, and tickets.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-rose-50/50 p-3 rounded-2xl border border-rose-100/60">
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-bold text-xs">Zero shared accountability</strong>
                    <span className="text-xs text-slate-500">Vendors blaming each other when conversion rates or revenue drops.</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-rose-100 mt-4">
              <span className="text-xs font-bold text-rose-600 block">
                Result: High overhead, slow turnaround, and inconsistent quality.
              </span>
            </div>
          </motion.div>

          {/* Webants Approach (Vibrant Highlighted Light Mode Card) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-[#EEF2FF] via-white to-[#F5F3FF] rounded-3xl p-8 border border-indigo-100 shadow-xl shadow-indigo-600/5 space-y-6 relative overflow-hidden text-left flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#5B61FE] text-white flex items-center justify-center font-bold shadow-md shadow-indigo-500/25 shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900">Webants Approach</h3>
                    <p className="text-xs font-bold text-[#5B61FE]">One synchronized digital squad</p>
                  </div>
                </div>

                <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-[#5B61FE] text-white uppercase tracking-wider shadow-xs">
                  All-In-One
                </span>
              </div>

              <ul className="space-y-4 text-sm text-slate-700">
                <li className="flex items-start gap-3 bg-white p-3 rounded-2xl border border-indigo-100 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-[#5B61FE] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-bold text-xs">Unified 5-department squad</strong>
                    <span className="text-xs text-slate-600 font-medium">Growth, Creative, Web Tech, AI Automations, and Operations connected.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-white p-3 rounded-2xl border border-indigo-100 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-[#5B61FE] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-bold text-xs">Zero-friction single onboarding</strong>
                    <span className="text-xs text-slate-600 font-medium">Set your goals and brand once; our entire cross-functional team aligns instantly.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-white p-3 rounded-2xl border border-indigo-100 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-[#5B61FE] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-bold text-xs">Direct Slack collaboration</strong>
                    <span className="text-xs text-slate-600 font-medium">Live daily chat, fast async updates, and transparent sprint boards.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-white p-3 rounded-2xl border border-indigo-100 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-[#5B61FE] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-bold text-xs">Total pipeline accountability</strong>
                    <span className="text-xs text-slate-600 font-medium">Clear SLAs, weekly performance reports, and aligned revenue targets.</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-indigo-100 flex items-center justify-between mt-4">
              <span className="text-xs font-bold text-[#5B61FE]">
                Result: Rapid turnarounds, unified branding, and measurable ROI.
              </span>
              {onExplore && (
                <button
                  onClick={onExplore}
                  className="text-xs font-extrabold text-[#5B61FE] hover:underline flex items-center gap-1 cursor-pointer shrink-0 ml-2"
                >
                  <span>Explore Squad</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
