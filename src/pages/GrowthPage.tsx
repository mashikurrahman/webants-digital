import React from 'react';
import { TrendingUp, CheckCircle2, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { siteContent } from '../data/siteContent';

interface GrowthPageProps {
  onNavigate: (page: string) => void;
  onOpenBookCall: () => void;
}

export const GrowthPage: React.FC<GrowthPageProps> = ({ onNavigate, onOpenBookCall }) => {
  const growthData = siteContent.serviceLines.find(s => s.id === 'growth')!;
  const caseStudy = siteContent.caseStudies.find(c => c.id === 'cool-breeze-cars') ?? siteContent.caseStudies[0];
  const testimonial = siteContent.testimonials.find(t => t.id === 'jordan')!;

  return (
    <div className="pt-8 sm:pt-12 pb-20 bg-[#F7FAFF] text-[#172033] space-y-16">
      
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0] bg-[#EAF3FF] px-3.5 py-1 rounded-full">
          Growth & Acquisition
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#172033]">
          Turn attention into measurable opportunities.
        </h1>
        <p className="text-sm sm:text-base text-[#637083] max-w-2xl mx-auto leading-relaxed">
          High-ROI search engine optimization, local pack visibility, performance media ads, and direct mail campaigns.
        </p>
      </div>

      {/* Services Included Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-blue-100 rounded-3xl p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-[#172033] text-center">Included Growth Capabilities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {growthData.items.map((item) => (
              <div key={item} className="p-3 bg-[#F7FAFF] rounded-2xl border border-blue-50 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1769E0] shrink-0" />
                <span className="text-xs font-bold text-gray-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3 Simple Demo Packages */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-[#172033]">Growth Packages</h2>
          <p className="text-xs text-gray-500 font-mono">Demo pricing — replace before launch</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {growthData.packages?.map((pkg) => (
            <div key={pkg.name} className="bg-white border border-blue-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-[#172033]">{pkg.name}</h3>
                  <p className="text-xs text-[#637083]">{pkg.desc}</p>
                </div>
                <div className="text-3xl font-black text-[#1769E0]">{pkg.price}</div>
                <ul className="space-y-2 text-xs text-gray-700">
                  {pkg.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1769E0]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onNavigate('free-trial')}
                className="w-full py-3 rounded-xl bg-[#1769E0] hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Start Trial with Growth
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Demo Case Study & Demo Testimonial */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Case Study */}
        <div className="bg-white border border-blue-100 rounded-3xl p-6 shadow-sm space-y-4">
          <span className="text-[10px] font-bold text-white bg-[#1769E0] px-2.5 py-0.5 rounded uppercase">
            Demo Case Study
          </span>
          <h3 className="text-lg font-bold text-[#172033]">{caseStudy.client}: {caseStudy.title}</h3>
          <p className="text-xs text-[#637083]">{caseStudy.summary}</p>
          <ul className="space-y-1.5 text-xs text-gray-800">
            {caseStudy.results.map((res, i) => (
              <li key={i} className="flex items-center gap-2 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1769E0]" />
                <span>{res}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Testimonial */}
        <div className="bg-[#071B33] text-white rounded-3xl p-6 border border-blue-900/50 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-[10px] font-mono text-[#3B8CFF] font-bold uppercase">
              Demo Testimonial
            </span>
            <p className="text-sm text-gray-200 italic leading-relaxed">
              "{testimonial.quote}"
            </p>
          </div>
          <div className="flex items-center gap-3 pt-3 border-t border-blue-900/40">
            <img src={testimonial.avatar} alt={testimonial.author} decoding="async" loading="lazy" width={36} height={36} className="w-9 h-9 rounded-full object-cover" />
            <div>
              <div className="text-xs font-bold text-white">{testimonial.author}</div>
              <div className="text-[10px] text-gray-400">{testimonial.role}, {testimonial.company}</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
