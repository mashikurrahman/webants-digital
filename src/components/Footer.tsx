import React from 'react';
import { 
  Linkedin, 
  Facebook, 
  Instagram, 
  Youtube, 
  Mail, 
  MapPin, 
  Globe2, 
  ArrowRight
} from 'lucide-react';
import { siteContent } from '../data/siteContent';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-gradient-to-b from-[#F8FAFC] to-white text-slate-600 border-t border-slate-200 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5 text-left">
            <button 
              onClick={() => onNavigate('home')}
              className="group text-left focus:outline-none cursor-pointer hover:opacity-90 transition-opacity block"
              aria-label="Webants Home"
            >
              <img 
                src="/WebAnts.svg" 
                alt="Webants Digital" 
                width="465"
                height="96"
                loading="lazy"
                decoding="async"
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </button>

            <p className="text-slate-500 text-sm leading-relaxed max-w-md font-medium">
              {siteContent.company.name} helps ambitious businesses scale through synchronized marketing growth, creative studio, high-performance web engineering, AI automations, and digital operations.
            </p>

            <div className="space-y-2.5 text-xs text-slate-600 pt-1 font-medium">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#5B61FE]" />
                <a href={`mailto:${siteContent.company.email}`} className="hover:text-[#5B61FE] transition-colors underline">
                  {siteContent.company.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#5B61FE]" />
                <span>{siteContent.company.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-[#5B61FE]" />
                <span>{siteContent.company.coverage}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {siteContent.company?.socials?.linkedin && (
                <a href={siteContent.company.socials.linkedin} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-600 hover:text-[#5B61FE] hover:border-[#5B61FE] transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {siteContent.company?.socials?.facebook && (
                <a href={siteContent.company.socials.facebook} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-600 hover:text-[#5B61FE] hover:border-[#5B61FE] transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {siteContent.company?.socials?.instagram && (
                <a href={siteContent.company.socials.instagram} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-600 hover:text-[#5B61FE] hover:border-[#5B61FE] transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {siteContent.company?.socials?.youtube && (
                <a href={siteContent.company.socials.youtube} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-600 hover:text-[#5B61FE] hover:border-[#5B61FE] transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Capabilities */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-900">
              Core Capabilities
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <button onClick={() => onNavigate('growth')} className="text-slate-600 hover:text-[#5B61FE] transition-colors cursor-pointer">
                  Growth & Paid Ads
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('creative')} className="text-slate-600 hover:text-[#5B61FE] transition-colors cursor-pointer">
                  Creative & Video
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('technology')} className="text-slate-600 hover:text-[#5B61FE] transition-colors cursor-pointer">
                  Technology & Web
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ai-automation')} className="text-slate-600 hover:text-[#5B61FE] transition-colors cursor-pointer">
                  AI & Automations
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('digital-operations')} className="text-slate-600 hover:text-[#5B61FE] transition-colors cursor-pointer">
                  Digital Operations
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-900">
              Company & Work
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <button onClick={() => onNavigate('about')} className="text-slate-600 hover:text-[#5B61FE] transition-colors cursor-pointer">
                  About Webants
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('work')} className="text-slate-600 hover:text-[#5B61FE] transition-colors cursor-pointer">
                  Case Studies & Work
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pricing')} className="text-slate-600 hover:text-[#5B61FE] transition-colors cursor-pointer">
                  Pricing & Plans
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('careers')} className="text-slate-600 hover:text-[#5B61FE] transition-colors cursor-pointer flex items-center gap-1.5">
                  <span>Careers</span>
                  <span className="px-1.5 py-0.2 bg-[#EEF2FF] text-[#5B61FE] rounded text-[10px] font-bold">Hiring</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('insights')} className="text-slate-600 hover:text-[#5B61FE] transition-colors cursor-pointer">
                  Insights & Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Evaluation Card */}
          <div className="space-y-4 text-left">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#5B61FE] block">
                7-Day Free Trial
              </span>
              <h5 className="text-xs font-extrabold text-slate-900 leading-snug">
                Try Webants services risk-free before committing.
              </h5>
              <button
                onClick={() => onNavigate('free-trial')}
                className="w-full py-2 px-3 rounded-xl bg-[#5B61FE] hover:bg-[#4F46E5] text-white text-[11px] font-bold shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Check Eligibility</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium text-center sm:text-left">
          <div>
            &copy; {new Date().getFullYear()} {siteContent.company.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('terms')} className="hover:text-slate-700 transition-colors">
              Terms of Service
            </button>
            <button onClick={() => onNavigate('privacy')} className="hover:text-slate-700 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => onNavigate('contact')} className="hover:text-slate-700 transition-colors">
              Contact Support
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
