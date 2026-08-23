import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Eye } from 'lucide-react';
import { siteContent } from '../data/siteContent';

interface IndustriesPageProps {
  onNavigate: (page: string, param?: string) => void;
  onOpenBookCall: () => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({ onNavigate, onOpenBookCall }) => {
  return (
    <div className="pt-8 sm:pt-12 pb-20 bg-[#F7FAFF] text-[#172033] space-y-12">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center"
      >
        <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0] bg-[#EAF3FF] px-3.5 py-1 rounded-full">
          Tailored Industry Solutions
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#172033]">
          Built for service-driven industries.
        </h1>
        <p className="text-sm sm:text-base text-[#637083] max-w-2xl mx-auto leading-relaxed">
          Click any industry sector below to inspect custom workflows, sector challenges, tailored technology stacks, and verified case study outcomes.
        </p>
      </motion.div>

      {/* Industries Detail Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {siteContent.industries.map((ind, idx) => (
          <motion.div 
            key={ind.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            onClick={() => onNavigate('industry-detail', ind.id)}
            className="bg-white border border-blue-100 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-blue-500/40 transition-[border-color,box-shadow] duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center cursor-pointer group relative"
          >
            {/* Image */}
            <div className="lg:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden bg-gray-900 relative">
              <img 
                src={ind.image} 
                alt={ind.name} 
                decoding="async"
                loading={idx === 0 ? 'eager' : 'lazy'}
                fetchPriority={idx === 0 ? 'high' : 'auto'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute top-3 left-3 bg-[#071B33]/90 text-white px-3 py-1 rounded-lg text-xs font-extrabold uppercase tracking-wide">
                {ind.name} Sector
              </div>
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-[#071B33]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-4 py-2 bg-white text-[#071B33] font-bold text-xs rounded-xl shadow-lg flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-[#1769E0]" />
                  <span>Inspect Sector Blueprint</span>
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-extrabold text-[#172033] group-hover:text-[#1769E0] transition-colors">
                  {ind.name}
                </h2>
                <span className="text-xs font-bold text-[#1769E0] bg-[#EAF3FF] px-2.5 py-1 rounded-lg flex items-center gap-1 group-hover:bg-[#1769E0] group-hover:text-white transition-colors">
                  <span>Explore Sector</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

              <div>
                <span className="text-[10px] font-extrabold text-[#F05AA6] uppercase tracking-wider block">Common Sector Challenge</span>
                <p className="text-xs text-gray-700 leading-relaxed font-medium mt-0.5">{ind.challenge}</p>
              </div>

              <div>
                <span className="text-[10px] font-extrabold text-[#1769E0] uppercase tracking-wider block mb-1">Relevant Webants Services</span>
                <div className="flex flex-wrap gap-1.5">
                  {ind.relevantServices.map((svc) => (
                    <span key={svc} className="bg-[#EAF3FF] text-[#1769E0] text-[11px] font-bold px-2.5 py-1 rounded-lg">
                      {svc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-[#F7FAFF] p-4 rounded-2xl border border-blue-50 space-y-1.5">
                <span className="text-[10px] font-extrabold text-[#1769E0] uppercase block font-mono">// Case Study Highlight</span>
                <h4 className="text-xs font-bold text-gray-900">{ind.caseStudyTitle}</h4>
                <p className="text-xs text-gray-600">{ind.caseStudyResult}</p>
                <div className="pt-2 border-t border-gray-200/60 text-xs italic text-gray-700">
                  "{ind.testimonialQuote}" — <span className="font-bold not-italic text-[#172033]">{ind.testimonialAuthor}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <div className="px-5 py-2.5 rounded-xl bg-[#1769E0] group-hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center gap-2">
                  <span>View Sector Details & Case Studies</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenBookCall();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#EAF3FF] hover:bg-blue-200 text-[#1769E0] text-xs font-bold transition-colors cursor-pointer"
                >
                  Book Discovery Call
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
};
