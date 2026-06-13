"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

export default function CTA() {
  return (
    <section id="survey-section" className="relative py-24 md:py-32 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-200 p-12 md:p-20 text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]"
        >
          {/* Background decorative glows */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-100/60 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-violet-100/60 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/50 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-blue-50 text-blue-600 border border-blue-100 mb-8">
              🎯 Take Action
            </span>

            <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-950 mb-6 tracking-tight max-w-3xl">
              Ready to Shape the <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Future of HR AI?</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg md:text-xl font-medium mb-12 leading-relaxed">
              Your 5-minute survey response will directly contribute to building smarter, 
              more empathetic AI systems for HR management. No sign-up required.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full sm:w-auto">
              <a
                href="https://forms.gle/YOUR_FORM_ID"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full font-bold text-white bg-slate-950 overflow-hidden hover:scale-105 transition-all duration-300 ease-out text-lg shadow-[0_10px_30px_rgb(15,23,42,0.15)] hover:shadow-[0_15px_40px_rgb(15,23,42,0.25)] w-full sm:w-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">Take the Survey Now</span>
                <ArrowRight className="relative z-10 w-6 h-6 group-hover:translate-x-1.5 transition-transform duration-300" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full font-bold text-slate-700 bg-white border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 transition-all duration-300 text-lg w-full sm:w-auto"
              >
                <Mail className="w-6 h-6" />
                Contact Us
              </a>
            </div>

            <p className="text-slate-500 font-medium text-sm mt-10 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              100% anonymous · No personal data collected · Takes only 5-10 minutes
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
