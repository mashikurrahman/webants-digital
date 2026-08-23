import React from 'react';
import { motion } from 'motion/react';
import { Star, CheckCircle, Sparkles } from 'lucide-react';
import { siteContent } from '../data/siteContent';

export const ReviewsSection: React.FC = () => {
  const googleReviews = siteContent.reviews.filter(r => r.platform === 'Google');
  const otherReviews = siteContent.reviews.filter(r => r.platform !== 'Google');

  return (
    <section className="py-20 bg-[#F8FAFC] text-slate-900 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3 max-w-2xl mx-auto"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5B61FE]">
            Verified Client Ratings
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Highly rated by our partners.
          </h2>
          <p className="text-sm text-slate-600 font-medium leading-relaxed">
            Authentic client ratings and feedback across verified review platforms.
          </p>
        </motion.div>

        {/* 4 Google Review Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {googleReviews.map((rev, idx) => (
            <motion.div 
              key={rev.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 hover:shadow-md hover:border-indigo-200 transition-[border-color,box-shadow] flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 font-mono">
                    Google Review
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">{rev.author}</span>
                <span className="text-[10px] text-slate-400 font-medium">{rev.date}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Platform Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          {otherReviews.map((rev) => (
            <div 
              key={rev.id}
              className="bg-white border border-slate-200 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-xs text-xs font-semibold text-slate-700"
            >
              <CheckCircle className="w-4 h-4 text-[#5B61FE]" />
              <span>{rev.platform} Verified Partner — {rev.author}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
