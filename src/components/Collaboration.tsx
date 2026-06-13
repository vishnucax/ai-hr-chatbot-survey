"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Collaboration() {
  return (
    <section className="relative py-24 md:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-white text-slate-600 border border-slate-200 shadow-sm mb-4">
            Partnership
          </span>
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-950 mb-6 tracking-tight">
            A Collaboration Between <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Students & Industry</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">
            MalliChepp and Rhodnet AI are working together to bridge the gap between academic research and real-world AI applications.
          </p>
        </motion.div>

        {/* Two Partner Cards (Bento) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
          {/* MalliChepp Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -5 }}
            className="relative p-10 rounded-3xl bg-white/70 backdrop-blur-xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] transition-all duration-300 text-center group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="w-24 h-24 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center mx-auto mb-8 overflow-hidden group-hover:scale-110 transition-transform duration-300">
              <Image
                src="/mallichepp-logo.png"
                alt="MalliChepp"
                width={64}
                height={64}
                className="rounded-xl object-contain"
              />
            </div>
            <h3 className="font-heading font-bold text-3xl text-slate-900 mb-2 tracking-tight">MalliChepp</h3>
            <p className="text-sm font-bold tracking-wider uppercase text-blue-600 mb-4">Student Research Team</p>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              A dedicated team of MCA students from <strong className="text-slate-800">LEAD College (Autonomous), Palakkad</strong>. 
              Passionate about leveraging AI to solve real-world HR challenges through academic research and hands-on development.
            </p>
          </motion.div>

          {/* Rhodnet AI Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -5 }}
            className="relative p-10 rounded-3xl bg-white/70 backdrop-blur-xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] transition-all duration-300 text-center group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="w-24 h-24 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center mx-auto mb-8 overflow-hidden group-hover:scale-110 transition-transform duration-300">
              <Image
                src="/rhodnet-logo.png"
                alt="Rhodnet AI"
                width={64}
                height={64}
                className="rounded-xl object-contain"
              />
            </div>
            <h3 className="font-heading font-bold text-3xl text-slate-900 mb-2 tracking-tight">Rhodnet AI</h3>
            <p className="text-sm font-bold tracking-wider uppercase text-violet-600 mb-4">AI Startup · Coimbatore</p>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              An AI R&D startup based at <strong className="text-slate-800">PSG Techs COE Indutech, Coimbatore</strong>. 
              Specializing in WebAI, agentic workflows, LLMs, and AI-enhanced business automation solutions since April 2025.
            </p>
          </motion.div>
        </div>

        {/* Who Can Contribute (Mini Bento Grid) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 max-w-5xl mx-auto"
        >
          <h3 className="font-heading font-bold text-2xl text-slate-900 text-center mb-8">
            Who Can Contribute?
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { emoji: "👔", role: "HR Professionals" },
              { emoji: "🎓", role: "MBA Students" },
              { emoji: "🔍", role: "Recruiters" },
              { emoji: "📊", role: "HR Executives" },
              { emoji: "🧪", role: "Researchers" },
              { emoji: "🤖", role: "AI Enthusiasts" },
            ].map((item, idx) => (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-3xl block mb-3">{item.emoji}</span>
                <span className="text-xs font-bold text-slate-700 tracking-wide uppercase">{item.role}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-16"
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent("open-contribute-modal"));
            }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-bold text-white bg-slate-950 hover:scale-105 transition-transform duration-300 shadow-[0_10px_30px_rgb(15,23,42,0.15)]"
          >
            Start Contributing
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
