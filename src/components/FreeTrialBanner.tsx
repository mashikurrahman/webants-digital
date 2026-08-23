import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface FreeTrialBannerProps {
  onCheckEligibility: () => void;
}

export const FreeTrialBanner: React.FC<FreeTrialBannerProps> = ({ onCheckEligibility }) => {
  return (
    <section className="py-16 bg-gradient-to-r from-[#EEF2FF] via-[#F8FAFC] to-[#EDE9FE] text-slate-900 relative overflow-hidden border-y border-slate-200/80">
      {/*
        Soft ambient sparkle. Painted as radial-gradients rather than `blur-3xl` discs: a 64px
        gaussian on a 384px box is a filter pass that also forces its own composited layer, and
        it re-runs while the section is on screen. A gradient paints the same falloff in one go.
        The boxes are ~1.4x larger and re-centred with negative margins because a blur bleeds
        outward past its element and a gradient does not.
      */}
      <div
        className="absolute top-0 right-1/4 -mt-[78px] -mr-[78px] w-[540px] h-[540px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(91,97,254,0.06) 0%, rgba(91,97,254,0.045) 40%, transparent 72%)' }}
      />
      <div
        className="absolute bottom-0 left-1/4 -mb-[64px] -ml-[64px] w-[448px] h-[448px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, rgba(124,58,237,0.038) 40%, transparent 72%)' }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white/90 border border-indigo-100 rounded-3xl p-8 sm:p-10 shadow-xl backdrop-blur-md flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          
          <div className="space-y-2 text-center lg:text-left max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5B61FE]">
              Risk-Free Evaluation
            </p>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Try selected services free for seven days.
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Evaluate our workflow, communication and quality before choosing a monthly plan. No credit card required to apply.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1 justify-center lg:justify-start font-medium">
              <span className="flex items-center gap-1.5 text-slate-800 font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#5B61FE]" /> Qualified Service Businesses
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 1 Task Scope
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Dedicated Slack Sync
              </span>
            </div>
          </div>

          <div className="shrink-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={onCheckEligibility}
              className="px-8 py-4 rounded-2xl bg-[#5B61FE] hover:bg-[#4F46E5] font-bold text-white text-sm shadow-xl shadow-indigo-600/25 flex items-center gap-3 transition-colors cursor-pointer"
            >
              <span>Check Eligibility</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

        </motion.div>
      </div>
    </section>
  );
};
