import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Clock, Sparkles, TrendingUp, MessageSquare, CheckCircle2 } from 'lucide-react';
import { VideoTestimonial } from '../data/siteContent';

interface VideoLightboxModalProps {
  video: VideoTestimonial | null;
  onClose: () => void;
}

// Local mock transcripts and metrics mapping
const drawerData: Record<string, {
  metrics: { value: string; label: string }[];
  transcript: { speaker: string; text: string; role: string }[];
}> = {
  v1: {
    metrics: [
      { value: '+32%', label: 'Response Speed' },
      { value: '100%', label: 'Leads Hooked' },
      { value: '$12K/Mo', label: 'Overhead Saved' }
    ],
    transcript: [
      {
        speaker: 'Jordan Lee',
        role: 'Operations Director',
        text: 'Before Webants, we were losing leads because our moving crews were in transit and couldn\'t answer estimates. Sprints were highly fragmented.'
      },
      {
        speaker: 'Jordan Lee',
        role: 'Operations Director',
        text: 'Webants built our automated SMS pipeline. Now when a user drops a form, they instantly receive a quote estimate. Our close rate jumped by 32%!'
      }
    ]
  },
  v2: {
    metrics: [
      { value: '90+', label: 'Creative Assets' },
      { value: '-22%', label: 'Ad CAC Reduction' },
      { value: '48h', label: 'Asset Turnaround' }
    ],
    transcript: [
      {
        speaker: 'Morgan Taylor',
        role: 'Marketing Manager',
        text: 'We were constantly bottlenecked by freelancers being late on video edits. Paid ad campaigns were fatigued.'
      },
      {
        speaker: 'Morgan Taylor',
        role: 'Marketing Manager',
        text: 'The Webants creative subscription model replaced all that friction. We communicate directly in Slack and receive high-converting ad creative in 48 hours.'
      }
    ]
  },
  v3: {
    metrics: [
      { value: '3x', label: 'Agencies Replaced' },
      { value: '< 15m', label: 'Slack Response' },
      { value: '99/100', label: 'LCP Speed Score' }
    ],
    transcript: [
      {
        speaker: 'Alex Morgan',
        role: 'Director',
        text: 'Accountability was non-existent when paid media blamed the design team, and designers blamed the web developer.'
      },
      {
        speaker: 'Alex Morgan',
        role: 'Director',
        text: 'Plugging in Webants consolidated design, development, automations, and search under one squad. Sprints are transparent and daily Slack updates are instant.'
      }
    ]
  }
};

export const VideoLightboxModal: React.FC<VideoLightboxModalProps> = ({ video, onClose }) => {
  if (!video) return null;

  const data = drawerData[video.id] || {
    metrics: [{ value: 'Live', label: 'Case Study' }],
    transcript: [{ speaker: 'Executive', role: 'Partner', text: video.description }]
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex justify-end text-left select-none"
        onClick={onClose}
      >
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 220 }}
          className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden text-slate-900 border-l border-slate-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-[#F8FAFC]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#EEF2FF] text-[#5B61FE] flex items-center justify-center font-bold">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
                  {video.client} Case Study
                </h3>
                <p className="text-xs text-slate-500 font-medium">{video.title}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Video Testimonial Mock Player */}
            <div className="relative aspect-video bg-slate-900 w-full overflow-hidden rounded-2xl group border border-slate-200 shadow-md">
              <img 
                src={video.thumbnail} 
                alt={video.client}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover opacity-90 group-hover:scale-103 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              
              <button 
                onClick={() => alert(`Playing verified interview with ${video.client}`)}
                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#5B61FE] hover:bg-[#4F46E5] text-white flex items-center justify-center shadow-2xl shadow-indigo-600/50 transition-transform hover:scale-110 cursor-pointer"
              >
                <Play className="w-6 h-6 fill-current ml-1" />
              </button>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[10px] font-bold">
                <span className="bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{video.duration} MIN</span>
                </span>
                <span className="bg-[#5B61FE] px-2 py-0.5 rounded-md">
                  Verified Client
                </span>
              </div>
            </div>

            {/* Impact Metric Scoreboard */}
            <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <TrendingUp className="w-4 h-4 text-[#5B61FE]" />
                <span>Executive Growth Impact</span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                {data.metrics.map((m, idx) => (
                  <div key={idx} className="space-y-0.5 bg-white p-2.5 rounded-xl border border-slate-100 shadow-2xs">
                    <span className="text-lg font-black text-[#5B61FE] tracking-tight block">
                      {m.value}
                    </span>
                    <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-wider block leading-tight">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Interview Transcript */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <MessageSquare className="w-4 h-4 text-[#5B61FE]" />
                <span>Verified Interview Transcript</span>
              </div>
              
              <div className="space-y-4 pt-1">
                {data.transcript.map((t, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[9px] font-extrabold text-[#5B61FE]">
                        {t.speaker.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold text-slate-800 block leading-tight">
                          {t.speaker}
                        </span>
                        <span className="text-[8px] font-bold text-slate-400 font-mono block">
                          {t.role}
                        </span>
                      </div>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl rounded-tl-none p-3.5 text-xs text-slate-600 leading-relaxed font-medium">
                      "{t.text}"
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Footer actions */}
          <div className="p-5 border-t border-slate-100 bg-[#F8FAFC] flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Verified partner story</span>
            <button 
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Close Drawer
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
