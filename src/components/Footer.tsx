"use client";

import React from "react";
import Image from "next/image";

// Custom SVG components for social icons
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/rhodnet-logo.png"
                alt="Rhodnet AI"
                width={36}
                height={36}
                className="rounded-xl shadow-sm border border-slate-100"
              />
              <span className="font-heading font-extrabold text-2xl text-slate-950 tracking-tight">Rhodnet AI</span>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                × Mallichepp
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
              A collaborative AI research initiative by MCA students from LEAD College, Palakkad, 
              in partnership with Rhodnet AI, Coimbatore.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/vishnucax"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <GitHubIcon className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/vishnu-k-7-"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:bg-blue-50 hover:shadow-md hover:border-blue-200 hover:-translate-y-1 transition-all duration-300"
              >
                <LinkedInIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:ml-auto">
            <h4 className="font-heading font-bold text-sm text-slate-900 mb-6 uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {[
                { name: "About the Project", href: "#about" },
                { name: "Our Team", href: "#contributors" },
                { name: "How It Works", href: "#research" },
                { name: "Take Survey", href: "#survey-section" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.href === "#survey-section") {
                        e.preventDefault();
                        window.dispatchEvent(new CustomEvent("open-contribute-modal"));
                      }
                    }}
                    className="text-slate-500 hover:text-blue-600 font-medium text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-blue-500 transition-colors" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Partners */}
          <div className="md:ml-auto">
            <h4 className="font-heading font-bold text-sm text-slate-900 mb-6 uppercase tracking-widest">
              Partners
            </h4>
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <Image
                  src="/mallichepp-logo.png"
                  alt="MalliChepp"
                  width={40}
                  height={40}
                  className="rounded-xl shadow-sm border border-slate-100"
                />
                <div>
                  <p className="text-sm font-bold text-slate-900">MalliChepp</p>
                  <p className="text-xs font-medium text-slate-500">LEAD College, Palakkad</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <Image
                  src="/rhodnet-logo.png"
                  alt="Rhodnet AI"
                  width={40}
                  height={40}
                  className="rounded-xl shadow-sm border border-slate-100"
                />
                <div>
                  <p className="text-sm font-bold text-slate-900">Rhodnet AI</p>
                  <p className="text-xs font-medium text-slate-500">AI Startup, Coimbatore</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-100 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-500 font-medium text-sm text-center md:text-left">
            © {new Date().getFullYear()} <strong className="text-slate-900">MalliChepp × Rhodnet AI</strong>. All rights reserved.
          </p>
          <a href="https://vishnucax.github.io" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-500 font-medium text-sm bg-slate-50 px-4 py-2 rounded-full border border-slate-100 no-underline hover:underline">
            Designed & Developed By Vishnu K
          </a>
        </div>
      </div>
    </footer>
  );
}
