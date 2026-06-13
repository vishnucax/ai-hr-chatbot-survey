import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyContribute from "@/components/WhyContribute";
import Collaboration from "@/components/Collaboration";
import Contributors from "@/components/Contributors";
import Process from "@/components/Process";
import Impact from "@/components/Impact";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import MouseGlow from "@/components/MouseGlow";
import FloatingParticles from "@/components/FloatingParticles";
import PageLoader from "@/components/PageLoader";
import ContributeModal from "@/components/ContributeModal";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#f8fafc] overflow-x-hidden">
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

        {/* Page Sections */}
        <main className="relative z-10">
          <Hero />
          <WhyContribute />
          <Collaboration />
          <Contributors />
          <Process />
          <Impact />
          <CTA />
        </main>

        {/* Footer */}
        <Footer />
        
        {/* Modals */}
        <ContributeModal />
      </PageLoader>
    </div>
  );
}
