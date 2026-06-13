"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { surveySchema, SurveyFormData } from "@/lib/validations/survey";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft } from "lucide-react";

const SECTIONS = [
  { id: "profile", title: "Student Profile", fields: ["fullName", "email", "phone", "college", "mbaYear", "hrInterest"] },
  { id: "knowledge", title: "HR Knowledge", fields: ["q7", "q8", "q9", "q10", "q11"] },
  { id: "scenarios", title: "HR Scenarios", fields: ["q12", "q13", "q14", "q15", "q16"] },
  { id: "recruitment", title: "Recruitment & HR", fields: ["q17", "q18", "q19", "q19Explanation", "q20"] },
  { id: "ai", title: "AI in HR", fields: ["q21", "q22", "q23", "q24", "q25"] },
  { id: "chatbot", title: "Chatbot Training Data", fields: ["q26", "q27", "q28", "q29", "q30"] }
] as const;

export default function SurveyForm({ onComplete }: { onComplete?: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
    reset,
    watch,
    setValue,
  } = useForm<SurveyFormData>({
    resolver: zodResolver(surveySchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "", email: "", phone: "", college: "",
      q7: "", q8: "", q9: "", q10: "", q11: "",
      q12: "", q13: "", q14: "", q15: "", q16: "",
      q17: "", q18: "", q19Explanation: "", q20: "",
      q22: "", q23: "", q24: "", q25: "",
      q26: "", q27: "", q28: "", q29: "", q30: ""
    }
  });

  const formValues = watch();

  useEffect(() => {
    const savedData = localStorage.getItem("surveyFormData");
    const savedStep = localStorage.getItem("surveyFormStep");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        Object.keys(parsed).forEach((key) => {
          setValue(key as keyof SurveyFormData, parsed[key]);
        });
      } catch (e) {
        console.error("Failed to load saved data", e);
      }
    }
    if (savedStep) {
      setCurrentStep(parseInt(savedStep, 10));
    }
  }, [setValue]);

  useEffect(() => {
    localStorage.setItem("surveyFormData", JSON.stringify(formValues));
  }, [formValues]);

  useEffect(() => {
    localStorage.setItem("surveyFormStep", currentStep.toString());
  }, [currentStep]);

  const handleNext = async () => {
    const fieldsToValidate = SECTIONS[currentStep].fields as unknown as (keyof SurveyFormData)[];
    const isStepValid = await trigger(fieldsToValidate);
    
    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, SECTIONS.length - 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [showHelpModal, setShowHelpModal] = useState(false);
  const [helpAgreed, setHelpAgreed] = useState(false);
  const [helpPreference, setHelpPreference] = useState<"personal" | "phone" | "">("");
  const [helpPhone, setHelpPhone] = useState("");
  const [helpError, setHelpError] = useState("");
  const [showWarningAlert, setShowWarningAlert] = useState(false);
  const [warningCountdown, setWarningCountdown] = useState(0);

  useEffect(() => {
    if (warningCountdown > 0) {
      const timer = setTimeout(() => {
        setWarningCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [warningCountdown]);

  const onSubmit = (data: SurveyFormData) => {
    setShowHelpModal(true);
    setShowWarningAlert(false);
    setWarningCountdown(0);
    setHelpAgreed(false);
    setHelpPreference("");
    setHelpError("");
    if (data.phone) {
      setHelpPhone(data.phone);
    }
  };

  const handleFinalSubmit = async () => {
    if (!helpAgreed) {
      if (warningCountdown > 0) {
        return;
      }
      if (!showWarningAlert) {
        setShowWarningAlert(true);
        setWarningCountdown(5);
        setHelpError("");
        return;
      }
    } else {
      if (!helpPreference) {
        setHelpError("Please select a preference (Personal or Phone).");
        return;
      }
      if (helpPreference === "phone" && !helpPhone) {
        setHelpError("Please provide your mobile number.");
        return;
      }
    }

    setHelpError("");
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
      
      const finalPhone = helpAgreed && helpPreference === "phone" ? helpPhone : formValues.phone;
      
      const payload = {
        ...formValues,
        phone: finalPhone,
        aiHelpAgreed: helpAgreed ? "Yes" : "No",
        aiHelpPreference: helpAgreed ? helpPreference : "None",
        timestamp: new Date().toISOString()
      };

      if (!scriptUrl) {
        console.warn("No NEXT_PUBLIC_GOOGLE_SCRIPT_URL provided. Simulating success.");
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        localStorage.removeItem("surveyFormData");
        localStorage.removeItem("surveyFormStep");
        setShowHelpModal(false);
        setIsSuccess(true);
        reset();
        return;
      }

      const response = await fetch(scriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      localStorage.removeItem("surveyFormData");
      localStorage.removeItem("surveyFormStep");
      setShowHelpModal(false);
      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitError("Failed to submit the survey. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="p-8 sm:p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
        >
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </motion.div>
        <h3 className="text-3xl font-heading font-bold text-slate-900 mb-4">Survey Completed!</h3>
        <p className="text-slate-500 mb-8 max-w-md mx-auto leading-relaxed">
          Thank you for contributing your HR expertise. Your insights will play a crucial role in training the next generation of HR Management AI Chatbots.
        </p>
        <button
          onClick={() => {
            setIsSuccess(false);
            setCurrentStep(0);
            if (onComplete) onComplete();
          }}
          className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl"
        >
          Close
        </button>
      </div>
    );
  }

  const renderError = (field: keyof SurveyFormData) => {
    return errors[field] ? (
      <p className="text-rose-500 text-sm mt-1 flex items-center gap-1.5 font-medium animate-in slide-in-from-top-1">
        <AlertCircle className="w-3.5 h-3.5" />
        {errors[field]?.message}
      </p>
    ) : null;
  };

  const inputClasses = "w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm hover:border-slate-300";
  const labelClasses = "block text-sm font-bold text-slate-700 mb-2";

  return (
    <div className="flex flex-col h-full bg-slate-50/50">
      {/* Progress Bar Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-heading font-bold text-lg text-slate-900">
            {SECTIONS[currentStep].title}
          </h3>
          <span className="text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            Step {currentStep + 1} of {SECTIONS.length}
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full"
            initial={{ width: `${((currentStep) / SECTIONS.length) * 100}%` }}
            animate={{ width: `${((currentStep + 1) / SECTIONS.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-6 sm:p-8">
        <form id="survey-form" onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              {/* === SECTION 1 === */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClasses}>Full Name</label>
                      <input {...register("fullName")} className={inputClasses} placeholder="John Doe" />
                      {renderError("fullName")}
                    </div>
                    <div>
                      <label className={labelClasses}>Email Address (Optional)</label>
                      <input {...register("email")} type="email" className={inputClasses} placeholder="john@example.com" />
                      {renderError("email")}
                    </div>
                    <div>
                      <label className={labelClasses}>Phone Number (Optional)</label>
                      <input {...register("phone")} type="tel" className={inputClasses} placeholder="+91 9876543210" />
                      {renderError("phone")}
                    </div>
                    <div>
                      <label className={labelClasses}>College / University</label>
                      <input {...register("college")} className={inputClasses} placeholder="LEAD College" />
                      {renderError("college")}
                    </div>
                  </div>

                  <div>
                    <label className={labelClasses}>MBA Year</label>
                    <div className="grid grid-cols-2 gap-4">
                      {["First Year", "Second Year"].map((year) => (
                        <label key={year} className="flex items-center p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50/50">
                          <input type="radio" value={year} {...register("mbaYear")} className="w-4 h-4 text-purple-600 border-slate-300 focus:ring-purple-500" />
                          <span className="ml-3 font-medium text-slate-700">{year}</span>
                        </label>
                      ))}
                    </div>
                    {renderError("mbaYear")}
                  </div>

                  <div>
                    <label className={labelClasses}>HR Area of Interest</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {["Recruitment & Selection", "Training & Development", "Compensation & Benefits", "Performance Management", "Employee Relations", "HR Analytics"].map((area) => (
                        <label key={area} className="flex items-center p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50/50">
                          <input type="radio" value={area} {...register("hrInterest")} className="w-4 h-4 text-purple-600 border-slate-300 focus:ring-purple-500" />
                          <span className="ml-2 text-sm font-medium text-slate-700">{area}</span>
                        </label>
                      ))}
                    </div>
                    {renderError("hrInterest")}
                  </div>
                </div>
              )}

              {/* === SECTION 2 === */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  {[
                    { id: "q7", label: "7. What are the key steps in a recruitment process?" },
                    { id: "q8", label: "8. How would you screen a candidate's resume?" },
                    { id: "q9", label: "9. What factors do you consider before shortlisting a candidate?" },
                    { id: "q10", label: "10. What qualities make a good employee?" },
                    { id: "q11", label: "11. How do you assess cultural fit during recruitment?" },
                  ].map((q) => (
                    <div key={q.id}>
                      <label className={labelClasses}>{q.label}</label>
                      <textarea {...register(q.id as keyof SurveyFormData)} rows={3} className={`${inputClasses} resize-y min-h-[100px]`} placeholder="Type your answer here..." />
                      {renderError(q.id as keyof SurveyFormData)}
                    </div>
                  ))}
                </div>
              )}

              {/* === SECTION 3 === */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  {[
                    { id: "q12", label: "12. A candidate has excellent technical skills but poor communication skills. Would you hire them? Why?" },
                    { id: "q13", label: "13. Two candidates have similar qualifications. How would you decide whom to select?" },
                    { id: "q14", label: "14. An employee's performance has dropped significantly. What would be your first action?" },
                    { id: "q15", label: "15. A team reports conflicts between employees. How would you handle the situation?" },
                    { id: "q16", label: "16. An employee requests a salary hike beyond company policy. How would you respond?" },
                  ].map((q) => (
                    <div key={q.id}>
                      <label className={labelClasses}>{q.label}</label>
                      <textarea {...register(q.id as keyof SurveyFormData)} rows={3} className={`${inputClasses} resize-y min-h-[100px]`} placeholder="Type your answer here..." />
                      {renderError(q.id as keyof SurveyFormData)}
                    </div>
                  ))}
                </div>
              )}

              {/* === SECTION 4 === */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className={labelClasses}>17. What are the most common mistakes candidates make during interviews?</label>
                    <textarea {...register("q17")} rows={3} className={`${inputClasses} resize-y min-h-[100px]`} />
                    {renderError("q17")}
                  </div>
                  <div>
                    <label className={labelClasses}>18. How do you evaluate candidate potential?</label>
                    <textarea {...register("q18")} rows={3} className={`${inputClasses} resize-y min-h-[100px]`} />
                    {renderError("q18")}
                  </div>
                  <div>
                    <label className={labelClasses}>19. What is more important?</label>
                    <div className="flex gap-4 mb-4">
                      {["Experience", "Skills", "Attitude"].map((opt) => (
                        <label key={opt} className="flex items-center px-4 py-2 border border-slate-200 rounded-full cursor-pointer hover:bg-slate-50 transition-colors has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50/50 has-[:checked]:text-purple-700 font-medium text-sm text-slate-700">
                          <input type="radio" value={opt} {...register("q19")} className="hidden" />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                    {renderError("q19")}
                    
                    <label className="block text-sm font-semibold text-slate-600 mt-3 mb-2">Explain your answer:</label>
                    <textarea {...register("q19Explanation")} rows={2} className={`${inputClasses} resize-y min-h-[80px]`} />
                    {renderError("q19Explanation")}
                  </div>
                  <div>
                    <label className={labelClasses}>20. How would you professionally reject a candidate?</label>
                    <textarea {...register("q20")} rows={3} className={`${inputClasses} resize-y min-h-[100px]`} />
                    {renderError("q20")}
                  </div>
                </div>
              )}

              {/* === SECTION 5 === */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <label className={labelClasses}>21. Do you currently use AI tools?</label>
                    <div className="flex gap-4">
                      {["Yes", "No"].map((opt) => (
                        <label key={opt} className="flex items-center p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50/50 w-32">
                          <input type="radio" value={opt} {...register("q21")} className="w-4 h-4 text-purple-600 border-slate-300 focus:ring-purple-500" />
                          <span className="ml-2 font-medium text-slate-700">{opt}</span>
                        </label>
                      ))}
                    </div>
                    {renderError("q21")}
                  </div>
                  <div>
                    <label className={labelClasses}>22. Which AI tools have you used? (Type 'None' if NA)</label>
                    <textarea {...register("q22")} rows={2} className={`${inputClasses} resize-y min-h-[80px]`} />
                    {renderError("q22")}
                  </div>
                  <div>
                    <label className={labelClasses}>23. Which HR tasks can AI automate?</label>
                    <textarea {...register("q23")} rows={2} className={`${inputClasses} resize-y min-h-[80px]`} />
                    {renderError("q23")}
                  </div>
                  <div>
                    <label className={labelClasses}>24. Which HR tasks should remain human-driven?</label>
                    <textarea {...register("q24")} rows={2} className={`${inputClasses} resize-y min-h-[80px]`} />
                    {renderError("q24")}
                  </div>
                  <div>
                    <label className={labelClasses}>25. What features would you like in an AI HR Assistant?</label>
                    <textarea {...register("q25")} rows={3} className={`${inputClasses} resize-y min-h-[100px]`} />
                    {renderError("q25")}
                  </div>
                </div>
              )}

              {/* === SECTION 6 === */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 mb-6">
                    <p className="text-sm text-blue-800 font-medium">
                      In this final section, provide sample responses as if you were the AI Assistant or an HR Professional replying to these prompts.
                    </p>
                  </div>
                  {[
                    { id: "q26", context: "A student asks:", quote: '"How can I prepare for an HR interview?"', instruction: "Provide your response." },
                    { id: "q27", context: "A fresher asks:", quote: '"How do I create a professional resume?"', instruction: "Provide your response." },
                    { id: "q28", context: "An employee says:", quote: '"I am unhappy with my manager."', instruction: "What should HR do?" },
                    { id: "q29", context: "A candidate asks:", quote: '"Why was I rejected after the interview?"', instruction: "How would HR respond?" },
                    { id: "q30", context: "A new employee asks:", quote: '"What should I expect during onboarding?"', instruction: "Provide your response." },
                  ].map((q) => (
                    <div key={q.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                      <div className="mb-3">
                        <span className="text-sm font-semibold text-slate-500">{q.context}</span>
                        <blockquote className="text-lg font-medium text-slate-900 border-l-4 border-purple-500 pl-3 my-2 italic bg-slate-50/50 py-2 pr-2 rounded-r">
                          {q.quote}
                        </blockquote>
                        <span className="text-sm font-bold text-slate-700">{q.instruction}</span>
                      </div>
                      <textarea {...register(q.id as keyof SurveyFormData)} rows={3} className={`${inputClasses} resize-y min-h-[100px] mt-2`} placeholder="Your expert response..." />
                      {renderError(q.id as keyof SurveyFormData)}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {submitError && (
            <div className="mt-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="font-medium text-sm">{submitError}</p>
            </div>
          )}
        </form>
      </div>

      {/* AI Help Modal */}
      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {showHelpModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100"
              >
                <div className="p-6 sm:p-8">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <AlertCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-slate-900 mb-2">
                    We Need Your Help!
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    We are planning a voice call or personal interview to share more about the HR field, make our doubts clear, and fix the AI model. Your expertise is crucial. Can you help us? (Mandatory)
                  </p>

                  <div className="space-y-5">
                    {showWarningAlert && !helpAgreed && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl flex items-start gap-2 text-sm font-medium"
                      >
                        <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-600 mt-0.5" />
                        <span>You can consider to help us personally to improve AI quality.</span>
                      </motion.div>
                    )}

                    <label className="flex items-start gap-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50/50">
                      <input 
                        type="checkbox" 
                        checked={helpAgreed}
                        onChange={(e) => {
                          setHelpAgreed(e.target.checked);
                          if (e.target.checked) {
                            setHelpPreference("");
                            setShowWarningAlert(false);
                            setWarningCountdown(0);
                          }
                        }}
                        className="mt-1 w-5 h-5 rounded text-purple-600 focus:ring-purple-500 border-slate-300"
                      />
                      <span className="font-medium text-slate-800">Yes, I can help train the AI</span>
                    </label>

                    {helpAgreed && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-4 pt-2"
                      >
                        <p className="text-sm font-bold text-slate-700">How do you prefer we connect?</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <label className="flex items-center p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50/50">
                            <input 
                              type="radio" 
                              name="helpPref"
                              value="personal"
                              checked={helpPreference === "personal"}
                              onChange={() => setHelpPreference("personal")}
                              className="w-4 h-4 text-purple-600 border-slate-300 focus:ring-purple-500" 
                            />
                            <span className="ml-2 text-sm font-medium text-slate-700">Personal (Meet & clear doubts)</span>
                          </label>
                          <label className="flex items-center p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50/50">
                            <input 
                              type="radio" 
                              name="helpPref"
                              value="phone"
                              checked={helpPreference === "phone"}
                              onChange={() => setHelpPreference("phone")}
                              className="w-4 h-4 text-purple-600 border-slate-300 focus:ring-purple-500" 
                            />
                            <span className="ml-2 text-sm font-medium text-slate-700">Phone Call</span>
                          </label>
                        </div>

                        {helpPreference === "phone" && (
                          <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="pt-2"
                          >
                            {formValues.phone ? (
                              <div className="bg-blue-50 text-blue-800 px-4 py-3 rounded-lg text-sm font-medium">
                                We will contact you at: {formValues.phone}
                              </div>
                            ) : (
                              <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Mobile Number</label>
                                <input 
                                  type="tel" 
                                  value={helpPhone}
                                  onChange={(e) => setHelpPhone(e.target.value)}
                                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                  placeholder="+91 9876543210"
                                />
                              </div>
                            )}
                          </motion.div>
                        )}
                      </motion.div>
                    )}

                    {helpError && (
                      <p className="text-rose-500 text-sm mt-2 flex items-center gap-1.5 font-medium">
                        <AlertCircle className="w-4 h-4" />
                        {helpError}
                      </p>
                    )}
                  </div>

                  <div className="mt-8 flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowHelpModal(false);
                        setShowWarningAlert(false);
                        setWarningCountdown(0);
                      }}
                      className="flex-1 px-4 py-2.5 rounded-full font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleFinalSubmit}
                      disabled={isSubmitting || warningCountdown > 0}
                      className="flex-1 px-4 py-2.5 rounded-full font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : warningCountdown > 0 ? (
                        `Wait ${warningCountdown}s...`
                      ) : showWarningAlert && !helpAgreed ? (
                        "Submit Anyway"
                      ) : (
                        "Confirm & Submit"
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Footer Navigation */}
      <div className="sticky bottom-0 bg-white/90 backdrop-blur-md border-t border-slate-100 p-4 sm:p-6 flex items-center justify-between z-20">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentStep === 0 || isSubmitting}
          className="px-6 py-2.5 rounded-full font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        
        {currentStep < SECTIONS.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="px-8 py-2.5 rounded-full font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-md hover:shadow-lg flex items-center gap-2"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="submit"
            form="survey-form"
            disabled={isSubmitting}
            className="px-8 py-2.5 rounded-full font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Submit Survey
                <CheckCircle2 className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
