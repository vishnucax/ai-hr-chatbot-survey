"use client";

import React from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Database, Network, Activity, ArrowRight, Zap } from "lucide-react";

export default function Hero() {
  const handleScrollToSurvey = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("open-contribute-modal"));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" as const } 
    },
  };

  return (
    <section id="hero" className="relative pt-40 pb-24 overflow-hidden min-h-[95vh] flex flex-col items-center justify-center bg-slate-50">
      {/* Cinematic Glowing Background Orbs (Light Mode) */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-300/30 blur-[150px] pointer-events-none rounded-full mix-blend-multiply" />
      <div className="absolute top-[40%] right-[10%] w-[500px] h-[500px] bg-purple-300/30 blur-[150px] pointer-events-none rounded-full mix-blend-multiply" />
      <div className="absolute bottom-[-10%] left-[10%] w-[600px] h-[400px] bg-cyan-300/20 blur-[150px] pointer-events-none rounded-full mix-blend-multiply" />

      {/* Grid Pattern overlay for tech aesthetic */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.15] pointer-events-none" />

      <motion.div 
        className="max-w-7xl mx-auto px-6 w-full z-10 relative flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Top Content: Massive Typography */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20">
          
          {/* Pill Badge */}
          <motion.div
            variants={itemVariants}
            className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-[13px] font-semibold bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-[0_8px_20px_rgb(0,0,0,0.03)] mb-10"
          >
            <Zap className="w-4 h-4 text-cyan-500 group-hover:text-cyan-600 transition-colors" />
            <span className="text-slate-500">Introducing <span className="text-slate-950">Mallichepp × Rhodnet AI</span></span>
          </motion.div>

          {/* Cinematic Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-heading font-extrabold text-6xl sm:text-7xl lg:text-8xl tracking-tighter text-slate-950 mb-6 leading-[1.05]"
          >
            Train AI. <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Shape the Future.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-slate-600 text-lg sm:text-xl mb-12 max-w-2xl leading-relaxed font-medium"
          >
            MalliChepp is developing the next generation of HR Management AI Chatbots. Contribute your expertise to build a system powered by true human intelligence.
          </motion.p>

          {/* Action Area */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5">
            <button
              onClick={handleScrollToSurvey}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-white bg-slate-950 overflow-hidden hover:scale-105 transition-all duration-300 ease-out text-base shadow-[0_10px_30px_rgb(15,23,42,0.15)] hover:shadow-[0_15px_40px_rgb(15,23,42,0.25)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Contribute Now</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
            <a
              href="#about"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-slate-700 bg-white/60 backdrop-blur-md border border-slate-200 hover:bg-white hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 text-base"
            >
              View Architecture
            </a>
          </motion.div>
        </div>

        {/* Bottom Content: Bento Box Grid */}
        <motion.div 
          variants={itemVariants}
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {/* Bento Card 1: Wide Network Graph */}
          <div className="md:col-span-2 group relative rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 p-8 overflow-hidden hover:bg-white hover:border-white hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.03)]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-inner flex items-center justify-center mb-6 border border-blue-400">
                <Network className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-slate-900 mb-2 tracking-tight">Live Neural Network</h3>
              <p className="text-slate-600 text-sm leading-relaxed max-w-sm mb-8 font-medium">
                Visualizing the semantic pathways created by crowdsourced HR data and structured policies.
              </p>
              
              {/* Abstract Animation Light */}
              <div className="relative h-24 w-full mt-auto border-t border-slate-100 pt-6">
                <div className="absolute top-10 left-4 w-3 h-3 rounded-full bg-cyan-500 animate-ping" />
                <div className="absolute top-12 left-1/4 w-full h-[2px] bg-gradient-to-r from-cyan-400/80 to-transparent" />
                <div className="absolute top-8 right-12 w-4 h-4 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]" />
              </div>
            </div>
          </div>

          {/* Bento Card 2: Square Processing */}
          <div className="md:col-span-1 group relative rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 p-8 overflow-hidden hover:bg-white hover:border-white hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.03)]">
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-inner flex items-center justify-center mb-6 border border-cyan-300">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-slate-900 mb-2 tracking-tight">Real-time DB</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-8 font-medium">
                Syncing user contributions directly into the vector knowledge base.
              </p>
              <div className="mt-auto flex items-center gap-3 bg-slate-50 rounded-xl p-3 border border-slate-200">
                <Activity className="w-4 h-4 text-green-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-600 tracking-wider">INDEXING...</span>
              </div>
            </div>
          </div>

          {/* Bento Card 3: Square Intelligence */}
          <div className="md:col-span-1 group relative rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 p-8 overflow-hidden hover:bg-white hover:border-white hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.03)]">
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-500 shadow-inner flex items-center justify-center mb-6 border border-purple-400">
                <BrainCircuit className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-slate-900 mb-2 tracking-tight">Context AI</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                Evaluating experience and extracting policy context using NLP.
              </p>
            </div>
          </div>

          {/* Bento Card 4: Wide Callout */}
          <div className="md:col-span-2 group relative rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-8 overflow-hidden hover:border-slate-700 transition-colors flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div>
              <h3 className="font-heading text-2xl font-bold text-white mb-2 tracking-tight">Be Part of the Alpha</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-medium">
                Contributors get early access to the HR Assistant v1.0.
              </p>
            </div>
            <div className="hidden sm:flex w-16 h-16 rounded-full bg-white/5 border border-white/10 items-center justify-center group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300">
              <ArrowRight className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

