import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles, 
  Palette, 
  Video, 
  FileText, 
  Layers, 
  CheckCircle2, 
  Check, 
  Plus, 
  Eye
} from 'lucide-react';

interface CreativePipelineCtaProps {
  onStartTrial: () => void;
  onExploreWork: () => void;
}

export const CreativePipelineCta: React.FC<CreativePipelineCtaProps> = ({
  onStartTrial,
  onExploreWork
}) => {
  const [selectedAssetTypes, setSelectedAssetTypes] = useState<string[]>(['ads', 'reels', 'figma']);

  const assetOptions = [
    { id: 'ads', name: 'High-Converting Ad Packs', sub: 'Meta, TikTok & YouTube Static/Motion', sla: '24h SLA', icon: Palette },
    { id: 'reels', name: 'Short-Form Video Cutdowns', sub: 'Kinetic Subtitles & Sound Design', sla: '48h SLA', icon: Video },
    { id: 'figma', name: 'UI/UX Design Systems', sub: 'Responsive Web & Mobile Figma Components', sla: '48h SLA', icon: Layers },
    { id: 'decks', name: 'Investor & Sales Pitch Decks', sub: 'Keynote, PowerPoint & Figma Slides', sla: '48h SLA', icon: FileText },
    { id: '3d', name: '3D Product Packaging Renders', sub: 'Photorealistic Blender CAD Lighting', sla: '72h SLA', icon: Eye }
  ];

  const toggleAsset = (id: string) => {
    if (selectedAssetTypes.includes(id)) {
      if (selectedAssetTypes.length > 1) {
        setSelectedAssetTypes(selectedAssetTypes.filter(a => a !== id));
      }
    } else {
      setSelectedAssetTypes([...selectedAssetTypes, id]);
    }
  };

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
            <Palette className="w-3.5 h-3.5" />
            <span>Interactive Creative Sandbox</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
            Build your ongoing design sprint <br className="hidden sm:block" />
            with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B61FE] via-[#7C3AED] to-[#5B61FE]">zero creative bottlenecks.</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Select the deliverable formats your marketing team requires this month. We assign senior art directors and motion specialists directly to your workflow.
          </p>
        </div>

        {/* Interactive Creative Console */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-xl shadow-indigo-500/5 p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Asset Selection Matrix (7 Cols) */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 font-mono">
                Select Active Deliverables in Queue:
              </span>
              <span className="text-xs font-bold text-[#5B61FE]">
                {selectedAssetTypes.length} Selected
              </span>
            </div>

            <div className="space-y-2.5">
              {assetOptions.map((opt) => {
                const isSelected = selectedAssetTypes.includes(opt.id);
                const Icon = opt.icon;

                return (
                  <motion.button
                    key={opt.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => toggleAsset(opt.id)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-gradient-to-r from-indigo-50/90 to-white border-[#5B61FE] shadow-sm'
                        : 'bg-[#F8FAFC] border-slate-200/80 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div 
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs transition-colors ${
                          isSelected ? 'bg-[#5B61FE]' : 'bg-slate-300'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className={`text-xs font-extrabold ${isSelected ? 'text-slate-900' : 'text-slate-600'}`}>
                          {opt.name}
                        </div>
                        <div className="text-[10px] font-medium text-slate-400 mt-0.5">
                          {opt.sub}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono font-black text-[#5B61FE] bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                        {opt.sla}
                      </span>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-[#5B61FE] text-white' : 'bg-slate-200 text-slate-400'
                      }`}>
                        {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5 text-slate-500" />}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right: Real-Time Creative Studio Pass (5 Cols) */}
          <div className="lg:col-span-5 bg-[#0B1120] rounded-3xl p-6 sm:p-8 text-white shadow-2xl text-left flex flex-col justify-between space-y-6 relative overflow-hidden border border-white/10">
            
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#5B61FE]/25 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-white/10 text-cyan-300 border border-white/10">
                  Sprint Studio Pass
                </span>
                <span className="text-xs font-mono font-bold text-cyan-300">
                  Figma Native
                </span>
              </div>

              <div>
                <div className="text-xs uppercase font-mono text-slate-400 font-bold tracking-wider">
                  Fast-Track Execution
                </div>
                <div className="text-3xl font-black text-white mt-1">
                  24h - 48h Turnaround
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span>Unlimited active design requests & revisions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span>100% vector Figma source files & commercial transfer</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span>Direct Slack workspace integration with senior designers</span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 pt-2 relative z-10">
              <button
                onClick={onStartTrial}
                className="w-full py-4 rounded-2xl bg-[#5B61FE] hover:bg-[#4F46E5] text-white font-black text-xs sm:text-sm shadow-xl shadow-indigo-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Test Creative Studio: 7-Day Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreWork}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15 transition-colors cursor-pointer text-center"
              >
                Explore Creative Portfolio &rarr;
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
