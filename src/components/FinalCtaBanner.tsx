import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, PhoneCall, ArrowRight } from 'lucide-react';

interface FinalCtaBannerProps {
  onStartTrial: () => void;
  onBookCall: () => void;
}

export const FinalCtaBanner: React.FC<FinalCtaBannerProps> = ({ onStartTrial, onBookCall }) => {
  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-white via-[#F8FAFC] to-[#EEF2FF] text-slate-900 border-t border-slate-200/80 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[radial-gradient(circle,_rgba(91,97,254,0.08)_0%,_transparent_70%)] rounded-full pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10"
      >
        
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5B61FE]">
            Get Started Today
          </p>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Build the system behind your <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B61FE] to-[#7C3AED]">
              next stage of growth.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Connect marketing, creative, technology, AI automation, and digital operations with one accountable partner.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={onStartTrial}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#5B61FE] hover:bg-[#4F46E5] font-bold text-white text-sm shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
          >
            <span>Start 7-Day Free Trial</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={onBookCall}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 font-bold text-slate-800 text-sm shadow-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-[#5B61FE]" />
            <span>Book a Strategy Call</span>
          </motion.button>
        </div>

      </motion.div>
    </section>
  );
};
