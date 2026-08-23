import React from 'react';
import { Shield, ArrowLeft } from 'lucide-react';
import { siteContent } from '../data/siteContent';

export const TermsPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
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
          <h1 className="text-3xl font-extrabold text-[#172033]">Terms and Conditions</h1>
          <p className="text-xs text-gray-500 font-mono">Effective Date: July 2026 • {siteContent.company.name}</p>
        </div>

        <div className="text-xs text-gray-700 leading-relaxed space-y-4">
          <p>
            Welcome to {siteContent.company.name}. By accessing or using our website, service offerings, or trial applications, you agree to comply with and be bound by these Terms and Conditions.
          </p>

          <h2 className="text-sm font-bold text-gray-900 pt-2">1. Scope of Services</h2>
          <p>
            {siteContent.company.name} provides digital growth, design, software engineering, AI automation, and back-office digital operations support. Specific engagement deliverables, pricing, and turnarounds are governed by individual client Master Services Agreements (MSAs) or Statement of Work (SOW) documents.
          </p>

          <h2 className="text-sm font-bold text-gray-900 pt-2">2. Demo Content & Intellectual Property</h2>
          <p>
            All website materials, including fictional case studies, sample project mockups, and client testimonials labeled as "Demo", are illustrative samples created for showcase purposes.
          </p>

          <h2 className="text-sm font-bold text-gray-900 pt-2">3. 7-Day Free Trial Terms</h2>
          <p>
            Free trials are limited to eligible, verified service businesses and strictly constrained to predefined trial scopes. {siteContent.company.name} reserves the right to accept or decline trial applications at its sole discretion.
          </p>

          <h2 className="text-sm font-bold text-gray-900 pt-2">4. Governing Law</h2>
          <p>
            These terms are governed by and construed in accordance with applicable business laws. For questions regarding these terms, reach out to <a href={`mailto:${siteContent.company.email}`} className="text-[#1769E0] font-bold underline">{siteContent.company.email}</a>.
          </p>
        </div>
      </div>

    </div>
  );
};
