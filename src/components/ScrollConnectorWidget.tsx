import React, { useEffect, useRef } from 'react';

export const ScrollConnectorWidget: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateBar = () => {
      if (barRef.current) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = window.scrollY / (totalHeight || 1);
        const clamped = Math.min(1, Math.max(0, progress));
        barRef.current.style.transform = `scaleY(${clamped})`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateBar);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateBar();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed left-6 top-[20%] bottom-[20%] w-[3px] bg-slate-100 rounded-full z-40 hidden lg:block overflow-hidden pointer-events-none">
      {/* Neon Fill track with GPU acceleration */}
      <div 
        ref={barRef}
        style={{ transformOrigin: 'top', transform: 'scaleY(0)' }}
        className="w-full h-full bg-[#5B61FE] shadow-[0_0_8px_#5B61FE] rounded-full will-change-transform"
      />
      
      {/* Glowing floating indicator bubble */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <span className="text-[7px] font-bold text-slate-400 font-mono tracking-widest whitespace-nowrap rotate-90 origin-center block uppercase translate-x-[4px] mt-12">
          SCROLL TO CONNECT
        </span>
      </div>
    </div>
  );
};
