import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Palette, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Video, 
  FileText, 
  Eye, 
  Sliders, 
  Zap, 
  Clock, 
  Check, 
  ExternalLink,
  Flame,
  Award
} from 'lucide-react';
import { siteContent } from '../data/siteContent';
import { CreativePipelineCta } from '../components/cta/CreativePipelineCta';

interface CreativePageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const CreativePage: React.FC<CreativePageProps> = ({ onNavigate }) => {
  const creativeData = siteContent.serviceLines.find(s => s.id === 'creative')!;
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedAsset, setSelectedAsset] = useState<number | null>(null);

  const creativeVault = [
    {
      title: 'BloomCart E-Commerce Ads',
      category: 'Performance Ads',
      tag: 'Meta & TikTok Static + Motion',
      turnaround: '24 Hours',
      palette: ['#5B61FE', '#7C3AED', '#1E293B'],
      img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
      description: 'High-converting UGC overlays, carousel cards, and animated product story hooks.'
    },
    {
      title: 'Apex Athletics Identity System',
      category: 'Brand Identity',
      tag: 'Vector Logo, Typeface & Guidelines',
      turnaround: '5 Business Days',
      palette: ['#E11D2E', '#0F172A', '#F8FAFC'],
      img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
      description: 'Complete brand guide, vector marks, dynamic typography hierarchy, and sub-brand kit.'
    },
    {
      title: 'Oakline Capital Pitch Deck',
      category: 'Presentation Design',
      tag: 'Keynote & Figma Investor Deck',
      turnaround: '48 Hours',
      palette: ['#0284C7', '#0F172A', '#E2E8F0'],
      img: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
      description: '18-slide investor pitch deck with interactive financial charts and custom icon graphics.'
    },
    {
      title: 'NorthPeak Direct Mail Campaign',
      category: 'Print & Packaging',
      tag: 'High-Gloss Direct Mailer',
      turnaround: '48 Hours',
      palette: ['#059669', '#111827', '#F3F4F6'],
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      description: 'Print-ready CMYK postcards with personalized QR tracking triggers for localized homeowners.'
    },
    {
      title: 'Luma 3D Product Renders',
      category: '3D & Motion',
      tag: 'Blender & After Effects Renders',
      turnaround: '72 Hours',
      palette: ['#7C5CFC', '#06B6D4', '#0B1120'],
      img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      description: 'Photorealistic 3D packaging renders with exploded component views and lighting passes.'
    },
    {
      title: 'Zack Kaseler Video Highlight Reel',
      category: '3D & Motion',
      tag: 'Short-Form Kinetic Reel',
      turnaround: '48 Hours',
      palette: ['#FF5A1F', '#000000', '#FFFFFF'],
      img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80',
      description: 'Fast-paced recruiting video reel with motion typography, sound design, and color grading.'
    }
  ];

  const categories = ['All', 'Brand Identity', 'Performance Ads', 'Presentation Design', '3D & Motion', 'Print & Packaging'];

  const filteredAssets = activeCategory === 'All'
    ? creativeVault
    : creativeVault.filter(a => a.category === activeCategory);

  return (
    <div className="bg-white text-slate-900 min-h-screen selection:bg-[#5B61FE] selection:text-white">
      
      {/* ─── 1. HIGH-IMPACT CREATIVE STUDIO HERO ─── */}
      <section className="relative pt-12 sm:pt-20 pb-20 overflow-hidden border-b border-slate-200/60 bg-gradient-to-b from-[#FAFCFF] via-white to-[#F8FAFC]">
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-gradient-to-bl from-[#5B61FE]/15 via-[#7C3AED]/10 to-transparent blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-gradient-to-tr from-indigo-400/10 via-[#5B61FE]/5 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Punchy Messaging & Quick Actions (7 Cols) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-[#5B61FE] text-xs font-black uppercase tracking-widest shadow-2xs"
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Creative & Visual Design Studio</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.03]"
              >
                Creative built for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B61FE] via-[#7C3AED] to-[#5B61FE]">
                  real commercial impact.
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg text-slate-600 font-medium max-w-xl leading-relaxed"
              >
                Vector brand systems, high-converting performance ad hooks, 3D product renders, video reels, and pitch decks. Delivered with speed, craft, and full Figma source files.
              </motion.p>

              {/* Category Quick Selector in Hero */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="flex flex-wrap gap-2 pt-2"
              >
                {categories.slice(1, 5).map((cat) => {
                  const isSelected = activeCategory === cat;

                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#5B61FE] text-white shadow-md shadow-indigo-500/20 scale-[1.02]'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{cat}</span>
                    </button>
                  );
                })}
              </motion.div>

              {/* CTAs */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 pt-4"
              >
                <button
                  onClick={() => onNavigate('free-trial')}
                  className="px-8 py-4 rounded-2xl bg-[#5B61FE] hover:bg-[#4F46E5] text-white font-black text-xs sm:text-sm shadow-xl shadow-indigo-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-2"
                >
                  <span>Start 7-Day Free Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('work')}
                  className="px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-xs sm:text-sm border border-slate-200 shadow-xs transition-colors cursor-pointer"
                >
                  <span>Explore Design Vault &rarr;</span>
                </button>
              </motion.div>
            </div>

            {/* Right: Interactive Creative Canvas Visualizer (5 Cols) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="bg-gradient-to-br from-[#0B1120] via-[#0F172A] to-[#1E293B] rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-white/10 relative overflow-hidden space-y-6 text-left">
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-300 font-bold">
                      Figma Canvas v4.2
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-300 bg-white/10 px-2 py-0.5 rounded-md border border-white/10">
                    48H DELIVERY SLA
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-950 border border-white/10">
                    <img 
                      src={filteredAssets[0]?.img || 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80'} 
                      alt="Featured Asset" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-black text-white">{filteredAssets[0]?.title}</div>
                        <div className="text-[10px] text-cyan-300 font-medium">{filteredAssets[0]?.tag}</div>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-black/60 backdrop-blur-md text-emerald-400 border border-white/10">
                        {filteredAssets[0]?.turnaround}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/10">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Design Iterations</div>
                      <div className="text-2xl font-black font-mono text-[#5B61FE] mt-0.5">
                        Unlimited
                      </div>
                      <div className="text-[10px] text-slate-400">Collaborative Review</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Source Files</div>
                      <div className="text-2xl font-black font-mono text-cyan-300 mt-0.5">
                        Figma Native
                      </div>
                      <div className="text-[10px] text-slate-400">100% Vector Handoff</div>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('free-trial')}
                    className="w-full py-3 rounded-xl bg-[#5B61FE] hover:bg-[#4F46E5] text-white font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-indigo-500/20"
                  >
                    <span>Request First Asset Brief</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── 2. INTERACTIVE CREATIVE VAULT & WORK GALLERY ─── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-left">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5B61FE]">
              Deliverable Showcase
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Selected creative deliverables.
            </h2>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              Explore recent assets designed for conversion, brand equity, and high-impact visual storytelling.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100/90 backdrop-blur-md rounded-2xl border border-slate-200/80">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-white text-[#5B61FE] font-black shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map((asset, idx) => (
            <motion.div
              key={asset.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="group bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-indigo-300/80 transition-all overflow-hidden flex flex-col justify-between p-5 text-left cursor-pointer"
              onClick={() => setSelectedAsset(selectedAsset === idx ? null : idx)}
            >
              <div className="space-y-3">
                {/* Visual Thumbnail */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-950">
                  <img 
                    src={asset.img} 
                    alt={asset.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[10px] font-bold border border-white/10">
                    {asset.category}
                  </div>

                  {/* Turnaround Badge */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[#5B61FE] text-[10px] font-bold border border-white/20">
                    <Clock className="w-3 h-3 text-[#5B61FE]" />
                    <span>{asset.turnaround}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#5B61FE] transition-colors">
                    {asset.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold">
                    {asset.tag}
                  </p>
                  <p className="text-xs text-slate-600 font-medium pt-1 line-clamp-2 leading-relaxed">
                    {asset.description}
                  </p>
                </div>

                {/* Color Palette Chips */}
                <div className="flex items-center gap-1.5 pt-2">
                  <span className="text-[10px] font-bold text-slate-400 font-mono">Palette:</span>
                  {asset.palette.map((c, i) => (
                    <span 
                      key={i} 
                      className="w-4 h-4 rounded-full border border-slate-200 shadow-2xs" 
                      style={{ background: c }}
                      title={c}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">Ready for Sprint</span>
                <span className="text-xs font-bold text-[#5B61FE] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Request Asset &rarr;
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </section>

      {/* ─── 3. CREATIVE REVISIONS & SPEED MATRIX ─── */}
      <section className="py-20 bg-[#F8FAFC] border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5B61FE]">
              Turnaround SLA Matrix
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Speed without sacrificing craft.
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              We operate on structured 24h to 72h delivery cycles with direct Figma handoffs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="text-2xl font-black font-mono text-[#5B61FE]">24-48h</div>
              <h3 className="text-base font-bold text-slate-900">Performance Ad Packs</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Static Meta banners, TikTok story assets, carousel tiles, and headline variation exports.
              </p>
              <div className="text-[10px] font-bold text-emerald-600 font-mono">✓ Figma Source Files Included</div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="text-2xl font-black font-mono text-[#7C3AED]">48-72h</div>
              <h3 className="text-base font-bold text-slate-900">Video Reels & Motion</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Short-form video cutdowns, sound effects, motion subtitle hooks, and animated logo reveals.
              </p>
              <div className="text-[10px] font-bold text-emerald-600 font-mono">✓ 4K Pro-Res Export</div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="text-2xl font-black font-mono text-blue-600">48h</div>
              <h3 className="text-base font-bold text-slate-900">Pitch & Sales Decks</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Executive presentation design, custom chart illustrations, and branded Keynote/Figma templates.
              </p>
              <div className="text-[10px] font-bold text-emerald-600 font-mono">✓ Fully Editable Vectors</div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="text-2xl font-black font-mono text-emerald-600">5-7 Days</div>
              <h3 className="text-base font-bold text-slate-900">Full Brand Identity</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Primary/secondary marks, responsive logo suite, color tokens, typography scales, and brand bible.
              </p>
              <div className="text-[10px] font-bold text-emerald-600 font-mono">✓ Full Commercial Transfer</div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── 3.5. VISUAL DESIGN LAB IN ACTION ─── */}
      <section className="py-20 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#5B61FE]/20 bg-indigo-50/80 text-[#5B61FE] text-xs font-bold uppercase tracking-widest shadow-2xs">
              <Palette className="w-3.5 h-3.5" />
              <span>Studio Workstations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Design craft, kinetic motion & 3D renders.
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              From vector Figma design systems to physical CMYK packaging prototypes and 4K After Effects cutdowns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Visual Card 1 */}
            <div className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-200 shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80" 
                alt="Figma UI/UX Design System Suite"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-left text-white space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-cyan-300 bg-white/10 px-2 py-0.5 rounded border border-white/15">
                  Figma Native
                </span>
                <h4 className="text-base font-bold text-white">Atomic Design Systems & Tokens</h4>
                <p className="text-xs text-slate-300 font-medium">Auto-layout components with verified WCAG accessible color contrast.</p>
              </div>
            </div>

            {/* Visual Card 2 */}
            <div className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-200 shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80" 
                alt="Brand Identity & Print Collateral"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-left text-white space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-[#5B61FE] bg-white/10 px-2 py-0.5 rounded border border-white/15">
                  Brand Identity
                </span>
                <h4 className="text-base font-bold text-white">Physical & Digital Touchpoints</h4>
                <p className="text-xs text-slate-300 font-medium">Vector logomarks, typography bibles, and custom packaging dies.</p>
              </div>
            </div>

            {/* Visual Card 3 */}
            <div className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-200 shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80" 
                alt="Motion Graphics & Short-Form Editing"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-left text-white space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 bg-white/10 px-2 py-0.5 rounded border border-white/15">
                  Kinetic Motion
                </span>
                <h4 className="text-base font-bold text-white">Performance Video Hook Edits</h4>
                <p className="text-xs text-slate-300 font-medium">High-retention social reels with motion graphics and sound design.</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─── 4. TRANSPARENT CREATIVE PACKAGES ─── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5B61FE]">
            Creative Plans
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Flexible creative subscription tiers.
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            Turnkey graphic design, motion production, and brand assets delivered continuously.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
          
          {/* Essential Creative Subscription */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-700">
                High-Volume Graphics
              </span>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Essential Creative</h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  Ideal for active marketing teams needing continuous banners, social assets, and landing page graphics.
                </p>
              </div>

              <div className="text-3xl font-black text-slate-900 font-mono">
                $1,200 <span className="text-xs text-slate-500 font-normal font-sans">/ month</span>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span>Unlimited graphic design requests</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span>48-Hour average turnaround SLA</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span>Social banners, ad hooks & pitch decks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span>Direct shared Slack channel</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('free-trial')}
              className="w-full py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-extrabold text-xs transition-colors cursor-pointer text-center"
            >
              Start 7-Day Free Trial &rarr;
            </button>
          </div>

          {/* Pro Motion & Video Subscription */}
          <div className="bg-gradient-to-b from-[#F5F7FF] via-white to-[#F5F7FF] rounded-3xl p-8 border-2 border-[#5B61FE] shadow-xl shadow-indigo-600/5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#5B61FE] text-white">
                  Recommended
                </span>
                <span className="text-xs font-bold text-[#5B61FE]">Full Video + 3D</span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900">Pro Motion & Video</h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  Complete video editing, motion graphics, 3D product renders, and identity design.
                </p>
              </div>

              <div className="text-3xl font-black text-slate-900 font-mono">
                $2,400 <span className="text-xs text-slate-500 font-normal font-sans">/ month</span>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span>Everything in Essential Creative</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span>Short-form Reels & TikTok video editing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span>Custom After Effects motion graphics</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span>Photorealistic 3D product packaging renders</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('free-trial')}
              className="w-full py-3.5 rounded-xl bg-[#5B61FE] hover:bg-[#4F46E5] text-white font-extrabold text-xs shadow-lg shadow-indigo-500/25 transition-all cursor-pointer text-center"
            >
              Start 7-Day Free Trial &rarr;
            </button>
          </div>

        </div>

      </section>

      {/* ─── 5. DYNAMIC INTERACTIVE CREATIVE PIPELINE CTA ─── */}
      <CreativePipelineCta 
        onStartTrial={() => onNavigate('free-trial')}
        onExploreWork={() => onNavigate('work')}
      />

    </div>
  );
};
