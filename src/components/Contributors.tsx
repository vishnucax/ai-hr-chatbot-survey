"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code, Database, PenTool, Megaphone, BookOpen, Users } from "lucide-react";

export default function Contributors() {
  const contributors = [
    {
      icon: Code,
      title: "Full-Stack Developers",
      desc: "Building the chatbot interface, API integrations, and training pipelines",
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      icon: Database,
      title: "Data Engineers",
      desc: "Processing survey responses into structured training datasets",
      color: "text-violet-600",
      bg: "bg-violet-50",
      border: "border-violet-100",
    },
    {
      icon: PenTool,
      title: "UI/UX Designers",
      desc: "Crafting intuitive interfaces for the HR AI chatbot experience",
      color: "text-rose-600",
      bg: "bg-rose-50",
      border: "border-rose-100",
    },
    {
      icon: Megaphone,
      title: "Marketing Team",
      desc: "Spreading the word and gathering diverse HR perspectives",
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
    },
    {
      icon: BookOpen,
      title: "Research Analysts",
      desc: "Analyzing response patterns and validating AI model outputs",
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-100",
    },
    {
      icon: Users,
      title: "HR Domain Experts",
      desc: "Providing real-world HR knowledge to ensure accuracy and relevance",
      color: "text-cyan-600",
      bg: "bg-cyan-50",
      border: "border-cyan-100",
    },
  ];

  return (
    <section id="contributors" className="relative py-24 md:py-32 bg-white">
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
            Our Team
          </span>
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-950 mb-6 tracking-tight">
            Meet the <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">Contributors</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">
            A multidisciplinary team of students, developers, and researchers working together from LEAD College, Palakkad.
          </p>
        </motion.div>

        {/* Bento Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {contributors.map((contributor, idx) => (
            <motion.div
              key={contributor.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] transition-all duration-300 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className={`w-14 h-14 rounded-2xl ${contributor.bg} ${contributor.border} border flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                <contributor.icon className={`w-6 h-6 ${contributor.color}`} />
              </div>
              <h3 className="font-heading font-bold text-2xl text-slate-900 mb-3 tracking-tight">
                {contributor.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                {contributor.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
