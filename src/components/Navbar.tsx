"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Contributors", href: "#contributors" },
    { name: "Research", href: "#research" },
    { name: "Contact", href: "#contact" },
  ];

  const handleScrollToSurvey = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("open-contribute-modal"));
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          scrolled ? "top-4 w-[95%] sm:w-[90%] max-w-6xl" : "top-6 w-[95%] sm:w-[90%] max-w-6xl"
        }`}
      >
        <div 
          className={`flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 rounded-[20px] transition-all duration-500 ${
            scrolled 
              ? "bg-white/75 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)]" 
              : "bg-white/50 backdrop-blur-md border border-white/40 shadow-[0_4px_20px_rgb(0,0,0,0.02)]"
          }`}
        >
          {/* Left Side: Logo & Badge */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-sm border border-slate-200/50 group-hover:shadow-md transition-shadow duration-300">
                <Image
                  src="/mallichepp-logo.png"
                  alt="MalliChepp"
                  fill
                  className="object-contain bg-white"
                />
              </div>
              <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                MalliChepp
              </span>
            </a>
            
            {/* Premium Pill Badge */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50/80 border border-slate-200/60 shadow-sm backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[11px] font-semibold tracking-wide text-slate-600">
                × Rhodnet AI
              </span>
            </div>
          </div>

          {/* Center: Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors duration-300 group rounded-full hover:bg-slate-50/50"
              >
                {link.name}
                {/* Underline Reveal Animation */}
                <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-slate-900 rounded-full origin-left scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100 transition-all duration-300 ease-out" />
              </a>
            ))}
          </nav>

          {/* Right Side: CTA Button */}
          <div className="hidden md:flex items-center">
            <a
              href="#survey-section"
              onClick={handleScrollToSurvey}
              className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-slate-900 overflow-hidden shadow-lg shadow-slate-900/20 hover:shadow-xl hover:shadow-slate-900/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              {/* Button Inner Glow Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <span className="relative z-10">Contribute Now</span>
              <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 ease-out" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors rounded-xl border border-slate-200/60 bg-white/60 shadow-sm"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            {/* Mobile Drawer Content */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute top-[88px] left-[5%] right-[5%] bg-white/95 backdrop-blur-xl border border-white/60 rounded-[20px] shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col p-6 gap-2">
                <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-slate-50 border border-slate-100 w-max mb-4">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-[11px] font-semibold text-slate-600">Rhodnet AI Online</span>
                </div>
                
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium text-slate-600 hover:text-slate-900 transition-colors py-3 border-b border-slate-100 last:border-0"
                  >
                    {link.name}
                  </a>
                ))}
                
                <a
                  href="#survey-section"
                  onClick={handleScrollToSurvey}
                  className="mt-4 w-full group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-slate-900 shadow-lg shadow-slate-900/20 hover:shadow-xl transition-all"
                >
                  <span className="relative z-10">Contribute Now</span>
                  <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

