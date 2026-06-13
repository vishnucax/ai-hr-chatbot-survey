"use client";

import React, { useEffect, useRef } from "react";

export default function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      
      // Update DOM directly to bypass React rendering cycle and eliminate lag
      glowRef.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(59, 130, 246, 0.05), rgba(124, 58, 237, 0.02) 40%, transparent 80%)`;
    };

    const handleMouseEnter = () => {
      if (glowRef.current) glowRef.current.style.opacity = "1";
    };
    
    const handleMouseLeave = () => {
      if (glowRef.current) glowRef.current.style.opacity = "0";
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    // Initial opacity
    if (glowRef.current) glowRef.current.style.opacity = "1";

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500 opacity-0"
    />
  );
}
