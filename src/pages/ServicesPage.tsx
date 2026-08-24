import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  TrendingUp, 
  Palette, 
  Code2, 
  Bot, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Clock, 
  Users, 
  ChevronRight,
  BarChart3,
  Flame,
  Globe,
  Sliders,
  Check
} from 'lucide-react';
import { siteContent, ServiceDetail } from '../data/siteContent';

import { ServicesSquadCta } from '../components/cta/ServicesSquadCta';

interface ServicesPageProps {
  onNavigate: (page: string, param?: string) => void;
}

const DEPARTMENT_THEMES: Record<string, {
  color: string;
  gradient: string;
  badgeBg: string;
  border: string;
  icon: React.ElementType;
  metric: string;
  metricLabel: string;
  tagline: string;
}> = {
  'growth': {
    color: '#5B61FE',
    gradient: 'from-[#5B61FE] to-[#7C3AED]',
    badgeBg: 'bg-indigo-50 text-[#5B61FE] border-indigo-200',
    border: 'hover:border-[#5B61FE]/50',
    icon: TrendingUp,
    metric: '+142%',
    metricLabel: 'Avg ROAS Target Lift',
    tagline: 'High-intent search, paid media acquisition, and conversion tracking.',
  },
  'creative': {
    color: '#EC4899',
    gradient: 'from-pink-500 to-rose-600',
    badgeBg: 'bg-pink-50 text-pink-700 border-pink-200',
    border: 'hover:border-pink-300',
    icon: Palette,
    metric: '48h',
    metricLabel: 'Asset Turnaround SLA',
    tagline: 'Identity systems, high-converting ad hooks, 3D assets, and motion reels.',
  },
  'technology': {
    color: '#3B82F6',
    gradient: 'from-blue-500 to-indigo-600',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
    border: 'hover:border-blue-300',
    icon: Code2,
    metric: '99/100',
    metricLabel: 'Lighthouse Speed Score',
    tagline: 'Next.js web apps, Shopify commerce engines, and headless CMS architectures.',
  },
  'ai-automation': {
    color: '#7C5CFC',
    gradient: 'from-purple-500 to-indigo-600',
    badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
    border: 'hover:border-purple-300',
    icon: Bot,
    metric: '<60s',
    metricLabel: 'Speed to Lead Response',
    tagline: 'LLM qualification, CRM auto-ingest, smart routing, and workflow bots.',
  },
  'digital-operations': {
    color: '#F59E0B',
    gradient: 'from-amber-500 to-orange-600',
    badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
    border: 'hover:border-amber-300',
    icon: Layers,
    metric: '100%',
    metricLabel: 'Sprint Delivery Rate',
    tagline: 'Multi-channel social, newsletter broadcasts, and website CMS operations.',
  }
};

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const [selectedDept, setSelectedDept] = useState<string>('growth');
  const [selectedSquadCount, setSelectedSquadCount] = useState<number>(3);

  const currentDept = siteContent.serviceLines.find(s => s.id === selectedDept) || siteContent.serviceLines[0];
  const theme = DEPARTMENT_THEMES[selectedDept] || DEPARTMENT_THEMES['growth'];
  const DeptIcon = theme.icon;

  return (
    <div className="bg-white text-slate-900 min-h-screen selection:bg-[#5B61FE] selection:text-white">
      
      {/* ─── 1. HIGH-IMPACT SQUAD COMMAND DECK HERO ─── */}
      <section className="relative pt-12 sm:pt-20 pb-20 overflow-hidden border-b border-slate-200/60 bg-gradient-to-b from-[#FAFCFF] via-white to-[#F8FAFC]">
        {/* Dynamic ambient backdrop */}
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-gradient-to-bl from-[#5B61FE]/15 via-[#7C3AED]/10 to-transparent blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-gradient-to-tr from-cyan-400/10 via-indigo-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Punchy Messaging & Quick Actions (7 Cols) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-[#5B61FE] text-xs font-black uppercase tracking-widest shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Connected Capabilities Engine</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.03]"
              >
                Five specialist units. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B61FE] via-[#7C3AED] to-cyan-600">
                  One unified digital squad.
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg text-slate-600 font-medium max-w-xl leading-relaxed"
              >
                Eliminate disconnected agencies and flaky freelancers. Access senior performance marketers, UI/UX designers, full-stack engineers, AI developers, and operations managers in a single high-velocity Slack channel.
              </motion.p>

              {/* Department Quick Filter Tabs in Hero */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="flex flex-wrap gap-2 pt-2"
              >
                {siteContent.serviceLines.map((s) => {
                  const isSelected = selectedDept === s.id;
                  const itemTheme = DEPARTMENT_THEMES[s.id];
                  const Icon = itemTheme.icon;

                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedDept(s.id)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#5B61FE] text-white shadow-md shadow-indigo-500/20 scale-[1.02]'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{s.title.split(' ')[0]}</span>
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
                  <span>Compare Squad Tiers &rarr;</span>
                </button>
              </motion.div>
            </div>

            {/* Right: Interactive Holographic Department Cockpit (5 Cols) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="bg-gradient-to-br from-[#0B1120] via-[#0F172A] to-[#1E293B] rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-white/10 relative overflow-hidden space-y-6 text-left">
                
                {/* Glowing Top Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-300 font-bold">
                      Active Telemetry Hub
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-white/10 px-2 py-0.5 rounded-md border border-white/10">
                    SLACK SQUAD v2.4
                  </span>
                </div>

                {/* Selected Department Showcase Card */}
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={selectedDept}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0"
                        style={{ background: theme.color }}
                      >
                        <DeptIcon className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="text-xs uppercase font-mono text-slate-400 font-bold">
                          Department Stream 0{siteContent.serviceLines.findIndex(s => s.id === selectedDept) + 1}
                        </div>
                        <h3 className="text-2xl font-black text-white">
                          {currentDept.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                      {theme.tagline}
                    </p>

                    {/* Department Highlights */}
                    <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/10">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400">Benchmark Metric</div>
                        <div className="text-2xl font-black font-mono text-emerald-400 mt-0.5">
                          {theme.metric}
                        </div>
                        <div className="text-[10px] text-slate-400">{theme.metricLabel}</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400">Turnaround SLA</div>
                        <div className="text-2xl font-black font-mono text-cyan-300 mt-0.5">
                          24-48h
                        </div>
                        <div className="text-[10px] text-slate-400">Sprint Delivery Cycle</div>
                      </div>
                    </div>

                    {/* Deliverables Pills */}
                    <div className="space-y-1.5">
                      <div className="text-[10px] font-mono text-slate-400 font-bold uppercase">Included Capabilities:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {currentDept.items.slice(0, 3).map((it) => (
                          <span key={it} className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10 text-xs font-bold text-slate-200">
                            ✓ {it}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigate(currentDept.route)}
                      className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Explore Full {currentDept.title} Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                </AnimatePresence>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── 2. INTERACTIVE DEPARTMENT SELECTOR & DEEP-DIVE ─── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Navigation Switcher Pills */}
        <div className="space-y-3 text-center max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5B61FE]">
            Interactive Capability Explorer
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Click any department to inspect the engine.
          </h2>
          <p className="text-sm text-slate-600 font-medium leading-relaxed">
            Every department is staffed by senior specialists and equipped with production-proven playbooks.
          </p>
        </div>

        {/* 5 Department Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-100/90 backdrop-blur-md rounded-3xl max-w-4xl mx-auto border border-slate-200/80">
          {siteContent.serviceLines.map((s) => {
            const isSelected = selectedDept === s.id;
            const itemTheme = DEPARTMENT_THEMES[s.id];
            const Icon = itemTheme.icon;

            return (
              <button
                key={s.id}
                onClick={() => setSelectedDept(s.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white text-[#5B61FE] shadow-sm font-black scale-[1.02]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <div 
                  className="w-5 h-5 rounded-lg flex items-center justify-center text-white text-[10px]"
                  style={{ background: isSelected ? '#5B61FE' : '#94A3B8' }}
                >
                  <Icon className="w-3 h-3" />
                </div>
                <span>{s.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Department Spotlight Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDept}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 items-stretch text-left"
          >
            {/* Left Col: Info & Deliverables (7 Cols) */}
            <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
              
              <div className="space-y-4">
                {/* Header Tag */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-indigo-50 text-[#5B61FE] border border-indigo-100">
                    Department 0{siteContent.serviceLines.findIndex(s => s.id === selectedDept) + 1} • {currentDept.title}
                  </span>
                  <span className="text-xs font-bold text-slate-400 font-mono">
                    Direct Slack Sync Included
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {currentDept.headline}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                  {currentDept.shortDesc}
                </p>

                {/* Capability Matrix Grid */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                    Core Production Capabilities:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentDept.items.map((item, idx) => (
                      <div 
                        key={idx}
                        className="p-3 rounded-2xl bg-[#F8FAFC] border border-slate-200/70 flex items-center gap-2.5 hover:bg-slate-100/70 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                        <span className="text-xs font-bold text-slate-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => onNavigate(currentDept.route)}
                  className="px-6 py-3 rounded-xl bg-[#5B61FE] hover:bg-[#4F46E5] text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-2"
                >
                  <span>Explore Dedicated {currentDept.title} Page</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('free-trial')}
                  className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
                >
                  <span>Try 7 Days Free</span>
                </button>
              </div>

            </div>

            {/* Right Col: Visual Card & Live Metric Beacon (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              
              {/* Department Hero Image Frame */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-200 shadow-md group">
                <img 
                  src={currentDept.image} 
                  alt={currentDept.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Floating Metric Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/15 text-white flex items-center justify-between">
                  <div>
                    <div className="text-xl sm:text-2xl font-black font-mono text-white">
                      {theme.metric}
                    </div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-slate-300">
                      {theme.metricLabel}
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md bg-[#5B61FE]">
                    <DeptIcon className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Ready-To-Deploy SLA Box */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-2 text-left">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-500 uppercase tracking-wide">Deployment Velocity</span>
                  <span className="text-[#5B61FE] font-mono">Day 1 Onboarding</span>
                </div>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Connect your team Slack directly to our squad. No ticket queues or account manager bottlenecks.
                </p>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </section>

      {/* ─── 3. ALL 5 CONNECTED DEPARTMENTS AT A GLANCE ─── */}
      <section className="py-20 bg-[#F8FAFC] border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5B61FE]">
              Unified Portfolio
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Explore the five full department pages.
            </h2>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              Every service line includes complete capability breakdowns, deliverable galleries, and transparent subscription tiers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {siteContent.serviceLines.map((svc, idx) => {
              const svcTheme = DEPARTMENT_THEMES[svc.id] || DEPARTMENT_THEMES['growth'];
              const Icon = svcTheme.icon;

              return (
                <motion.div
                  key={svc.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="bg-white rounded-3xl border border-slate-200/80 p-6 flex flex-col justify-between hover:shadow-xl hover:border-indigo-300/80 transition-all group"
                >
                  <div className="space-y-4">
                    {/* Top row */}
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-md bg-[#5B61FE]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold font-mono text-slate-400">
                        DEPT 0{idx + 1}
                      </span>
                    </div>

                    {/* Image Preview */}
                    <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 relative">
                      <img 
                        src={svc.image} 
                        alt={svc.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-2.5 left-3 text-white font-extrabold text-xs">
                        {svcTheme.metric} • {svcTheme.metricLabel}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#5B61FE] transition-colors">
                        {svc.title}
                      </h3>
                      <p className="text-xs text-slate-600 font-medium line-clamp-2 mt-1 leading-relaxed">
                        {svc.headline}
                      </p>
                    </div>

                    {/* Deliverables tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {svc.items.slice(0, 4).map(it => (
                        <span key={it} className="px-2 py-0.5 rounded-md bg-[#F8FAFC] border border-slate-200 text-[10px] font-bold text-slate-700">
                          {it}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 mt-4">
                    <button
                      onClick={() => onNavigate(svc.route)}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#F8FAFC] hover:bg-[#5B61FE] text-slate-800 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <span>View Full {svc.title} Capabilities</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}

            {/* Multi-Squad Combined Card */}
            <div className="bg-gradient-to-br from-[#0B1120] via-[#0F172A] to-[#1E293B] rounded-3xl border border-white/10 p-6 flex flex-col justify-between text-white shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#5B61FE] to-[#7C3AED] flex items-center justify-center text-white shadow-md">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest font-mono">
                    All 5 Combined
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">Full-Stack Squad</h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Deploy all five departments simultaneously under one unified monthly retainer. Scale up or down as your roadmap evolves.
                  </p>
                </div>

                <div className="space-y-2 pt-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400" />
                    <span>Unlimited cross-department requests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400" />
                    <span>Dedicated Technical Director</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400" />
                    <span>Instant pause or cancel freedom</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 mt-4">
                <button
                  onClick={() => onNavigate('pricing')}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#5B61FE] hover:bg-[#4F46E5] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition-all cursor-pointer"
                >
                  <span>Explore Subscription Tiers &rarr;</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─── 3.5. VISUAL SQUAD WORKSPACES IN ACTION ─── */}
      <section className="py-20 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#5B61FE]/20 bg-indigo-50/80 text-[#5B61FE] text-xs font-bold uppercase tracking-widest shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Production In Action</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Five departments. One synchronized delivery machine.
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              From creative Figma boards and high-converting ad copy to sub-second Next.js code and autonomous AI triage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Visual Card 1 */}
            <div className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-200 shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80" 
                alt="Growth & Analytics Cockpit"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-left text-white space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-cyan-300 bg-white/10 px-2 py-0.5 rounded border border-white/15">
                  Growth & Ads
                </span>
                <h4 className="text-base font-bold text-white">Full-Funnel Ad Optimization</h4>
                <p className="text-xs text-slate-300 font-medium">Weekly A/B test iterations across Google PMax and Meta CAPI.</p>
              </div>
            </div>

            {/* Visual Card 2 */}
            <div className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-200 shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80" 
                alt="Figma UI/UX & Motion Studio"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-left text-white space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-[#5B61FE] bg-white/10 px-2 py-0.5 rounded border border-white/15">
                  Design & Motion
                </span>
                <h4 className="text-base font-bold text-white">Rapid Creative Production</h4>
                <p className="text-xs text-slate-300 font-medium">48h turnaround with 100% vector source files and commercial rights.</p>
              </div>
            </div>

            {/* Visual Card 3 */}
            <div className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-200 shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" 
                alt="Software Engineering & Edge Deployment"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-left text-white space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 bg-white/10 px-2 py-0.5 rounded border border-white/15">
                  Tech & Engineering
                </span>
                <h4 className="text-base font-bold text-white">Sub-Second Edge Systems</h4>
                <p className="text-xs text-slate-300 font-medium">Next.js 15, Shopify Plus, Webflow, and zero technical debt builds.</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─── 4. INTERACTIVE SPRINT CAPACITY ESTIMATOR ─── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 sm:p-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            
            {/* Left Info */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[#5B61FE] text-xs font-extrabold uppercase tracking-wider">
                <Sliders className="w-3.5 h-3.5" />
                <span>Sprint Capacity Calculator</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                How much firepower does your business need?
              </h3>

              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                Adjust how many department streams you want running in parallel. Our synchronized squad replaces 3-5 disparate agency contracts.
              </p>

              {/* Slider Input */}
              <div className="space-y-2 pt-4">
                <div className="flex justify-between text-xs font-bold text-slate-900">
                  <span>Concurrent Department Streams:</span>
                  <span className="font-mono text-[#5B61FE] text-sm font-extrabold">{selectedSquadCount} Active Streams</span>
                </div>
                <input 
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={selectedSquadCount}
                  onChange={(e) => setSelectedSquadCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#5B61FE]"
                />
                <div className="flex justify-between text-[10px] font-bold text-slate-400 font-mono">
                  <span>1 Stream (Starter)</span>
                  <span>3 Streams (Growth)</span>
                  <span>5 Streams (All Departments)</span>
                </div>
              </div>

            </div>

            {/* Right Output Box */}
            <div className="lg:col-span-6 bg-[#F8FAFC] rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-5">
              
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Estimated Monthly Deliverables</div>
                  <div className="text-2xl font-black text-slate-900 font-mono mt-0.5">
                    {selectedSquadCount * 8} - {selectedSquadCount * 14} Assets / Sprints
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Turnaround SLA</div>
                  <div className="text-base font-extrabold text-emerald-600 font-mono">
                    {selectedSquadCount >= 3 ? "24-48 Hours" : "48-72 Hours"}
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs font-medium text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE]" />
                  <span>Direct shared Slack channel with specialists</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE]" />
                  <span>Weekly video sprint review & roadmap realignment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE]" />
                  <span>Pause anytime — unused days carry forward</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('free-trial')}
                className="w-full py-3.5 rounded-xl bg-[#5B61FE] hover:bg-[#4F46E5] text-white font-extrabold text-xs shadow-md shadow-indigo-500/25 transition-all cursor-pointer text-center"
              >
                Test Squad Velocity: Start 7-Day Free Trial &rarr;
              </button>

            </div>

          </div>

        </div>
      </section>

      {/* ─── 5. DYNAMIC INTERACTIVE SQUAD COMMAND CTA ─── */}
      <ServicesSquadCta 
        onStartTrial={() => onNavigate('free-trial')}
        onBookCall={() => onNavigate('contact')}
        onNavigate={onNavigate}
      />

    </div>
  );
};
