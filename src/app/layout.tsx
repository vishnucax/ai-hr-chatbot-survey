import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MalliChepp × Rhodnet AI | Let's Train AI Together",
  description:
    "Join the MalliChepp and Rhodnet AI research initiative. Contribute your HR expertise to help build the next generation of HR Management AI Chatbots.",
  keywords: [
    "MalliChepp",
    "Rhodnet AI",
    "HR AI",
    "AI Survey",
    "HR Chatbot",
    "LEAD College Palakkad",
    "AI Training",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakartaSans.variable} scroll-smooth`}
    >
      <body className="bg-[#f8fafc] text-slate-800 font-sans min-h-screen antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
