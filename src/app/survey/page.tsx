"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MouseGlow from "@/components/MouseGlow";
import FloatingParticles from "@/components/FloatingParticles";
import PageLoader from "@/components/PageLoader";
import SurveyForm from "@/components/SurveyForm";
import { useRouter } from "next/navigation";

export default function SurveyPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-[#f8fafc] overflow-x-hidden flex flex-col">
      <PageLoader>
        {/* Background gradient wash */}
        <div className="bg-gradient-wash" />

        {/* Dot grid texture overlay */}
        <div className="fixed inset-0 dot-grid opacity-30 pointer-events-none z-0" />

        {/* Floating Particles in Background */}
        <FloatingParticles />

        {/* Cursor tracking glow */}
        <MouseGlow />

        {/* Navigation Bar */}
        <Navbar />

        {/* Page Content */}
        <main className="relative z-10 flex-grow flex items-center justify-center py-24 px-4 sm:px-6">
          <div className="w-full max-w-4xl bg-white/90 backdrop-blur-xl border border-white/60 shadow-2xl rounded-3xl overflow-hidden min-h-[600px] flex flex-col my-8">
            {/* Header */}
            <div className="flex-shrink-0 relative border-b border-slate-100 p-6 sm:p-8 text-center bg-slate-50/50">
              <h1 className="font-heading text-3xl font-extrabold text-slate-900 tracking-tight">
                MBA HR Student Survey
              </h1>
              <p className="text-slate-500 mt-2 font-medium">Contribute to the future of HR AI</p>
            </div>
            
            {/* Survey Form */}
            <div className="flex-grow flex flex-col">
              <SurveyForm onComplete={() => router.push("/")} />
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </PageLoader>
    </div>
  );
}
