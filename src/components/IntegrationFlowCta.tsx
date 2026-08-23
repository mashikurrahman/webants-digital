import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  PhoneCall, 
  Activity, 
  Flame,
  Layers
} from 'lucide-react';

interface IntegrationFlowCtaProps {
  onStartTrial?: () => void;
  onBookCall?: () => void;
  onNavigate?: (page: string) => void;
}

interface AppNode {
  id: string;
  name: string;
  category: string;
  highlightText: string;
  brandColor: string;
  glowColor: string;
  x: number;
  y: number;
  icon: React.ReactNode;
}

export const IntegrationFlowCta: React.FC<IntegrationFlowCtaProps> = ({
  onStartTrial,
  onBookCall,
  onNavigate
}) => {
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);
  const [autoIndex, setAutoIndex] = useState(0);

  const [clickedNodeId, setClickedNodeId] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);

  /*
    The cursor spotlight on the engine card is driven by CSS custom properties rather than React
    state. `mousemove` fires several times between paints, so a setState per event re-rendered
    this whole subtree several times a frame — and it fires during scrolling too, whenever the
    pointer happens to be resting on the card. Coalescing to one rAF also collapses the
    read-rect / write-style thrash to a single forced layout per frame.
  */
  const engineCardRef = useRef<HTMLDivElement>(null);
  const enginePointer = useRef({ x: 0, y: 0 });
  const engineFrame = useRef(0);

  useEffect(() => () => {
    if (engineFrame.current) cancelAnimationFrame(engineFrame.current);
  }, []);

  const trackEngineCard = (e: React.MouseEvent<HTMLDivElement>) => {
    enginePointer.current.x = e.clientX;
    enginePointer.current.y = e.clientY;
    if (engineFrame.current) return;
    engineFrame.current = requestAnimationFrame(() => {
      engineFrame.current = 0;
      const node = engineCardRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      node.style.setProperty('--engine-x', `${enginePointer.current.x - rect.left}px`);
      node.style.setProperty('--engine-y', `${enginePointer.current.y - rect.top}px`);
    });
  };

  const handleNodeClick = (node: AppNode) => {
    if (isSimulating) return;
    setClickedNodeId(node.id);
    setActiveHoverId(node.id);
    setIsSimulating(true);
    setSimulationLogs([`[Initialize: ${node.name} Integration]`]);

    const steps = [
      { time: 600, text: `Connecting securely to ${node.name} API...` },
      { time: 1300, text: 'Resolving Webants single-tenant webhook token...' },
      { time: 2000, text: `Synchronizing Active ${node.category} database...` },
      { time: 2700, text: `Active Pipeline online. SLA status: 100% OK` }
    ];

    steps.forEach((step) => {
      setTimeout(() => {
        setSimulationLogs((prev) => [...prev, step.text]);
      }, step.time);
    });

    setTimeout(() => {
      setIsSimulating(false);
      setClickedNodeId(null);
      setActiveHoverId(null);
    }, 4600);
  };

  // 10 Colorful, recognizable integration tools
  const leftNodes: AppNode[] = [
    {
      id: 'figma',
      name: 'Figma',
      category: 'Design & Creative',
      highlightText: 'UI/UX & Creative: High-converting design & video assets',
      brandColor: '#F24E1E',
      glowColor: 'rgba(242, 78, 30, 0.4)',
      x: 100,
      y: 50,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 38 57" fill="none">
          <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
          <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
          <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
          <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
          <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
        </svg>
      )
    },
    {
      id: 'shopify',
      name: 'Shopify',
      category: 'Web & E-Commerce',
      highlightText: 'Web Platforms: Custom themes, Shopify speed & integrations',
      brandColor: '#95BF47',
      glowColor: 'rgba(149, 191, 71, 0.4)',
      x: 155,
      y: 125,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path d="M18.8 6.4c-.1-.4-.4-.6-.7-.6l-2.6-.2-1.9-4.2c-.2-.4-.6-.6-1-.6s-.8.2-1 .6L9.8 5.7l-2.6.2c-.4 0-.7.3-.7.6L4.7 19.8c0 .3.1.6.4.7.1.1.3.1.4.1.2 0 .3 0 .4-.1L11.7 17l5.6 3.4c.2.1.5.1.8 0 .3-.1.4-.4.4-.7l.3-13.3z" fill="#95BF47"/>
        </svg>
      )
    },
    {
      id: 'meta',
      name: 'Meta Ads',
      category: 'Paid Growth',
      highlightText: 'Performance Ads: Multi-variant creative testing & scaling',
      brandColor: '#0081FB',
      glowColor: 'rgba(0, 129, 251, 0.4)',
      x: 180,
      y: 210,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" fill="#0081FB"/>
        </svg>
      )
    },
    {
      id: 'google',
      name: 'Google Ads',
      category: 'Search & Intent',
      highlightText: 'Search Acquisition: High-intent PPC campaigns & SEO rankings',
      brandColor: '#EA4335',
      glowColor: 'rgba(234, 67, 53, 0.4)',
      x: 155,
      y: 295,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
        </svg>
      )
    },
    {
      id: 'slack',
      name: 'Slack Sync',
      category: 'Agile Operations',
      highlightText: 'Daily Operations: Direct Slack communication with your squad',
      brandColor: '#E01E5A',
      glowColor: 'rgba(224, 30, 90, 0.4)',
      x: 100,
      y: 370,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path d="M6 15a2 2 0 0 1-2-2 2 2 0 0 1 2-2h2v2a2 2 0 0 1-2 2zm1 0a2 2 0 0 1 2-2 2 2 0 0 1 2 2v5a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-5zm2-8a2 2 0 0 1-2-2 2 2 0 0 1 2-2 2 2 0 0 1 2 2v2H9zm0 1a2 2 0 0 1 2 2 2 2 0 0 1-2 2H4a2 2 0 0 1-2-2 2 2 0 0 1 2-2h5zm8 2a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-2v-2a2 2 0 0 1 2-2zm-1 0a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2 2 2 0 0 1 2 2v5zm-2 8a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2v-2h2zm0-1a2 2 0 0 1-2-2 2 2 0 0 1 2-2h5a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-5z" fill="#E01E5A"/>
        </svg>
      )
    }
  ];

  const rightNodes: AppNode[] = [
    {
      id: 'openai',
      name: 'OpenAI Agents',
      category: 'AI Automations',
      highlightText: 'AI Chatbots: Custom GPT agents & 24/7 automated lead routing',
      brandColor: '#10A37F',
      glowColor: 'rgba(16, 163, 127, 0.4)',
      x: 900,
      y: 50,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path d="M22.28 10.05a5.53 5.53 0 0 0-.46-4.42 5.6 5.6 0 0 0-4.8-2.73 5.67 5.67 0 0 0-2.38.52 5.5 5.5 0 0 0-4.14-1.84 5.6 5.6 0 0 0-5.32 3.86 5.53 5.53 0 0 0-3.48 2.53 5.58 5.58 0 0 0-.67 4.9 5.54 5.54 0 0 0 .46 4.42 5.6 5.6 0 0 0 4.8 2.73 5.67 5.67 0 0 0 2.38-.52 5.5 5.5 0 0 0 4.14 1.84 5.6 5.6 0 0 0 5.32-3.86 5.53 5.53 0 0 0 3.48-2.53 5.58 5.58 0 0 0 .67-4.9z" fill="#10A37F"/>
        </svg>
      )
    },
    {
      id: 'hubspot',
      name: 'HubSpot CRM',
      category: 'Lead Pipelines',
      highlightText: 'CRM Pipelines: Automated lead tracking & lifecycle sync',
      brandColor: '#FF7A59',
      glowColor: 'rgba(255, 122, 89, 0.4)',
      x: 845,
      y: 125,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path d="M17.4 8.7V6.2a2.3 2.3 0 1 0-1.8 0v2.5a5.2 5.2 0 0 0-2.8 1.9l-5.6-4.4a2.2 2.2 0 1 0-1.4 1.1l5.4 4.3a5.2 5.2 0 1 0 6.2-2.9zm-8.8 8.6a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6z" fill="#FF7A59"/>
        </svg>
      )
    },
    {
      id: 'zapier',
      name: 'Zapier & Make',
      category: 'Automated Sync',
      highlightText: 'Workflow Automation: Connect all platforms without manual entry',
      brandColor: '#FF4A00',
      glowColor: 'rgba(255, 74, 0, 0.4)',
      x: 820,
      y: 210,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path d="M13.2 2L6 13.5h5.4L10.8 22 18 10.5h-5.4L13.2 2z" fill="#FF4A00"/>
        </svg>
      )
    },
    {
      id: 'stripe',
      name: 'Stripe Revenue',
      category: 'Revenue Growth',
      highlightText: 'Revenue Scaling: Clear MRR growth, retention & checkout lift',
      brandColor: '#635BFF',
      glowColor: 'rgba(99, 91, 255, 0.4)',
      x: 845,
      y: 295,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path d="M13.98 9.5c0-1.04-.84-1.42-2.22-1.42-1.98 0-4.5.8-4.5.8l-.86-4.14S9.04 3.7 11.96 3.7c4.66 0 7.2 2.24 7.2 5.76 0 5.56-7.66 4.68-7.66 7.08 0 1.2 1.04 1.58 2.5 1.58 2.34 0 5.08-1.04 5.08-1.04l.88 4.24s-2.86 1.18-6.14 1.18c-4.94 0-7.58-2.44-7.58-5.88 0-5.88 7.74-4.88 7.74-7.12z" fill="#635BFF"/>
        </svg>
      )
    },
    {
      id: 'analytics',
      name: 'Analytics & ROI',
      category: 'Real-Time ROI',
      highlightText: 'Performance Dashboards: Real-time ROAS & conversion metrics',
      brandColor: '#F59E0B',
      glowColor: 'rgba(245, 158, 11, 0.4)',
      x: 900,
      y: 370,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path d="M4 19h16v2H4v-2zm2-4h3v3H6v-3zm5-5h3v8h-3v-8zm5-6h3v14h-3V4z" fill="#F59E0B"/>
        </svg>
      )
    }
  ];

  // SVG Paths (Canvas 1000 x 420, Card center is 500, Card left is 320, Card right is 680)
  const leftPaths = [
    { id: 'figma', d: 'M 100,50 C 210,50 250,150 320,150', dur: 2.2, delay: 0 },
    { id: 'shopify', d: 'M 155,125 C 230,125 260,180 320,180', dur: 2.0, delay: 0.25 },
    { id: 'meta', d: 'M 180,210 C 240,210 270,210 320,210', dur: 1.9, delay: 0.5 },
    { id: 'google', d: 'M 155,295 C 230,295 260,240 320,240', dur: 2.0, delay: 0.75 },
    { id: 'slack', d: 'M 100,370 C 210,370 250,270 320,270', dur: 2.3, delay: 1.0 }
  ];

  const rightPaths = [
    { id: 'openai', d: 'M 680,150 C 750,150 790,50 900,50', dur: 2.2, delay: 0.15 },
    { id: 'hubspot', d: 'M 680,180 C 740,180 770,125 845,125', dur: 2.0, delay: 0.4 },
    { id: 'zapier', d: 'M 680,210 C 730,210 760,210 820,210', dur: 1.9, delay: 0.65 },
    { id: 'stripe', d: 'M 680,240 C 740,240 770,295 845,295', dur: 2.0, delay: 0.9 },
    { id: 'analytics', d: 'M 680,270 C 750,270 790,370 900,370', dur: 2.3, delay: 1.15 }
  ];

  const allNodes = [...leftNodes, ...rightNodes];
  const activeNode = allNodes.find((n) => n.id === activeHoverId);

  // Cycling badge when nothing is hovered
  const defaultBadges = [
    '{ Unified Digital Squad }',
    '{ Growth + Tech + Creative }',
    '{ 24/7 Workflow Automations }',
    '{ Measurable Revenue Engine }'
  ];

  useEffect(() => {
    if (activeHoverId || clickedNodeId) return;
    const interval = setInterval(() => {
      setAutoIndex((prev) => (prev + 1) % defaultBadges.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [activeHoverId, clickedNodeId]);

  return (
    <section className="relative w-full py-16 sm:py-20 bg-white border-t border-slate-200/60 overflow-hidden font-body select-none">
      
      {/* Background Soft Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,_rgba(91,97,254,0.06)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

        {/* ── Interactive Connected Circuit Canvas ── */}
        <div className="relative w-full max-w-[1000px] mx-auto min-h-[420px] flex items-center justify-center">

          {/* ── SVG Circuit Lines with Dynamic Glow & Animated Beams ── */}
          <svg
            viewBox="0 0 1000 420"
            fill="none"
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Left Static Tracks */}
            {leftPaths.map((p) => {
              const isHovered = activeHoverId === p.id;
              const node = leftNodes.find((n) => n.id === p.id);
              return (
                <path
                  key={`track-l-${p.id}`}
                  d={p.d}
                  stroke={isHovered && node ? node.brandColor : '#CBD5E1'}
                  strokeOpacity={isHovered ? 1 : 0.45}
                  strokeWidth={isHovered ? 2.5 : 1.5}
                  strokeLinecap="round"
                  className="transition-[stroke,stroke-opacity,stroke-width] duration-300"
                />
              );
            })}

            {/* Right Static Tracks */}
            {rightPaths.map((p) => {
              const isHovered = activeHoverId === p.id;
              const node = rightNodes.find((n) => n.id === p.id);
              return (
                <path
                  key={`track-r-${p.id}`}
                  d={p.d}
                  stroke={isHovered && node ? node.brandColor : '#CBD5E1'}
                  strokeOpacity={isHovered ? 1 : 0.45}
                  strokeWidth={isHovered ? 2.5 : 1.5}
                  strokeLinecap="round"
                  className="transition-[stroke,stroke-opacity,stroke-width] duration-300"
                />
              );
            })}

            {/* Left Inward Animated Beams (Tool -> Hub) */}
            {leftPaths.map((p) => {
              const isHovered = activeHoverId === p.id;
              const node = leftNodes.find((n) => n.id === p.id);
              const color = isHovered && node ? node.brandColor : '#5B5AFE';
              const isProcessing = clickedNodeId === p.id;
              return (
                <g key={`beam-l-${p.id}`}>
                  {/* Outer soft glow ring */}
                  <circle r={isHovered ? 8 : 6} fill={color} opacity="0.3">
                    <animateMotion
                      path={p.d}
                      dur={isProcessing ? '0.6s' : isHovered ? `${p.dur * 0.6}s` : `${p.dur}s`}
                      begin={`${p.delay}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                  {/* Primary beam head */}
                  <circle r={isHovered ? 4.5 : 3.5} fill={color}>
                    <animateMotion
                      path={p.d}
                      dur={isProcessing ? '0.6s' : isHovered ? `${p.dur * 0.6}s` : `${p.dur}s`}
                      begin={`${p.delay}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                  {/* Core highlight dot */}
                  <circle r="1.8" fill="#FFFFFF" opacity="0.95">
                    <animateMotion
                      path={p.d}
                      dur={isProcessing ? '0.6s' : isHovered ? `${p.dur * 0.6}s` : `${p.dur}s`}
                      begin={`${p.delay}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              );
            })}

            {/* Right Outward Animated Beams (Hub -> Outcomes) */}
            {rightPaths.map((p) => {
              const isHovered = activeHoverId === p.id;
              const node = rightNodes.find((n) => n.id === p.id);
              const color = isHovered && node ? node.brandColor : '#5B5AFE';
              const isProcessing = clickedNodeId === p.id;
              return (
                <g key={`beam-r-${p.id}`}>
                  {/* Outer soft glow ring */}
                  <circle r={isHovered ? 8 : 6} fill={color} opacity="0.3">
                    <animateMotion
                      path={p.d}
                      dur={isProcessing ? '0.6s' : isHovered ? `${p.dur * 0.6}s` : `${p.dur}s`}
                      begin={`${p.delay}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                  {/* Primary beam head */}
                  <circle r={isHovered ? 4.5 : 3.5} fill={color}>
                    <animateMotion
                      path={p.d}
                      dur={isProcessing ? '0.6s' : isHovered ? `${p.dur * 0.6}s` : `${p.dur}s`}
                      begin={`${p.delay}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                  {/* Core highlight dot */}
                  <circle r="1.8" fill="#FFFFFF" opacity="0.95">
                    <animateMotion
                      path={p.d}
                      dur={isProcessing ? '0.6s' : isHovered ? `${p.dur * 0.6}s` : `${p.dur}s`}
                      begin={`${p.delay}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              );
            })}
          </svg>

          {/* ── Left Floating Colorful Logo Nodes ── */}
          {leftNodes.map((node) => {
            const isHovered = activeHoverId === node.id;
            return (
              <div
                key={node.id}
                className="absolute z-20 hidden md:block"
                style={{
                  left: `${(node.x / 1000) * 100}%`,
                  top: `${(node.y / 420) * 100}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onMouseEnter={() => !isSimulating && setActiveHoverId(node.id)}
                onMouseLeave={() => !isSimulating && setActiveHoverId(null)}
                onClick={() => handleNodeClick(node)}
              >
                <motion.div
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group cursor-pointer"
                >
                  <div
                    style={{
                      boxShadow: isHovered
                        ? `0 10px 25px -4px ${node.glowColor}`
                        : '0 4px 20px -4px rgba(15,23,42,0.08)',
                      borderColor: isHovered ? node.brandColor : '#E2E8F0',
                      backgroundColor: isHovered ? '#FAFAFA' : '#FFFFFF'
                    }}
                    className="w-12 h-12 rounded-2xl border flex items-center justify-center transition-[background-color,border-color,box-shadow] duration-300 relative"
                  >
                    {node.icon}
                    {/* Live pulse dot */}
                    <span 
                      style={{ backgroundColor: node.brandColor }}
                      className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ring-2 ring-white transition-opacity ${isHovered ? 'opacity-100 animate-ping' : 'opacity-0'}`} 
                    />
                  </div>

                  {/* Tooltip Tag */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.95 }}
                        className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-lg shadow-lg whitespace-nowrap z-30 pointer-events-none flex items-center gap-1.5"
                      >
                        <span>{node.name}</span>
                        <span className="text-slate-400">·</span>
                        <span style={{ color: node.brandColor }}>{node.category}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            );
          })}

          {/* ── Right Floating Colorful Logo Nodes ── */}
          {rightNodes.map((node) => {
            const isHovered = activeHoverId === node.id;
            return (
              <div
                key={node.id}
                className="absolute z-20 hidden md:block"
                style={{
                  left: `${(node.x / 1000) * 100}%`,
                  top: `${(node.y / 420) * 100}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onMouseEnter={() => !isSimulating && setActiveHoverId(node.id)}
                onMouseLeave={() => !isSimulating && setActiveHoverId(null)}
                onClick={() => handleNodeClick(node)}
              >
                <motion.div
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group cursor-pointer"
                >
                  <div
                    style={{
                      boxShadow: isHovered
                        ? `0 10px 25px -4px ${node.glowColor}`
                        : '0 4px 20px -4px rgba(15,23,42,0.08)',
                      borderColor: isHovered ? node.brandColor : '#E2E8F0',
                      backgroundColor: isHovered ? '#FAFAFA' : '#FFFFFF'
                    }}
                    className="w-12 h-12 rounded-2xl border flex items-center justify-center transition-[background-color,border-color,box-shadow] duration-300 relative"
                  >
                    {node.icon}
                    {/* Live pulse dot */}
                    <span 
                      style={{ backgroundColor: node.brandColor }}
                      className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ring-2 ring-white transition-opacity ${isHovered ? 'opacity-100 animate-ping' : 'opacity-0'}`} 
                    />
                  </div>

                  {/* Tooltip Tag */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.95 }}
                        className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-lg shadow-lg whitespace-nowrap z-30 pointer-events-none flex items-center gap-1.5"
                      >
                        <span>{node.name}</span>
                        <span className="text-slate-400">·</span>
                        <span style={{ color: node.brandColor }}>{node.category}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            );
          })}

          {/* ── Central WebAnts Growth Engine Card ── */}
          <motion.div
            ref={engineCardRef}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onMouseMove={trackEngineCard}
            className="relative z-10 w-full max-w-[430px] sm:max-w-[460px] bg-white rounded-3xl border border-slate-200/90 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.08)] p-6 sm:p-8 text-center flex flex-col items-center justify-center space-y-4 overflow-hidden group transition-shadow duration-300"
          >
            {/* Cursor Spotlight Glow Aura */}
            <div
              className="absolute pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100 z-0"
              style={{
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(91,97,254,0.08) 0%, transparent 70%)',
                left: 'calc(var(--engine-x, 0px) - 150px)',
                top: 'calc(var(--engine-y, 0px) - 150px)',
                transform: 'translate3d(0, 0, 0)'
              }}
            />
            {/* Ambient inner card glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#5B61FE]/5 via-transparent to-transparent rounded-3xl pointer-events-none" />

            {/* Live Interactive Context Badge */}
            <div className="relative h-7 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {activeNode ? (
                  <motion.div
                    key={`node-${activeNode.id}`}
                    initial={{ opacity: 0, y: 4, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    style={{ 
                      borderColor: `${activeNode.brandColor}40`,
                      backgroundColor: `${activeNode.brandColor}12`,
                      color: activeNode.brandColor
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border text-[11px] sm:text-xs font-bold font-mono shadow-xs"
                  >
                    <span 
                      style={{ backgroundColor: activeNode.brandColor }} 
                      className="w-2 h-2 rounded-full animate-ping" 
                    />
                    <span>{`{ ${activeNode.name}: ${activeNode.category} }`}</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`default-${autoIndex}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EEF2FF] border border-[#5B61FE]/20 text-[#5B61FE] font-mono text-[11px] sm:text-xs font-bold shadow-xs"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5B61FE] animate-ping" />
                    <span>{defaultBadges[autoIndex]}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Live Simulation Terminal Console or Standard Text */}
            <div className="w-full min-h-[82px] flex flex-col justify-center items-center">
              <AnimatePresence mode="wait">
                {isSimulating ? (
                  <motion.div 
                    key="sim-console"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-slate-950 text-emerald-400 font-mono text-[10px] p-3 rounded-2xl w-full text-left space-y-1 relative overflow-hidden border border-slate-800 shadow-inner h-20"
                  >
                    {/* Header dots */}
                    <div className="absolute top-1.5 right-2.5 flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    </div>
                    
                    {/* Render Logs */}
                    <div className="space-y-0.5 overflow-y-auto h-full pr-4">
                      {simulationLogs.map((log, i) => (
                        <div key={i} className="truncate">
                          <span className="text-slate-500 font-bold">&gt;</span> {log}
                        </div>
                      ))}
                      {simulationLogs.length < 5 && (
                        <div className="animate-pulse text-slate-400">&gt; _</div>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="standard-desc"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-1 text-center"
                  >
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                      One connected growth engine.
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-xs mx-auto">
                      {activeNode ? activeNode.highlightText : 'Unify Growth, Creative, Technology, AI & Automation under one dedicated execution squad.'}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Actions: WebAnts Electric Indigo Primary + Book Call */}
            <div className="pt-2 w-full flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <button
                onClick={onStartTrial}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#5B61FE] hover:bg-[#4F46E5] text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-[background-color,box-shadow,transform] duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <span>Start 7-Day Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onBookCall}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs sm:text-sm transition-[background-color,transform] duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#5B61FE]" />
                <span>Book a Call</span>
              </button>
            </div>

            {/* Micro Live Status Indicator & Trust */}
            <div className="pt-1 flex items-center justify-center gap-3 text-[11px] font-semibold text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Dedicated Squad Ready</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span className="flex items-center gap-1 text-slate-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#5B61FE]" /> 24/7 Slack Sync
              </span>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
