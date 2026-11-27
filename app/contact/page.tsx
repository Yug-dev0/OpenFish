"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    role: "Investigator / Law Enforcement",
    targetInput: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
              <span>INCIDENT DISPATCH ACTIVE · PORT 4010 READY</span>
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

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto px-6 py-16 sm:py-24">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-800/60 text-[#ff6b6b] text-xs font-mono uppercase tracking-wider mb-4">
            <span>Incident Response &amp; Partnership</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-['Almarai'] text-white uppercase tracking-tight mb-4">
            Contact Cyber Intelligence &amp; Dispatch
          </h1>
          <p className="text-sm sm:text-base text-gray-300 font-mono leading-relaxed">
            Report high-velocity scam campaigns, request dedicated law enforcement API access, or integrate OpenFish’s autonomous honeypots into your enterprise fraud operations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form */}
          <div className="lg:col-span-7 bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-green-950 border border-green-600 text-green-400 flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-bold font-['Almarai'] text-white">
                  Incident Received &amp; Queued
                </h3>
                <p className="text-xs text-gray-400 font-mono max-w-md mx-auto leading-relaxed">
                  Thank you, {formData.name}. Our autonomous recon engine has logged your dispatch. An intelligence officer will contact you at {formData.email}.
                </p>
                <div className="pt-6">
                  <Link
                    href="/dashboard"
                    className="button-large red !py-3 !px-6 !h-auto text-xs font-mono uppercase"
                  >
                    <span className="button-text white !text-xs">Go to Operations Dashboard →</span>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 font-mono text-xs">
                <div>
                  <label className="block uppercase text-gray-400 mb-1.5 font-bold">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Inspector Rajesh Sharma"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#cd0001] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase text-gray-400 mb-1.5 font-bold">Work Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="r.sharma@cybercrime.gov.in"
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#cd0001] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block uppercase text-gray-400 mb-1.5 font-bold">Organization / Agency</label>
                    <input
                      type="text"
                      required
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="State Cyber Cell / HDFC Fraud Desk"
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#cd0001] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block uppercase text-gray-400 mb-1.5 font-bold">Role / Capacity</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#cd0001] transition-colors"
                  >
                    <option>Investigator / Law Enforcement</option>
                    <option>Bank / Fintech Fraud Risk Officer</option>
                    <option>Enterprise SOC / Security Analyst</option>
                    <option>Victim Citizen / Reporting Party</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase text-gray-400 mb-1.5 font-bold">
                    Target URL / Phone Number / UPI ID (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.targetInput}
                    onChange={(e) => setFormData({ ...formData, targetInput: e.target.value })}
                    placeholder="e.g. https://fake-bank-login.com or +91 9327781825"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#cd0001] transition-colors"
                  />
                </div>

                <div>
                  <label className="block uppercase text-gray-400 mb-1.5 font-bold">Incident Details / Requirements</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe the fraud campaign, estimated victim count, or integration requirements..."
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#cd0001] transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full button-large red !py-3.5 !h-auto text-xs font-mono uppercase tracking-wider shadow-lg shadow-red-950/60"
                >
                  <span className="button-text white !text-xs font-bold">Dispatch Incident Request →</span>
                </button>
              </form>
            )}
          </div>

          {/* Quick Dispatch Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#121212] border border-red-900/40 rounded-2xl p-6 sm:p-8">
              <div className="text-xs font-mono uppercase text-red-400 font-bold mb-2">
                Immediate Autonomous Testing
              </div>
              <h3 className="text-xl font-bold font-['Almarai'] text-white mb-2">
                Want to test a live target right now?
              </h3>
              <p className="text-xs text-gray-400 font-mono leading-relaxed mb-6">
                You don&apos;t have to wait for form review. The OpenFish Operations Console is live with real-time sandbox execution.
              </p>
              <Link
                href="/dashboard"
                className="button-large red !py-3 !px-6 !w-full text-center block text-xs"
              >
                <span className="button-text white !text-xs font-bold">Launch Honeypot in Dashboard →</span>
              </Link>
            </div>

            <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 font-mono text-xs space-y-4">
              <div>
                <span className="text-gray-500 block uppercase text-[10px]">Headquarters &amp; Dispatch</span>
                <span className="text-white font-semibold">National Cyber Defense Taskforce Hub</span>
              </div>
              <div>
                <span className="text-gray-500 block uppercase text-[10px]">Emergency Hotline (Law Enforcement)</span>
                <span className="text-white font-semibold">1930 · cybercrime.gov.in Direct Integration</span>
              </div>
              <div>
                <span className="text-gray-500 block uppercase text-[10px]">Security Clearance</span>
                <span className="text-green-400 font-semibold">Section 65B IT Act Forensic Chain of Custody</span>
              </div>
            </div>
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
