import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Workflow, 
  MessageSquare, 
  Send, 
  Sliders, 
  Check, 
  Clock, 
  Database, 
  Calendar, 
  Layers,
  Terminal
} from 'lucide-react';
import { siteContent } from '../data/siteContent';
import { AiNeuralWorkflowCta } from '../components/cta/AiNeuralWorkflowCta';

interface AiAutomationPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const AiAutomationPage: React.FC<AiAutomationPageProps> = ({ onNavigate }) => {
  const aiData = siteContent.serviceLines.find(s => s.id === 'ai-automation')!;

  // Pipeline Simulator Active Step
  const [activeStep, setActiveStep] = useState<number>(0);

  // Live Chatbot Playground State
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string; time: string }>>([
    { role: 'assistant', text: "Hi there! I'm the WebAnts Lead Qualification Assistant. Are you looking to scale your marketing, design, engineering, or operations today?", time: 'Just now' }
  ]);
  const [inputMessage, setInputMessage] = useState<string>('');

  // ROI Calculator State
  const [teamMembers, setTeamMembers] = useState<number>(5);
  const [manualHoursPerWeek, setManualHoursPerWeek] = useState<number>(8);

  const monthlyHoursSaved = teamMembers * manualHoursPerWeek * 4;
  const monthlyCostSaved = monthlyHoursSaved * 35; // Assuming $35/hr loaded labor cost

  const pipelineStages = [
    {
      step: '01',
      title: 'Inbound Webhook Trigger',
      desc: 'Form submission, Facebook Lead Ad, incoming SMS or web chat trigger.',
      payload: `{\n  "event": "inbound_lead",\n  "channel": "Meta_Lead_Ads",\n  "contact": { "name": "Sarah Miller", "phone": "+1 415-555-0192" }\n}`,
      status: 'Payload Received'
    },
    {
      step: '02',
      title: 'LLM Intent & Entity Extraction',
      desc: 'GPT-4o parses user requirements, estimated budget, timeline, and industry.',
      payload: `{\n  "extracted_intent": "Shopify Storefront Migration",\n  "urgency": "High (under 30 days)",\n  "budget_tier": "$5,000 - $10,000",\n  "lead_score": 94\n}`,
      status: 'Processed in 340ms'
    },
    {
      step: '03',
      title: 'CRM Auto-Ingest & Enrichment',
      desc: 'Automatic contact creation, duplicate check, custom field population, and tag assignment.',
      payload: `{\n  "crm": "GoHighLevel / HubSpot",\n  "action": "upsert_contact",\n  "tags": ["High-Value-Lead", "Shopify-Migration", "Q3-Budget"],\n  "assigned_rep": "Senior Solutions Architect"\n}`,
      status: 'Synced to Pipeline'
    },
    {
      step: '04',
      title: 'Conversational SMS Engagement',
      desc: 'Instant personalized SMS outreach with dynamic calendar booking link under 60 seconds.',
      payload: `{\n  "sms_dispatched": true,\n  "text": "Hi Sarah, saw your Shopify migration request! Click here to grab 15 mins on our lead engineer\\'s calendar: cal.com/webants/15min",\n  "delivery_time": "12s post-submit"\n}`,
      status: 'Speed to Lead: 12s'
    },
    {
      step: '05',
      title: 'Self-Service Calendar Booking',
      desc: 'Prospect selects time; calendar invite, Zoom link, and reminder SMS sequences triggered automatically.',
      payload: `{\n  "meeting_booked": "Thursday 2:00 PM EST",\n  "calendar_sync": "Google Calendar + Zoom API",\n  "reminders": ["24h_before", "1h_before", "10m_sms"]\n}`,
      status: 'Meeting Confirmed'
    },
    {
      step: '06',
      title: 'Executive Slack & CRM Alert',
      desc: 'Real-time notification sent directly to your leadership Slack channel with complete briefing note.',
      payload: `{\n  "slack_channel": "#growth-leads",\n  "alert": "🔥 New Qualified Meeting: Sarah Miller (Shopify Migration - $8k est)",\n  "brief_ready": true\n}`,
      status: 'Slack Broadcast Sent'
    }
  ];

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage.trim();
    const newMessages = [...chatMessages, { role: 'user' as const, text: userText, time: 'Just now' }];
    setChatMessages(newMessages);
    setInputMessage('');

    // Simulated Smart AI Reply
    setTimeout(() => {
      let botResponse = "That sounds like a great project! I can immediately route this to our senior engineering squad. Would you like to schedule a quick 15-min discovery call or try our 7-day free trial?";
      if (userText.toLowerCase().includes('price') || userText.toLowerCase().includes('cost')) {
        botResponse = "We offer transparent flat-rate subscriptions starting at $1,200/mo and fixed project builds. You can pause or cancel anytime with zero contracts!";
      } else if (userText.toLowerCase().includes('seo') || userText.toLowerCase().includes('growth') || userText.toLowerCase().includes('ad')) {
        botResponse = "Our Growth department handles Google Ads, Meta Ads, and Local Map Pack SEO with zero ad spend markups. We typically achieve 3.8x - 5.2x target ROAS!";
      }

      setChatMessages(prev => [...prev, { role: 'assistant', text: botResponse, time: 'Just now' }]);
    }, 700);
  };

  return (
    <div className="bg-white text-slate-900 min-h-screen selection:bg-[#5B61FE] selection:text-white">
      
      {/* ─── 1. HIGH-IMPACT NEURAL AUTOMATION COCKPIT HERO ─── */}
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
                <Bot className="w-3.5 h-3.5" />
                <span>Autonomous AI Systems</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.03]"
              >
                Engage every lead <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B61FE] via-[#7C3AED] to-[#5B61FE]">
                  in under 60 seconds.
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg text-slate-600 font-medium max-w-xl leading-relaxed"
              >
                24/7 intelligent qualification chatbots, custom CRM automation pipelines, instant SMS appointment booking, and multi-agent workflow systems. Never lose a high-intent prospect to slow response times.
              </motion.p>

              {/* Pipeline Stage Quick Switches in Hero */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="flex flex-wrap gap-2 pt-2"
              >
                {pipelineStages.slice(0, 4).map((stage, idx) => {
                  const isSelected = activeStep === idx;

                  return (
                    <button
                      key={stage.step}
                      onClick={() => setActiveStep(idx)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#5B61FE] text-white shadow-md shadow-indigo-500/20 scale-[1.02]'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="font-mono text-[10px] opacity-80">{stage.step}</span>
                      <span>{stage.title.split(' ')[0]}</span>
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
                  onClick={() => onNavigate('contact')}
                  className="px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-xs sm:text-sm border border-slate-200 shadow-xs transition-colors cursor-pointer"
                >
                  <span>Request Custom Pipeline Demo &rarr;</span>
                </button>
              </motion.div>
            </div>

            {/* Right: Interactive Live AI Neural Pipeline Cockpit (5 Cols) */}
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
                      Neural Engine Live
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-white/10 px-2 py-0.5 rounded-md border border-white/10">
                    &lt; 60S SPEED TO LEAD
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div>
                      <div className="text-xs uppercase font-mono text-cyan-400 font-bold">
                        Stage {pipelineStages[activeStep].step} • {pipelineStages[activeStep].status}
                      </div>
                      <h3 className="text-2xl font-black text-white mt-0.5">
                        {pipelineStages[activeStep].title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                      {pipelineStages[activeStep].desc}
                    </p>

                    {/* Telemetry snippet */}
                    <div className="p-3 bg-black/60 rounded-xl border border-white/10 font-mono text-[11px] text-cyan-200 overflow-x-auto max-h-24">
                      <pre>{pipelineStages[activeStep].payload}</pre>
                    </div>

                    <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/10">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400">Response Latency</div>
                        <div className="text-2xl font-black font-mono text-emerald-400 mt-0.5">
                          180ms
                        </div>
                        <div className="text-[10px] text-slate-400">LLM Intent Triage</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400">Availability</div>
                        <div className="text-2xl font-black font-mono text-cyan-300 mt-0.5">
                          24/7/365
                        </div>
                        <div className="text-[10px] text-slate-400">Zero Missed Leads</div>
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigate('free-trial')}
                      className="w-full py-3 rounded-xl bg-[#5B61FE] hover:bg-[#4F46E5] text-white font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-indigo-500/20"
                    >
                      <span>Deploy This AI Pipeline</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                </AnimatePresence>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── 2. INTERACTIVE 6-STEP AI PIPELINE SIMULATOR ─── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5B61FE]">
            Interactive Architecture Flow
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How our AI pipelines operate in real-time.
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            Click any step to inspect the automated data extraction, CRM sync, and instant booking logic.
          </p>
        </div>

        {/* 6 Stage Steps Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {pipelineStages.map((stage, idx) => (
            <button
              key={stage.step}
              onClick={() => setActiveStep(idx)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                activeStep === idx
                  ? 'bg-[#5B61FE] text-white border-[#5B61FE] shadow-md shadow-indigo-500/20 scale-[1.03]'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-indigo-300'
              }`}
            >
              <span className={`text-[10px] font-mono font-black block ${activeStep === idx ? 'text-indigo-200' : 'text-[#5B61FE]'}`}>
                STAGE {stage.step}
              </span>
              <h4 className="text-xs font-bold mt-1 line-clamp-1">{stage.title}</h4>
            </button>
          ))}
        </div>

        {/* Active Pipeline Viewer */}
        <div className="bg-[#0B1120] text-white rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 text-left items-center">
          
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-white/10 text-cyan-300 border border-white/10">
                Step {pipelineStages[activeStep].step} of 06
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                ✓ {pipelineStages[activeStep].status}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {pipelineStages[activeStep].title}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed font-medium">
              {pipelineStages[activeStep].desc}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setActiveStep((activeStep + 1) % pipelineStages.length)}
                className="px-5 py-2.5 rounded-xl bg-[#5B61FE] hover:bg-[#4F46E5] text-white font-bold text-xs shadow-md transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Next Stage ({pipelineStages[(activeStep + 1) % pipelineStages.length].title.split(' ')[0]})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* JSON Payload Viewer */}
          <div className="lg:col-span-6 rounded-2xl bg-black/70 border border-white/10 overflow-hidden shadow-inner">
            <div className="px-4 py-2.5 bg-slate-900/90 border-b border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#5B61FE]" />
                <span className="text-slate-300 font-mono text-xs">pipeline_telemetry.json</span>
              </div>
              <span className="text-[10px] font-mono text-[#5B61FE] font-bold">LIVE TELEMETRY</span>
            </div>
            <div className="p-4 sm:p-6 font-mono text-xs text-indigo-200/90 leading-relaxed overflow-x-auto">
              <pre>{pipelineStages[activeStep].payload}</pre>
            </div>
          </div>

        </div>

      </section>

      {/* ─── 3. INTERACTIVE LIVE CHATBOT PLAYGROUND ─── */}
      <section className="py-20 bg-[#F8FAFC] border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5B61FE]">
              Live Sandbox Playground
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Test drive our conversational AI.
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              Interact with a working simulated lead qualification bot below. Type any question about services, pricing, or timelines.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col min-h-[480px]">
            
            {/* Chatbot Header */}
            <div className="px-6 py-4 bg-[#F8FAFC] border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#5B61FE] text-white flex items-center justify-center shadow-sm">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">WebAnts AI Qualification Agent</h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Online & Ready</span>
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                GPT-4o + Vector Memory
              </span>
            </div>

            {/* Message Thread */}
            <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[320px] text-left bg-[#FAFCFF]">
              {chatMessages.map((msg, idx) => (
                <div 
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#5B61FE] text-white font-medium rounded-br-none'
                        : 'bg-white border border-slate-200 text-slate-800 font-medium shadow-2xs rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendChat} className="p-4 bg-white border-t border-slate-200 flex gap-2">
              <input
                type="text"
                placeholder="Ask about pricing, capabilities, or trial..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-[#F8FAFC] border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-[#5B61FE] transition-colors"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-[#5B61FE] hover:bg-[#4F46E5] text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </div>

        </div>
      </section>

      {/* ─── 3.5. VISUAL AI ARCHITECTURE IN ACTION ─── */}
      <section className="py-20 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#5B61FE]/20 bg-indigo-50/80 text-[#5B61FE] text-xs font-bold uppercase tracking-widest shadow-2xs">
              <Bot className="w-3.5 h-3.5" />
              <span>Intelligent Operations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              24/7 AI lead qualification & CRM pipelines.
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              Explore our autonomous neural workflows: GPT-4o vector agents, instant SMS booking triggers, and two-way CRM lead routing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Visual Card 1 */}
            <div className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-200 shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80" 
                alt="AI Vector Knowledge Base"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-left text-white space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-cyan-300 bg-white/10 px-2 py-0.5 rounded border border-white/15">
                  LLM Agents
                </span>
                <h4 className="text-base font-bold text-white">Embeddings & Knowledge Retrieval</h4>
                <p className="text-xs text-slate-300 font-medium">Accurate, hallucination-free answers to company pricing & FAQs.</p>
              </div>
            </div>

            {/* Visual Card 2 */}
            <div className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-200 shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" 
                alt="Automated Telemetry Dashboards"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-left text-white space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-[#5B61FE] bg-white/10 px-2 py-0.5 rounded border border-white/15">
                  Lead Qualification
                </span>
                <h4 className="text-base font-bold text-white">Automated Booking & Cal Sync</h4>
                <p className="text-xs text-slate-300 font-medium">Real-time calendar slot reservation and automated Zoom invites.</p>
              </div>
            </div>

            {/* Visual Card 3 */}
            <div className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-200 shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80" 
                alt="Executive Slack AI Alerts"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-left text-white space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 bg-white/10 px-2 py-0.5 rounded border border-white/15">
                  Slack & CRM Sync
                </span>
                <h4 className="text-base font-bold text-white">Instant Leadership Notifications</h4>
                <p className="text-xs text-slate-300 font-medium">High-intent meeting alerts broadcasted to team channels in &lt;15s.</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─── 4. LABOR COST & TIME SAVINGS CALCULATOR ─── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 sm:p-12 space-y-10">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5B61FE]">
              Labor ROI Estimator
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Calculate your monthly operational savings.
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              Eliminate manual data entry, slow email responses, and repetitive calendar ping-pong.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-900">
                  <span>Team Members in Sales / Operations:</span>
                  <span className="font-mono text-[#5B61FE] text-sm font-black">{teamMembers} People</span>
                </div>
                <input 
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={teamMembers}
                  onChange={(e) => setTeamMembers(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#5B61FE]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-900">
                  <span>Manual Repetitive Hours per Person / Week:</span>
                  <span className="font-mono text-[#5B61FE] text-sm font-black">{manualHoursPerWeek} Hours / Wk</span>
                </div>
                <input 
                  type="range"
                  min="2"
                  max="20"
                  step="1"
                  value={manualHoursPerWeek}
                  onChange={(e) => setManualHoursPerWeek(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#5B61FE]"
                />
              </div>
            </div>

            <div className="lg:col-span-6 bg-gradient-to-br from-[#0B1120] via-[#0F172A] to-[#1E293B] rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-cyan-400">
                  Projected Monthly Cost Saved
                </span>
                <div className="text-3xl sm:text-5xl font-black font-mono text-emerald-400">
                  ${monthlyCostSaved.toLocaleString()} <span className="text-xs text-slate-400 font-sans font-normal">/ month</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 flex justify-between items-center text-xs font-bold">
                <span className="text-slate-300">Total Monthly Hours Reclaimed:</span>
                <span className="font-mono text-white text-base">{monthlyHoursSaved} Hours</span>
              </div>

              <button
                onClick={() => onNavigate('free-trial')}
                className="w-full py-3.5 rounded-xl bg-[#5B61FE] hover:bg-[#4F46E5] text-white font-extrabold text-xs shadow-lg shadow-indigo-500/30 transition-all cursor-pointer text-center"
              >
                Deploy AI Automation Pipeline &rarr;
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ─── 5. DYNAMIC INTERACTIVE AI NEURAL WORKFLOW CTA ─── */}
      <AiNeuralWorkflowCta 
        onStartTrial={() => onNavigate('free-trial')}
        onBookCall={() => onNavigate('contact')}
      />

    </div>
  );
};
