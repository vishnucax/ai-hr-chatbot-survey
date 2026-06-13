"use client";

import React from "react";
import { motion } from "framer-motion";
import { ClipboardList, Database, Cpu, Rocket, ArrowRight } from "lucide-react";

export default function Process() {
  const steps = [
    {
      icon: ClipboardList,
      step: "01",
      title: "Take the Survey",
      desc: "Answer HR-related questions from your experience. The survey covers recruitment, policies, employee management, and more.",
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      icon: Database,
      step: "02",
      title: "Data Processing",
      desc: "Your anonymized responses are structured into training-ready datasets by our data engineering team.",
      color: "text-violet-600",
      bg: "bg-violet-50",
      border: "border-violet-100",
    },
    {
      icon: Cpu,
      step: "03",
      title: "AI Training",
      desc: "We fine-tune our language model using your real-world HR knowledge, making the chatbot smarter with every response.",
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-100",
    },
    {
      icon: Rocket,
      step: "04",
      title: "Launch & Impact",
      desc: "The trained AI chatbot is deployed to assist HR professionals across organizations — powered by human intelligence.",
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
    },
  ];

  return (
    <section id="research" className="relative py-24 md:py-32 bg-slate-50">
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
            How It Works
          </span>
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-950 mb-6 tracking-tight">
            From Survey to <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Smart AI</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">
            A simple 4-step process that transforms your expertise into intelligent AI capabilities.
          </p>
        </motion.div>

        {/* Horizontal Bento Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] transition-all duration-300 group flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <div className={`w-14 h-14 rounded-2xl ${step.bg} ${step.border} border flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  <step.icon className={`w-6 h-6 ${step.color}`} />
                </div>
                <span className="text-4xl font-heading font-black text-slate-100 group-hover:text-slate-200 transition-colors duration-300">
                  {step.step}
                </span>
              </div>
              
              <h3 className="font-heading font-bold text-2xl text-slate-900 mb-3 tracking-tight">
                {step.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium mt-auto">
                {step.desc}
              </p>

              {/* Connecting arrow visible on large screens */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-slate-300">
                  <ArrowRight className="w-6 h-6" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
