import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Calendar, X } from 'lucide-react';
import { siteContent, InsightArticle } from '../data/siteContent';

export const InsightsPage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<InsightArticle | null>(null);

  return (
    <div className="py-16 bg-[#F7FAFF] text-[#172033] space-y-12">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center"
      >
        <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0] bg-[#EAF3FF] px-3.5 py-1 rounded-full">
          Webants Insights
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#172033]">
          Growth, technology & automation strategies.
        </h1>
        <p className="text-sm sm:text-base text-[#637083] max-w-2xl mx-auto leading-relaxed">
          Tactical articles on lead response optimization, creative subscriptions, CRM automation, and e-commerce growth.
        </p>
      </motion.div>

      {/* 9 Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteContent.insights.map((article, idx) => (
            <motion.div 
              key={article.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              onClick={() => setSelectedArticle(article)}
              className="bg-white border border-blue-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="aspect-[16/10] bg-gray-100 relative overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    decoding="async"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    fetchPriority={idx === 0 ? 'high' : 'auto'}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute top-3 left-3 bg-[#071B33]/90 text-white px-2.5 py-0.5 rounded text-[10px] font-bold uppercase">
                    {article.category}
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <div className="flex items-center gap-3 text-[11px] text-gray-500 font-medium">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#1769E0]" /> {article.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#1769E0]" /> {article.readTime}</span>
                  </div>

                  <h3 className="text-base font-bold text-[#172033] group-hover:text-[#1769E0] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#637083] leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <span className="text-xs font-bold text-[#1769E0] inline-flex items-center gap-1 group-hover:underline">
                  Read Article &rarr;
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 space-y-6 relative border border-blue-100 shadow-2xl"
            >
              <button 
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-3">
                <span className="text-xs font-bold uppercase text-[#1769E0] bg-[#EAF3FF] px-3 py-1 rounded-full">
                  {selectedArticle.category}
                </span>
                <h2 className="text-2xl font-bold text-gray-900 leading-tight">{selectedArticle.title}</h2>
                <div className="text-xs text-gray-500 flex items-center gap-3">
                  <span>{selectedArticle.date}</span>
                  <span>•</span>
                  <span>{selectedArticle.readTime}</span>
                </div>
              </div>

              <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100">
                <img 
                  src={selectedArticle.image} 
                  alt={selectedArticle.title} 
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80';
                  }}
                  className="w-full h-full object-cover" 
                />
              </div>

              <div className="text-sm text-gray-700 leading-relaxed space-y-4 pt-2">
                <p className="font-semibold text-gray-900 text-base">{selectedArticle.summary}</p>
                <p>{selectedArticle.content}</p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-mono">
                <span>// Webants Digital Article</span>
                <button onClick={() => setSelectedArticle(null)} className="px-4 py-2 rounded-xl bg-[#1769E0] text-white font-bold cursor-pointer">
                  Close Article
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
