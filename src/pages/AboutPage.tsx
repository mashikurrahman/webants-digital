import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Award, 
  Globe2, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  Layers, 
  TrendingUp, 
  Bot, 
  Headphones, 
  Star, 
  Zap, 
  Check, 
  Briefcase, 
  Search, 
  Compass, 
  PenTool, 
  Workflow, 
  MessageSquare, 
  HeartHandshake, 
  Lock,
  ChevronRight
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
  onOpenBookCall: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenBookCall }) => {
  const [requestVerifiedOpen, setRequestVerifiedOpen] = useState(false);
  const [copiedNote, setCopiedNote] = useState(false);

  const handleRequestVerified = () => {
    setRequestVerifiedOpen(true);
  };

  return (
    <div className="pt-8 sm:pt-12 pb-24 bg-[#F7FAFF] text-[#172033] space-y-20 font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-[#071B33] via-[#0A2444] to-[#071B33] text-white p-8 sm:p-14 rounded-3xl border border-blue-900/60 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Pink Ambient Glow — radial-gradient, not a blurred box: same glow, no per-frame filter pass. */}
          <div
            className="absolute -top-20 -right-20 w-[544px] h-[544px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(240,90,166,0.15) 0%, transparent 70%)' }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 bg-[#EAF3FF]/10 text-[#3B8CFF] border border-[#3B8CFF]/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#F05AA6]" />
                About Webants Digital
              </span>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Connected expertise. <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B8CFF] via-blue-200 to-[#F05AA6]">
                  Complete commitment.
                </span>
              </h1>

              <p className="text-base text-blue-100/90 leading-relaxed max-w-xl">
                Webants combines growth, creative, technology, AI, automation and digital operations through one coordinated team.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onNavigate('free-trial')}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#1769E0] to-[#3B8CFF] hover:opacity-90 text-white font-extrabold text-xs shadow-lg shadow-blue-500/20 transition-opacity cursor-pointer flex items-center gap-2"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onOpenBookCall}
                  className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs border border-white/20 transition-colors cursor-pointer"
                >
                  Book a Call
                </motion.button>
              </div>
            </div>

            {/* Hero Sample Image */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden border border-blue-800/60 shadow-2xl relative group bg-gray-900"
            >
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" 
                alt="Remote Webants Digital Team" 
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=1200&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071B33]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F05AA6] text-white flex items-center justify-center font-bold text-xs shadow-md">
                  <Globe2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#F05AA6] uppercase tracking-wider block">Global Delivery Engine</span>
                  <p className="text-xs font-bold text-white">Coordinated Strategy, Design & Technology</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 2. WHO WE ARE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0] bg-[#EAF3FF] px-3.5 py-1 rounded-full inline-block">
            Who We Are
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#172033]">
            One team for connected digital growth.
          </h2>
          <p className="text-sm sm:text-base text-[#637083] leading-relaxed">
            Webants is a remote-first digital growth and technology company based in Bangladesh, serving international businesses.
          </p>
          <p className="text-sm text-[#172033] font-semibold leading-relaxed">
            We bring specialists together under one delivery system so clients do not need to manage several disconnected agencies or freelancers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-blue-100 shadow-sm space-y-3 hover:border-blue-400 transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-[#EAF3FF] text-[#1769E0] flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-extrabold text-[#172033]">Connected Services</h3>
            <p className="text-xs sm:text-sm text-[#637083] leading-relaxed">
              Marketing, creative, technology and operations work together seamlessly under one roof.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-blue-100 shadow-sm space-y-3 hover:border-blue-400 transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-[#FCEAF4] text-[#F05AA6] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-extrabold text-[#172033]">Central Management</h3>
            <p className="text-xs sm:text-sm text-[#637083] leading-relaxed">
              Every project has clear ownership, proactive communication, and internal quality review.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-blue-100 shadow-sm space-y-3 hover:border-blue-400 transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-[#EAF3FF] text-[#1769E0] flex items-center justify-center font-bold">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-extrabold text-[#172033]">Long-Term Support</h3>
            <p className="text-xs sm:text-sm text-[#637083] leading-relaxed">
              We support both one-time targeted projects and ongoing continuous business growth.
            </p>
          </div>
        </div>
      </section>

      {/* 3. OUR STORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0] bg-[#EAF3FF] px-3.5 py-1 rounded-full">
            Our Journey
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#172033]">
            Built through real international client work.
          </h2>
        </div>

        {/* 4-Step Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm space-y-4 relative flex flex-col justify-between">
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-[#FCEAF4] text-[#F05AA6] text-xs font-black tracking-wider">
                2020
              </span>
              <h3 className="text-base font-extrabold text-[#172033]">Foundation</h3>
              <p className="text-xs text-[#637083] leading-relaxed">
                Webants began as a remote creative and website-services team focused on responsive web design and graphics.
              </p>
            </div>
            <div className="aspect-[16/10] rounded-xl overflow-hidden bg-gray-100 border border-gray-100 mt-2">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=80" alt="Webants Early Foundation" loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm space-y-4 relative flex flex-col justify-between">
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-[#EAF3FF] text-[#1769E0] text-xs font-black tracking-wider">
                Global Work
              </span>
              <h3 className="text-base font-extrabold text-[#172033]">International Experience</h3>
              <p className="text-xs text-[#637083] leading-relaxed">
                The team gained deep experience through Upwork, referrals, direct clients and agency relationships across US and Europe.
              </p>
            </div>
            <div className="aspect-[16/10] rounded-xl overflow-hidden bg-gray-100 border border-gray-100 mt-2">
              <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=500&q=80" alt="International Client Work" loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm space-y-4 relative flex flex-col justify-between">
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-[#FCEAF4] text-[#F05AA6] text-xs font-black tracking-wider">
                Multi-Domain
              </span>
              <h3 className="text-base font-extrabold text-[#172033]">Expanded Capabilities</h3>
              <p className="text-xs text-[#637083] leading-relaxed">
                Services expanded into performance marketing, video editing, e-commerce platforms, CRM setup, AI tools and automation.
              </p>
            </div>
            <div className="aspect-[16/10] rounded-xl overflow-hidden bg-gray-100 border border-gray-100 mt-2">
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80" alt="Expanded Capabilities" loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="bg-[#071B33] text-white p-6 rounded-3xl border border-blue-900 shadow-xl space-y-4 relative flex flex-col justify-between">
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-[#1769E0] text-white text-xs font-black tracking-wider">
                Today
              </span>
              <h3 className="text-base font-extrabold text-white">Integrated Partner</h3>
              <p className="text-xs text-blue-100/90 leading-relaxed">
                Webants operates as an integrated digital growth and technology partner providing synchronized execution.
              </p>
            </div>
            <div className="aspect-[16/10] rounded-xl overflow-hidden bg-gray-800 border border-blue-800 mt-2">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=500&q=80" alt="Webants Integrated Partner Today" loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </div>
          </div>

        </div>
      </section>

      {/* 4. VERIFIED PROFESSIONAL EXPERIENCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0] bg-[#EAF3FF] px-3.5 py-1 rounded-full inline-block">
            Track Record
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#172033]">
            A strong international delivery background.
          </h2>
          <p className="text-sm text-[#637083] leading-relaxed">
            The professional experience behind Webants includes long-term international client work and a strong verified Upwork history.
          </p>
        </div>

        {/* Premium Credibility Card */}
        <div className="bg-gradient-to-br from-[#071B33] via-[#0A2444] to-[#071B33] text-white p-8 sm:p-12 rounded-3xl border border-blue-900 shadow-2xl space-y-8 relative overflow-hidden">
          {/* Subtle Pink Badge Accent */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-blue-800/80 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#F05AA6] text-white flex items-center justify-center font-extrabold shadow-lg shadow-pink-500/20">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-black uppercase text-[#F05AA6] tracking-wider block">Verified Credentials</span>
                <p className="text-sm font-bold text-white">Upwork Verified History & Performance Metrics</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 bg-[#FCEAF4]/10 text-[#F05AA6] border border-[#F05AA6]/30 px-3.5 py-1.5 rounded-full text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-[#F05AA6]" />
              <span>Top Rated Plus Status</span>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            
            <div className="bg-white/5 p-4 sm:p-5 rounded-2xl border border-blue-800/50 space-y-1 text-center">
              <span className="text-2xl sm:text-3xl font-black text-[#F05AA6] block">100%</span>
              <span className="text-[11px] font-bold text-blue-200 uppercase tracking-wider block">Job Success</span>
            </div>

            <div className="bg-white/5 p-4 sm:p-5 rounded-2xl border border-blue-800/50 space-y-1 text-center">
              <span className="text-lg sm:text-2xl font-black text-[#3B8CFF] block mt-1">Top Rated Plus</span>
              <span className="text-[11px] font-bold text-blue-200 uppercase tracking-wider block">Upwork Status</span>
            </div>

            <div className="bg-white/5 p-4 sm:p-5 rounded-2xl border border-blue-800/50 space-y-1 text-center">
              <span className="text-2xl sm:text-3xl font-black text-white block">$60K+</span>
              <span className="text-[11px] font-bold text-blue-200 uppercase tracking-wider block">Total Earnings</span>
            </div>

            <div className="bg-white/5 p-4 sm:p-5 rounded-2xl border border-blue-800/50 space-y-1 text-center">
              <span className="text-2xl sm:text-3xl font-black text-[#3B8CFF] block">277</span>
              <span className="text-[11px] font-bold text-blue-200 uppercase tracking-wider block">Completed Jobs</span>
            </div>

            <div className="bg-white/5 p-4 sm:p-5 rounded-2xl border border-blue-800/50 space-y-1 text-center col-span-2 md:col-span-1">
              <span className="text-2xl sm:text-3xl font-black text-[#F05AA6] block">4,875</span>
              <span className="text-[11px] font-bold text-blue-200 uppercase tracking-wider block">Total Hours</span>
            </div>

          </div>

          {/* Note & CTA */}
          <div className="pt-4 border-t border-blue-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-blue-200">
            <div className="flex items-center gap-2 max-w-xl">
              <Lock className="w-4 h-4 text-[#F05AA6] shrink-0" />
              <p className="leading-relaxed">
                <strong className="text-white">Note:</strong> Verified profile and complete work history can be shared privately with qualified prospective clients.
              </p>
            </div>

            <button
              onClick={handleRequestVerified}
              className="px-5 py-2.5 rounded-xl bg-[#1769E0] hover:bg-blue-600 text-white font-extrabold text-xs transition-colors shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <span>Request Verified Work History</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. WHY BANGLADESH? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0] bg-[#EAF3FF] px-3.5 py-1 rounded-full inline-block">
              Global Advantage
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#172033]">
              Why Bangladesh?
            </h2>
            <p className="text-sm text-[#637083] leading-relaxed">
              Bangladesh gives Webants access to skilled digital professionals, international working-hour flexibility and the ability to build a stable multidisciplinary team.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-sm space-y-1.5">
                <h4 className="text-sm font-extrabold text-[#172033] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#1769E0]" />
                  Skilled Talent
                </h4>
                <p className="text-xs text-[#637083]">Professionals across design, development, marketing, video and automation.</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-sm space-y-1.5">
                <h4 className="text-sm font-extrabold text-[#172033] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F05AA6]" />
                  International Availability
                </h4>
                <p className="text-xs text-[#637083]">Working schedules can support North American and international clients.</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-sm space-y-1.5">
                <h4 className="text-sm font-extrabold text-[#172033] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#1769E0]" />
                  Strong Business Value
                </h4>
                <p className="text-xs text-[#637083]">Access multiple capabilities without building several internal departments.</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-sm space-y-1.5">
                <h4 className="text-sm font-extrabold text-[#172033] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F05AA6]" />
                  Remote-First Delivery
                </h4>
                <p className="text-xs text-[#637083]">Communication, project management and quality control designed for international work.</p>
              </div>
            </div>

            {/* Highlighted Quote Statement */}
            <div className="p-5 rounded-2xl bg-[#EAF3FF] border-l-4 border-[#1769E0] text-xs font-bold text-[#172033] leading-relaxed">
              “We do not compete by being the cheapest. We compete through quality, commitment, communication and organized delivery.”
            </div>
          </div>

          {/* Sample Image combining Dhaka & tech */}
          <div className="lg:col-span-5 aspect-square rounded-3xl overflow-hidden border border-blue-100 shadow-lg relative bg-gray-900">
            <img 
              src="https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80" 
              alt="Dhaka Tech & Global Connections" 
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071B33]/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#F05AA6]">Dhaka Tech Hub</span>
              <p className="text-xs font-bold">Connecting Bangladesh's Top Digital Talent with Global Enterprises</p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. HOW WE WORK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0] bg-[#EAF3FF] px-3.5 py-1 rounded-full">
            Our Process
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#172033]">
            A clear process from idea to completion.
          </h2>
        </div>

        {/* 6-Step Visual Process */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {[
            { num: '01', title: 'Discover', desc: 'Understand the business, goals and challenges.', color: 'border-blue-200' },
            { num: '02', title: 'Define', desc: 'Confirm scope, timeline, deliverables and pricing.', color: 'border-blue-200' },
            { num: '03', title: 'Plan', desc: 'Create milestones, tasks and responsibilities.', color: 'border-pink-200' },
            { num: '04', title: 'Build', desc: 'Assign the right specialists and complete the work.', color: 'border-blue-200' },
            { num: '05', title: 'Review', desc: 'Check quality before client delivery.', color: 'border-pink-200' },
            { num: '06', title: 'Deliver & Improve', desc: 'Complete project, manage feedback and support future growth.', color: 'border-blue-200' },
          ].map((step, i) => (
            <div key={i} className={`bg-white p-5 rounded-2xl border ${step.color} shadow-sm space-y-2 hover:shadow-md transition-shadow`}>
              <span className="text-xs font-extrabold text-[#1769E0] bg-[#EAF3FF] px-2.5 py-1 rounded-lg inline-block">
                {step.num}
              </span>
              <h4 className="text-sm font-extrabold text-[#172033]">{step.title}</h4>
              <p className="text-xs text-[#637083] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. OUR COMMITMENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0] bg-[#EAF3FF] px-3.5 py-1 rounded-full inline-block">
            Our Standards
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#172033]">
            Full commitment from planning to completion.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#EAF3FF] text-[#1769E0] flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h3 className="text-base font-extrabold text-[#172033]">Clear Ownership</h3>
            <p className="text-xs text-[#637083] leading-relaxed">Every project and task has a responsible owner.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#FCEAF4] text-[#F05AA6] flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h3 className="text-base font-extrabold text-[#172033]">Proactive Communication</h3>
            <p className="text-xs text-[#637083] leading-relaxed">Progress, risks and decisions are communicated clearly.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#EAF3FF] text-[#1769E0] flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h3 className="text-base font-extrabold text-[#172033]">Internal Quality Control</h3>
            <p className="text-xs text-[#637083] leading-relaxed">Important work is reviewed internally before client delivery.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#FCEAF4] text-[#F05AA6] flex items-center justify-center font-bold text-xs">
              04
            </div>
            <h3 className="text-base font-extrabold text-[#172033]">Reliable Completion</h3>
            <p className="text-xs text-[#637083] leading-relaxed">We remain focused until the agreed work is properly completed.</p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-[#071B33] text-white border border-blue-900 shadow-xl text-center">
          <p className="text-sm sm:text-base font-bold text-blue-100 italic">
            “We do not only produce deliverables. We take responsibility for the quality and clarity of the entire project.”
          </p>
        </div>
      </section>

      {/* 8. WHY CLIENTS CHOOSE WEBANTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0] bg-[#EAF3FF] px-3.5 py-1 rounded-full">
            The Webants Edge
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#172033]">
            Why businesses work with us.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'One coordinated team', icon: Users, color: '#1769E0', bg: '#EAF3FF' },
            { title: 'Business-focused execution', icon: TrendingUp, color: '#F05AA6', bg: '#FCEAF4' },
            { title: 'International delivery experience', icon: Globe2, color: '#1769E0', bg: '#EAF3FF' },
            { title: 'Flexible engagement models', icon: Workflow, color: '#F05AA6', bg: '#FCEAF4' },
            { title: 'AI-assisted efficiency', icon: Bot, color: '#1769E0', bg: '#EAF3FF' },
            { title: 'Ongoing support after launch', icon: Headphones, color: '#F05AA6', bg: '#FCEAF4' },
          ].map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm flex items-center gap-4 hover:border-blue-400 transition-colors">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: item.bg, color: item.color }}
                >
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="text-base font-extrabold text-[#172033]">{item.title}</h3>
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. CORE CAPABILITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0] bg-[#EAF3FF] px-3.5 py-1 rounded-full">
              Connected Lines
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#172033] mt-2">
              Five connected service areas.
            </h2>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="px-5 py-2.5 rounded-xl bg-[#1769E0] hover:bg-blue-700 text-white font-extrabold text-xs transition-colors shadow-md cursor-pointer flex items-center gap-2"
          >
            <span>Explore Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { title: 'Growth', desc: 'SEO, paid advertising, leads, direct mail and analytics.', color: 'border-blue-200' },
            { title: 'Creative', desc: 'Branding, graphic design, video and motion graphics.', color: 'border-pink-200' },
            { title: 'Technology', desc: 'Websites, e-commerce, systems and integrations.', color: 'border-blue-200' },
            { title: 'AI & Automation', desc: 'AI assistants, CRM automation and workflows.', color: 'border-pink-200' },
            { title: 'Digital Operations', desc: 'Content, social media, email, CRM and ongoing support.', color: 'border-blue-200' },
          ].map((cap, i) => (
            <div key={i} className={`bg-white p-6 rounded-3xl border ${cap.color} shadow-sm space-y-2 hover:shadow-lg transition-shadow flex flex-col justify-between`}>
              <div className="space-y-2">
                <span className="text-[10px] font-black text-[#1769E0] uppercase tracking-wider">Line 0{i + 1}</span>
                <h3 className="text-base font-extrabold text-[#172033]">{cap.title}</h3>
                <p className="text-xs text-[#637083] leading-relaxed">{cap.desc}</p>
              </div>
              <button 
                onClick={() => onNavigate('services')} 
                className="text-[11px] font-bold text-[#1769E0] hover:underline pt-3 flex items-center gap-1 cursor-pointer"
              >
                <span>Learn More</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 10. VALUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0] bg-[#EAF3FF] px-3.5 py-1 rounded-full">
            Our Mindset
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#172033]">
            The standards behind our work.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { label: 'Ownership', exp: 'We take responsibility for the outcome.' },
            { label: 'Quality', exp: 'Every deliverable must meet professional standards.' },
            { label: 'Integrity', exp: 'We communicate honestly and avoid unrealistic promises.' },
            { label: 'Learning', exp: 'We continuously improve our skills and systems.' },
            { label: 'Communication', exp: 'Clients should always understand what is happening.' },
            { label: 'Long-Term Thinking', exp: 'We build sustainable relationships and processes.' },
          ].map((val, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm space-y-2">
              <h3 className="text-base font-extrabold text-[#172033]">{val.label}</h3>
              <p className="text-xs text-[#637083] leading-relaxed">{val.exp}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 11. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0] bg-[#EAF3FF] px-3.5 py-1 rounded-full">
            Client Feedback
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#172033]">
            Trusted for communication and commitment.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-blue-100 shadow-sm space-y-4 relative flex flex-col justify-between">
            <div className="space-y-3">
              <span className="bg-[#EAF3FF] text-[#1769E0] text-[10px] font-mono font-bold px-2.5 py-1 rounded inline-block">
                Demo Testimonial
              </span>
              <p className="text-xs sm:text-sm text-[#172033] font-medium italic leading-relaxed">
                “The project was organized from start to finish, and we always knew what came next.”
              </p>
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#1769E0] to-[#3B8CFF] flex items-center justify-center text-white font-bold text-sm">
                JL
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-[#172033]">Jordan Lee</h4>
                <p className="text-[11px] text-[#637083]">Operations Director, NorthPeak Moving</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-pink-100 shadow-sm space-y-4 relative flex flex-col justify-between">
            <div className="space-y-3">
              <span className="bg-[#FCEAF4] text-[#F05AA6] text-[10px] font-mono font-bold px-2.5 py-1 rounded inline-block">
                Demo Testimonial
              </span>
              <p className="text-xs sm:text-sm text-[#172033] font-medium italic leading-relaxed">
                “They worked like an extension of our team rather than an outside vendor.”
              </p>
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#F05AA6] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-sm">
                MT
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-[#172033]">Morgan Taylor</h4>
                <p className="text-[11px] text-[#637083]">Marketing Manager, BloomCart</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-blue-100 shadow-sm space-y-4 relative flex flex-col justify-between">
            <div className="space-y-3">
              <span className="bg-[#EAF3FF] text-[#1769E0] text-[10px] font-mono font-bold px-2.5 py-1 rounded inline-block">
                Demo Testimonial
              </span>
              <p className="text-xs sm:text-sm text-[#172033] font-medium italic leading-relaxed">
                “The quality was strong, but the communication and ownership made the biggest difference.”
              </p>
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#1769E0] to-[#3B8CFF] flex items-center justify-center text-white font-bold text-sm">
                AM
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-[#172033]">Alex Morgan</h4>
                <p className="text-[11px] text-[#637083]">Director, Harborline Services</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 12. FINAL CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#071B33] via-[#0A2444] to-[#071B33] text-white p-8 sm:p-14 rounded-3xl border border-blue-900 shadow-2xl text-center space-y-6 relative overflow-hidden">
          {/* Gradient, not `blur-3xl`: same glow, no per-frame filter pass. Box enlarged and
              re-centred because a blur bleeds outward past its element and a gradient doesn't. */}
          <div
            className="absolute -top-36 -right-36 w-[448px] h-[448px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(240,90,166,0.10) 0%, rgba(240,90,166,0.075) 40%, transparent 72%)' }}
          />

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white max-w-2xl mx-auto leading-tight">
            Looking for a team committed from planning to completion?
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto">
            Tell us what you want to improve, build or automate.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('free-trial')}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#1769E0] to-[#3B8CFF] hover:opacity-90 text-white font-extrabold text-xs shadow-lg shadow-blue-500/20 transition-opacity cursor-pointer"
            >
              Start Your 7-Day Free Trial
            </button>
            <button
              onClick={onOpenBookCall}
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs border border-white/20 transition-colors cursor-pointer"
            >
              Book a Discovery Call
            </button>
          </div>

          <div className="pt-2">
            <button 
              onClick={handleRequestVerified}
              className="text-xs font-bold text-[#F05AA6] hover:underline cursor-pointer"
            >
              Request Verified Work History
            </button>
          </div>
        </div>
      </section>

      {/* Request Verified Work History Modal */}
      {requestVerifiedOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-blue-100 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2 text-[#1769E0]">
                <ShieldCheck className="w-5 h-5 text-[#F05AA6]" />
                <h3 className="text-base font-extrabold text-[#172033]">Verified Work History</h3>
              </div>
              <button 
                onClick={() => setRequestVerifiedOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#637083] leading-relaxed">
              Our complete verified Upwork profile, past enterprise contracts, and client references can be shared directly over email or during a discovery call.
            </p>

            <div className="bg-[#F7FAFF] p-4 rounded-2xl border border-blue-100 space-y-2">
              <span className="text-[10px] font-bold text-[#1769E0] uppercase block">Direct Verification Contact</span>
              <p className="text-xs font-bold text-[#172033] font-mono">hello@webantsdigital.com</p>
              <p className="text-[11px] text-gray-500">Subject: Request for Verified Upwork History</p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText('hello@webantsdigital.com');
                  setCopiedNote(true);
                  setTimeout(() => setCopiedNote(false), 2000);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#EAF3FF] hover:bg-blue-100 text-[#1769E0] text-xs font-bold transition-colors cursor-pointer text-center"
              >
                {copiedNote ? 'Email Copied!' : 'Copy Email Address'}
              </button>
              <button
                onClick={() => {
                  setRequestVerifiedOpen(false);
                  onOpenBookCall();
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#1769E0] hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer text-center"
              >
                Book Discovery Call
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
