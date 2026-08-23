import React from 'react';
import { Layers, CheckCircle2, Calendar, FileText, Share2, Mail, BarChart3 } from 'lucide-react';
import { siteContent } from '../data/siteContent';

interface DigitalOperationsPageProps {
  onNavigate: (page: string) => void;
}

export const DigitalOperationsPage: React.FC<DigitalOperationsPageProps> = ({ onNavigate }) => {
  const opsData = siteContent.serviceLines.find(s => s.id === 'digital-operations')!;

  const monthlyDeliverables = [
    { title: 'Social Media Management', items: '12-16 custom monthly posts across LinkedIn, Facebook & Instagram with scheduled publishing.' },
    { title: 'Email Campaign Builds', items: '2 dedicated promotional newsletter broadcasts + abandoned cart sequence updates.' },
    { title: 'CRM & Pipeline Hygiene', items: 'Weekly contact deduplication, lead tag audits, and unassigned lead alerts.' },
    { title: 'Website Content Management', items: 'Up to 5 monthly CMS page/blog updates, product catalog edits, and banner refreshes.' }
  ];

  return (
    <div className="pt-8 sm:pt-12 pb-20 bg-[#F7FAFF] text-[#172033] space-y-16">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0] bg-[#EAF3FF] px-3.5 py-1 rounded-full">
          Managed Operations Squad
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#172033]">
          Ongoing digital support without building a large internal team.
        </h1>
        <p className="text-sm sm:text-base text-[#637083] max-w-2xl mx-auto leading-relaxed">
          Back-office marketing and technical maintenance: social channels, email newsletters, CRM updates, website edits, and e-commerce operations.
        </p>
      </div>

      {/* Scope Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-blue-100 rounded-3xl p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-[#172033] text-center">Managed Operations Scope</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {opsData.items.map((item) => (
              <div key={item} className="p-3 bg-[#F7FAFF] rounded-2xl border border-blue-50 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1769E0] shrink-0" />
                <span className="text-xs font-bold text-gray-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Deliverables Card Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#172033]">Sample Monthly Deliverables Package</h2>
          <p className="text-xs text-gray-500 font-mono mt-1">// Structured recurring execution framework</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {monthlyDeliverables.map((del, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 border border-blue-100 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-[#1769E0]">
                <Calendar className="w-4 h-4" />
                <h3 className="text-base font-bold text-[#172033]">{del.title}</h3>
              </div>
              <p className="text-xs text-[#637083] leading-relaxed">{del.items}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto text-center px-4">
        <div className="bg-[#071B33] text-white rounded-3xl p-8 border border-blue-900/50 shadow-xl space-y-4">
          <h2 className="text-2xl font-bold">Digital Operations Subscription</h2>
          <p className="text-xs text-blue-200">Starting from $1,800/month for dedicated operational execution.</p>
          <button onClick={() => onNavigate('free-trial')} className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#1769E0] to-[#3B8CFF] font-bold text-white text-xs cursor-pointer">
            Start Free Trial with Operations
          </button>
        </div>
      </div>

    </div>
  );
};
