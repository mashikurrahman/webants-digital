import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { siteContent, CaseStudy } from '../data/siteContent';

/* ───────────────────────────────────────────────────────────────────────────
   TECH LOGO MAPPING
   CDN-hosted SVG logos from devicon / simple-icons via cdn.jsdelivr.net
   ─────────────────────────────────────────────────────────────────────────── */
const TECH_LOGOS: Record<string, { src: string; label: string }> = {
  'React':           { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', label: 'React' },
  'Next.js':         { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', label: 'Next.js' },
  'Vite':            { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg', label: 'Vite' },
  'Vercel':          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg', label: 'Vercel' },
  'GSAP':            { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', label: 'GSAP' },
  'Material UI':     { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg', label: 'MUI' },
  'Chart.js':        { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', label: 'Chart.js' },
  'React Router':    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/reactrouter/reactrouter-original.svg', label: 'Router' },
  'Lenis':           { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', label: 'Lenis' },
  'Redux':           { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg', label: 'Redux' },
  'Recharts':        { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', label: 'Recharts' },
  'Mapbox':          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', label: 'Mapbox' },
  'Framer Motion':   { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg', label: 'Motion' },
  'Tailwind-style utility CSS': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', label: 'Tailwind' },
  'Turbopack':       { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', label: 'Turbopack' },
  'Lucide':          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', label: 'Lucide' },
  'Browser storage': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/chrome/chrome-original.svg', label: 'Storage' },
};

/* ─────────────────────────────────────────────────────────────────────────── */

interface ProjectsBentoGridProps {
  onNavigate: (page: string, param?: string) => void;
}

export const ProjectsBentoGrid: React.FC<ProjectsBentoGridProps> = ({ onNavigate }) => {
  const projects = siteContent.caseStudies.slice(0, 6);

  return (
    <section className="text-slate-900 relative overflow-hidden select-none">
      
      {/* Ambient orbs */}
      <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(91,97,254,0.06) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)' }} />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#5B61FE]/25 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5B61FE]">
            Selected Work
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Projects that speak for themselves.
          </h2>
          <p className="text-sm text-slate-600 font-medium leading-relaxed">
            Six flagship builds across e-commerce, AI, athlete branding, and high-load web architectures.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-0 sm:px-0 lg:px-0">

        {/* ── BENTO GRID ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-1 auto-rows-[280px]">
          
          {/* 01 — White Lighting: 7 cols */}
          <BentoCard
            project={projects[0]}
            onNavigate={onNavigate}
            className="lg:col-span-7"
            accentFrom="#C8A44D" accentTo="#A67C30"
          />
          
          {/* 02 — NEXUS Workspace: 5 cols, dark */}
          <BentoCard
            project={projects[1]}
            onNavigate={onNavigate}
            className="lg:col-span-5"
            dark
            accentFrom="#06B6D4" accentTo="#0891B2"
          />

          {/* 03 — Zack Kaseler: 4 cols */}
          <BentoCard
            project={projects[2]}
            onNavigate={onNavigate}
            className="lg:col-span-4"
            accentFrom="#FF5A1F" accentTo="#EA580C"
          />

          {/* 04 — Luma Travel: 4 cols */}
          <BentoCard
            project={projects[3]}
            onNavigate={onNavigate}
            className="lg:col-span-4"
            accentFrom="#7C5CFC" accentTo="#6D28D9"
          />

          {/* 05 — Cool Breeze Cars: 4 cols */}
          <BentoCard
            project={projects[4]}
            onNavigate={onNavigate}
            className="lg:col-span-4"
            accentFrom="#3B82F6" accentTo="#2563EB"
          />

          {/* 06 — Motorsport: 12 cols, dark */}
          <BentoCard
            project={projects[5]}
            onNavigate={onNavigate}
            className="lg:col-span-12 auto-rows-auto"
            dark
            accentFrom="#EF4444" accentTo="#DC2626"
            wide
          />

        </div>
      </div>
    </section>
  );
};


/* ─────────────────────────────────────────────────────────────────────────────
   UNIVERSAL BENTO CARD
   Visual-first: full-bleed image, category badge & tech logos.
   On hover: overlay slides up with title, summary & action buttons.
   ───────────────────────────────────────────────────────────────────────────── */

interface BentoCardProps {
  project: CaseStudy;
  onNavigate: (page: string, param?: string) => void;
  className?: string;
  dark?: boolean;
  accentFrom: string;
  accentTo: string;
  wide?: boolean;
}

const BentoCard: React.FC<BentoCardProps> = ({
  project, onNavigate, className = '', dark = false, accentFrom, accentTo, wide = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  // Gather tech logos for this project
  const techLogos = (project.stack || [])
    .filter(s => TECH_LOGOS[s.name])
    .slice(0, wide ? 6 : 4)
    .map(s => TECH_LOGOS[s.name]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45 }}
      onClick={() => onNavigate('project-detail', project.id)}
      className={`
        group relative rounded-xl overflow-hidden cursor-pointer
        transition-all duration-300
        ${dark
          ? 'bg-slate-950'
          : 'bg-white'
        }
        ${className}
      `}
    >
      {/* ── Mouse-following Spotlight ──────────────────────────────────── */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(480px circle at ${mousePos.x}px ${mousePos.y}px, ${accentFrom}22, transparent 45%)`,
        }}
      />

      {/* ── Full-Bleed Image ──────────────────────────────────────────── */}
      {project.image && (
        <div className="absolute inset-0">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          {/* Constant bottom gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5" />
        </div>
      )}

      {/* ── Always-Visible Layer: Category Badge + Tech Logos ─────────── */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-5 sm:p-6">
        
        {/* Top Row: Badge + External Link */}
        <div className="flex items-start justify-between">
          <span
            className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md border shadow-sm"
            style={{
              background: `${accentFrom}20`,
              borderColor: `${accentFrom}40`,
              color: dark ? `${accentFrom}` : '#fff',
            }}
          >
            {project.number ? `${project.number} • ` : ''}{project.category}
          </span>

          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-8 h-8 rounded-xl bg-white/15 backdrop-blur-md text-white hover:bg-white/30 flex items-center justify-center transition-colors border border-white/10"
                title="Open Live"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <div
              className="w-8 h-8 rounded-xl text-white flex items-center justify-center transition-all duration-300 backdrop-blur-md border border-white/10"
              style={{ background: isHovered ? accentFrom : 'rgba(255,255,255,0.15)' }}
            >
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>

        {/* Bottom Row: Client name + Tech Logos (always visible) */}
        <div className="space-y-3">

          {/* Tech Stack Logos */}
          {techLogos.length > 0 && (
            <div className="flex items-center gap-2">
              {techLogos.map((logo, idx) => (
                <div
                  key={idx}
                  className="w-7 h-7 rounded-lg bg-white/15 backdrop-blur-md border border-white/10 flex items-center justify-center p-1 transition-transform duration-300 group-hover:scale-110"
                  title={logo.label}
                >
                  <img src={logo.src} alt={logo.label} className="w-full h-full object-contain" />
                </div>
              ))}
            </div>
          )}

          {/* Client Name & Title (minimal) */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-white/70">{project.client}</p>
            <h3 className="text-lg sm:text-xl font-extrabold text-white leading-tight mt-0.5 line-clamp-1">{project.title}</h3>
          </div>
        </div>
      </div>

      {/* ── Hover Overlay: Details slide up ───────────────────────────── */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute inset-0 z-30 flex flex-col justify-end p-5 sm:p-6"
            style={{
              background: `linear-gradient(to top, ${dark ? 'rgba(2,6,23,0.95)' : 'rgba(0,0,0,0.88)'} 0%, ${dark ? 'rgba(2,6,23,0.7)' : 'rgba(0,0,0,0.55)'} 50%, transparent 100%)`,
            }}
          >
            {/* ── Hover Content ── */}
            <div className="space-y-3">
              
              {/* Industry Tag */}
              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: accentFrom }}>
                {project.industry}
              </span>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {project.title}
              </h3>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed line-clamp-2 font-medium">
                {project.summary}
              </p>

              {/* Tech Stack Logos (larger on hover) */}
              {techLogos.length > 0 && (
                <div className="flex items-center gap-2.5 pt-1">
                  {techLogos.map((logo, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.04 }}
                      className="group/logo relative"
                    >
                      <div className="w-8 h-8 rounded-xl bg-white/15 backdrop-blur-md border border-white/15 flex items-center justify-center p-1.5 hover:bg-white/25 transition-colors">
                        <img src={logo.src} alt={logo.label} className="w-full h-full object-contain" />
                      </div>
                      {/* Tooltip */}
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-black/80 text-white text-[9px] font-bold whitespace-nowrap opacity-0 group-hover/logo:opacity-100 transition-opacity pointer-events-none">
                        {logo.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={(e) => { e.stopPropagation(); onNavigate('project-detail', project.id); }}
                  className="px-4 py-2 rounded-xl text-white text-xs font-bold transition-all hover:scale-[1.04] active:scale-[0.97] shadow-md"
                  style={{ background: `linear-gradient(135deg, ${accentFrom}, ${accentTo})` }}
                >
                  View Case Study →
                </button>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="px-4 py-2 rounded-xl bg-white/15 backdrop-blur-md text-white text-xs font-bold hover:bg-white/25 transition-colors border border-white/15 inline-flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Live Demo
                  </a>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
