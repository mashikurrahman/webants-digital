import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Globe, 
  Terminal, 
  Layers, 
  ExternalLink, 
  Check, 
  Server, 
  Lock, 
  Gauge
} from 'lucide-react';
import { siteContent } from '../data/siteContent';
import { TechnologyDeploymentCta } from '../components/cta/TechnologyDeploymentCta';

interface TechnologyPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const TechnologyPage: React.FC<TechnologyPageProps> = ({ onNavigate }) => {
  const techData = siteContent.serviceLines.find(s => s.id === 'technology')!;
  const [activeStackTab, setActiveStackTab] = useState<string>('nextjs');

  const stackArchitectures: Record<string, {
    title: string;
    badge: string;
    speed: string;
    headline: string;
    description: string;
    layers: string[];
    features: string[];
    codePreview: string;
  }> = {
    'nextjs': {
      title: 'Next.js 15 & React 19 Headless',
      badge: 'Sub-Second Edge Rendering',
      speed: '0.4s FCP',
      headline: 'Blazing-fast web applications with server-side rendering, ISR, and dynamic edge caching.',
      description: 'Ideal for custom SaaS dashboards, high-volume directory platforms, and content-rich platforms requiring instant page loads and maximum SEO indexing.',
      layers: [
        'Client Tier: React 19 + Framer Motion UI',
        'Serving Tier: Next.js App Router on Vercel Edge CDN',
        'Data Tier: Server Actions + Supabase / PostgreSQL',
        'Security Tier: Signed JWT Sessions + CSP Headers'
      ],
      features: ['100/100 Google Lighthouse Speed', 'Dynamic OG Social Image Generation', 'Full TypeScript Type Safety', 'Automated GitHub Actions CI/CD'],
      codePreview: `// Next.js App Router Server Component
export async function generateMetadata({ params }) {
  const project = await getProject(params.slug);
  return { title: project.title, openGraph: { images: [project.ogImage] } };
}

export default async function Page({ params }) {
  const data = await fetchEdgeData(params.slug, { next: { revalidate: 60 } });
  return <InteractiveView data={data} />;
}`
    },
    'shopify': {
      title: 'Shopify Plus & Custom Liquid',
      badge: 'High-Converting Commerce',
      speed: '$10M+ Scalable',
      headline: 'Bespoke storefronts engineered to maximize Average Order Value and checkout completion.',
      description: 'Custom theme architecture built from scratch without bloated app plugins. Fast cart drawer drawers, variant selectors, and custom bundle builders.',
      layers: [
        'Storefront Tier: Custom Liquid + Alpine.js / React',
        'Commerce Engine: Shopify Plus Storefront API',
        'Checkout Tier: Custom Shopify Functions & Upsells',
        'Operations Tier: Klaviyo + ERP + 3PL Inventory Sync'
      ],
      features: ['Zero App-Bloat Codebase', 'Slide-Out AJAX Cart with Tiered Free Shipping', 'Instant Variant Switching', 'Mobile-First One-Thumb UX'],
      codePreview: `<!-- High-Performance Theme Section -->
{% render 'product-variant-picker', product: product %}
<div class="cart-drawer-trigger" data-ajax-cart>
  <button class="btn-primary" onclick="window.CartDrawer.add('{{ product.id }}')">
    Add to Bag — {{ product.price | money }}
  </button>
</div>`
    },
    'webflow': {
      title: 'Webflow Enterprise & Custom Code',
      badge: 'Visual Speed + Code Precision',
      speed: '3-Day Turnaround',
      headline: 'Pixel-perfect marketing sites that non-technical marketing teams can manage effortlessly.',
      description: 'Clean semantic HTML5 structure, custom GSAP micro-animations, structured CMS collections, and high-converting lead generation capture.',
      layers: [
        'Interface Tier: Webflow Designer + Custom CSS/JS',
        'CMS Tier: Multi-Collection Dynamic CMS',
        'Integration Tier: Zapier / Make / Webhooks to CRM',
        'Hosting Tier: AWS CloudFront Multi-Region CDN'
      ],
      features: ['Client-First Style System (Relume)', 'Custom GSAP Scroll Animations', 'Automated Lead Routing to CRM', '100% Responsive on All Breakpoints'],
      codePreview: `// Custom GSAP Scroll Trigger integration in Webflow
gsap.registerPlugin(ScrollTrigger);
gsap.from(".bento-card", {
  scrollTrigger: { trigger: ".bento-grid", start: "top 80%" },
  y: 40, opacity: 0, stagger: 0.1, duration: 0.8
});`
    },
    'wordpress': {
      title: 'Headless WordPress & Custom Blocks',
      badge: 'Enterprise Editorial CMS',
      speed: 'Hardened Security',
      headline: 'Custom Gutenberg blocks and headless GraphQL APIs for large publication libraries.',
      description: 'Custom block themes built without visual page builder bloat (no Elementor). Fast, scalable, secure, and compliant with enterprise security audits.',
      layers: [
        'Editing Tier: Custom Gutenberg React Blocks',
        'API Tier: WP GraphQL / REST Endpoint',
        'Frontend Tier: Next.js or Native PHP 8.3 FPM',
        'Security Tier: Cloudflare WAF + Redis Object Cache'
      ],
      features: ['Zero Bloat Custom Block Theme', 'Redis Object Cache Integration', 'Automated Daily Cloud Backups', 'Strict Content Security Policy (CSP)'],
      codePreview: `<?php
// Custom Gutenberg Block Server Registration
register_block_type( 'webants/hero-matrix', array(
    'render_callback' => 'render_webants_hero_matrix',
    'attributes' => array( 'title' => array('type' => 'string') )
) );`
    }
  };

  const activeStack = stackArchitectures[activeStackTab] || stackArchitectures['nextjs'];

  return (
    <div className="bg-white text-slate-900 min-h-screen selection:bg-[#5B61FE] selection:text-white">
      
      {/* ─── 1. HIGH-IMPACT ARCHITECTURE CONSOLE HERO ─── */}
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
                <Code2 className="w-3.5 h-3.5" />
                <span>Web & Software Engineering Studio</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.03]"
              >
                Digital engines built for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B61FE] via-[#7C3AED] to-[#5B61FE]">
                  extreme performance.
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg text-slate-600 font-medium max-w-xl leading-relaxed"
              >
                Custom Next.js applications, headless Shopify storefronts, enterprise Webflow builds, and hardened WordPress systems. Zero bloat. Sub-second speed.
              </motion.p>

              {/* Framework Quick Switches in Hero */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="flex flex-wrap gap-2 pt-2"
              >
                {Object.keys(stackArchitectures).map((key) => {
                  const isSelected = activeStackTab === key;
                  const item = stackArchitectures[key];

                  return (
                    <button
                      key={key}
                      onClick={() => setActiveStackTab(key)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#5B61FE] text-white shadow-md shadow-indigo-500/20 scale-[1.02]'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{item.title.split('&')[0]}</span>
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
                  onClick={() => onNavigate('work')}
                  className="px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-xs sm:text-sm border border-slate-200 shadow-xs transition-colors cursor-pointer"
                >
                  <span>View Code Architecture &rarr;</span>
                </button>
              </motion.div>
            </div>

            {/* Right: Interactive Terminal & Lighthouse 100 Cockpit (5 Cols) */}
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
                      Lighthouse 100/100 Bar
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-white/10 px-2 py-0.5 rounded-md border border-white/10">
                    ⚡ {activeStack.speed}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeStackTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div>
                      <div className="text-xs uppercase font-mono text-cyan-400 font-bold">
                        {activeStack.badge}
                      </div>
                      <h3 className="text-2xl font-black text-white mt-0.5">
                        {activeStack.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                      {activeStack.headline}
                    </p>

                    {/* Quality Badges */}
                    <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/10">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400">Core Web Vitals</div>
                        <div className="text-2xl font-black font-mono text-emerald-400 mt-0.5">
                          100 / 100
                        </div>
                        <div className="text-[10px] text-slate-400">Google Verified</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400">Layout Shift (CLS)</div>
                        <div className="text-2xl font-black font-mono text-cyan-300 mt-0.5">
                          0.00
                        </div>
                        <div className="text-[10px] text-slate-400">Zero Jitter</div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-[10px] font-mono text-slate-400 font-bold uppercase">Architecture Layers:</div>
                      <div className="space-y-1">
                        {activeStack.layers.slice(0, 2).map((layer, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs font-mono text-slate-200">
                            <span className="text-[#5B61FE] font-bold">L{idx + 1}:</span>
                            <span>{layer}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigate('contact')}
                      className="w-full py-3 rounded-xl bg-[#5B61FE] hover:bg-[#4F46E5] text-white font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-indigo-500/20"
                    >
                      <span>Build with {activeStack.title.split('&')[0]}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                </AnimatePresence>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── 2. INTERACTIVE TECH STACK TERMINAL & ARCHITECTURE EXPLORER ─── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5B61FE]">
            Architecture Blueprint
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Choose your engine architecture.
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            Inspect our production tech stacks, layer boundaries, and code execution standards.
          </p>
        </div>

        {/* Stack Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          {Object.keys(stackArchitectures).map((key) => {
            const item = stackArchitectures[key];
            const isSelected = activeStackTab === key;

            return (
              <button
                key={key}
                onClick={() => setActiveStackTab(key)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#5B61FE] text-white font-extrabold shadow-sm scale-[1.02]'
                    : 'bg-[#F8FAFC] text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {item.title.split('&')[0]}
              </button>
            );
          })}
        </div>

        {/* Active Architecture Viewer */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStackTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="bg-[#0B1120] text-white rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 text-left"
          >
            {/* Left Info & Layers (6 Cols) */}
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-white/10 text-cyan-300 border border-white/10">
                    {activeStack.badge}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    ⚡ {activeStack.speed}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {activeStack.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                  {activeStack.description}
                </p>

                {/* Architecture Layers */}
                <div className="space-y-2 pt-2">
                  <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400">
                    System Architecture Layers:
                  </div>
                  {activeStack.layers.map((layer, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-200 flex items-center gap-2">
                      <span className="text-[#5B61FE] font-bold">L{idx + 1}:</span>
                      <span>{layer}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-6 py-3 rounded-xl bg-[#5B61FE] hover:bg-[#4F46E5] text-white font-bold text-xs shadow-md shadow-indigo-500/25 transition-all cursor-pointer"
                >
                  Build with {activeStack.title.split('&')[0]}
                </button>
              </div>
            </div>

            {/* Right Interactive Code Terminal (6 Cols) */}
            <div className="lg:col-span-6 rounded-2xl bg-black/60 border border-white/10 overflow-hidden flex flex-col shadow-inner">
              <div className="px-4 py-3 bg-slate-900/80 border-b border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-slate-300 font-sans text-xs">production-spec.tsx</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">TYPESCRIPT • STRICT</span>
              </div>
              <div className="p-4 sm:p-6 overflow-x-auto flex-1 font-mono text-xs text-slate-200 leading-relaxed">
                <pre>{activeStack.codePreview}</pre>
              </div>
              <div className="p-3 bg-slate-950/80 border-t border-white/10 flex flex-wrap gap-2 text-[10px] text-slate-400 font-mono">
                {activeStack.features.map(f => (
                  <span key={f} className="px-2 py-0.5 rounded bg-white/10 text-cyan-300">
                    ✓ {f}
                  </span>
                ))}
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </section>

      {/* ─── 3. SIX NON-NEGOTIABLE ENGINEERING QUALITY BARS ─── */}
      <section className="py-20 bg-[#F8FAFC] border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5B61FE]">
              Quality Assurance
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Six engineering quality bars.
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              Every pull request must clear strict automated tests, accessibility audits, and security checks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-[#5B61FE] flex items-center justify-center font-mono font-black text-sm">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">Zero Layout Shift (CLS &lt; 0.01)</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Explicit aspect ratio reservations on all media. The page never jumps under the user as fonts and images load.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-[#5B61FE] flex items-center justify-center font-mono font-black text-sm">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900">Server-Authoritative Pricing</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Never trust client totals or inventory counts. Everything is verified against server database constraints.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-[#5B61FE] flex items-center justify-center font-mono font-black text-sm">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">Sub-Second Edge Caching</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Multi-region Vercel / Cloudflare edge network delivery ensuring sub-300ms time to first byte worldwide.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-[#5B61FE] flex items-center justify-center font-mono font-black text-sm">
                04
              </div>
              <h3 className="text-base font-bold text-slate-900">WCAG 2.1 AA Accessibility</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Keyboard navigable, screen-reader labeled forms, high color contrast, and respect for prefers-reduced-motion.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-[#5B61FE] flex items-center justify-center font-mono font-black text-sm">
                05
              </div>
              <h3 className="text-base font-bold text-slate-900">End-to-End TypeScript Strict</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                No `any` types. Strongly typed API schemas, zod runtime validations, and strict prop contract validation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-[#5B61FE] flex items-center justify-center font-mono font-black text-sm">
                06
              </div>
              <h3 className="text-base font-bold text-slate-900">Automated GitHub CI/CD</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Every commit runs automated lint, build verification, preview deployments, and instant rollback safeties.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ─── 3.5. VISUAL ENGINEERING LAB IN ACTION ─── */}
      <section className="py-20 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#5B61FE]/20 bg-indigo-50/80 text-[#5B61FE] text-xs font-bold uppercase tracking-widest shadow-2xs">
              <Code2 className="w-3.5 h-3.5" />
              <span>Production Environments</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Edge runtimes, headless APIs & sub-second builds.
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              Take a look inside our senior engineering architecture: CI/CD deployment pipelines, zero-layout-shift frontends, and serverless edge caching.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Visual Card 1 */}
            <div className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-200 shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" 
                alt="Next.js App Router Engineering"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-left text-white space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-cyan-300 bg-white/10 px-2 py-0.5 rounded border border-white/15">
                  Edge SSR
                </span>
                <h4 className="text-base font-bold text-white">Full-Stack React 19 & Next.js 15</h4>
                <p className="text-xs text-slate-300 font-medium">Sub-300ms Time-To-First-Byte global CDN deployment.</p>
              </div>
            </div>

            {/* Visual Card 2 */}
            <div className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-200 shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80" 
                alt="TypeScript AST & Clean Architecture"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-left text-white space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-[#5B61FE] bg-white/10 px-2 py-0.5 rounded border border-white/15">
                  Strict TypeScript
                </span>
                <h4 className="text-base font-bold text-white">Zero Technical Debt Guarantee</h4>
                <p className="text-xs text-slate-300 font-medium">Automated ESLint, Prettier, and Vitest suite on every PR.</p>
              </div>
            </div>

            {/* Visual Card 3 */}
            <div className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-200 shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80" 
                alt="Shopify Custom Checkout & APIs"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-left text-white space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 bg-white/10 px-2 py-0.5 rounded border border-white/15">
                  Headless Commerce
                </span>
                <h4 className="text-base font-bold text-white">Shopify Plus Custom Liquid Engines</h4>
                <p className="text-xs text-slate-300 font-medium">AJAX slideout carts, high-conversion checkout upsells.</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─── 4. TRANSPARENT ENGINEERING PACKAGES ─── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5B61FE]">
            Development Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Fixed builds & development retainers.
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            Clear project milestones or continuous engineering support on demand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
          
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-700">
                Fixed Project Scope
              </span>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Business Web Platform</h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  Custom 8-page responsive corporate build in Next.js, Webflow, or custom WordPress block theme.
                </p>
              </div>

              <div className="text-3xl font-black text-slate-900 font-mono">
                $4,500 <span className="text-xs text-slate-500 font-normal font-sans">fixed</span>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span>Custom responsive design system & components</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span>100/100 Core Web Vitals performance tuning</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span>Integrated CMS with full staff video training</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span>SEO foundations, meta tags, and schema markup</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="w-full py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-extrabold text-xs transition-colors cursor-pointer text-center"
            >
              Build Business Website &rarr;
            </button>
          </div>

          <div className="bg-gradient-to-b from-[#F5F7FF] via-white to-[#F5F7FF] rounded-3xl p-8 border-2 border-[#5B61FE] shadow-xl shadow-indigo-600/5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#5B61FE] text-white">
                  Recommended
                </span>
                <span className="text-xs font-bold text-[#5B61FE]">Headless E-Commerce</span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900">Shopify Storefront Engine</h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  Custom Shopify storefront with AJAX slide-out cart, upsell workflows, and checkout optimization.
                </p>
              </div>

              <div className="text-3xl font-black text-slate-900 font-mono">
                $5,500 <span className="text-xs text-slate-500 font-normal font-sans">fixed</span>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span>Zero-app bloat custom Liquid/React theme</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span>One-click checkout & post-purchase upsell funnel</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span>Payment gateways, currency switcher, & tax setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B61FE] shrink-0" />
                  <span>Speed-tested for maximum mobile conversion</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="w-full py-3.5 rounded-xl bg-[#5B61FE] hover:bg-[#4F46E5] text-white font-extrabold text-xs shadow-lg shadow-indigo-500/25 transition-all cursor-pointer text-center"
            >
              Build Shopify Storefront &rarr;
            </button>
          </div>

        </div>

      </section>

      {/* ─── 5. DYNAMIC INTERACTIVE TECHNOLOGY DEPLOYMENT ENGINE CTA ─── */}
      <TechnologyDeploymentCta 
        onStartTrial={() => onNavigate('free-trial')}
        onExploreTech={() => onNavigate('work')}
      />

    </div>
  );
};
