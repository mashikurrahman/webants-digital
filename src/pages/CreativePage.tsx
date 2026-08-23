import React from 'react';
import { Palette, CheckCircle2, ArrowRight } from 'lucide-react';
import { siteContent } from '../data/siteContent';

interface CreativePageProps {
  onNavigate: (page: string) => void;
}

export const CreativePage: React.FC<CreativePageProps> = ({ onNavigate }) => {
  const creativeData = siteContent.serviceLines.find(s => s.id === 'creative')!;

  const galleryImages = [
    { title: 'BloomCart Campaign Assets', cat: 'Motion Graphics & Ads', img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80' },
    { title: 'Apex Athletics Brand Book', cat: 'Identity System', img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80' },
    { title: 'Oakline Legal Pitch Deck', cat: 'Presentation Design', img: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80' },
    { title: 'NorthPeak Direct Mailer', cat: 'Print & Direct Mail', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80' },
  ];

  return (
    <div className="pt-8 sm:pt-12 pb-20 bg-[#F7FAFF] text-[#172033] space-y-16">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-[#F05AA6] bg-[#FCEAF4] px-3.5 py-1 rounded-full border border-pink-200">
          Creative & Brand Studio
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#172033]">
          Creative built for real business goals.
        </h1>
        <p className="text-sm sm:text-base text-[#637083] max-w-2xl mx-auto leading-relaxed">
          Identity systems, high-converting ad graphics, short-form Reels, motion graphics, and campaign creative.
        </p>
      </div>

      {/* Capabilities */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-blue-100 rounded-3xl p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-[#172033] text-center">Creative Deliverables</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {creativeData.items.map((item) => (
              <div key={item} className="p-3 bg-[#F7FAFF] rounded-2xl border border-blue-50 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1769E0] shrink-0" />
                <span className="text-xs font-bold text-gray-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sample Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#172033]">Sample Work Gallery</h2>
          <p className="text-xs text-gray-500 font-mono mt-1">// Fictional demo client projects</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryImages.map((g, i) => (
            <div key={i} className="bg-white rounded-3xl overflow-hidden border border-blue-100 shadow-sm space-y-3 p-3">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src={g.img}
                  alt={g.title}
                  decoding="async"
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80';
                  }}
                />
              </div>
              <div className="px-1 pb-1">
                <span className="text-[10px] font-bold text-[#1769E0] uppercase block">{g.cat}</span>
                <h3 className="text-xs font-bold text-gray-900 mt-0.5">{g.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription & Fixed Options */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Subscription Card */}
        <div className="bg-[#071B33] text-white rounded-3xl p-8 border border-blue-900/50 shadow-xl space-y-4">
          <span className="text-xs font-bold text-[#3B8CFF] uppercase tracking-wider">Subscription Option</span>
          <h3 className="text-2xl font-bold">Creative Subscription</h3>
          <div className="text-3xl font-black text-[#3B8CFF]">$1,200 <span className="text-xs text-gray-300 font-normal">/month</span></div>
          <p className="text-xs text-gray-300 leading-relaxed">
            Turnkey graphic design, social banners, and ad variations delivered continuously.
          </p>
          <button onClick={() => onNavigate('free-trial')} className="w-full py-3 rounded-xl bg-gradient-to-r from-[#1769E0] to-[#3B8CFF] font-bold text-white text-xs cursor-pointer">
            Try 7 Days Free
          </button>
        </div>

        {/* Fixed Project Card */}
        <div className="bg-white text-gray-900 rounded-3xl p-8 border border-blue-100 shadow-sm space-y-4">
          <span className="text-xs font-bold text-[#1769E0] uppercase tracking-wider">Fixed Project Option</span>
          <h3 className="text-2xl font-bold">Brand Identity System</h3>
          <div className="text-3xl font-black text-gray-900">$2,500 <span className="text-xs text-gray-500 font-normal">fixed</span></div>
          <p className="text-xs text-gray-600 leading-relaxed">
            Logo lockups, typography rules, color palettes, and comprehensive brand guidelines.
          </p>
          <button onClick={() => onNavigate('contact')} className="w-full py-3 rounded-xl bg-gray-900 text-white font-bold text-xs hover:bg-black transition-colors cursor-pointer">
            Request Brand Scope
          </button>
        </div>

      </div>

    </div>
  );
};
