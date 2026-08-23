import React from 'react';
import { motion } from 'motion/react';
import { siteContent } from '../data/siteContent';
import { Layers, Network, Workflow, HardDrive, Cpu, ShieldAlert, Sparkles } from 'lucide-react';

export const PartnersSection: React.FC = () => {
  const getPartnerIcon = (idx: number) => {
    const icons = [Layers, Network, Workflow, HardDrive, Cpu, ShieldAlert];
    return icons[idx % icons.length];
  };

  return (
    <section className="py-16 bg-white border-t border-slate-100 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="space-y-2 max-w-2xl mx-auto"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5B61FE]">
            Infrastructure Alliances
          </p>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Partners in better digital delivery.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Strategic technology alliances powering infrastructure, automation, and asset ecosystems.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {siteContent.partnerLogos.map((partner, idx) => {
            const Icon = getPartnerIcon(idx);
            return (
              <motion.div 
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:border-indigo-200 hover:shadow-md hover:bg-white transition-[background-color,border-color,box-shadow] cursor-default group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#5B61FE] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-900 block group-hover:text-[#5B61FE] transition-colors">
                  {partner.name}
                </span>
                <span className="text-[10px] text-slate-400 block font-mono mt-0.5">
                  {partner.type}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
