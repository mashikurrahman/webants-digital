import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Clock, Sparkles } from 'lucide-react';
import { siteContent, VideoTestimonial } from '../data/siteContent';

interface VideoTestimonialsSectionProps {
  onSelectVideo?: (video: VideoTestimonial) => void;
}

export const VideoTestimonialsSection: React.FC<VideoTestimonialsSectionProps> = ({ onSelectVideo }) => {
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);

  return (
    <section className="py-20 bg-[#F8FAFC] text-slate-900 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3 max-w-2xl mx-auto"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5B61FE]">
            Video Stories
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Client stories in their own words.
          </h2>
          <p className="text-sm text-slate-600 font-medium leading-relaxed">
            Watch how Webants transformed lead routing, creative production, and digital operations for growing brands.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteContent.videoTestimonials.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              onMouseEnter={() => setHoveredVideoId(item.id)}
              onMouseLeave={() => setHoveredVideoId(null)}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              onClick={() => onSelectVideo?.(item)}
              className="bg-[#F8FAFC] border border-slate-200 rounded-3xl overflow-hidden hover:border-[#5B61FE] hover:shadow-xl transition-[border-color,box-shadow] cursor-pointer group flex flex-col justify-between"
            >
              {/* Thumbnail with overlay */}
              <div className="relative aspect-video bg-slate-900 overflow-hidden">
                <img 
                  src={item.thumbnail} 
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className={`w-full h-full object-cover transition-transform duration-[6000ms] opacity-90 ${
                    hoveredVideoId === item.id ? 'scale-110 translate-y-1' : 'scale-100'
                  }`} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                {/* Play Button Badge */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#5B61FE] text-white flex items-center justify-center shadow-xl shadow-indigo-600/40 group-hover:scale-110 group-hover:bg-[#4F46E5] transition-transform">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-mono text-white flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{item.duration}</span>
                </div>

                {/* Client / Preview Playing Badge */}
                {hoveredVideoId === item.id ? (
                  <div className="absolute top-3 left-3 bg-[#5B61FE] text-white px-2 py-0.5 rounded-full text-[8.5px] font-mono font-bold tracking-wider z-20 animate-pulse">
                    ● PLAY PREVIEW
                  </div>
                ) : (
                  <div className="absolute top-3 left-3 bg-[#5B61FE] text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                    {item.client}
                  </div>
                )}

                {/* Equalizer Wave Indicator */}
                {hoveredVideoId === item.id && (
                  <div className="absolute top-3 right-3 flex items-end gap-0.5 h-3.5 z-20 bg-slate-950/40 backdrop-blur-xs p-1 rounded-md">
                    <span className="w-[1.5px] bg-[#5B61FE] rounded-full animate-[pulse_0.6s_infinite] h-3" />
                    <span className="w-[1.5px] bg-[#5B61FE] rounded-full animate-[pulse_0.4s_infinite_delay-100] h-2" />
                    <span className="w-[1.5px] bg-[#5B61FE] rounded-full animate-[pulse_0.5s_infinite_delay-200] h-3.5" />
                  </div>
                )}

                {/* Video scrubber bar simulation */}
                {hoveredVideoId === item.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800/80 z-20">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 6, ease: 'linear', repeat: Infinity }}
                      className="h-full bg-[#5B61FE] shadow-[0_0_4px_#5B61FE]"
                    />
                  </div>
                )}
              </div>

              {/* Text Info */}
              <div className="p-6 space-y-3 text-left">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#5B61FE] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 font-medium">
                  {item.description}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-200/80 text-xs">
                  <span className="font-semibold text-slate-700">{item.client} Case Study</span>
                  <span className="text-[#5B61FE] font-bold">Watch Video &rarr;</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
