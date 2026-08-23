import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Zap, 
  ArrowRight, 
  Share2, 
  Building2, 
  TrendingUp
} from 'lucide-react';
import { siteContent } from '../data/siteContent';

interface IndustryDetailPageProps {
  industryId: string;
  onNavigate: (page: string, param?: string) => void;
  onOpenBookCall: () => void;
}

export const IndustryDetailPage: React.FC<IndustryDetailPageProps> = ({
  industryId,
  onNavigate,
  onOpenBookCall
}) => {
  const [copied, setCopied] = useState(false);

  // Find selected industry or fallback to first
  const industry = siteContent.industries.find(i => i.id === industryId) || siteContent.industries[0];

  // Find matching case studies for this industry
  const matchingCaseStudies = siteContent.caseStudies.filter(
    cs => cs.industry.toLowerCase().includes(industry.name.toLowerCase().split(' ')[0]) ||
          cs.category.toLowerCase().includes(industry.name.toLowerCase().split(' ')[0])
  );

  const fallbackStudies = matchingCaseStudies.length > 0 
    ? matchingCaseStudies 
    : siteContent.caseStudies.slice(0, 3);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-8 sm:pt-12 pb-20 bg-[#F7FAFF] text-[#172033] min-h-screen">
      
      {/* Top Breadcrumb Nav */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-blue-100 shadow-sm">
          <button 
            onClick={() => onNavigate('industries')}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#1769E0] hover:text-blue-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Industries</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
            <span>Sectors</span>
            <span>/</span>
            <span className="text-[#1769E0] font-bold">{industry.name}</span>
          </div>

          <button 
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EAF3FF] text-[#1769E0] hover:bg-blue-600 hover:text-white font-bold text-xs transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Link Copied!' : 'Share Industry Profile'}</span>
          </button>
        </div>
      </motion.div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-[#071B33] via-[#0A2444] to-[#071B33] text-white p-8 sm:p-12 rounded-3xl border border-blue-900/60 shadow-2xl relative overflow-hidden"
        >
          {/* Gradient, not `blur-3xl`: same glow, no per-frame filter pass. Box enlarged and
              re-centred because a blur bleeds outward past its element and a gradient doesn't. */}
          <div
            className="absolute -top-[78px] -right-[78px] w-[540px] h-[540px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(240,90,166,0.10) 0%, rgba(240,90,166,0.075) 40%, transparent 72%)' }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#1769E0] text-white px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
                  {industry.name} Sector
                </span>
                <span className="bg-[#FCEAF4] text-[#F05AA6] border border-[#F05AA6]/30 px-3 py-1 rounded-full text-xs font-bold">
                  Tailored Workflow
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Connected Growth Systems for <span className="text-[#3B8CFF]">{industry.name}</span>
              </h1>

              <p className="text-base text-blue-100/90 leading-relaxed">
                {industry.challenge}
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onOpenBookCall}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#1769E0] to-[#3B8CFF] hover:opacity-90 text-white font-bold text-xs shadow-lg shadow-blue-500/20 transition-opacity cursor-pointer flex items-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  <span>Discuss {industry.name} Solution</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate('free-trial')}
                  className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors cursor-pointer"
                >
                  Start 7-Day Free Trial
                </motion.button>
              </div>
            </div>

            {/* Visual Hero Preview Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden border border-blue-800/60 shadow-2xl relative group bg-gray-900"
            >
              <img 
                src={industry.image} 
                alt={industry.name} 
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071B33]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
                <span className="text-[10px] font-bold text-[#F05AA6] uppercase tracking-wider block">Verified Outcome</span>
                <p className="text-xs font-bold text-white mt-0.5">{industry.caseStudyTitle}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Challenge vs Solution Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-3xl border border-blue-100 shadow-sm space-y-4"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FCEAF4] text-[#F05AA6] flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#F05AA6] bg-[#FCEAF4] px-3 py-1 rounded-full inline-block">
              Sector Challenge
            </span>
            <h3 className="text-xl font-bold text-[#172033]">Common {industry.name} Bottleneck</h3>
            <p className="text-sm text-[#637083] leading-relaxed">
              {industry.challenge}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-3xl border border-blue-100 shadow-sm space-y-4"
          >
            <div className="w-10 h-10 rounded-xl bg-[#EAF3FF] text-[#1769E0] flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0] bg-[#EAF3FF] px-3 py-1 rounded-full inline-block">
              Webants Approach
            </span>
            <h3 className="text-xl font-bold text-[#172033]">Synchronized Growth & Systems</h3>
            <p className="text-sm text-[#637083] leading-relaxed">
              Webants combines marketing campaigns, automated CRM lead capture, fast responsive design, and creative assets into one unified operational engine for {industry.name}.
            </p>
          </motion.div>
        </div>

        {/* Services for this industry */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white p-8 sm:p-10 rounded-3xl border border-blue-100 shadow-sm space-y-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0] bg-[#EAF3FF] px-3.5 py-1 rounded-full">
                Tailored Services
              </span>
              <h2 className="text-2xl font-bold text-[#172033] mt-2">
                Core Capabilities for {industry.name}
              </h2>
            </div>
            <button 
              onClick={() => onNavigate('services')}
              className="text-xs font-bold text-[#1769E0] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Explore All 5 Service Lines</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {industry.relevantServices.map((svc, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                whileHover={{ y: -3 }}
                className="p-5 rounded-2xl bg-[#F7FAFF] border border-blue-100 space-y-2 hover:border-[#1769E0] transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-[#1769E0] text-white flex items-center justify-center font-bold text-xs">
                  0{idx + 1}
                </div>
                <h4 className="text-sm font-bold text-[#172033]">{svc}</h4>
                <p className="text-xs text-[#637083]">Customized workflows configured specifically for {industry.name} business requirements.</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Client Testimonial Highlight Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#071B33] to-[#0A2444] text-white p-8 rounded-3xl border border-blue-900 shadow-xl space-y-4"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-[#F05AA6] bg-[#FCEAF4]/10 px-3 py-1 rounded-full border border-[#F05AA6]/30">
            Featured Sector Story
          </span>
          <h3 className="text-xl font-bold text-white">{industry.caseStudyTitle}</h3>
          <p className="text-sm text-blue-100 leading-relaxed">{industry.caseStudyResult}</p>
          <div className="pt-4 border-t border-blue-800/60 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#F05AA6] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-sm">
              {industry.testimonialAuthor.charAt(0)}
            </div>
            <div>
              <p className="text-xs italic text-blue-100 font-medium">"{industry.testimonialQuote}"</p>
              <p className="text-xs font-bold text-[#3B8CFF] mt-0.5">{industry.testimonialAuthor}</p>
            </div>
          </div>
        </motion.div>

        {/* Case Studies Carousel for Industry */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0] bg-[#EAF3FF] px-3.5 py-1 rounded-full">
                Real Projects
              </span>
              <h2 className="text-2xl font-bold text-[#172033] mt-2">
                {matchingCaseStudies.length > 0
                  ? `${industry.name} Work & Case Studies`
                  : 'Selected Work From Our Portfolio'}
              </h2>
              {matchingCaseStudies.length === 0 && (
                <p className="text-xs text-[#637083] mt-1.5">
                  Not from this sector — these are the closest builds in our portfolio by discipline.
                </p>
              )}
            </div>
            <button 
              onClick={() => onNavigate('work')}
              className="text-xs font-bold text-[#1769E0] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fallbackStudies.map((cs, idx) => (
              <motion.div 
                key={cs.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                onClick={() => onNavigate('project-detail', cs.id)}
                className="bg-white border border-blue-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-500/40 transition-[border-color,box-shadow] cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] bg-[#070A18] overflow-hidden relative">
                    {cs.image ? (
                      <img
                        src={cs.image}
                        alt={`${cs.client} - ${cs.title}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      // Source-verified projects have no interface to photograph — show the system.
                      <div className="w-full h-full flex flex-col justify-center gap-1.5 px-4">
                        {(cs.architecture ?? []).slice(0, 4).map((line, i) => (
                          <span
                            key={i}
                            className="truncate rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-[9px] text-slate-300"
                          >
                            {line.replace(/ -> /g, ' > ')}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-[#071B33]/90 text-white px-2.5 py-1 rounded-md text-[10px] font-bold uppercase">
                      {cs.client}
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <span className="text-[10px] font-bold text-[#1769E0] bg-[#EAF3FF] px-2 py-0.5 rounded">
                      {cs.category}
                    </span>
                    <h4 className="text-base font-bold text-[#172033] group-hover:text-[#1769E0] transition-colors">
                      {cs.title}
                    </h4>
                    <p className="text-xs text-[#637083] line-clamp-2">{cs.summary}</p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center text-xs font-bold text-[#1769E0] gap-1 group-hover:translate-x-1 transition-transform">
                  <span>View Project Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#1769E0] to-[#0A2444] text-white p-8 sm:p-12 rounded-3xl text-center space-y-6 shadow-2xl"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to streamline and grow your {industry.name} operations?
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto">
            Book a 15-minute discovery session with our team to discuss your goals, or start evaluating our work through a 7-day trial.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenBookCall}
              className="px-6 py-3.5 rounded-2xl bg-white text-[#071B33] font-extrabold text-xs hover:bg-blue-50 transition-colors shadow-lg cursor-pointer"
            >
              Book Discovery Call
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate('free-trial')}
              className="px-6 py-3.5 rounded-2xl bg-[#F05AA6] hover:bg-[#d84893] text-white font-extrabold text-xs transition-colors shadow-lg cursor-pointer"
            >
              Start 7-Day Free Trial
            </motion.button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
