"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for the browser to paint and for framer-motion animations to be ready
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // 800ms ensures the main thread has completed heavy lifting

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-slate-50 flex flex-col items-center p-6 overflow-hidden pointer-events-none"
          >
            {/* Header Skeleton */}
            <div className="w-full max-w-7xl flex justify-between items-center mb-24 mt-4">
              <div className="w-32 h-10 bg-slate-200/80 animate-pulse rounded-full" />
              <div className="hidden md:flex gap-6">
                <div className="w-20 h-4 bg-slate-200/80 animate-pulse rounded-full" />
                <div className="w-20 h-4 bg-slate-200/80 animate-pulse rounded-full" />
                <div className="w-20 h-4 bg-slate-200/80 animate-pulse rounded-full" />
              </div>
              <div className="w-28 h-10 bg-slate-200/80 animate-pulse rounded-full" />
            </div>

            {/* Hero Content Skeleton */}
            <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center mt-10">
              {/* Pill badge */}
              <div className="w-64 h-10 bg-slate-200/80 animate-pulse rounded-full mb-10" />
              {/* Massive Headings */}
              <div className="w-3/4 h-20 bg-slate-200/80 animate-pulse rounded-2xl mb-4" />
              <div className="w-1/2 h-20 bg-slate-200/80 animate-pulse rounded-2xl mb-12" />
              {/* Subheading */}
              <div className="w-2/3 h-6 bg-slate-200/80 animate-pulse rounded-full mb-2" />
              <div className="w-1/2 h-6 bg-slate-200/80 animate-pulse rounded-full mb-12" />
              {/* Buttons */}
              <div className="flex gap-4 mb-24">
                <div className="w-44 h-14 bg-slate-200/80 animate-pulse rounded-full" />
                <div className="w-44 h-14 bg-slate-200/80 animate-pulse rounded-full" />
              </div>
            </div>

            {/* Bento Grid Skeleton */}
            <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 absolute bottom-10">
              <div className="md:col-span-2 h-[250px] bg-white border border-slate-100 shadow-sm animate-pulse rounded-3xl" />
              <div className="md:col-span-1 h-[250px] bg-white border border-slate-100 shadow-sm animate-pulse rounded-3xl" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={isLoading ? "h-screen overflow-hidden opacity-0" : "opacity-100 transition-opacity duration-1000"}>
        {children}
      </div>
    </>
  );
}
