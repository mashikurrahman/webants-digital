import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Compass, Cpu, Rocket, LineChart } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Auto-play interval to animate through steps when user is not hovering
  useEffect(() => {
    if (hoveredIdx !== null) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % 5);
    }, 3200);
    return () => clearInterval(timer);
  }, [hoveredIdx]);

  const steps = [
    {
      index: 0,
      num: '1',
      title: 'Discover',
      desc: 'Audit existing platforms, lead sources, and operational bottlenecks.',
      icon: Search,
    },
    {
      index: 1,
      num: '2',
      title: 'Plan',
      desc: 'Define connected strategy, sprint milestones, and SLA deliverables.',
      icon: Compass,
    },
    {
      index: 2,
      num: '3',
      title: 'Build',
      desc: 'Execute high-converting creatives, web platforms, and AI automations.',
      icon: Cpu,
    },
    {
      index: 3,
      num: '4',
      title: 'Launch',
      desc: 'Deploy paid campaigns, integrate CRM pipelines, and monitor live systems.',
      icon: Rocket,
    },
    {
      index: 4,
      num: '5',
      title: 'Improve',
      desc: 'Iterate weekly based on conversion analytics and business feedback.',
      icon: LineChart,
    }
  ];

  // Current active step determines what is highlighted
  const currentIndex = hoveredIdx !== null ? hoveredIdx : activeIdx;

  // Connector paths coordinates in SVG space (1000 x 200)
  // Step 1 (100), Step 2 (300), Step 3 (500), Step 4 (700), Step 5 (900)
  const connections = [
    { from: 0, to: 1, d: "M 100 85 Q 200 145 300 85" },
    { from: 1, to: 2, d: "M 300 85 Q 400 25 500 85" },
    { from: 2, to: 3, d: "M 500 85 Q 600 145 700 85" },
    { from: 3, to: 4, d: "M 700 85 Q 800 25 900 85" }
  ];

  return (
    <section className="py-20 sm:py-24 bg-white text-slate-900 border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header (Top icon removed as requested) */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E1225] tracking-tight">
            How We Deliver
          </h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-xl mx-auto">
            From initial audit to sprint execution, every deliverable is tracked with direct Slack collaboration and transparent milestones.
          </p>
        </div>

        {/* 5 Step Process Flow */}
        <div className="relative max-w-7xl mx-auto pt-6">
          
          {/* Animated Connecting Lines (Desktop only) */}
          <div className="absolute inset-0 hidden lg:block pointer-events-none z-0">
            <svg 
              viewBox="0 0 1000 200" 
              fill="none" 
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              {/* Static Background Dotted Curve */}
              <path 
                d="M 100 85 Q 200 145 300 85 T 500 85 T 700 85 T 900 85" 
                stroke="#E2E8F0" 
                strokeWidth="2" 
                strokeDasharray="6 6" 
              />

              {/* Dynamic Illuminating Dotted Flows matching the active step */}
              {connections.map((conn, idx) => {
                // The connection lights up if the flow has reached or passed this step
                const isActive = currentIndex >= conn.to;
                return (
                  <motion.path 
                    key={idx}
                    d={conn.d} 
                    stroke="#5B61FE" 
                    strokeWidth="2.5" 
                    strokeDasharray="6 6"
                    initial={{ strokeDashoffset: 0, opacity: 0 }}
                    animate={{ 
                      strokeDashoffset: isActive ? [0, -24] : 0,
                      opacity: isActive ? 1 : 0 
                    }}
                    transition={{ 
                      strokeDashoffset: { ease: "linear", duration: 1.2, repeat: Infinity },
                      opacity: { duration: 0.35 }
                    }}
                  />
                );
              })}
            </svg>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-4 xl:gap-8 relative z-10">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentIndex === step.index;

              return (
                <div
                  key={step.num}
                  className="flex flex-col items-center text-center space-y-5 cursor-pointer"
                  onMouseEnter={() => {
                    setHoveredIdx(step.index);
                    setActiveIdx(step.index);
                  }}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  {/* Large Outer Circle Badge with hover scale */}
                  <motion.div 
                    animate={{
                      scale: isActive ? 1.08 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="relative"
                  >
                    {/* Step Number on the top-left */}
                    <motion.span 
                      animate={{
                        color: isActive ? '#5B61FE' : '#1E293B',
                        scale: isActive ? 1.15 : 1
                      }}
                      className="absolute -top-1 -left-5 text-sm font-bold"
                    >
                      {step.num}
                    </motion.span>
                    
                    <div 
                      className={`w-28 h-28 rounded-full bg-white border flex items-center justify-center transition-[border-color,box-shadow] duration-300 ${
                        isActive 
                          ? 'border-[#5B61FE] shadow-[0_0_35px_rgba(91,97,254,0.25)]' 
                          : 'border-slate-200/80 shadow-[0_10px_25px_rgba(0,0,0,0.015)]'
                      }`}
                    >
                      {/* Inner Icon Circle Container */}
                      <motion.div 
                        animate={{
                          backgroundColor: isActive ? '#5B61FE' : '#F8FAFC',
                          color: isActive ? '#FFFFFF' : '#0D9488',
                          scale: isActive ? 1.08 : 1
                        }}
                        transition={{ duration: 0.25 }}
                        className="w-14 h-14 rounded-full flex items-center justify-center shadow-xs"
                      >
                        <Icon className="w-5 h-5 stroke-[2.2]" />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Text Content */}
                  <div className="space-y-2 max-w-[200px]">
                    <motion.h3 
                      animate={{
                        color: isActive ? '#5B61FE' : '#0E1225'
                      }}
                      className="text-lg font-bold transition-colors"
                    >
                      {step.title}
                    </motion.h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
