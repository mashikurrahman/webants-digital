import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, PhoneCall, Sparkles } from 'lucide-react';

interface CinematicCtaProps {
  onStartTrial: () => void;
  onBookCall: () => void;
  onNavigate: (page: string) => void;
}

export const CinematicCta: React.FC<CinematicCtaProps> = ({ onStartTrial, onBookCall, onNavigate }) => {
  return (
    <section className="relative w-full min-h-screen bg-brand-dark flex flex-col justify-between overflow-hidden font-body text-brand-light">
      {/* Background Video Ecosystem */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40 mix-blend-screen"
          poster="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
        >
          {/* Abstract dark blue particle/wave loop for cinematic feel */}
          <source src="https://cdn.pixabay.com/video/2020/02/16/32332-392095907_large.mp4" type="video/mp4" />
        </video>
        {/* Deep dark gradient overlay for text legibility and rich ecosystem feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/50 to-brand-dark" />
      </div>

      {/* Main CTA Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow px-4 py-24 mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          {/* Subtle Accent Overline */}
          <div className="flex items-center justify-center gap-3 text-brand-blue-soft font-semibold tracking-[0.25em] uppercase text-sm">
            <span className="w-8 h-[1px] bg-brand-blue-soft/50" />
            <span>Scale Your Operations</span>
            <span className="w-8 h-[1px] bg-brand-blue-soft/50" />
          </div>

          {/* Editorial Typography Heading */}
          <h2 className="font-heading text-5xl sm:text-7xl lg:text-[5.5rem] font-normal leading-[1.05] tracking-tight">
            Ready to build your <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-brand-blue-soft">
              growth engine?
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl font-light text-brand-light/80 leading-relaxed">
            Stop juggling fragmented agencies. Unify Growth, Creative, Technology, AI & Automation, and Digital Operations under one dedicated squad.
          </p>

          {/* Liquid Glassmorphism Dual Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-8">
            <button
              onClick={onStartTrial}
              className="group relative px-8 py-4 w-full sm:w-auto overflow-hidden rounded-full bg-brand-blue hover:bg-brand-blue-soft transition-[background-color,box-shadow] duration-300 text-brand-light font-medium tracking-wide flex items-center justify-center gap-3 shadow-[0_0_40px_-10px_rgba(91,90,254,0.5)] hover:shadow-[0_0_60px_-15px_rgba(133,133,255,0.6)] cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start 7-Day Free Trial
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <button
              onClick={onBookCall}
              className="group relative px-8 py-4 w-full sm:w-auto overflow-hidden rounded-full border border-brand-light/20 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-brand-light/40 transition-colors duration-300 text-brand-light font-medium tracking-wide flex items-center justify-center gap-3 cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-brand-blue-soft" />
                Book Strategy Call
              </span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Minimal WebAnts Footer Bar */}
      <div className="relative z-10 w-full border-t border-white/10 bg-brand-dark-card/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            {/* Official WebAnts White Logo */}
            <img 
              src="/logo-white.png" 
              alt="WebAnts Digital" 
              loading="lazy"
              decoding="async"
              className="h-7 w-auto object-contain"
            />
            <span className="text-brand-light/30">|</span>
            <span className="text-brand-light/60 text-sm font-light">Connected Digital Partner</span>
          </div>

          <div className="flex items-center gap-6 text-sm font-light text-brand-light/60">
            <button onClick={() => onNavigate('services')} className="hover:text-brand-blue-soft transition-colors cursor-pointer">Services</button>
            <button onClick={() => onNavigate('work')} className="hover:text-brand-blue-soft transition-colors cursor-pointer">Work</button>
            <button onClick={() => onNavigate('pricing')} className="hover:text-brand-blue-soft transition-colors cursor-pointer">Pricing</button>
            <button onClick={() => onNavigate('contact')} className="hover:text-brand-blue-soft transition-colors cursor-pointer">Contact</button>
          </div>

          <div className="text-sm font-light text-brand-light/40">
            &copy; {new Date().getFullYear()} WebAnts Digital.
          </div>
        </div>
      </div>
    </section>
  );
};
