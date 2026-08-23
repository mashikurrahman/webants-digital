import React from 'react';
import { Code2, CheckCircle2, Laptop, ShoppingBag, Globe, Zap } from 'lucide-react';
import { siteContent } from '../data/siteContent';

interface TechnologyPageProps {
  onNavigate: (page: string) => void;
}

export const TechnologyPage: React.FC<TechnologyPageProps> = ({ onNavigate }) => {
  const techData = siteContent.serviceLines.find(s => s.id === 'technology')!;

  const platformMockups = [
    { title: 'Vitalis Health Medical Portal', type: 'WordPress / Custom Web Platform', img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80' },
    { title: 'BlueNest E-commerce Storefront', type: 'Shopify Store', img: 'https://images.unsplash.com/photo-1556742049-0a670f4a4591?auto=format&fit=crop&w=800&q=80' },
    { title: 'Oakline Corporate Advisory Site', type: 'Webflow Engine', img: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80' }
  ];

  return (
    <div className="pt-8 sm:pt-12 pb-20 bg-[#F7FAFF] text-[#172033] space-y-16">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0] bg-[#EAF3FF] px-3.5 py-1 rounded-full">
          Web & Engineering Studio
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#172033]">
          Digital platforms built to perform.
        </h1>
        <p className="text-sm sm:text-base text-[#637083] max-w-2xl mx-auto leading-relaxed">
          High-speed custom websites, Shopify e-commerce engines, WordPress CMS setups, Webflow builds, and ongoing technical maintenance.
        </p>
      </div>

      {/* Capabilities */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-blue-100 rounded-3xl p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-[#172033] text-center">Technology Solutions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {techData.items.map((item) => (
              <div key={item} className="p-3 bg-[#F7FAFF] rounded-2xl border border-blue-50 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1769E0] shrink-0" />
                <span className="text-xs font-bold text-gray-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Website Mockups & Interfaces */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#172033]">Fictional Interface Mockups</h2>
          <p className="text-xs text-gray-500 font-mono mt-1">// Sample web platforms designed for client conversion</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {platformMockups.map((m, i) => (
            <div key={i} className="bg-white rounded-3xl overflow-hidden border border-blue-100 shadow-sm space-y-3 p-4">
              <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100 relative">
                <img src={m.img} alt={m.title} decoding="async" loading="lazy" className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-[#071B33]/80 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-mono">
                  {m.type}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">{m.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Build Options */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
        
        <div className="bg-white rounded-3xl p-8 border border-blue-100 shadow-sm space-y-4">
          <span className="text-xs font-bold text-[#1769E0] uppercase tracking-wider">Business Web Platform</span>
          <h3 className="text-2xl font-bold text-gray-900">WordPress / Webflow System</h3>
          <div className="text-3xl font-black text-[#1769E0]">$4,500 <span className="text-xs text-gray-500 font-normal">fixed</span></div>
          <p className="text-xs text-gray-600 leading-relaxed">
            Responsive 8-page corporate build, speed-optimized, integrated CMS, and lead forms.
          </p>
          <button onClick={() => onNavigate('contact')} className="w-full py-3 rounded-xl bg-[#1769E0] text-white font-bold text-xs hover:bg-blue-700 transition-colors cursor-pointer">
            Build Business Website
          </button>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-blue-100 shadow-sm space-y-4">
          <span className="text-xs font-bold text-[#1769E0] uppercase tracking-wider">E-commerce Engine</span>
          <h3 className="text-2xl font-bold text-gray-900">Shopify Storefront</h3>
          <div className="text-3xl font-black text-[#1769E0]">$5,500 <span className="text-xs text-gray-500 font-normal">fixed</span></div>
          <p className="text-xs text-gray-600 leading-relaxed">
            Custom Shopify theme, upsell workflows, payment gateway integrations, and product catalog sync.
          </p>
          <button onClick={() => onNavigate('contact')} className="w-full py-3 rounded-xl bg-[#1769E0] text-white font-bold text-xs hover:bg-blue-700 transition-colors cursor-pointer">
            Build Shopify Store
          </button>
        </div>

      </div>

    </div>
  );
};
