import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { siteContent } from '../data/siteContent';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-8 sm:pt-12 pb-20 bg-[#F7FAFF] text-[#172033] space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center"
      >
        <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0] bg-[#EAF3FF] px-3.5 py-1 rounded-full">
          Connected Service Lines
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#172033] tracking-tight">
          Five core capability departments.
        </h1>
        <p className="text-sm sm:text-base text-[#637083] max-w-2xl mx-auto leading-relaxed">
          Strategy, creative, marketing, technology and automation managed through one coordinated system.
        </p>
      </motion.div>

      {/* 5 Large Service Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {siteContent.serviceLines.map((svc, index) => (
          <motion.div 
            key={svc.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white border border-blue-100 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Image */}
            <div className="lg:col-span-5 aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100 group">
              <img
                src={svc.image}
                alt={svc.title}
                decoding="async"
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80';
                }}
              />
            </div>

            {/* Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0] bg-[#EAF3FF] px-2.5 py-0.5 rounded">
                  Service Line
                </span>
              </div>

              <h2 className="text-2xl font-bold text-[#172033]">{svc.title}</h2>

              {/* One sentence description */}
              <p className="text-sm text-[#172033] font-medium leading-relaxed">
                {svc.headline}
              </p>

              {/* Maximum 6 items */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                {svc.items.slice(0, 6).map((item, idx) => (
                  <div key={idx} className="bg-[#F7FAFF] p-2 rounded-xl border border-blue-50 text-xs font-semibold text-gray-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1769E0]" />
                    <span className="line-clamp-1">{item}</span>
                  </div>
                ))}
              </div>

              {/* One CTA */}
              <div className="pt-2">
                <button
                  onClick={() => onNavigate(svc.route)}
                  className="px-6 py-3 rounded-xl bg-[#1769E0] hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Explore {svc.title} Capabilities</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
