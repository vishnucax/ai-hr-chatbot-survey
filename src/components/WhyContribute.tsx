"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, Shield, TrendingUp, Lightbulb, Heart, Zap } from "lucide-react";

export default function WhyContribute() {
  const reasons = [
    {
      icon: Brain,
      title: "Shape Real AI",
      desc: "Your HR expertise directly trains an AI model. This isn't a generic survey — every response shapes how the chatbot understands recruitment, policies, and employee management.",
      color: "text-blue-600",
      iconBg: "bg-gradient-to-br from-blue-500 to-indigo-500",
      iconColor: "text-white",
      shadowClass: "shadow-[0_8px_30px_rgb(0,0,0,0.03)]",
      hoverShadowClass: "hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)]",
      borderColor: "border-slate-200/80 hover:border-slate-300",
      glowBg: "from-blue-50 to-transparent",
    },
    {
      icon: Shield,
      title: "100% Anonymous",
      desc: "We collect zero personal information. No names, no emails required for the survey. Your knowledge matters, not your identity.",
      color: "text-violet-600",
      iconBg: "bg-gradient-to-br from-violet-500 to-purple-500",
      iconColor: "text-white",
      shadowClass: "shadow-[0_8px_30px_rgb(0,0,0,0.03)]",
      hoverShadowClass: "hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)]",
      borderColor: "border-slate-200/80 hover:border-slate-300",
      glowBg: "from-violet-50 to-transparent",
    },
    {
      icon: TrendingUp,
      title: "Industry Impact",
      desc: "Help build AI that can assist thousands of HR professionals daily — from startups to enterprises, this tool will transform how HR departments operate.",
      color: "text-green-600",
      iconBg: "bg-gradient-to-br from-emerald-500 to-green-500",
      iconColor: "text-white",
      shadowClass: "shadow-[0_8px_30px_rgb(0,0,0,0.03)]",
      hoverShadowClass: "hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)]",
      borderColor: "border-slate-200/80 hover:border-slate-300",
      glowBg: "from-green-50 to-transparent",
    },
    {
      icon: Lightbulb,
      title: "Research Publication",
      desc: "This project will be documented as an academic research paper. Contributors are part of a legitimate AI training research initiative.",
      color: "text-amber-600",
      iconBg: "bg-gradient-to-br from-amber-400 to-orange-500",
      iconColor: "text-white",
      shadowClass: "shadow-[0_8px_30px_rgb(0,0,0,0.03)]",
      hoverShadowClass: "hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)]",
      borderColor: "border-slate-200/80 hover:border-slate-300",
      glowBg: "from-amber-50 to-transparent",
    },
    {
      icon: Heart,
      title: "Community Driven",
      desc: "Built by MCA students from LEAD College Palakkad and powered by Rhodnet AI's research team. This is grassroots AI development at its finest.",
      color: "text-rose-600",
      iconBg: "bg-gradient-to-br from-rose-500 to-pink-500",
      iconColor: "text-white",
      shadowClass: "shadow-[0_8px_30px_rgb(0,0,0,0.03)]",
      hoverShadowClass: "hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)]",
      borderColor: "border-slate-200/80 hover:border-slate-300",
      glowBg: "from-rose-50 to-transparent",
    },
    {
      icon: Zap,
      title: "Quick & Easy",
      desc: "The survey takes just 5–10 minutes. Answer from your experience — there are no right or wrong answers, only valuable perspectives.",
      color: "text-cyan-600",
      iconBg: "bg-gradient-to-br from-cyan-400 to-blue-500",
      iconColor: "text-white",
      shadowClass: "shadow-[0_8px_30px_rgb(0,0,0,0.03)]",
      hoverShadowClass: "hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)]",
      borderColor: "border-slate-200/80 hover:border-slate-300",
      glowBg: "from-cyan-50 to-transparent",
    },
  ];

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden bg-white">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-[10%] w-96 h-96 bg-blue-100/50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[10%] w-96 h-96 bg-purple-100/50 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200 shadow-sm mb-4">
            Why Contribute?
          </span>
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-950 mb-6 tracking-tight">
            Why Your Contribution <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Matters</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">
            Every response helps build smarter, more context-aware HR AI systems. Here&apos;s why this matters.
          </p>
        </motion.div>

        {/* Bento Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, idx) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.5, 
                delay: idx * 0.1,
              }}
              whileHover={{ y: -5 }}
              className={`relative p-8 rounded-3xl bg-white/70 backdrop-blur-xl border transition-all duration-300 ease-out group overflow-hidden ${reason.borderColor} ${reason.shadowClass} ${reason.hoverShadowClass}`}
            >
              {/* Internal Accent Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${reason.glowBg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
              
              {/* Reflection Shine Sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

              {/* Icon Container */}
              <div className={`w-14 h-14 rounded-2xl ${reason.iconBg} border border-white/20 shadow-inner flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                <reason.icon className={`w-6 h-6 ${reason.iconColor}`} />
              </div>

              {/* Text Content */}
              <h3 className="font-heading font-bold text-2xl text-slate-900 mb-3 tracking-tight">
                {reason.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                {reason.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


