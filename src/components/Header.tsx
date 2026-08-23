import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  Menu, 
  X, 
  ArrowRight,
  TrendingUp,
  Palette,
  Code2,
  Bot,
  Layers,
  PhoneCall,
  Zap,
  CheckCircle2
} from 'lucide-react';

interface HeaderProps {
  activePage?: string;
  currentPage?: string;
  onNavigate: (page: string, param?: string) => void;
  onOpenBookCall: () => void;
}

interface ServiceItem {
  id: string;
  number: string;
  label: string;
  desc: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
}

const SERVICES_LIST: ServiceItem[] = [
  { 
    id: 'growth', 
    number: '01',
    label: 'Growth', 
    desc: 'SEO, Paid Ads & Lead Systems', 
    tag: 'Lead Gen',
    icon: TrendingUp,
    iconBg: 'bg-[#EEF2FF]',
    iconColor: 'text-[#5B61FE]'
  },
  { 
    id: 'creative', 
    number: '02',
    label: 'Creative', 
    desc: 'Branding & Video Subscriptions', 
    tag: 'Design & Video',
    icon: Palette,
    iconBg: 'bg-[#FEF3C7]',
    iconColor: 'text-[#D97706]'
  },
  { 
    id: 'technology', 
    number: '03',
    label: 'Technology', 
    desc: 'Websites & Shopify Platforms', 
    tag: 'Full-Stack Dev',
    icon: Code2,
    iconBg: 'bg-[#EDE9FE]',
    iconColor: 'text-[#7C3AED]'
  },
  { 
    id: 'ai-automation', 
    number: '04',
    label: 'AI & Automation', 
    desc: 'Chatbots & CRM Pipelines', 
    tag: 'AI Workflows',
    icon: Bot,
    iconBg: 'bg-[#E0F2FE]',
    iconColor: 'text-[#0284C7]'
  },
  { 
    id: 'digital-operations', 
    number: '05',
    label: 'Digital Operations', 
    desc: 'Social & Content Management', 
    tag: 'Always Active',
    icon: Layers,
    iconBg: 'bg-[#DCFCE7]',
    iconColor: 'text-[#16A34A]'
  },
];

const NAV_ITEMS = [
  { id: 'services', label: 'Services', hasDropdown: true },
  { id: 'industries', label: 'Industries' },
  { id: 'work', label: 'Work' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'about', label: 'About' },
  { id: 'careers', label: 'Careers' },
  { id: 'insights', label: 'Insights' },
  { id: 'contact', label: 'Contact' },
];

export const Header: React.FC<HeaderProps> = ({ 
  activePage: activePageProp, 
  currentPage, 
  onNavigate, 
  onOpenBookCall 
}) => {
  const activePage = activePageProp || currentPage || 'home';
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Sample scroll state for glass elevation and progress line
  useEffect(() => {
    let frame = 0;
    /*
      `documentElement.scrollHeight` is cached rather than read inside the rAF callback.
      Reading it forces a synchronous layout, and doing that once per animation frame
      while the page is scrolling is the classic layout-thrash that turns a 144Hz
      scroller into a 40fps one. The value only changes when content resizes, so a
      ResizeObserver is the correct trigger — not the scroll event.
    */
    let limit = 1;
    /*
      Local mirror of `isScrolled`. Calling the setter with an unchanged value is not
      free — React can still re-invoke the component before bailing out, and this header
      is ~500 lines with six motion subtrees. Gating on a plain boolean means the header
      re-renders twice per page (crossing the threshold each way) instead of once a frame.
    */
    let scrolled = false;

    const measure = () => {
      limit = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };

    const updateHeader = () => {
      frame = 0;
      const y = window.scrollY;

      const next = y > 15;
      if (next !== scrolled) {
        scrolled = next;
        setIsScrolled(next);
      }

      if (progressBarRef.current) {
        const progress = Math.min(1, Math.max(0, y / limit));
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateHeader);
    };

    measure();
    updateHeader();

    const ro = new ResizeObserver(() => {
      measure();
      onScroll();
    });
    ro.observe(document.documentElement);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      ro.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setServicesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 120);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  return (
    <div className="sticky top-0 z-50 w-full select-none">

      {/* ─── 1. SLIM TOP ANNOUNCEMENT BAR ─── */}
      <div className="bg-[#0B1120] text-white text-[11px] py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 border-b border-white/[0.06] relative z-20">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="font-extrabold text-emerald-400">Active Squad Slots: 2/5 Filled</span>
          <span className="mx-1.5 text-white/20 hidden sm:inline">|</span>
          <span className="text-slate-300 hidden sm:inline">Try selected services free for 7 days — evaluate workflow and quality.</span>
        </span>
        <button 
          onClick={() => handleNavClick('free-trial')} 
          className="text-[#8585FF] hover:text-white font-bold cursor-pointer ml-1 inline-flex items-center gap-1 transition-colors"
        >
          <span>Check Eligibility</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* ─── 2. FLAT FULL-WIDTH GLASS HEADER BAR ─── */}
      {/*
        The blur radius is deliberately constant across both states. `transition-all` used
        to tween `backdrop-filter` from 12px to 24px, and interpolating a blur radius means
        re-running a full-viewport-width gaussian at a new kernel size on every frame of the
        transition — which fires the instant you start scrolling, exactly when the frame
        budget is already committed to the scroll. Only the cheap compositable properties
        change now; at 88% white the perceived difference is nil.
      */}
      <header
        className={`w-full relative backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300 ease-out ${
          isScrolled
            ? 'bg-white/[0.88] border-b border-slate-200/80 shadow-md shadow-slate-900/[0.03]'
            : 'bg-white/95 border-b border-slate-200/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
          
          {/* Left: Brand Logo */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none py-1"
              aria-label="Webants Home"
            >
              <img 
                src="/WebAnts.svg" 
                alt="Webants" 
                width="465"
                height="96"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="h-7 sm:h-8 w-auto object-contain group-hover:opacity-90 transition-opacity"
              />
            </button>
          </div>

          {/* Center: Desktop Navigation with Magnetic Sliding Capsule */}
          <nav 
            className="hidden lg:flex items-center gap-1 p-1 bg-slate-50/70 border border-slate-200/60 rounded-full"
            onMouseLeave={() => setHoveredNav(null)}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activePage === item.id || 
                (item.id === 'services' && ((activePage || '').startsWith('services') || ['growth', 'creative', 'technology', 'ai-automation', 'digital-operations'].includes(activePage)));
              
              if (item.hasDropdown) {
                return (
                  <div 
                    key={item.id} 
                    ref={dropdownRef}
                    onMouseEnter={() => {
                      setHoveredNav(item.id);
                      handleMouseEnter();
                    }}
                    onMouseLeave={handleMouseLeave}
                    className="relative"
                  >
                    <button 
                      type="button"
                      onClick={() => handleNavClick('services')}
                      className={`relative flex items-center gap-1 px-3.5 py-1.5 text-xs xl:text-[13px] font-bold rounded-full transition-colors cursor-pointer z-10 ${
                        servicesDropdownOpen || isActive
                          ? 'text-[#5B61FE]' 
                          : 'text-slate-700 hover:text-slate-900'
                      }`}
                    >
                      {/* Sliding Hover Pill Background */}
                      {hoveredNav === item.id && (
                        <motion.span
                          layoutId="nav-hover-pill"
                          className="absolute inset-0 bg-white rounded-full shadow-xs border border-slate-200/70 -z-10"
                          transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                        />
                      )}

                      <span>{item.label}</span>
                      <motion.div
                        animate={{ rotate: servicesDropdownOpen ? 180 : 0 }}
                        transition={{ type: "spring", stiffness: 350, damping: 22 }}
                      >
                        <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                      </motion.div>

                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5B61FE] ml-0.5" />
                      )}
                    </button>

                    {/* ANIMATED DETAILED MEGA DROPDOWN */}
                    <AnimatePresence>
                      {servicesDropdownOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 12, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute top-full -left-12 xl:left-0 w-[660px] bg-white border border-indigo-100 rounded-3xl shadow-2xl p-5 z-50 overflow-hidden"
                        >
                          <div className="grid grid-cols-12 gap-5">
                            
                            {/* Left Column: 5 Detailed Service Capabilities */}
                            <div className="col-span-7 space-y-2">
                              <div className="flex items-center justify-between px-1 pb-1 border-b border-slate-100">
                                <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-slate-400">
                                  Five Integrated Departments
                                </span>
                                <button
                                  onClick={() => handleNavClick('services')}
                                  className="text-xs font-bold text-[#5B61FE] hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                  <span>Overview</span>
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                              </div>

                              <div className="space-y-1 pt-1">
                                {SERVICES_LIST.map((service, index) => (
                                  <motion.button
                                    key={service.id}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.03, duration: 0.2 }}
                                    whileHover={{ x: 3, transition: { duration: 0.15 } }}
                                    onClick={() => handleNavClick(service.id)}
                                    className="w-full text-left p-2 rounded-2xl border border-transparent hover:border-indigo-100 hover:bg-gradient-to-r hover:from-[#EEF2FF]/80 hover:to-white transition-colors flex items-center justify-between group cursor-pointer"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className={`w-8 h-8 rounded-xl ${service.iconBg} ${service.iconColor} flex items-center justify-center shrink-0 shadow-xs`}>
                                        <service.icon className="w-4 h-4" />
                                      </div>
                                      <div>
                                        <div className="flex items-center gap-2">
                                          <span className="text-xs font-bold text-slate-900 group-hover:text-[#5B61FE] transition-colors">
                                            {service.label}
                                          </span>
                                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-[#EEF2FF] group-hover:text-[#5B61FE] transition-colors">
                                            {service.tag}
                                          </span>
                                        </div>
                                        <span className="text-[11px] text-slate-500 block leading-tight mt-0.5">
                                          {service.desc}
                                        </span>
                                      </div>
                                    </div>

                                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#5B61FE] group-hover:translate-x-1 transition-[color,transform,opacity] shrink-0 opacity-0 group-hover:opacity-100" />
                                  </motion.button>
                                ))}
                              </div>
                            </div>

                            {/* Right Column: Featured Squad Card */}
                            <div className="col-span-5 bg-gradient-to-br from-[#0B1120] via-[#111827] to-[#1E1B4B] rounded-2xl p-4 text-white flex flex-col justify-between relative overflow-hidden shadow-lg border border-indigo-900/40">
                              <div className="space-y-2.5 relative z-10">
                                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-mono font-extrabold uppercase tracking-wider bg-white/10 text-[#A5B4FC] border border-white/10">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#5B61FE] animate-pulse" />
                                  <span>Dedicated Squad</span>
                                </div>

                                <h4 className="text-sm font-extrabold text-white leading-tight">
                                  Growth, Creative, Web & AI in One Place.
                                </h4>

                                <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                                  Senior digital team embedded in your Slack with 48h turnarounds.
                                </p>

                                <div className="space-y-1 pt-1 text-[10px] text-slate-300 font-medium">
                                  <div className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3 h-3 text-[#5B61FE]" />
                                    <span>Direct Slack Sync & Daily SLA</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3 h-3 text-[#5B61FE]" />
                                    <span>7-Day Free Trial Available</span>
                                  </div>
                                </div>
                              </div>

                              <div className="pt-3 relative z-10">
                                <button
                                  onClick={() => handleNavClick('free-trial')}
                                  className="w-full py-2 px-3 rounded-xl bg-[#5B61FE] hover:bg-[#4F46E5] text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-1.5 transition-[background-color,transform] hover:scale-[1.02] cursor-pointer"
                                >
                                  <Zap className="w-3 h-3 text-[#FFE600]" />
                                  <span>Start 7-Day Free Trial</span>
                                </button>
                              </div>
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  onMouseEnter={() => setHoveredNav(item.id)}
                  className={`relative px-3.5 py-1.5 text-xs xl:text-[13px] font-bold rounded-full transition-colors cursor-pointer z-10 flex items-center gap-1.5 ${
                    isActive ? 'text-[#5B61FE]' : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  {/* Sliding Hover Pill Background */}
                  {hoveredNav === item.id && (
                    <motion.span
                      layoutId="nav-hover-pill"
                      className="absolute inset-0 bg-white rounded-full shadow-xs border border-slate-200/70 -z-10"
                      transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                    />
                  )}

                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5B61FE]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Single Action CTA */}
          <div className="hidden sm:flex items-center">
            <button
              type="button"
              onClick={() => handleNavClick('free-trial')}
              className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-extrabold text-white bg-[#5B61FE] hover:bg-[#4F46E5] rounded-full shadow-md shadow-indigo-500/25 transition-[background-color,transform] hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#5B61FE]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* ─── 3. LASER HAIRLINE AMBIENT GLOW (BOTTOM BORDER) ─── */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#5B61FE]/40 to-transparent pointer-events-none" />

        {/* ─── 4. INTEGRATED HORIZON SCROLL PROGRESS BAR (2px) ─── */}
        <div className="absolute bottom-0 inset-x-0 h-[2px] bg-transparent overflow-hidden pointer-events-none">
          <div 
            ref={progressBarRef}
            style={{ transformOrigin: 'left', transform: 'scaleX(0)' }}
            className="w-full h-full bg-gradient-to-r from-[#5B61FE] via-[#7C3AED] to-[#5B61FE] will-change-transform"
          />
        </div>

        {/* ─── 5. RESPONSIVE MOBILE DRAWER ─── */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden w-full bg-white border-b border-slate-200/90 shadow-2xl overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
                
                {/* Mobile CTA */}
                <div className="pb-3 border-b border-slate-100">
                  <button
                    onClick={() => handleNavClick('free-trial')}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold text-white bg-[#5B61FE] rounded-xl shadow-md cursor-pointer"
                  >
                    <span>Start Free Trial</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Mobile Navigation List */}
                <div className="grid grid-cols-1 gap-1 text-sm font-semibold">
                  {NAV_ITEMS.map((item) => (
                    <React.Fragment key={item.id}>
                      <button
                        onClick={() => handleNavClick(item.id)}
                        className={`flex items-center justify-between w-full text-left px-3 py-2.5 rounded-xl transition-colors cursor-pointer ${
                          activePage === item.id ? 'text-[#5B61FE] bg-[#EEF2FF] font-bold' : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{item.label}</span>
                        {item.hasDropdown && <ArrowRight className="w-4 h-4 text-slate-400" />}
                      </button>

                      {item.hasDropdown && (
                        <div className="pl-4 space-y-1 my-1 border-l-2 border-indigo-100 ml-3">
                          {SERVICES_LIST.map((sub) => (
                            <button
                              key={sub.id}
                              onClick={() => handleNavClick(sub.id)}
                              className={`block w-full text-left py-1.5 px-3 text-xs font-medium rounded-lg cursor-pointer ${
                                activePage === sub.id ? 'text-[#5B61FE] font-bold' : 'text-slate-500 hover:text-slate-900'
                              }`}
                            >
                              <span className="font-bold block text-slate-800">{sub.label}</span>
                              <span className="text-[10px] text-slate-400 block">{sub.desc}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

    </div>
  );
};
