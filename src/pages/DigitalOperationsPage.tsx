import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Calendar, 
  Share2, 
  Mail, 
  FileText, 
  Database, 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  Check, 
  MessageSquare,
  Users,
  ChevronRight
} from 'lucide-react';
import { siteContent } from '../data/siteContent';
import { DigitalOperationsCommandCta } from '../components/cta/DigitalOperationsCommandCta';

interface DigitalOperationsPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const DigitalOperationsPage: React.FC<DigitalOperationsPageProps> = ({ onNavigate }) => {
  const opsData = siteContent.serviceLines.find(s => s.id === 'digital-operations')!;

  const [activeDay, setActiveDay] = useState<number>(0);
  const [activeChannelTab, setActiveChannelTab] = useState<string>('social');

  const sprintSchedule = [
    {
      day: 'Monday',
      title: 'Sprint Kickoff & Request Prioritization',
      time: '9:00 AM EST',
      tasks: [
        'Review new incoming requests in shared Slack channel',
        'Prioritize 3-5 core sprint deliverables for the week',
        'Assign lead designers, copywriters, and CMS technicians',
        'Post async Loom video sprint roadmap to executive team'
      ]
    },
    {
      day: 'Tuesday',
      title: 'Production & Creative Drafts',
      time: 'All Day Production',
      tasks: [
        'Design 3-4 social graphics & ad variation banners in Figma',
        'Draft email newsletter copy & HTML formatting in Klaviyo',
        'Perform weekly CRM contact deduplication & unassigned lead audit',
        'Stage CMS website content updates on preview environment'
      ]
    },
    {
      day: 'Wednesday',
      title: 'Review & Client Approval Gateway',
      time: 'Mid-Week Checkpoint',
      tasks: [
        'Submit completed Figma links directly to Slack for 1-click review',
        'Incorporate rapid iterative revisions within 2-4 hours',
        'Approve scheduled email broadcasts and social distribution dates',
        'Conduct speed and link audits on staged landing pages'
      ]
    },
    {
      day: 'Thursday',
      title: 'Publishing & Campaign Deployment',
      time: 'Live Execution',
      tasks: [
        'Schedule approved posts across LinkedIn, Facebook & Instagram',
        'Deploy approved email campaign broadcasts',
        'Push approved CMS content updates to production website',
        'Verify pixel tracking, UTM links, and conversion event firing'
      ]
    },
    {
      day: 'Friday',
      title: 'Performance Telemetry & Weekend Safeguards',
      time: 'Sprint Wrap-Up',
      tasks: [
        'Analyze weekly social engagement & email open/click metrics',
        'Run automated website uptime & database backup checkpoints',
        'Send consolidated weekly performance summary to leadership',
        'Stage backlog items for next Monday kickoff'
      ]
    }
  ];

  const channelCapabilities: Record<string, {
    title: string;
    icon: React.ElementType;
    badge: string;
    deliverables: string[];
    sla: string;
  }> = {
    'social': {
      title: 'Social Media Management',
      icon: Share2,
      badge: '12-16 Posts / Month',
      deliverables: [
        '12-16 custom branded graphic & video carousel posts',
        'Complete copy, hashtag research, and scheduled publishing',
        'Cross-platform distribution: LinkedIn, Facebook & Instagram',
        'Monthly engagement & audience growth telemetry report'
      ],
      sla: 'Published Weekly on Schedule'
    },
    'email': {
      title: 'Email Marketing & Newsletters',
      icon: Mail,
      badge: '2-4 Broadcasts / Month',
      deliverables: [
        'Bespoke promotional newsletters designed in Klaviyo / Mailchimp',
        'Abandoned cart & post-purchase automated flow optimizations',
        'Subject line & preview text A/B split testing',
        'List hygiene, spam score testing, and deliverability monitoring'
      ],
      sla: 'Zero Inbox Deliverability Drop'
    },
    'crm': {
      title: 'CRM & Pipeline Hygiene',
      icon: Database,
      badge: 'Weekly Audits',
      deliverables: [
        'Contact deduplication & bounce rate purging (HubSpot / GoHighLevel)',
        'Unassigned lead alerts and round-robin rep routing audits',
        'Custom pipeline stage automation & automated reminder triggers',
        'Weekly data integrity score reports to sales leadership'
      ],
      sla: '100% Pipeline Accuracy'
    },
    'cms': {
      title: 'Website & CMS Management',
      icon: FileText,
      badge: 'Up to 5 Edits / Mo',
      deliverables: [
        'Blog article formatting, SEO image optimization, and publishing',
        'Promotional banner updates, pricing matrix edits, and modal popups',
        'E-commerce product catalog additions, price updates, and inventory flags',
        'Core Web Vitals monthly health check and broken link scanning'
      ],
      sla: 'Under 24h Turnaround for Edits'
    }
  };

  const activeChannel = channelCapabilities[activeChannelTab] || channelCapabilities['social'];
  const ChannelIcon = activeChannel.icon;

  return (
    <div className="bg-white text-slate-900 min-h-screen selection:bg-[#5B61FE] selection:text-white">
      
      {/* ─── 1. HIGH-IMPACT OPERATIONS SQUAD COCKPIT HERO ─── */}
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
                <Layers className="w-3.5 h-3.5" />
                <span>Managed Digital Operations Squad</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.03]"
              >
                Your dedicated squad <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B61FE] via-[#7C3AED] to-[#5B61FE]">
                  without the hiring headache.
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg text-slate-600 font-medium max-w-xl leading-relaxed"
              >
                Ongoing social media management, email marketing broadcasts, CRM pipeline hygiene, and website CMS updates. Powered by structured weekly sprint cadences and guaranteed SLAs.
              </motion.p>

              {/* Channel Quick Switchers in Hero */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="flex flex-wrap gap-2 pt-2"
              >
                {Object.keys(channelCapabilities).map((key) => {
                  const isSelected = activeChannelTab === key;
                  const item = channelCapabilities[key];
                  const Icon = item.icon;

                  return (
                    <button
                      key={key}
                      onClick={() => setActiveChannelTab(key)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#5B61FE] text-white font-extrabold shadow-md shadow-indigo-500/20 scale-[1.02]'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{item.title.split(' ')[0]}</span>
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
                  onClick={() => onNavigate('pricing')}
                  className="px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-xs sm:text-sm border border-slate-200 shadow-xs transition-colors cursor-pointer"
                >
                  <span>View Retainer Tiers &rarr;</span>
                </button>
              </motion.div>
            </div>

            {/* Right: Interactive Live Operations Cockpit (5 Cols) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="bg-gradient-to-br from-[#0B1120] via-[#0F172A] to-[#1E293B] rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-white/10 relative overflow-hidden space-y-6 text-left">
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-300 font-bold">
                      Operations Dispatch
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-300 bg-white/10 px-2 py-0.5 rounded-md border border-white/10">
                    &lt; 2H EMERGENCY SLA
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeChannelTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#5B61FE] to-[#7C3AED] text-white flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0 font-bold">
                        <ChannelIcon className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="text-xs uppercase font-mono text-slate-400 font-bold">
                          {activeChannel.badge}
                        </div>
                        <h3 className="text-2xl font-black text-white">
                          {activeChannel.title}
                        </h3>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/10">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400">Execution Velocity</div>
                        <div className="text-xl font-black font-mono text-emerald-400 mt-0.5">
                          {activeChannel.sla}
                        </div>
                        <div className="text-[10px] text-slate-400">Guaranteed Schedule</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400">Client Checkpoint</div>
                        <div className="text-xl font-black font-mono text-cyan-300 mt-0.5">
                          Async Slack
                        </div>
                        <div className="text-[10px] text-slate-400">Zero Lengthy Calls</div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-[10px] font-mono text-slate-400 font-bold uppercase">Included Recurring Scope:</div>
                      <div className="space-y-1">
                        {activeChannel.deliverables.slice(0, 2).map((del, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#5B61FE] shrink-0" />
                            <span>{del}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigate('free-trial')}
                      className="w-full py-3 rounded-xl bg-[#5B61FE] hover:bg-[#4F46E5] text-white font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-indigo-500/20"
                    >
                      <span>Start with {activeChannel.title.split(' ')[0]}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                </AnimatePresence>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── 2. INTERACTIVE WEEKLY SPRINT CADENCE BOARD ─── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5B61FE]">
            Predictable Weekly Cadence
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How our operations squad delivers every week.
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            Click across the 5 days to see our structured execution and review protocol in action.
          </p>
        </div>

        {/* 5-Day Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 max-w-4xl mx-auto">
          {sprintSchedule.map((s, idx) => (
            <button
              key={s.day}
              onClick={() => setActiveDay(idx)}
              className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                activeDay === idx
                  ? 'bg-[#5B61FE] text-white border-[#5B61FE] shadow-md shadow-indigo-500/20 scale-[1.02]'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className={`text-[10px] font-mono font-bold uppercase ${activeDay === idx ? 'text-indigo-200' : 'text-[#5B61FE]'}`}>
                DAY 0{idx + 1}
              </div>
              <div className="text-xs sm:text-sm font-bold mt-0.5">{s.day}</div>
            </button>
          ))}
        </div>

        {/* Active Day Detail Box */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-indigo-50 text-[#5B61FE] border border-indigo-100">
                {sprintSchedule[activeDay].day} Protocol
              </span>
              <span className="text-xs font-mono text-slate-400 font-bold">
                ⏰ {sprintSchedule[activeDay].time}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {sprintSchedule[activeDay].title}
            </h3>

            <div className="space-y-2.5 pt-2">
              {sprintSchedule[activeDay].tasks.map((task, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span>{task}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#5B61FE] flex items-center justify-center mx-auto shadow-2xs">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-black text-slate-900">
                Direct Slack Synchronization
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Your team receives daily async updates without having to attend lengthy sync meetings.
              </p>
            </div>
            <button
              onClick={() => onNavigate('free-trial')}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-[#5B61FE] text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Test Squad with 7-Day Trial
            </button>
          </div>

        </div>

      </section>

      {/* ─── 3. MULTICHANNEL SCOPE & DELIVERABLES MATRIX ─── */}
      <section className="py-20 bg-[#F8FAFC] border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5B61FE]">
              Comprehensive Operations Scope
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Four dedicated operational pillars.
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              Switch across the channels below to inspect our recurring deliverables.
            </p>
          </div>

          {/* Channel Selector Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            {Object.keys(channelCapabilities).map((key) => {
              const item = channelCapabilities[key];
              const isSelected = activeChannelTab === key;
              const Icon = item.icon;

              return (
                <button
                  key={key}
                  onClick={() => setActiveChannelTab(key)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#5B61FE] text-white font-extrabold shadow-sm scale-[1.02]'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Channel Details Box */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-indigo-50 text-[#5B61FE] border border-indigo-100">
                <ChannelIcon className="w-3.5 h-3.5" />
                <span>{activeChannel.badge}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {activeChannel.title}
              </h3>

              <div className="space-y-2.5 pt-2">
                {activeChannel.deliverables.map((del, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs text-center">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#5B61FE] flex items-center justify-center mx-auto shadow-2xs">
                <ChannelIcon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xl font-black text-slate-900 font-mono">
                  {activeChannel.sla}
                </div>
                <div className="text-xs uppercase font-bold text-slate-400 tracking-wider mt-0.5">
                  Guaranteed Execution Velocity
                </div>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Covered by our dedicated SLA guarantee with zero hidden contract penalties.
              </p>
              <button
                onClick={() => onNavigate('free-trial')}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-[#5B61FE] text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Start with {activeChannel.title}
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ─── 3.5. VISUAL OPERATIONS SQUAD IN ACTION ─── */}
      <section className="py-20 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#5B61FE]/20 bg-indigo-50/80 text-[#5B61FE] text-xs font-bold uppercase tracking-widest shadow-2xs">
              <Layers className="w-3.5 h-3.5" />
              <span>Dedicated Squad</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Social scheduling, CRM audits & CMS updates.
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              See how our managed digital operations specialists integrate directly into your daily workflow with structured sprint cadence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Visual Card 1 */}
            <div className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-200 shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80" 
                alt="Multi-Platform Social Media Scheduling"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-left text-white space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-cyan-300 bg-white/10 px-2 py-0.5 rounded border border-white/15">
                  Social Management
                </span>
                <h4 className="text-base font-bold text-white">Consistent Multi-Platform Publishing</h4>
                <p className="text-xs text-slate-300 font-medium">12-16 custom graphics, copy hooks, and scheduled distribution.</p>
              </div>
            </div>

            {/* Visual Card 2 */}
            <div className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-200 shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80" 
                alt="Sprint Review & Team Alignment"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-left text-white space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-[#5B61FE] bg-white/10 px-2 py-0.5 rounded border border-white/15">
                  Async Standups
                </span>
                <h4 className="text-base font-bold text-white">Weekly Sprint Roadmaps & Looms</h4>
                <p className="text-xs text-slate-300 font-medium">Clear milestones delivered on schedule with zero meeting fatigue.</p>
              </div>
            </div>

            {/* Visual Card 3 */}
            <div className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-200 shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" 
                alt="CRM Data Hygiene & Web CMS"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-left text-white space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 bg-white/10 px-2 py-0.5 rounded border border-white/15">
                  Fast SLA
                </span>
                <h4 className="text-base font-bold text-white">&lt; 2h Emergency Bug Support</h4>
                <p className="text-xs text-slate-300 font-medium">Staging previews, CMS blog uploads, and CRM deduplication.</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─── 4. TRANSPARENT OPERATIONS PACKAGES ─── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5B61FE]">
            Operations Retainers
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Flexible monthly operations subscriptions.
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            Turnkey operational firepower. Scale up during busy quarters and pause during slow seasons.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          
          {/* Starter */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-700">
                Core Channels
              </span>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Starter Operations</h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  Ideal for small businesses needing reliable weekly social posting and basic newsletter support.
                </p>
              </div>

              <div className="text-3xl font-black text-slate-900 font-mono">
                $1,200 <span className="text-xs text-slate-500 font-normal font-sans">/ month</span>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span>8-10 custom monthly social media posts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span>1 monthly email newsletter broadcast</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span>Up to 2 monthly website CMS edits</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span>Shared Slack channel with squad</span>
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

          {/* Growth Operations */}
          <div className="bg-gradient-to-b from-[#F5F7FF] via-white to-[#F5F7FF] rounded-3xl p-6 sm:p-8 border-2 border-[#5B61FE] shadow-xl shadow-indigo-600/5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#5B61FE] text-white">
                  Recommended
                </span>
                <span className="text-xs font-bold text-[#5B61FE]">Full Back-Office</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">Growth Operations</h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  Complete social, email marketing, CRM deduplication, and website maintenance.
                </p>
              </div>

              <div className="text-3xl font-black text-slate-900 font-mono">
                $1,800 <span className="text-xs text-slate-500 font-normal font-sans">/ month</span>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span>12-16 custom social posts across 3 channels</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span>2 dedicated promotional email broadcasts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span>Weekly CRM deduplication & lead audit</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span>Up to 5 monthly website CMS updates</span>
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

          {/* Enterprise */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-700">
                Full-Scale Squad
              </span>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Dedicated Squad</h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  Heavy multi-brand operations with custom video reels, custom reporting, and sub-2h emergency SLA.
                </p>
              </div>

              <div className="text-3xl font-black text-slate-900 font-mono">
                $3,200 <span className="text-xs text-slate-500 font-normal font-sans">/ month</span>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span>Daily social posting & short-form video reels</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span>4 monthly email campaigns + flow testing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span>Unlimited website CMS & e-commerce updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span>Sub-2h emergency support SLA</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('free-trial')}
              className="w-full py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-extrabold text-xs transition-colors cursor-pointer text-center"
            >
              Deploy Dedicated Squad &rarr;
            </button>
          </div>

        </div>

      </section>

      {/* ─── 5. DYNAMIC INTERACTIVE OPERATIONS COMMAND CTA ─── */}
      <DigitalOperationsCommandCta 
        onStartTrial={() => onNavigate('free-trial')}
        onBookCall={() => onNavigate('contact')}
      />

    </div>
  );
};
