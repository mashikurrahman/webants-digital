import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Palette, 
  Code2, 
  Bot, 
  Layers,
  Check,
  Plus
} from 'lucide-react';

interface ServicesSquadCtaProps {
  onStartTrial: () => void;
  onBookCall: () => void;
  onNavigate?: (page: string) => void;
}

export const ServicesSquadCta: React.FC<ServicesSquadCtaProps> = ({
  onStartTrial,
  onBookCall,
  onNavigate
}) => {
  const [selectedStreams, setSelectedStreams] = useState<string[]>(['growth', 'creative', 'tech']);

  const streamOptions = [
    { id: 'growth', name: 'Growth & Paid Ads', icon: TrendingUp, badge: '+142% ROAS' },
    { id: 'creative', name: 'Creative & Video Studio', icon: Palette, badge: '48h Turnaround' },
    { id: 'tech', name: 'Engineering & Web', icon: Code2, badge: '100/100 Speed' },
    { id: 'ai', name: 'AI & Automations', icon: Bot, badge: '<60s Lead Reply' },
    { id: 'ops', name: 'Digital Operations', icon: Layers, badge: 'Daily Slack Sync' }
  ];

  const toggleStream = (id: string) => {
    if (selectedStreams.includes(id)) {
      if (selectedStreams.length > 1) {
        setSelectedStreams(selectedStreams.filter(s => s !== id));
      }
    } else {
      setSelectedStreams([...selectedStreams, id]);
    }
  };

  const estimatedVelocity = selectedStreams.length * 4;
  const turnaroundTime = selectedStreams.length >= 3 ? '24 - 48 Hours' : '48 Hours';

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#FAFCFF] via-[#F4F7FF] to-[#FAFCFF] border-t border-slate-200/80 font-body">
      {/* Soft Ambient Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(91,90,254,0.06)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-[#5B61FE]/20 bg-white/90 backdrop-blur-sm text-[#5B61FE] text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Squad Configurator</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
            Assemble your custom digital squad <br className="hidden sm:block" />
            in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B61FE] via-[#7C3AED] to-[#5B61FE]">real-time.</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Toggle the service disciplines you need active this month. We deploy dedicated specialists straight to your company Slack workspace.
          </p>
        </div>

        {/* Interactive Squad Assembly Console */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-xl shadow-indigo-500/5 p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Stream Toggle Matrix (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 font-mono">
                Select Active Department Streams:
              </span>
              <span className="text-xs font-bold text-[#5B61FE]">
                {selectedStreams.length} of 5 Active
              </span>
            </div>

            {/* Stream Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {streamOptions.map((stream) => {
                const isSelected = selectedStreams.includes(stream.id);
                const Icon = stream.icon;

                return (
                  <motion.button
                    key={stream.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleStream(stream.id)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-gradient-to-r from-indigo-50/90 to-white border-[#5B61FE] shadow-sm'
                        : 'bg-[#F8FAFC] border-slate-200/80 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs transition-colors ${
                          isSelected ? 'bg-[#5B61FE]' : 'bg-slate-300'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className={`text-xs font-extrabold ${isSelected ? 'text-slate-900' : 'text-slate-600'}`}>
                          {stream.name}
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 mt-0.5">
                          {stream.badge}
                        </div>
                      </div>
                    </div>

                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-[#5B61FE] text-white' : 'bg-slate-200 text-slate-400'
                    }`}>
                      {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Live Synchronized Capacity Bar */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Synchronized Squad Bandwidth:</span>
                <span className="font-mono text-[#5B61FE]">{selectedStreams.length * 20}% Full Power</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#5B61FE] to-[#7C3AED] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${selectedStreams.length * 20}%` }}
                  transition={{ type: 'spring', damping: 20 }}
                />
              </div>
            </div>
          </div>

          {/* Right: Live Squad Deployment Summary Card (5 Cols) */}
          <div className="lg:col-span-5 bg-[#0B1120] rounded-3xl p-6 sm:p-8 text-white shadow-2xl text-left flex flex-col justify-between space-y-6 relative overflow-hidden border border-white/10">
            
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#5B61FE]/25 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-white/10 text-cyan-300 border border-white/10">
                  Ready to Deploy
                </span>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Slack Ready</span>
                </div>
              </div>

              <div>
                <div className="text-xs uppercase font-mono text-slate-400 font-bold tracking-wider">
                  Configured Monthly Squad
                </div>
                <h3 className="text-2xl font-black text-white mt-0.5">
                  {selectedStreams.length} Active Stream{selectedStreams.length > 1 ? 's' : ''}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/10">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Weekly Deliverables</div>
                  <div className="text-xl font-black font-mono text-cyan-300 mt-0.5">
                    ~{estimatedVelocity} Assets / Wk
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Average Turnaround</div>
                  <div className="text-xl font-black font-mono text-emerald-400 mt-0.5">
                    {turnaroundTime}
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span>Zero hiring overhead, payroll, or equipment costs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span>Pause or swap streams monthly as priorities shift</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span>100% money-back 7-day trial guarantee</span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 pt-2 relative z-10">
              <button
                onClick={onStartTrial}
                className="w-full py-4 rounded-2xl bg-[#5B61FE] hover:bg-[#4F46E5] text-white font-black text-xs sm:text-sm shadow-xl shadow-indigo-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Deploy Squad: 7-Day Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onBookCall}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15 transition-colors cursor-pointer text-center"
              >
                Talk with Squad Director
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
