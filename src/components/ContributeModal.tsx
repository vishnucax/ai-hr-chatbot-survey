"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Briefcase, 
  GraduationCap, 
  Search, 
  BarChart, 
  FlaskConical, 
  Bot,
  Mail,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ContributeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
    };
    window.addEventListener("open-contribute-modal", handleOpen);
    return () => window.removeEventListener("open-contribute-modal", handleOpen);
  }, []);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleNotifyMe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setEmailError("Please enter your email.");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    
    setEmailError("");
    setIsSubscribed(true);
  };

  const personas = [
    {
      id: "hr-pro",
      name: "HR PROFESSIONALS",
      icon: Briefcase,
      blocked: true,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      id: "mba-student",
      name: "MBA STUDENTS",
      icon: GraduationCap,
      blocked: false,
      message: "last one input is available",
      color: "text-purple-500",
      bgColor: "bg-purple-100",
      link: "#survey-section"
    },
    {
      id: "recruiters",
      name: "RECRUITERS",
      icon: Search,
      blocked: true,
      color: "text-cyan-500",
      bgColor: "bg-cyan-100",
    },
    {
      id: "hr-execs",
      name: "HR EXECUTIVES",
      icon: BarChart,
      blocked: true,
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      id: "researchers",
      name: "RESEARCHERS",
      icon: FlaskConical,
      blocked: true,
      color: "text-indigo-500",
      bgColor: "bg-indigo-100",
    },
    {
      id: "ai-enthusiasts",
      name: "AI ENTHUSIASTS",
      icon: Bot,
      blocked: true,
      color: "text-pink-500",
      bgColor: "bg-pink-100",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="bg-white/90 backdrop-blur-xl border border-white/60 shadow-2xl rounded-3xl overflow-hidden m-4 relative max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="flex-shrink-0 relative border-b border-slate-100 p-6 sm:p-8 text-center bg-slate-50/50">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute right-6 top-6 z-50 p-2 rounded-full hover:bg-slate-200/50 text-slate-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <h2 className="font-heading text-3xl font-extrabold text-slate-900 tracking-tight">
                  Select your -
                </h2>
                <p className="text-slate-500 mt-2 font-medium">Choose your persona to start contributing</p>
              </div>

              {/* Content */}
              <div className="overflow-y-auto p-6 sm:p-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {personas.map((p) => (
                    <div
                      key={p.id}
                      className={`relative group rounded-2xl border p-6 flex flex-col items-center justify-center text-center transition-all duration-300 ${
                        p.blocked
                          ? "border-slate-200 bg-slate-50/50 opacity-70 cursor-not-allowed hover:bg-slate-100/50"
                          : "border-purple-200 bg-white hover:border-purple-300 hover:shadow-[0_10px_30px_rgb(168,85,247,0.15)] hover:-translate-y-1 cursor-pointer"
                      }`}
                      onClick={() => {
                        if (!p.blocked) {
                          setIsOpen(false);
                          router.push("/survey");
                        } else {
                          const notifySection = document.getElementById("notify-me-section");
                          if (notifySection) {
                            notifySection.scrollIntoView({ behavior: "smooth", block: "center" });
                          }
                        }
                      }}
                    >
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${p.bgColor} ${p.color}`}>
                        <p.icon className="w-8 h-8" />
                      </div>
                      <h3 className="font-bold text-sm sm:text-base text-slate-800 tracking-tight mb-2">
                        {p.name}
                      </h3>
                      
                      {p.blocked ? (
                        <div className="text-xs font-semibold text-rose-500 bg-rose-50 px-3 py-1 rounded-full">
                          Maximum inputs are reached
                        </div>
                      ) : (
                        <div className="text-xs font-semibold text-green-600 bg-green-50 border border-green-100 px-3 py-1 rounded-full animate-pulse">
                          {p.message}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Footer Section - Notify Me */}
                <div id="notify-me-section" className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
                    <p className="text-slate-300 text-sm leading-relaxed font-medium mb-6">
                      To make the AI training data more accurate, only limited data are taken. To make it more accurate in the first stage, stage two another set of data will be used. For stage 2 data contribution, please subscribe below.
                    </p>

                    {isSubscribed ? (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-green-400 bg-green-400/10 px-6 py-3 rounded-full border border-green-400/20"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-semibold">Success - you will be notify in stage 2</span>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleNotifyMe} className="w-full max-w-md">
                        <div className="flex flex-col sm:flex-row gap-3 w-full">
                          <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <Mail className="w-4 h-4 text-slate-400" />
                            </div>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter your email"
                              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            />
                          </div>
                          <button
                            type="submit"
                            className="whitespace-nowrap px-6 py-3 rounded-xl font-bold text-slate-900 bg-white hover:bg-slate-100 hover:scale-105 transition-all duration-300"
                          >
                            Notify Me
                          </button>
                        </div>
                        {emailError && (
                          <div className="mt-2 flex items-center justify-center gap-1.5 text-rose-400 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            <span>{emailError}</span>
                          </div>
                        )}
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
