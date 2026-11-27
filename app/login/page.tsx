"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"investigator" | "citizen">("investigator");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError("Please provide your credentials.");
      return;
    }
    setLoading(true);
    setError(null);
    setTimeout(() => {
      // Store session state in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "openfish_user",
          JSON.stringify({
            email,
            role,
            name: role === "investigator" ? "Agent R. Sharma (Cyber Cell)" : "Anil Verma (Citizen)",
            loginTime: new Date().toISOString(),
          }),
        );
      }
      router.push("/dashboard");
    }, 600);
  }

  function handleDemoLogin(userEmail: string, userRole: "investigator" | "citizen", name: string) {
    setEmail(userEmail);
    setPassword("••••••••••••");
    setRole(userRole);
    setLoading(true);
    setTimeout(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "openfish_user",
          JSON.stringify({
            email: userEmail,
            role: userRole,
            name,
            loginTime: new Date().toISOString(),
          }),
        );
      }
      router.push("/dashboard");
    }, 450);
  }

  return (
    <div className="min-h-screen bg-black text-[#f2f2f0] flex flex-col justify-between font-['Open_Sans',sans-serif]">
      {/* Top Navbar */}
      <header className="py-6 px-8 border-b border-white/10 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-['Almarai'] font-bold text-xl tracking-tight text-white uppercase">
            OPEN<span className="text-[#cd0001]">FISH</span>
          </span>
          <span className="inline-block w-2 h-2 rounded-full bg-[#cd0001] animate-pulse"></span>
        </Link>
        <Link
          href="/"
          className="text-xs font-mono uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
        >
          ← Return to Home
        </Link>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-950/20 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="w-full max-w-md bg-[#121212] border border-white/15 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 backdrop-blur-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#cd0001]/10 border border-[#cd0001]/30 text-[#cd0001] mb-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h1 className="font-['Almarai'] text-2xl font-bold text-white uppercase tracking-tight">
              Investigator Portal
            </h1>
            <p className="text-xs text-gray-400 mt-1 font-mono">
              Secure Access to OpenFish Intelligence Dossiers
            </p>
          </div>

          {/* Role Tabs */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-black/60 rounded-xl border border-white/10 mb-6">
            <button
              type="button"
              onClick={() => { setRole("investigator"); setError(null); }}
              className={`py-2 text-xs font-mono uppercase tracking-wider rounded-lg transition-all ${
                role === "investigator"
                  ? "bg-[#cd0001] text-white font-bold shadow-md shadow-red-950/50"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Cyber Analyst
            </button>
            <button
              type="button"
              onClick={() => { setRole("citizen"); setError(null); }}
              className={`py-2 text-xs font-mono uppercase tracking-wider rounded-lg transition-all ${
                role === "citizen"
                  ? "bg-[#cd0001] text-white font-bold shadow-md shadow-red-950/50"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Citizen Reporter
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1.5">
                {role === "investigator" ? "Official Government / Bank Email" : "Your Email Address"}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === "investigator" ? "investigator@cybercell.gov.in" : "name@example.com"}
                className="w-full bg-black/70 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#cd0001] transition-colors"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                  Security Passkey
                </label>
                <span className="text-[11px] font-mono text-gray-500 hover:text-gray-300 cursor-pointer">
                  Forgot?
                </span>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-black/70 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#cd0001] transition-colors font-mono"
                required
              />
            </div>

            {error && (
              <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-800/60 text-xs font-mono text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="button-large red !w-full !py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-40"
            >
              <span className="button-text white !text-sm">
                {loading ? "Authenticating Session..." : "Authorize Access →"}
              </span>
            </button>
          </form>

          {/* Quick Demo Logins Section */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="font-mono text-[10px] uppercase tracking-wider text-gray-400 mb-3 text-center">
              Demo Access (Click to Auto-Sign In)
            </div>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() =>
                  handleDemoLogin("analyst.sharma@cybercrime.gov.in", "investigator", "Inspector R. Sharma (Cyber Cell)")
                }
                className="w-full py-2 px-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-900 rounded-xl flex items-center justify-between text-left transition-all"
              >
                <div>
                  <div className="text-xs font-semibold text-white">Cybercrime Cell Inspector</div>
                  <div className="text-[10px] font-mono text-gray-400">analyst.sharma@cybercrime.gov.in</div>
                </div>
                <span className="text-xs font-mono text-[#cd0001]">Demo In →</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleDemoLogin("fraud.ops@hdfcbank.com", "investigator", "HDFC Fraud Response Desk")
                }
                className="w-full py-2 px-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-900 rounded-xl flex items-center justify-between text-left transition-all"
              >
                <div>
                  <div className="text-xs font-semibold text-white">Bank Fraud Prevention Desk</div>
                  <div className="text-[10px] font-mono text-gray-400">fraud.ops@hdfcbank.com</div>
                </div>
                <span className="text-xs font-mono text-[#cd0001]">Demo In →</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleDemoLogin("citizen.reporter@gmail.com", "citizen", "Anil Verma (Citizen)")
                }
                className="w-full py-2 px-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-900 rounded-xl flex items-center justify-between text-left transition-all"
              >
                <div>
                  <div className="text-xs font-semibold text-white">Citizen Scam Reporter</div>
                  <div className="text-[10px] font-mono text-gray-400">citizen.reporter@gmail.com</div>
                </div>
                <span className="text-xs font-mono text-[#cd0001]">Demo In →</span>
              </button>
            </div>
          </div>

          {/* Audit Badge */}
          <div className="mt-6 pt-4 text-center">
            <span className="font-mono text-[9px] uppercase tracking-widest text-gray-500">
              Section 65B IT Act Evidence Audit Logging Active
            </span>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="py-6 px-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-gray-500 gap-2">
        <div>© 2026 OPENFISH™ CYBER DEFENSE</div>
        <div>SOC-2 TYPE II &amp; CERT-IN COMPLIANT AUDIT LOGGING</div>
      </footer>
    </div>
  );
}