"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/src/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightSize?: number;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className,
  spotlightColor = "rgba(91, 97, 254, 0.12)",
  spotlightSize = 350,
  ...props
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const frame = useRef(0);

  useEffect(() => () => {
    if (frame.current) cancelAnimationFrame(frame.current);
  }, []);

  /*
    Coalesced to one read + one write per frame. `mousemove` can fire several times between
    paints, and `getBoundingClientRect()` forces a synchronous layout — interleaved with the
    custom-property write on the same element that is a layout thrash loop, which is felt most
    when the pointer moves while the page is scrolling. Measuring inside the frame instead of
    caching on enter keeps the rect correct as the card moves under the scroller.
  */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    pointer.current.x = e.clientX;
    pointer.current.y = e.clientY;
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const node = divRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      node.style.setProperty("--spotlight-x", `${pointer.current.x - rect.left}px`);
      node.style.setProperty("--spotlight-y", `${pointer.current.y - rect.top}px`);
    });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={cn("group/spotlight relative overflow-hidden", className)}
      style={{
        // Default center before first mouse move
        ["--spotlight-x" as string]: "50%",
        ["--spotlight-y" as string]: "50%",
      }}
      {...props}
    >
      {/* High-Performance Pure CSS Radial Spotlight (Zero React Re-renders) */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover/spotlight:opacity-100 transition-opacity duration-300 rounded-[inherit]"
        style={{
          background: `radial-gradient(${spotlightSize}px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), ${spotlightColor}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
};
