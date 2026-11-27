"use client";

import React from "react";
import Link from "next/link";

interface Feature {
  id?: string;
  title: string;
  description: string;
  badge?: string;
}

interface SubpageProps {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  features: Feature[];
  specs: [string, string][];
  casePreview?: {
    target: string;
    verdict: string;
    extractedCount: string;
    caseId: string;
  };
}

export default function SubpageLayout({
  badge,
  title,
  subtitle,
  description,
  features,
  specs,
  casePreview = {
    target: "https://hdfc-kyc-update-portal.online",
    verdict: "CONFIRMED FRAUDULENT",
    extractedCount: "3 UPI Handles · 2 Bank Accounts · 4 Phones",
    caseId: "case_hdfc_kyc_8921",
  },
}: SubpageProps) {
  return (
    <div className="min-h-screen bg-[#080808] text-[#f2f2f0] font-['Open_Sans',sans-serif]">
      {/* Top Navbar */}
      <header className="border-b border-white/10 bg-[#0f0f0f]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-['Almarai'] font-bold text-xl tracking-tight text-white uppercase">
                OPEN<span className="text-[#cd0001]">FISH</span>
              </span>
              <span className="inline-block w-2 h-2 rounded-full bg-[#cd0001] animate-pulse"></span>
            </Link>

            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-black/60 border border-white/10 rounded-full font-mono text-[10px] text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></span>
              <span>DEFENSE MESH ACTIVE · PORT 4010 READY</span>
            </div>
          </div>

          <nav className="flex items-center text-xs font-mono uppercase tracking-wider" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/solutions" className="text-gray-400 hover:text-white transition-colors">
              Solutions
            </Link>
            <Link href="/access-our-data" className="text-gray-400 hover:text-white transition-colors">
              Access Data
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
              Contact
            </Link>
            <Link href="/login" className="text-gray-400 hover:text-white transition-colors">
              Login
            </Link>
            <Link
              href="/dashboard"
              className="px-3.5 py-1.5 rounded-lg bg-[#cd0001] hover:bg-red-700 text-white font-bold transition-all shadow-md shadow-red-950/40"
            >
              Dashboard →
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Header */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#121212] to-[#080808] py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-800/60 text-[#ff6b6b] text-xs font-mono uppercase tracking-wider mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            <span>{badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-['Almarai'] text-white tracking-tight uppercase max-w-4xl leading-tight mb-4">
            {title}
          </h1>

          <p className="text-lg sm:text-xl font-['Almarai'] text-[#cd0001] font-semibold mb-6">
            {subtitle}
          </p>

          <p className="text-sm sm:text-base text-gray-300 font-mono max-w-3xl leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-8">
            <Link
              href="/dashboard"
              className="button-large red !py-3 !px-6 !h-auto text-xs font-mono uppercase tracking-wider shadow-lg shadow-red-950/50"
            >
              <span className="button-text white !text-xs">Deploy Honeypot Agent in Dashboard →</span>
            </Link>
            <Link
              href={`/case/${casePreview.caseId}`}
              className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono uppercase tracking-wider text-gray-300 hover:text-white transition-all flex items-center gap-2"
            >
              <span>View Verified Sample Dossier ↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-[1200px] mx-auto px-6 py-16 space-y-16">
        {/* Features / Capabilities Grid */}
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#cd0001] mb-2 font-bold">
            Core Capabilities &amp; Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-['Almarai'] text-white mb-8">
            Engineered for Autonomous Cybercrime Investigation
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                id={f.id}
                className="bg-[#121212] border border-white/10 rounded-2xl p-6 hover:border-red-900/60 transition-all flex flex-col justify-between scroll-mt-24"
              >
                <div>
                  {f.badge && (
                    <span className="inline-block text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 mb-3">
                      {f.badge}
                    </span>
                  )}
                  <h3 className="text-lg font-bold font-['Almarai'] text-white mb-2">
                    {f.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-mono leading-relaxed">
                    {f.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-[#ff6b6b]">
                  <span>Active in Production Sandbox</span>
                  <span>✓</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Case Proof of Concept */}
        <div className="bg-[#121212] border border-red-900/40 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-900/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10 pb-6 mb-6">
            <div>
              <div className="text-xs font-mono uppercase text-red-400 font-bold mb-1">
                Live Evidence Artifact Preview
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-['Almarai'] text-white">
                Extracted Criminal Financial Rails
              </h3>
            </div>
            <Link
              href={`/case/${casePreview.caseId}`}
              className="px-4 py-2 rounded-lg bg-red-950/80 border border-red-700/60 text-red-300 font-mono text-xs font-bold hover:bg-red-900 transition-all"
            >
              Audit Case #{casePreview.caseId} →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs mb-6">
            <div className="bg-black/60 p-4 rounded-xl border border-white/5">
              <span className="text-gray-500 block text-[10px] uppercase mb-1">Target Ingested</span>
              <span className="text-white font-bold truncate block">{casePreview.target}</span>
            </div>
            <div className="bg-black/60 p-4 rounded-xl border border-white/5">
              <span className="text-gray-500 block text-[10px] uppercase mb-1">Automated Verdict</span>
              <span className="text-red-400 font-bold">{casePreview.verdict}</span>
            </div>
            <div className="bg-black/60 p-4 rounded-xl border border-white/5">
              <span className="text-gray-500 block text-[10px] uppercase mb-1">Unmasked Financial Rails</span>
              <span className="text-yellow-400 font-bold">{casePreview.extractedCount}</span>
            </div>
          </div>

          <p className="text-xs text-gray-400 font-mono leading-relaxed">
            All extracted evidence artifacts are cryptographically signed with SHA-256 hashes and formatted to meet the requirements of Section 65B of the Indian Evidence Act / Section 63 BSA.
          </p>
        </div>

        {/* Technical Specifications */}
        <div className="bg-[#121212] border border-white/10 rounded-2xl p-8">
          <h3 className="text-xl font-bold font-['Almarai'] text-white mb-6 uppercase">
            Technical &amp; Legal Specifications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {specs.map(([label, val], i) => (
              <div key={i} className="flex justify-between items-center py-3 border-b border-white/5 text-xs font-mono">
                <span className="text-gray-400">{label}</span>
                <span className="text-white font-semibold text-right">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-red-950/60 via-[#161616] to-[#121212] border border-red-900/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-['Almarai'] text-white uppercase mb-2">
              Ready to deploy autonomous cyber defense?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 font-mono">
              Feed any suspicious URL, phone number, or UPI address into the sandbox for instant live unmasking.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/dashboard"
              className="button-large red !py-3.5 !px-8 !h-auto text-xs font-mono uppercase tracking-wider shadow-xl shadow-red-950/80"
            >
              <span className="button-text white !text-xs font-bold">Open Operations Console →</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 bg-[#0a0a0a]">
        <div className="max-w-[1440px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <div className="flex items-center gap-3">
            <span className="font-['Almarai'] font-bold text-sm text-white">OPEN<span className="text-[#cd0001]">FISH</span></span>
            <span>·</span>
            <span>Autonomous AI Cyber Defense &amp; Honeypot Intelligence</span>
          </div>
          <div>© 2025 OPENFISH™ ALL RIGHTS RESERVED</div>
        </div>
      </footer>
    </div>
  );
}
