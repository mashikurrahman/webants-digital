"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import {
  TrendingUp,
  Palette,
  Code2,
  Bot,
  Layers,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  ExternalLink,
  X,
  Eye,
  Play,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { scrollToY } from "@/src/lib/smoothScroll";
import { softGlow } from "@/src/lib/evidence";

export interface ServiceSpec {
  label: string;
  value: string;
}

export interface ServiceCardData {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  accentColor: string;
  accentLight: string;
  accentBorder: string;
  badgeBg: string;
  badgeText: string;
  icon: React.ComponentType<{ className?: string }>;
  specs: ServiceSpec[];
  deliverables: string[];
  tools: string[];
  route: string;
}

export const SERVICES_STACK: ServiceCardData[] = [
  {
    id: "growth",
    number: "01",
    title: "Growth & Leads",
    subtitle: "SEO & High-Intent Paid Ads",
    description: "Customer acquisition engines that generate qualified inbound leads, lower your CAC, and maximize conversions across Google and Meta.",
    accentColor: "#5B61FE",
    accentLight: "#EEF2FF",
    accentBorder: "#C7D2FE",
    badgeBg: "bg-[#EEF2FF] text-[#5B61FE] border-indigo-200",
    badgeText: "Lead Gen Engine",
    icon: TrendingUp,
    specs: [
      { label: "Lift", value: "+32% Avg" },
      { label: "Channel", value: "Google/Meta" },
      { label: "SLA", value: "Weekly Reports" },
      { label: "Focus", value: "Inbound Leads" },
    ],
    deliverables: [
      "Technical SEO & Content Hubs",
      "Google Search & PMax Ads",
      "Meta Video & Creative Funnels",
      "Landing Page CRO & Tracking"
    ],
    tools: ["Google Ads", "Meta Ads", "GA4", "Semrush"],
    route: "growth",
  },
  {
    id: "creative",
    number: "02",
    title: "Creative Studio",
    subtitle: "Brand Identity & Performance Video",
    description: "Distinctive brand identities, high-converting social video ads, motion graphics, and UI/UX product designs produced on a predictable model.",
    accentColor: "#D97706",
    accentLight: "#FFFBEB",
    accentBorder: "#FDE68A",
    badgeBg: "bg-[#FEF3C7] text-[#D97706] border-amber-200",
    badgeText: "Creative Studio",
    icon: Palette,
    specs: [
      { label: "Delivery", value: "48h Turnaround" },
      { label: "Quality", value: "4K / High-Res" },
      { label: "Design", value: "Figma Systems" },
      { label: "Revisions", value: "Unlimited" },
    ],
    deliverables: [
      "Brand Identity & Guidelines",
      "Performance TikTok & Reels Video",
      "Figma UI/UX Systems & Prototypes",
      "Marketing Collateral & Decks"
    ],
    tools: ["Figma", "Premiere", "After Effects", "Blender"],
    route: "creative",
  },
  {
    id: "technology",
    number: "03",
    title: "Technology",
    subtitle: "Web Platforms & Shopify Plus",
    description: "Lightning-fast, secure, and scalable web solutions built on React, Next.js, and Shopify Plus, designed to convert traffic with sub-second speeds.",
    accentColor: "#7C3AED",
    accentLight: "#F5F3FF",
    accentBorder: "#DDD6FE",
    badgeBg: "bg-[#EDE9FE] text-[#7C3AED] border-purple-200",
    badgeText: "Modern Stack",
    icon: Code2,
    specs: [
      { label: "Stack", value: "Next.js / React" },
      { label: "E-Com", value: "Shopify Plus" },
      { label: "Uptime", value: "99.9% Live" },
      { label: "Speed", value: "< 1s Load Time" },
    ],
    deliverables: [
      "Next.js & React Web Apps",
      "Shopify Plus E-Commerce Stores",
      "Headless CMS & API Integrations",
      "Client Dashboards & Portals"
    ],
    tools: ["Next.js", "React", "TypeScript", "Shopify"],
    route: "technology",
  },
  {
    id: "ai-automation",
    number: "04",
    title: "AI & Automation",
    subtitle: "AI Assistants & CRM Pipelines",
    description: "Eliminate repetitive manual tasks with 24/7 AI chatbots, intelligent lead routing pipelines, and seamless CRM integrations across your tool stack.",
    accentColor: "#0284C7",
    accentLight: "#F0F9FF",
    accentBorder: "#BAE6FD",
    badgeBg: "bg-[#E0F2FE] text-[#0284C7] border-sky-200",
    badgeText: "AI Automation",
    icon: Bot,
    specs: [
      { label: "Response", value: "< 2 min Routing" },
      { label: "CRM", value: "HubSpot / GHL" },
      { label: "Assistants", value: "24/7 Live AI" },
      { label: "Logic", value: "Multi-App Sync" },
    ],
    deliverables: [
      "24/7 AI Customer Support Chatbots",
      "Automated CRM Pipelines & Routing",
      "Make.com & Zapier Workflows",
      "Instant SMS & Email Sequences"
    ],
    tools: ["OpenAI", "Make.com", "Zapier", "HubSpot"],
    route: "ai-automation",
  },
  {
    id: "digital-operations",
    number: "05",
    title: "Digital Operations",
    subtitle: "Social Publishing & Content Upkeep",
    description: "Keep your digital presence consistently active and engaging with daily multi-platform social media publishing, content calendars, and catalog upkeep.",
    accentColor: "#16A34A",
    accentLight: "#F0FDF4",
    accentBorder: "#BBF7D0",
    badgeBg: "bg-[#DCFCE7] text-[#16A34A] border-emerald-200",
    badgeText: "Daily Execution",
    icon: Layers,
    specs: [
      { label: "Cadence", value: "Daily Publishing" },
      { label: "Channels", value: "Omni-Platform" },
      { label: "SLA", value: "100% On-Time" },
      { label: "Audits", value: "Monthly Review" },
    ],
    deliverables: [
      "Multi-Platform Social Calendars",
      "Community & DM Response Ops",
      "Email Newsletter Campaigns",
      "E-Commerce Catalog Maintenance"
    ],
    tools: ["Buffer", "Hootsuite", "Klaviyo", "Notion"],
    route: "digital-operations",
  },
];

const N = SERVICES_STACK.length;
const SERIF = '"Instrument Serif", serif';

// Scroll-progress window (of the tall track) mapped to department position 0..N-1.
// The small head/tail margins let the first and last departments *dwell* on stage
// instead of only flashing at the very start/end of the scroll.
const P_START = 0.05;
const P_END = 0.9;

// ─────────────────────────────────────────────────────────────────────────────
// Department artifacts
//
// Each department shows the thing it actually ships, drawn in code: an accent-lit
// aurora over the brand's deep navy, hosting a glass panel with a mock deliverable.
// No stock photography and no network requests — the five read as one commissioned set.
// ─────────────────────────────────────────────────────────────────────────────

// Fine film grain, so the gradients read as a photographed surface rather than flat CSS.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23g)'/%3E%3C/svg%3E\")";

// The one number each department is judged on, floated off the frame's corner.
const PROOF: Record<string, { value: string; label: string }> = {
  growth: { value: "−38%", label: "Cost per lead" },
  creative: { value: "48h", label: "Asset turnaround" },
  technology: { value: "0.8s", label: "Largest paint" },
  "ai-automation": { value: "24/7", label: "Cover, no queue" },
  "digital-operations": { value: "100%", label: "Published on time" },
};

interface MockProps {
  accent: string;
  uid: string;
}

/** Growth — the acquisition dashboard the client logs into. */
const GrowthMock: React.FC<MockProps> = ({ accent, uid }) => (
  <div className="h-full flex flex-col">
    <div className="flex items-baseline justify-between">
      <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/45">
        Qualified pipeline
      </span>
      <span className="text-[10px] font-extrabold" style={{ color: accent }}>
        +32%
      </span>
    </div>
    <span className="mt-0.5 text-xl font-black text-white tabular-nums leading-none">$1.28M</span>

    <div className="relative flex-1 min-h-0 mt-2">
      <svg viewBox="0 0 200 68" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id={`fill-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.5" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 56 L28 49 L56 53 L84 37 L112 29 L140 32 L168 15 L200 6 L200 68 L0 68 Z"
          fill={`url(#fill-${uid})`}
        />
        <path
          d="M0 56 L28 49 L56 53 L84 37 L112 29 L140 32 L168 15 L200 6"
          fill="none"
          stroke={accent}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>

    <div className="grid grid-cols-3 gap-1.5 mt-2">
      {[
        { k: "MQLs", v: "1,284" },
        { k: "CPL", v: "$18" },
        { k: "ROAS", v: "4.7x" },
      ].map((m) => (
        <div key={m.k} className="rounded-lg bg-white/[0.06] border border-white/10 px-2 py-1.5">
          <span className="block text-[11px] font-extrabold text-white tabular-nums leading-none">
            {m.v}
          </span>
          <span className="block text-[8px] font-bold uppercase tracking-wider text-white/40 mt-1">
            {m.k}
          </span>
        </div>
      ))}
    </div>
  </div>
);

/** Creative — the brand board and the video cut, side by side. */
const CreativeMock: React.FC<MockProps> = ({ accent }) => (
  <div className="h-full flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/45">
        Brand system v2
      </span>
      <span className="text-[9px] font-bold text-white/35">Figma</span>
    </div>

    <div className="grid grid-cols-[1.1fr_1fr] gap-2 flex-1 min-h-0">
      <div className="rounded-xl border border-white/10 bg-white/[0.06] flex flex-col items-center justify-center">
        <span className="text-[2.4rem] font-black text-white leading-none tracking-tight">Aa</span>
        <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-white/35 mt-1">
          Outfit / Jakarta
        </span>
      </div>
      <div
        className="relative rounded-xl border border-white/10 overflow-hidden"
        style={{ background: `linear-gradient(145deg, ${accent}, ${accent}44)` }}
      >
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-8 h-8 rounded-full bg-white/95 flex items-center justify-center shadow-lg">
            <Play className="w-3 h-3 text-slate-900 translate-x-[1px]" />
          </span>
        </span>
        <span className="absolute bottom-1.5 left-2 font-mono text-[8px] font-bold text-white/85">
          0:15 · 4K
        </span>
      </div>
    </div>

    <div className="flex gap-1.5">
      {[accent, `${accent}99`, "#F8FAFC", "#94A3B8", "#0B1120"].map((c, i) => (
        <span
          key={i}
          className="h-5 flex-1 rounded-md border border-white/15"
          style={{ backgroundColor: c }}
        />
      ))}
    </div>
  </div>
);

/** Technology — the shipped storefront, in a browser chrome. */
const TechnologyMock: React.FC<MockProps> = ({ accent }) => (
  <div className="h-full flex flex-col gap-2">
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />
      ))}
      <span className="ml-1 flex-1 h-4 rounded-full bg-white/[0.08] border border-white/10 flex items-center px-2">
        <span className="font-mono text-[8px] text-white/40">yourbrand.com</span>
      </span>
    </div>

    <div className="flex-1 min-h-0 rounded-xl border border-white/10 bg-white/[0.05] p-2 flex flex-col gap-1.5">
      <div
        className="h-7 rounded-lg shrink-0 flex items-center justify-between px-2"
        style={{ background: `linear-gradient(90deg, ${accent}cc, ${accent}22)` }}
      >
        <span className="flex flex-col gap-1">
          <span className="block h-1 w-14 rounded-full bg-white/70" />
          <span className="block h-1 w-9 rounded-full bg-white/35" />
        </span>
        <span className="h-3 w-9 rounded-full bg-white/85" />
      </div>
      <div className="grid grid-cols-3 gap-1.5 flex-1 min-h-0">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-lg bg-white/[0.09] border border-white/10 p-1.5 flex flex-col gap-1"
          >
            <span
              className="block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: accent }}
            />
            <span className="block h-1 w-full rounded-full bg-white/30" />
            <span className="block h-1 w-2/3 rounded-full bg-white/15" />
          </div>
        ))}
      </div>
    </div>

    <div className="flex items-center gap-1.5">
      <span
        className="px-1.5 py-0.5 rounded-md text-[9px] font-extrabold text-white tabular-nums"
        style={{ backgroundColor: accent }}
      >
        100
      </span>
      <span className="text-[9px] font-bold text-white/40">Lighthouse · deployed 2m ago</span>
    </div>
  </div>
);

/** AI & Automation — the assistant answering, and where the lead lands. */
const AutomationMock: React.FC<MockProps> = ({ accent }) => (
  <div className="h-full flex flex-col gap-2">
    <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/45">
      Assistant · answering
    </span>

    <div className="flex-1 min-h-0 flex flex-col justify-center gap-1.5">
      <span className="self-start max-w-[80%] rounded-2xl rounded-bl-sm bg-white/[0.09] border border-white/10 px-2.5 py-1.5 text-[10px] font-medium text-white/75">
        Do you service Austin on weekends?
      </span>
      <span
        className="self-end max-w-[80%] rounded-2xl rounded-br-sm px-2.5 py-1.5 text-[10px] font-semibold text-white shadow-lg"
        style={{ backgroundColor: accent }}
      >
        Yes — Sat 8a–6p. Want the 10:30 slot?
      </span>
      <span className="self-start inline-flex items-center gap-1 rounded-full bg-white/[0.07] border border-white/10 px-2 py-1">
        {[0, 1, 2].map((i) => (
          <span key={i} className="w-1 h-1 rounded-full bg-white/40" />
        ))}
      </span>
    </div>

    <div className="flex items-center gap-1">
      {["Lead", "Qualify", "CRM"].map((node, i) => (
        <React.Fragment key={node}>
          {i > 0 && <span className="h-px flex-1" style={{ backgroundColor: `${accent}77` }} />}
          <span className="px-2 py-1 rounded-lg text-[9px] font-bold text-white/70 bg-white/[0.07] border border-white/10">
            {node}
          </span>
        </React.Fragment>
      ))}
    </div>
  </div>
);

/** Digital Operations — three weeks of the calendar, already filled. */
const OperationsMock: React.FC<MockProps> = ({ accent }) => {
  // Which slots are booked — a fixed pattern, so the render is deterministic.
  const booked = new Set([0, 1, 3, 4, 6, 7, 8, 10, 11, 13, 14, 15, 17, 18, 20]);
  return (
    <div className="h-full flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/45">
          Publishing queue
        </span>
        <span className="text-[10px] font-extrabold" style={{ color: accent }}>
          24 scheduled
        </span>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span key={i} className="text-center text-[8px] font-bold text-white/30">
            {d}
          </span>
        ))}
        {Array.from({ length: 21 }, (_, i) => (
          <span
            key={i}
            className="h-3.5 rounded"
            style={
              booked.has(i)
                ? { backgroundColor: i % 4 === 0 ? accent : `${accent}66` }
                : { backgroundColor: "rgba(255,255,255,0.06)" }
            }
          />
        ))}
      </div>

      <div className="mt-auto space-y-1">
        {[
          { t: "09:00", n: "IG Reel · Q3 offer" },
          { t: "14:00", n: "Newsletter · 12.4k list" },
        ].map((row) => (
          <div
            key={row.t}
            className="flex items-center gap-2 rounded-lg bg-white/[0.06] border border-white/10 px-2 py-1"
          >
            <span className="font-mono text-[8px] font-bold text-white/50 tabular-nums">{row.t}</span>
            <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: accent }} />
            <span className="text-[9px] font-semibold text-white/70 truncate">{row.n}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const MOCKS: Record<string, React.FC<MockProps>> = {
  growth: GrowthMock,
  creative: CreativeMock,
  technology: TechnologyMock,
  "ai-automation": AutomationMock,
  "digital-operations": OperationsMock,
};

const DepartmentArtifact: React.FC<{ service: ServiceCardData }> = ({ service }) => {
  const accent = service.accentColor;
  const Mock = MOCKS[service.id] ?? GrowthMock;
  const proof = PROOF[service.id];

  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px]">
      <div
        className="relative aspect-[4/3] rounded-[28px] overflow-hidden ring-1 ring-white/10"
        style={{
          background: `
            radial-gradient(115% 115% at 10% 0%, ${accent}40 0%, transparent 55%),
            radial-gradient(95% 95% at 95% 100%, ${accent}59 0%, transparent 60%),
            linear-gradient(155deg, #0B1120 0%, #111827 48%, #0B1120 100%)`,
          boxShadow: `0 34px 70px -26px ${accent}66, 0 2px 8px rgba(2,6,23,0.28)`,
        }}
      >
        {/* Grain + a soft top sheen, so the surface catches light */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.16] mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: GRAIN }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-24 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.09), transparent)" }}
        />

        {/* Frame chrome */}
        <div className="absolute inset-x-0 top-0 h-9 flex items-center justify-between px-4">
          <span className="font-mono text-[9px] font-bold tracking-[0.15em] text-white/60 uppercase">
            {service.badgeText}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[9px] font-bold tracking-wider text-white/55">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
            LIVE
          </span>
        </div>

        {/* The deliverable */}
        <div className="absolute inset-x-3.5 top-9 bottom-3.5 rounded-2xl bg-white/[0.05] border border-white/10 p-3 overflow-hidden">
          <Mock accent={accent} uid={service.id} />
        </div>
      </div>

      {/* Floating proof metric — hangs off the bottom edge, clear of the panel's content */}
      {proof && (
        <div className="absolute -bottom-6 -left-3 rounded-2xl bg-white border border-slate-200/80 shadow-xl px-3 py-2">
          <span
            className="block text-base font-black leading-none tabular-nums"
            style={{ color: accent }}
          >
            {proof.value}
          </span>
          <span className="block text-[8px] font-bold uppercase tracking-[0.12em] text-slate-400 mt-1">
            {proof.label}
          </span>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Shared department content (used by both the pinned stage and the static stack)
// ─────────────────────────────────────────────────────────────────────────────
interface DepartmentContentProps {
  service: ServiceCardData;
  onNavigate: (page: string) => void;
  onOpenDetail: (service: ServiceCardData) => void;
  interactive?: boolean;
}

const DepartmentContent: React.FC<DepartmentContentProps> = ({
  service,
  onNavigate,
  onOpenDetail,
  interactive = true,
}) => {
  const tab = interactive ? 0 : -1;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 lg:gap-10 items-center">
      {/* ── Left: the brief ── */}
      <div className="text-left space-y-3 lg:space-y-3.5">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "text-[9px] sm:text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border",
              service.badgeBg
            )}
          >
            {service.badgeText}
          </span>
        </div>

        <div>
          <h3 className="text-2xl sm:text-4xl lg:text-[2.6rem] xl:text-[2.9rem] font-black leading-[1.05] tracking-[-0.02em] text-slate-900">
            {service.title}
          </h3>
          <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-500">
            {service.subtitle}
          </p>
        </div>

        <div className="h-px w-full bg-slate-200/80" />

        <p className="text-xs sm:text-[14px] leading-relaxed text-slate-600 font-medium max-w-xl line-clamp-2 sm:line-clamp-none">
          {service.description}
        </p>

        {/* Spec stat tiles */}
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {service.specs.map((spec) => (
            <div
              key={spec.label}
              className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/70 px-2.5 py-1.5 sm:px-3 sm:py-2 shadow-xs"
            >
              <dd className="font-extrabold text-xs sm:text-[13px] text-slate-900 leading-snug">
                {spec.value}
              </dd>
              <dt className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">
                {spec.label}
              </dt>
            </div>
          ))}
        </dl>

        {/* Capabilities */}
        <div className="space-y-1.5">
          <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.15em] text-slate-400 block">
            Core Capabilities
          </span>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {service.deliverables.map((del) => (
              <span
                key={del}
                className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-white/80 border border-slate-200/70 text-slate-700 shadow-2xs"
              >
                <CheckCircle2 className="w-3 h-3 shrink-0" style={{ color: service.accentColor }} />
                {del}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
          <button
            type="button"
            tabIndex={tab}
            onClick={() => onNavigate(service.route)}
            style={{ backgroundColor: service.accentColor }}
            className="group inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-xl text-white font-bold text-xs sm:text-sm shadow-md transition-transform hover:scale-[1.03] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900/40"
          >
            <span>Explore {service.title}</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            type="button"
            tabIndex={tab}
            onClick={() => onOpenDetail(service)}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs sm:text-sm hover:border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900/30 shadow-2xs"
          >
            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: service.accentColor }} />
            <span>Details</span>
          </button>
        </div>
      </div>

      {/* ── Right: the artifact ── */}
      <div className="relative flex items-center justify-center">
        <DepartmentArtifact service={service} />
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Section chrome — shared by the pinned stage and the mobile / reduced-motion band
// ─────────────────────────────────────────────────────────────────────────────
interface SectionHeaderProps {
  onNavigate: (page: string) => void;
  /**
   * The pinned variant rides inside the sticky stage, so it trades the lead paragraph
   * and a type step for vertical room. The stage itself demonstrates what that
   * paragraph describes.
   */
  compact?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ onNavigate, compact = false }) => (
  <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 sm:gap-4">
    <div className={cn("text-left", compact ? "space-y-1 sm:space-y-1.5 max-w-3xl" : "space-y-3 max-w-2xl")}>
      <div className="flex items-center gap-2.5">
        {/* Five segments in the five department colors — the rail below, in miniature */}
        <span aria-hidden className="flex items-center gap-1">
          {SERVICES_STACK.map((s) => (
            <span
              key={s.id}
              className="h-1 w-3.5 sm:w-4 rounded-full"
              style={{ backgroundColor: s.accentColor }}
            />
          ))}
        </span>
        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#5B61FE]">
          Full Spectrum Execution
        </p>
      </div>
      <h2
        className={cn(
          "font-black text-slate-900 tracking-tight leading-[1.1]",
          compact ? "text-xl sm:text-2xl lg:text-[2.2rem]" : "text-3xl sm:text-4xl lg:text-5xl"
        )}
      >
        <span>Five connected departments.</span>
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#5B61FE] to-[#7C3AED] font-extrabold mt-0.5">
          Scroll through the floor.
        </span>
      </h2>
      {!compact && (
        <p className="text-sm sm:text-base text-slate-600 font-medium">
          Each team takes the stage as you scroll — deploy one as a standalone service, or all five
          as one connected growth engine.
        </p>
      )}
    </div>

    <button
      onClick={() => onNavigate("services")}
      className="group shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 border border-slate-200 text-slate-800 hover:text-[#5B61FE] hover:border-[#5B61FE]/40 font-bold text-xs shadow-xs transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#5B61FE]/40"
    >
      <span>All Services</span>
      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
    </button>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Pinned stage panel — one department, driven by scroll position
// ─────────────────────────────────────────────────────────────────────────────
interface StagePanelProps {
  service: ServiceCardData;
  index: number;
  pos: MotionValue<number>;
  isActive: boolean;
  onNavigate: (page: string) => void;
  onOpenDetail: (service: ServiceCardData) => void;
}

const StagePanel: React.FC<StagePanelProps> = ({
  service,
  index,
  pos,
  isActive,
  onNavigate,
  onOpenDetail,
}) => {
  const opacity = useTransform(
    pos,
    [index - 0.55, index - 0.28, index + 0.28, index + 0.55],
    [0, 1, 1, 0]
  );
  const y = useTransform(pos, [index - 1, index, index + 1], [70, 0, -70]);
  const scale = useTransform(pos, [index - 0.6, index, index + 0.6], [0.965, 1, 0.965]);
  const zIndex = useTransform(pos, (p: number) => Math.round(20 - Math.min(Math.abs(p - index), 1) * 12));

  return (
    <motion.div
      style={{ opacity, y, scale, zIndex }}
      inert={!isActive || undefined}
      className="absolute inset-0 flex items-center justify-center px-4 sm:px-6"
    >
      <div className="w-full max-w-5xl mx-auto">
        <DepartmentContent
          service={service}
          onNavigate={onNavigate}
          onOpenDetail={onOpenDetail}
          interactive={isActive}
        />
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Pinned walkthrough (desktop, motion enabled)
// ─────────────────────────────────────────────────────────────────────────────
interface WalkthroughProps {
  onNavigate: (page: string) => void;
  onOpenDetail: (service: ServiceCardData) => void;
}

const PinnedWalkthrough: React.FC<WalkthroughProps> = ({ onNavigate, onOpenDetail }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const pos = useTransform(scrollYProgress, [P_START, P_END], [0, N - 1]);
  const indices = SERVICES_STACK.map((_, i) => i);
  const stageAccent = useTransform(pos, indices, SERVICES_STACK.map((s) => s.accentColor));
  const stageWash = useTransform(pos, indices, SERVICES_STACK.map((s) => s.accentLight));
  const railFill = useTransform(scrollYProgress, [P_START, P_END], ["0%", "100%"]);

  useMotionValueEvent(pos, "change", (v) => {
    const idx = Math.max(0, Math.min(N - 1, Math.round(v)));
    setActiveIndex((prev) => (prev === idx ? prev : idx));
  });

  const scrollToIndex = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const trackTop = el.getBoundingClientRect().top + window.scrollY;
    const distance = el.offsetHeight - window.innerHeight;
    const p = P_START + (N > 1 ? i / (N - 1) : 0) * (P_END - P_START);
    // Routed through Lenis: a native `behavior: "smooth"` here would run the browser's
    // own scroll animation while Lenis animates the same offset, and the two overwrite
    // each other every frame — the rail jump reads as a stutter rather than a glide.
    scrollToY(trackTop + p * distance);
  };

  return (
    <div ref={trackRef} className="relative" style={{ height: `${N * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
        {/*
          Signature: the whole stage washes to the active department's color. The wash is the raw
          accentLight so it meets the entry gradient (#EEF2FF, department 01) exactly — undiluted,
          there is no seam where the section hands off to the stage.
        */}
        <motion.div className="absolute inset-0 -z-20" style={{ backgroundColor: stageWash }} />
        <div
          className="absolute top-1/2 right-[6%] -translate-y-1/2 w-[620px] h-[620px] rounded-full -z-10 pointer-events-none"
          style={{ 
            background: 'radial-gradient(circle, rgba(91,97,254,0.12) 0%, rgba(124,58,237,0.05) 50%, transparent 70%)'
          }}
        />

        {/*
          The section header lives INSIDE the pin. Kept in flow above the track it read as a
          separate band, because the pinned stage centers its content in a full viewport and so
          contributes its own top dead space underneath the header's bottom padding. Sharing one
          flex column removes that gap at every viewport height, and the header becomes section
          chrome that stays with the walkthrough.
        */}
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 shrink-0 pt-6 sm:pt-8 lg:pt-9">
          <SectionHeader onNavigate={onNavigate} compact />
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 min-h-0 flex items-center gap-6 pb-12 sm:pb-14">
          {/* Directory rail */}
          <nav
            aria-label="Departments"
            className="hidden lg:flex flex-col justify-center shrink-0 w-[196px] relative py-4"
          >
            <div className="absolute left-[13px] top-6 bottom-6 w-0.5 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-full rounded-full"
                style={{ height: railFill, backgroundColor: stageAccent }}
              />
            </div>
            <ul className="space-y-6 relative">
              {SERVICES_STACK.map((s, i) => {
                const active = i === activeIndex;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => scrollToIndex(i)}
                      aria-current={active ? "true" : undefined}
                      className="group flex items-center gap-3 text-left w-full cursor-pointer focus-visible:outline-none"
                    >
                      <span className="relative w-[27px] h-[27px] shrink-0 flex items-center justify-center">
                        <span
                          className={cn(
                            "rounded-full transition-[width,height,background-color] duration-300 ring-4 ring-white",
                            active ? "w-3.5 h-3.5" : "w-2.5 h-2.5 bg-slate-300 group-hover:bg-slate-400"
                          )}
                          style={active ? { backgroundColor: s.accentColor } : undefined}
                        />
                      </span>
                      <span className="flex flex-col leading-tight">
                        <span
                          className={cn(
                            "text-xs font-bold transition-colors",
                            active ? "text-slate-900 font-extrabold" : "text-slate-500 group-hover:text-slate-700"
                          )}
                        >
                          {s.title}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Stage */}
          <div className="relative flex-1 h-full flex items-center">
            {SERVICES_STACK.map((s, i) => (
              <StagePanel
                key={s.id}
                service={s}
                index={i}
                pos={pos}
                isActive={i === activeIndex}
                onNavigate={onNavigate}
                onOpenDetail={onOpenDetail}
              />
            ))}
          </div>
        </div>

        {/* Progress dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {SERVICES_STACK.map((s, i) => {
            const active = i === activeIndex;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to ${s.title}`}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "h-2 rounded-full transition-[width,background-color] duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900/30",
                  active ? "w-8" : "w-2 bg-slate-300 hover:bg-slate-400"
                )}
                style={active ? { backgroundColor: s.accentColor } : undefined}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Static stack (mobile + reduced-motion fallback) — non-pinned, one per scroll
// ─────────────────────────────────────────────────────────────────────────────
interface StaticStackProps extends WalkthroughProps {
  reducedMotion: boolean;
}

const StaticStack: React.FC<StaticStackProps> = ({ onNavigate, onOpenDetail, reducedMotion }) => (
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
    {SERVICES_STACK.map((service) => (
      <motion.div
        key={service.id}
        initial={reducedMotion ? false : { opacity: 0, y: 40 }}
        whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative rounded-3xl bg-white border border-slate-200 shadow-xl p-6 sm:p-8 overflow-hidden"
      >
        <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: service.accentColor }} />
        {/* Accent corner glow. Gradient rather than `blur-[80px]`: this is the mobile /
            reduced-motion path, and phone GPUs pay the most for a filter pass. */}
        <div
          className="pointer-events-none absolute -top-[304px] -right-[304px] h-[704px] w-[704px]"
          style={{ background: softGlow(service.accentColor, 0.08, 112 / 352) }}
        />
        <DepartmentContent service={service} onNavigate={onNavigate} onOpenDetail={onOpenDetail} />
      </motion.div>
    ))}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────────────────────
interface KokonutServicesSectionProps {
  onNavigate: (page: string) => void;
  onOpenBookCall?: () => void;
}

export const KokonutServicesSection: React.FC<KokonutServicesSectionProps> = ({
  onNavigate,
  onOpenBookCall,
}) => {
  const [detailModalService, setDetailModalService] = useState<ServiceCardData | null>(null);
  const reducedMotion = useReducedMotion() ?? false;
  const openDetail = (service: ServiceCardData) => setDetailModalService(service);

  return (
    <section className="relative bg-white text-slate-900 border-b border-slate-200/60">
      {reducedMotion ? (
        <>
          {/* No pin to host the header, so it rides in flow at full size. */}
          <div className="relative overflow-hidden bg-gradient-to-b from-white via-white to-[#EEF2FF] pt-16 sm:pt-24 pb-10 sm:pb-14">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-24 right-1/4 w-[520px] h-[520px] bg-[radial-gradient(circle,_rgba(91,97,254,0.06)_0%,_transparent_70%)] rounded-full" />
              <div className="absolute top-10 left-[18%] w-[380px] h-[380px] bg-[radial-gradient(circle,_rgba(124,58,237,0.05)_0%,_transparent_70%)] rounded-full" />
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeader onNavigate={onNavigate} />
            </div>
          </div>
          <div className="relative z-10 bg-gradient-to-b from-[#EEF2FF] to-white pt-10">
            <StaticStack
              onNavigate={onNavigate}
              onOpenDetail={openDetail}
              reducedMotion={reducedMotion}
            />
          </div>
        </>
      ) : (
        <>
          {/*
            Desktop: the header rides inside the pin (see PinnedWalkthrough), so all this band has
            to do is carry white into department 01's wash. Short on purpose — anything taller
            reintroduces the seam it exists to remove.
          */}
          <div className="hidden md:block h-16 bg-gradient-to-b from-white to-[#EEF2FF]" />
          <div className="hidden md:block relative z-10">
            <PinnedWalkthrough onNavigate={onNavigate} onOpenDetail={openDetail} />
          </div>

          {/* Mobile: no pin, so the header rides in flow at full size above the static stack. */}
          <div className="md:hidden relative overflow-hidden bg-gradient-to-b from-white via-white to-[#EEF2FF] pt-16 pb-10">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-24 right-1/4 w-[520px] h-[520px] bg-[radial-gradient(circle,_rgba(91,97,254,0.06)_0%,_transparent_70%)] rounded-full" />
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeader onNavigate={onNavigate} />
            </div>
          </div>
          {/* Continues the band's wash back to white, so there's no seam without the stage */}
          <div className="md:hidden relative z-10 bg-gradient-to-b from-[#EEF2FF] to-white pt-10">
            <StaticStack
              onNavigate={onNavigate}
              onOpenDetail={openDetail}
              reducedMotion={reducedMotion}
            />
          </div>
        </>
      )}

      {/* Connected Squad banner */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20 pb-16 sm:pb-24">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,_rgba(91,97,254,0.05)_0%,_transparent_70%)] rounded-full pointer-events-none" />

          <div className="space-y-2 relative z-10 max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5B61FE]">
              Connected Growth Squad
            </p>
            <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">
              Need all 5 departments working as one coordinated engine?
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Webants deploys an integrated squad with direct Slack sync, senior execution, and a
              7-day risk-free trial.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 relative z-10 shrink-0 w-full md:w-auto">
            {onOpenBookCall && (
              <button
                onClick={onOpenBookCall}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#5B61FE]" />
                <span>Book a Call</span>
              </button>
            )}

            <button
              onClick={() => onNavigate("free-trial")}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#5B61FE] hover:bg-[#4F46E5] text-white font-bold text-xs shadow-lg shadow-indigo-600/25 transition-[background-color,transform] hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Start 7-Day Free Trial</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ─── DETAIL QUICK-VIEW MODAL ─── */}
      <AnimatePresence>
        {detailModalService && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setDetailModalService(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 text-left relative overflow-hidden"
            >
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold shadow-xs shrink-0"
                    style={{ backgroundColor: detailModalService.accentLight, color: detailModalService.accentColor }}
                  >
                    <detailModalService.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-extrabold uppercase text-slate-400">
                      Department {detailModalService.number}
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 leading-tight">
                      {detailModalService.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500">
                      {detailModalService.subtitle}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setDetailModalService(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {detailModalService.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#F8FAFC] p-3 rounded-2xl border border-slate-100">
                {detailModalService.specs.map((spec) => (
                  <div key={spec.label} className="text-left">
                    <dd className="font-extrabold text-xs text-slate-900">{spec.value}</dd>
                    <dt className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">{spec.label}</dt>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                  Included Capabilities & Scope:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {detailModalService.deliverables.map((del) => (
                    <div key={del} className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: detailModalService.accentColor }} />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                  Core Toolstack:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {detailModalService.tools.map((tool) => (
                    <span key={tool} className="px-2.5 py-0.5 rounded-md bg-[#EEF2FF] text-[#5B61FE] font-bold text-[10px]">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => setDetailModalService(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  Close
                </button>

                <button
                  onClick={() => {
                    const route = detailModalService.route;
                    setDetailModalService(null);
                    onNavigate(route);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#5B61FE] hover:bg-[#4F46E5] text-white font-bold text-xs shadow-md shadow-indigo-600/25 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Go to Full Department Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
