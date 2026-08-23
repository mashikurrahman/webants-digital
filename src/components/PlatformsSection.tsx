import React from 'react';
import { motion } from 'motion/react';
import { siteContent } from '../data/siteContent';
import { Globe, ShoppingBag, Layout, Image, Video, Sparkles, Search, Share2, Database, Zap, Cpu, Code } from 'lucide-react';

export const PlatformsSection: React.FC = () => {
  const getPlatformIcon = (name: string) => {
    switch (name) {
      case 'WordPress': return Globe;
      case 'Shopify': return ShoppingBag;
      case 'Webflow': return Layout;
      case 'Figma': return Image;
      case 'Adobe': return Video;
      case 'Canva': return Sparkles;
      case 'Google': return Search;
      case 'Meta': return Share2;
      case 'GoHighLevel': return Database;
      case 'Zapier': return Zap;
      case 'Make': return Cpu;
      case 'GitHub': return Code;
      default: return Globe;
    }
  };

  return (
    <section className="py-16 bg-[#F8FAFC] text-slate-900 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="space-y-2 max-w-2xl mx-auto"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5B61FE]">
            Technical Stack
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Platforms & tools we master.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Seamless integration across modern CMS, e-commerce, advertising, and workflow automation platforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3.5">
          {siteContent.platforms.map((plat, idx) => {
            const Icon = getPlatformIcon(plat.name);
            return (
              <motion.div 
                key={plat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3 hover:border-indigo-200 hover:shadow-md transition-[border-color,box-shadow] cursor-default group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#EEF2FF] text-[#5B61FE] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-slate-900 block leading-tight group-hover:text-[#5B61FE] transition-colors">
                    {plat.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium block">
                    {plat.category}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
