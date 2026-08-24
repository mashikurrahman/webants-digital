import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'motion/react';
import { setLenis } from './lib/smoothScroll';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { VideoLightboxModal } from './components/VideoLightboxModal';
import { BookCallModal } from './components/BookCallModal';
import { VideoTestimonial } from './data/siteContent';

import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { GrowthPage } from './pages/GrowthPage';
import { CreativePage } from './pages/CreativePage';
import { TechnologyPage } from './pages/TechnologyPage';
import { AiAutomationPage } from './pages/AiAutomationPage';
import { DigitalOperationsPage } from './pages/DigitalOperationsPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { WorkPage } from './pages/WorkPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { IndustryDetailPage } from './pages/IndustryDetailPage';
import { PricingPage } from './pages/PricingPage';
import { FreeTrialPage } from './pages/FreeTrialPage';
import { AboutPage } from './pages/AboutPage';
import { CareersPage } from './pages/CareersPage';
import { JobDetailPage } from './pages/JobDetailPage';
import { InsightsPage } from './pages/InsightsPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [pageParam, setPageParam] = useState<string | undefined>(undefined);
  const lenisRef = useRef<Lenis | null>(null);

  // Modal States
  const [selectedVideo, setSelectedVideo] = useState<VideoTestimonial | null>(null);
  const [isBookCallOpen, setIsBookCallOpen] = useState<boolean>(false);

  useEffect(() => {
    /*
      Frame-rate-independent damping, deliberately WITHOUT `duration`/`easing`.
      Lenis resolves its two modes in this order (Animate.advance):

        if (duration && easing) { ...fixed-length eased tween... }
        else if (lerp)          { ...damp(current, target, lerp * 60, dt)... }

      So supplying `duration` silently disables `lerp` and puts the mouse wheel into
      tween mode, where every wheel notch restarts an 850ms ease-out from the current
      position. Continuous scrolling then reads as rubbery lag, which is the opposite
      of the intent. Lerp mode tracks the target every frame instead and is scaled by
      real delta time, so it renders at whatever the display can do — 60, 120 or 144Hz.
    */
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.08,  // Lower = snappier, less interpolation lag
      smoothWheel: true,
      wheelMultiplier: 1.0, // Neutral: no amplification, just smooth interpolation
      // Touch stays native: mobile inertia already runs on the compositor at 120Hz,
      // and syncTouch would move it onto the main thread for a worse result.
      syncTouch: false,
      touchMultiplier: 1.6,
      infinite: false,
      anchors: true,
      respectReducedMotion: true,
    });

    lenisRef.current = lenis;
    setLenis(lenis);

    return () => {
      setLenis(null);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const handleNavigate = (page: string, param?: string) => {
    setCurrentPage(page);
    setPageParam(param);
    // Reset Lenis's internal target too, otherwise it keeps animating toward the
    // old page's offset and fights the fresh render for a few hundred ms.
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            onNavigate={handleNavigate}
            onSelectVideo={(video) => setSelectedVideo(video)}
            onOpenBookCall={() => setIsBookCallOpen(true)}
          />
        );
      case 'services':
        return <ServicesPage onNavigate={handleNavigate} />;
      case 'growth':
        return <GrowthPage onNavigate={handleNavigate} onOpenBookCall={() => setIsBookCallOpen(true)} />;
      case 'creative':
        return <CreativePage onNavigate={handleNavigate} />;
      case 'technology':
        return <TechnologyPage onNavigate={handleNavigate} />;
      case 'ai-automation':
        return <AiAutomationPage onNavigate={handleNavigate} />;
      case 'digital-operations':
        return <DigitalOperationsPage onNavigate={handleNavigate} />;
      case 'industries':
        return <IndustriesPage onNavigate={handleNavigate} onOpenBookCall={() => setIsBookCallOpen(true)} />;
      case 'industry-detail':
      case 'sector-detail':
        return (
          <IndustryDetailPage 
            industryId={pageParam || 'moving'} 
            onNavigate={handleNavigate} 
            onOpenBookCall={() => setIsBookCallOpen(true)} 
          />
        );
      case 'work':
        return <WorkPage onNavigate={handleNavigate} />;
      case 'project-detail':
      case 'case-study-detail':
      case 'work-detail':
        return (
          <ProjectDetailPage 
            projectId={pageParam || 'white-lighting'}
            onNavigate={handleNavigate} 
            onOpenBookCall={() => setIsBookCallOpen(true)} 
          />
        );
      case 'pricing':
        return <PricingPage onNavigate={handleNavigate} onOpenBookCall={() => setIsBookCallOpen(true)} />;
      case 'free-trial':
        return <FreeTrialPage />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} onOpenBookCall={() => setIsBookCallOpen(true)} />;
      case 'careers':
        return <CareersPage onNavigate={handleNavigate} />;
      case 'job-detail':
        return <JobDetailPage jobId={pageParam || 'graphic-designer'} onNavigate={handleNavigate} />;
      case 'insights':
        return <InsightsPage />;
      case 'contact':
        return <ContactPage />;
      case 'privacy':
        return <PrivacyPage onNavigate={handleNavigate} />;
      case 'terms':
        return <TermsPage onNavigate={handleNavigate} />;
      default:
        return (
          <HomePage 
            onNavigate={handleNavigate}
            onSelectVideo={(video) => setSelectedVideo(video)}
            onOpenBookCall={() => setIsBookCallOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-slate-900 antialiased selection:bg-[#5B61FE] selection:text-white">
      <Header 
        activePage={currentPage} 
        onNavigate={handleNavigate} 
        onOpenBookCall={() => setIsBookCallOpen(true)} 
      />

      <main className="flex-1 overflow-x-clip">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage + (pageParam || '')}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer 
        onNavigate={handleNavigate} 
        onOpenBookCall={() => setIsBookCallOpen(true)}
      />

      {/* Lightbox Video Modal */}
      <VideoLightboxModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />

      {/* Book Call Modal */}
      <BookCallModal
        isOpen={isBookCallOpen}
        onClose={() => setIsBookCallOpen(false)}
      />
    </div>
  );
}

