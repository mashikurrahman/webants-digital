import React from 'react';
import { Shield, ArrowLeft } from 'lucide-react';
import { siteContent } from '../data/siteContent';

export const PrivacyPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="py-16 bg-[#F7FAFF] text-[#172033] space-y-12 max-w-4xl mx-auto px-4 sm:px-6">
      
      <button
        onClick={() => onNavigate('home')}
        className="inline-flex items-center gap-2 text-xs font-bold text-[#1769E0] hover:underline cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </button>

      <div className="bg-white rounded-3xl p-8 border border-blue-100 shadow-sm space-y-6">
        <div className="border-b border-gray-100 pb-4 space-y-1">
          <h1 className="text-3xl font-extrabold text-[#172033]">Privacy Policy</h1>
          <p className="text-xs text-gray-500 font-mono">Effective Date: July 2026 • {siteContent.company.name}</p>
        </div>

        <div className="text-xs text-gray-700 leading-relaxed space-y-4">
          <p>
            This Privacy Policy describes how {siteContent.company.name} ("Webants", "we", "us", or "our") collects, uses, and discloses information when you interact with our website, inquiry forms, and remote client portals.
          </p>

          <h2 className="text-sm font-bold text-gray-900 pt-2">1. Information We Collect</h2>
          <p>
            When you request a discovery call, submit a 7-day free trial application, or apply for open career roles, we collect information you voluntarily provide, including your name, business email address, company name, website URL, country, and project brief notes.
          </p>

          <h2 className="text-sm font-bold text-gray-900 pt-2">2. How We Use Information</h2>
          <p>
            We use collected information solely to evaluate service inquiries, assess free trial eligibility, coordinate remote client communication, process job applications, and fulfill contract deliverables. We never sell or rent your personal or company data.
          </p>

          <h2 className="text-sm font-bold text-gray-900 pt-2">3. Data Security & Storage</h2>
          <p>
            We implement industry-standard encryption and administrative access controls to safeguard all business and personal communications.
          </p>

          <h2 className="text-sm font-bold text-gray-900 pt-2">4. Contact Information</h2>
          <p>
            For privacy inquiries or data removal requests, please contact us at <a href={`mailto:${siteContent.company.email}`} className="text-[#1769E0] font-bold underline">{siteContent.company.email}</a>.
          </p>
        </div>
      </div>

    </div>
  );
};
