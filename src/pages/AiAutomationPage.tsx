import React from 'react';
import { Bot, CheckCircle2, ArrowRight, Zap, Workflow, Cpu, ShieldCheck } from 'lucide-react';
import { siteContent } from '../data/siteContent';

interface AiAutomationPageProps {
  onNavigate: (page: string) => void;
}

export const AiAutomationPage: React.FC<AiAutomationPageProps> = ({ onNavigate }) => {
  const aiData = siteContent.serviceLines.find(s => s.id === 'ai-automation')!;
  const caseStudy = siteContent.caseStudies.find(c => c.id === 'luma-travel') ?? siteContent.caseStudies[0];

  const workflowSteps = [
    { num: '01', title: 'New Lead Inbound', desc: 'Form submit / Phone call / Ad lead' },
    { num: '02', title: 'CRM Auto-Ingest', desc: 'Syncs to GoHighLevel / NovaCRM' },
    { num: '03', title: 'AI Qualification', desc: 'Instant SMS chatbot assessment' },
    { num: '04', title: 'Team Assignment', desc: 'Geo-location rep auto-dispatch' },
    { num: '05', title: 'Email/SMS Nurture', desc: 'Automated appointment reminders' },
    { num: '06', title: 'Executive Reporting', desc: 'Real-time dashboard alert' }
  ];

  return (
    <div className="pt-8 sm:pt-12 pb-20 bg-[#F7FAFF] text-[#172033] space-y-16">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-[#F05AA6] bg-[#FCEAF4] px-3.5 py-1 rounded-full border border-pink-200">
          AI & Intelligent Systems
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#172033]">
          Automate repetitive work. Improve every response.
        </h1>
        <p className="text-sm sm:text-base text-[#637083] max-w-2xl mx-auto leading-relaxed">
          AI chatbots, virtual assistants, CRM lead routing, email sequences, appointment scheduling, and automated executive reporting.
        </p>
      </div>

      {/* Capabilities */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-blue-100 rounded-3xl p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-[#172033] text-center">Automation Solutions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {aiData.items.map((item) => (
              <div key={item} className="p-3 bg-[#F7FAFF] rounded-2xl border border-blue-50 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1769E0] shrink-0" />
                <span className="text-xs font-bold text-gray-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Workflow Diagram Component */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#172033]">Automated Lead Pipeline Architecture</h2>
          <p className="text-xs text-gray-500 font-mono mt-1">// Sample end-to-end automation scenario diagram</p>
        </div>

        <div className="bg-[#071B33] text-white border border-blue-900/60 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            {workflowSteps.map((step, idx) => (
              <div key={step.num} className="bg-white/5 border border-blue-800/40 rounded-2xl p-4 text-center space-y-2 relative group hover:bg-white/10 transition-colors">
                <span className="text-xs font-mono text-[#3B8CFF] font-bold block">{step.num}</span>
                <h3 className="text-xs font-bold text-white">{step.title}</h3>
                <p className="text-[10px] text-gray-300">{step.desc}</p>
                {idx < workflowSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-[#3B8CFF]">
                    &rarr;
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Automation Case Study */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-blue-100 rounded-3xl p-8 shadow-sm space-y-4">
          <span className="text-[10px] font-bold text-white bg-[#1769E0] px-2.5 py-0.5 rounded uppercase">
            Automation Case Study
          </span>
          <h3 className="text-xl font-bold text-[#172033]">{caseStudy.client}: {caseStudy.title}</h3>
          <p className="text-xs text-[#637083]">{caseStudy.summary}</p>
          <ul className="space-y-2 text-xs text-gray-800 pt-2">
            {caseStudy.results.map((res, i) => (
              <li key={i} className="flex items-center gap-2 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#1769E0]" />
                <span>{res}</span>
              </li>
            ))}
          </ul>
          <div className="pt-2">
            <button onClick={() => onNavigate('free-trial')} className="px-6 py-3 rounded-xl bg-[#1769E0] text-white font-bold text-xs hover:bg-blue-700 transition-colors cursor-pointer">
              Deploy AI & CRM Workflows
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
