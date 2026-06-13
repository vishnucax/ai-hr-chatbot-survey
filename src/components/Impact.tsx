"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, target]);

  return (
    <span ref={ref} className="bg-gradient-to-br from-slate-950 to-slate-700 bg-clip-text text-transparent">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Impact() {
  const stats = [
    { value: 500, suffix: "+", label: "Survey Responses Goal" },
    { value: 50, suffix: "+", label: "HR Scenarios Covered" },
    { value: 10, suffix: "K+", label: "Training Data Points" },
    { value: 95, suffix: "%", label: "Target Accuracy" },
  ];

  return (
    <section className="relative py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200 shadow-sm mb-4">
            Expected Impact
          </span>
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-950 mb-6 tracking-tight">
            Our <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Target Milestones</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">
            Ambitious goals backed by real contributions from the HR community.
          </p>
        </motion.div>

        {/* Bento Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col items-center justify-center text-center overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className="font-heading font-black text-5xl sm:text-6xl tracking-tighter mb-4">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-slate-500 text-sm font-bold tracking-wide uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
