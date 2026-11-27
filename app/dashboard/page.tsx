"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { CaseState } from "@/lib/types";

export default function DashboardPage() {
  const router = useRouter();
  const [cases, setCases] = useState<CaseState[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterVerdict, setFilterVerdict] = useState<"all" | "scam" | "legit" | "running">("all");
  const [inputVal, setInputVal] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<{ name: string; role: string; email: string } | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Fetch cases from API
  async function loadCases() {
    try {
      const res = await fetch("/api/cases");
      const data = await res.json();
      if (data.cases) {
        setCases(data.cases);
      }
    } catch (e) {
      console.error("Failed to load cases", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCases();
    const interval = setInterval(loadCases, 5000);
    return () => clearInterval(interval);
  }, []);

  // Reset demo cases
  async function handleResetCases() {
    setLoading(true);
    try {
      const res = await fetch("/api/cases/reset", { method: "POST" });
      const data = await res.json();
      if (data.cases) {
        setCases(data.cases);
        showToast("Demo cases reset");
      }
    } catch (e) {
      console.error("Failed to reset cases", e);
    } finally {
      setLoading(false);
    }
  }

  // Check localStorage session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("openfish_user");
      if (stored) {
        try {
          setCurrentUser(JSON.parse(stored));
        } catch {
          // ignore
        }
      } else {
        setCurrentUser({
          name: "Inspector R. Sharma",
          role: "Investigator",
          email: "analyst@cybercell.gov.in",
        });
      }
    }
  }, []);

  // Keyboard shortcut: Cmd/Ctrl + K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function handleLogout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("openfish_user");
    }
    router.push("/login");
  }

  function showToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2200);
  }

  function copyToClipboard(text: string, label: string, id?: string) {
    navigator.clipboard.writeText(text);
    if (id) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    }
    showToast(`Copied ${label}`);
  }

  async function handleLaunch(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!inputVal.trim() || inputVal.trim().length < 3) {
      setErrorMsg("Please enter a scam URL, UPI ID, phone number, or SMS text.");
      return;
    }
    setSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: inputVal.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to start investigation");
      router.push(`/case/${data.id}`);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : String(err));
      setSubmitting(false);
    }
  }

  // Filter cases
  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      if (filterVerdict === "scam" && c.verdict !== "scam") return false;
      if (filterVerdict === "legit" && c.verdict !== "legit") return false;
      if (filterVerdict === "running" && c.status !== "running") return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inId = c.id.toLowerCase().includes(q) || formatCaseId(c.id).toLowerCase().includes(q);
        const inInput = c.input.toLowerCase().includes(q);
        const inTarget = c.targetUrl?.toLowerCase().includes(q) ?? false;
        const inBrand = c.recon?.result?.brand_impersonated?.toLowerCase().includes(q) ?? false;
        const inUPI = c.recon?.result?.upi_ids?.some((u) => u.toLowerCase().includes(q)) ?? false;
        const inPhone = c.recon?.result?.phone_numbers?.some((p) => p.includes(q)) ?? false;
        return inId || inInput || inTarget || inBrand || inUPI || inPhone;
      }
      return true;
    });
  }, [cases, filterVerdict, searchQuery]);

  // Aggregate metrics
  const metrics = useMemo(() => {
    const total = cases.length;
    const scams = cases.filter((c) => c.verdict === "scam").length;
    const legits = cases.filter((c) => c.verdict === "legit").length;
    const active = cases.filter((c) => c.status === "running").length;

    let upiCount = 0;
    let phoneCount = 0;
    cases.forEach((c) => {
      upiCount += c.recon?.result?.upi_ids?.length || 0;
      phoneCount += c.recon?.result?.phone_numbers?.length || 0;
    });

    return { total, scams, legits, active, upiCount, phoneCount };
  }, [cases]);

  // Clean Case ID formatter
  function formatCaseId(id: string) {
    if (id.startsWith("case_")) {
      const raw = id.replace("case_", "");
      return raw.toUpperCase().replace(/_/g, "-");
    }
    return id.toUpperCase();
  }

  // Clean relative time
  function formatAge(dateString: string) {
    const diff = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] font-['Inter',-apple-system,BlinkMacSystemFont,sans-serif] antialiased overflow-x-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#171717] border border-white/15 shadow-xl px-3.5 py-2 rounded-lg flex items-center gap-2 text-xs font-mono text-white transition-all">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <header className="border-b border-white/[0.08] bg-[#0c0c0c]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-[1380px] w-full mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-['Almarai'] font-bold text-lg tracking-tight text-white uppercase">
                OPEN<span className="text-[#cd0001]">FISH</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#cd0001]"></span>
            </Link>

            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-white/[0.04] border border-white/[0.08] rounded-md text-[11px] font-mono text-neutral-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Mesh Active · Port 4010</span>
            </div>
          </div>

          <div className="flex items-center gap-5 text-xs text-neutral-400">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/solutions" className="hidden sm:inline-block hover:text-white transition-colors">
              Solutions
            </Link>
            <Link href="/access-our-data" className="hidden md:inline-block hover:text-white transition-colors">
              API
            </Link>

            {currentUser && (
              <div className="flex items-center gap-3 pl-4 border-l border-white/[0.08]">
                <div className="text-right hidden sm:block leading-tight">
                  <div className="text-xs font-medium text-white">{currentUser.name}</div>
                  <div className="text-[10px] text-neutral-500 font-mono capitalize">{currentUser.role}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-2.5 py-1 rounded bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-[11px] text-neutral-300 hover:text-white transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1380px] w-full mx-auto px-4 sm:px-6 py-8 space-y-7">
        {/* Page Title & Status Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs text-neutral-500 font-mono mb-1">
              Operations / Threat Telemetry
            </div>
            <h1 className="text-2xl font-semibold text-white tracking-tight">
              Scam Operations &amp; Intelligence
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Autonomous reconnaissance, decoy honeypots, and financial rail forensics.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleResetCases()}
              className="px-3 py-1.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-md text-xs text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5"
              title="Reset sample demonstration cases"
            >
              <span>↺</span>
              <span>Reset Cases</span>
            </button>
            <button
              onClick={() => {
                loadCases();
                showToast("Refreshed cases");
              }}
              className="px-3 py-1.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-md text-xs text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>⟳</span>
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#121212] border border-white/[0.08] rounded-xl p-4 sm:p-5">
            <div className="text-xs text-neutral-400 font-medium">Total Ingested Cases</div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-semibold text-white tracking-tight font-mono">
                {metrics.total}
              </span>
              <span className="text-[11px] text-neutral-500 font-mono">targets</span>
            </div>
            <div className="text-[11px] text-neutral-500 mt-1">
              {metrics.active > 0 ? `${metrics.active} sandboxes running` : "All sandboxes idle"}
            </div>
          </div>

          <div className="bg-[#121212] border border-white/[0.08] rounded-xl p-4 sm:p-5">
            <div className="text-xs text-neutral-400 font-medium flex items-center justify-between">
              <span>Confirmed Scams</span>
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-semibold text-[#ff5a5a] tracking-tight font-mono">
                {metrics.scams}
              </span>
              <span className="text-[11px] text-neutral-500 font-mono">baited</span>
            </div>
            <div className="text-[11px] text-neutral-500 mt-1">
              Evidence dossiers auto-compiled
            </div>
          </div>

          <div className="bg-[#121212] border border-white/[0.08] rounded-xl p-4 sm:p-5">
            <div className="text-xs text-neutral-400 font-medium flex items-center justify-between">
              <span>Unmasked Financial Rails</span>
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-semibold text-white tracking-tight font-mono">
                {metrics.upiCount + metrics.phoneCount}
              </span>
              <span className="text-[11px] text-neutral-500 font-mono">endpoints</span>
            </div>
            <div className="text-[11px] text-neutral-500 mt-1 font-mono">
              {metrics.upiCount} UPI VPAs · {metrics.phoneCount} phones
            </div>
          </div>

          <div className="bg-[#121212] border border-white/[0.08] rounded-xl p-4 sm:p-5">
            <div className="text-xs text-neutral-400 font-medium flex items-center justify-between">
              <span>Cleared Legitimate</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-semibold text-emerald-400 tracking-tight font-mono">
                {metrics.legits}
              </span>
              <span className="text-[11px] text-neutral-500 font-mono">verified</span>
            </div>
            <div className="text-[11px] text-neutral-500 mt-1">
              Valid SSL &amp; official brands
            </div>
          </div>
        </div>

        {/* Investigation Dispatch Box */}
        <div className="bg-[#121212] border border-white/[0.08] rounded-xl p-5 sm:p-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-semibold text-white">Deploy Investigation Agent</h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Paste any suspicious URL, UPI handle, phone number, or SMS text to inspect in an isolated sandbox.
              </p>
            </div>
          </div>

          <form onSubmit={handleLaunch} className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="https://suspect-site.online, name@okhdfcbank, +91 98234 56781..."
                className="w-full bg-black/60 border border-white/[0.12] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors"
              />
              {inputVal && (
                <button
                  type="button"
                  onClick={() => setInputVal("")}
                  className="absolute right-3 top-2.5 text-xs text-neutral-500 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting || !inputVal.trim()}
              className="px-5 py-2.5 rounded-lg bg-[#cd0001] hover:bg-red-700 disabled:opacity-40 text-white font-medium text-xs font-mono transition-colors whitespace-nowrap flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Deploying...</span>
                </>
              ) : (
                <span>Deploy Agent →</span>
              )}
            </button>
          </form>

          {errorMsg && <p className="text-xs text-red-400 font-mono mt-2">{errorMsg}</p>}

          {/* Quick preset links */}
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-white/[0.06] text-xs">
            <span className="text-neutral-500 text-[11px]">Quick samples:</span>
            <button
              type="button"
              onClick={() => setInputVal("https://hdfc-kyc-service.live")}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 border border-white/[0.06] transition-colors"
            >
              HDFC KYC Mirror (URL)
            </button>
            <button
              type="button"
              onClick={() => setInputVal("+91 98234 56781")}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 border border-white/[0.06] transition-colors"
            >
              Electricity Bill (+91 Phone)
            </button>
            <button
              type="button"
              onClick={() => setInputVal("scampay@okaxis")}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 border border-white/[0.06] transition-colors"
            >
              Refund Fraud (UPI)
            </button>
            <button
              type="button"
              onClick={() => setInputVal("Earn ₹5000/day by liking YouTube videos. Contact @task_manager on Telegram")}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 border border-white/[0.06] transition-colors"
            >
              Task Scam (Telegram)
            </button>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Segmented Filter */}
          <div className="flex items-center gap-1 p-0.5 bg-[#121212] border border-white/[0.08] rounded-lg">
            <button
              onClick={() => setFilterVerdict("all")}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                filterVerdict === "all" ? "bg-white/[0.1] text-white" : "text-neutral-400 hover:text-white"
              }`}
            >
              All ({cases.length})
            </button>
            <button
              onClick={() => setFilterVerdict("scam")}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                filterVerdict === "scam" ? "bg-red-500/20 text-red-300" : "text-neutral-400 hover:text-white"
              }`}
            >
              Scams ({metrics.scams})
            </button>
            <button
              onClick={() => setFilterVerdict("running")}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                filterVerdict === "running" ? "bg-amber-500/20 text-amber-300" : "text-neutral-400 hover:text-white"
              }`}
            >
              Active ({metrics.active})
            </button>
            <button
              onClick={() => setFilterVerdict("legit")}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                filterVerdict === "legit" ? "bg-emerald-500/20 text-emerald-300" : "text-neutral-400 hover:text-white"
              }`}
            >
              Legitimate ({metrics.legits})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cases, UPI, phone... (⌘K)"
              className="w-full bg-[#121212] border border-white/[0.08] rounded-lg px-3 py-1.5 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1.5 text-xs text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Case Records Table */}
        <div className="bg-[#121212] border border-white/[0.08] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1020px] text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/[0.08] bg-black/30 text-neutral-400 font-mono text-[11px]">
                  <th className="py-3 px-4 font-medium w-64 min-w-[250px]">Case Reference</th>
                  <th className="py-3 px-4 font-medium min-w-[190px] max-w-xs">Target</th>
                  <th className="py-3 px-4 font-medium w-28 min-w-[100px]">Verdict</th>
                  <th className="py-3 px-4 font-medium w-36 min-w-[130px]">Impersonation</th>
                  <th className="py-3 px-4 font-medium min-w-[230px]">Extracted Financial Rails</th>
                  <th className="py-3 px-4 font-medium text-right w-36 min-w-[130px] whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-neutral-500 font-mono">
                      Loading cases...
                    </td>
                  </tr>
                ) : filteredCases.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-neutral-500 font-mono">
                      No cases match current filter.
                    </td>
                  </tr>
                ) : (
                  filteredCases.map((c) => {
                    const isScam = c.verdict === "scam";
                    const isLegit = c.verdict === "legit";
                    const isRunning = c.status === "running";
                    const upis = c.recon?.result?.upi_ids || [];
                    const phones = c.recon?.result?.phone_numbers || [];
                    const banks = c.recon?.result?.bank_accounts || [];
                    const brand = c.recon?.result?.brand_impersonated;

                    return (
                      <tr key={c.id} className="hover:bg-white/[0.02] transition-colors group">
                        {/* Case Reference Capsule Card */}
                        <td className="py-3 px-4 font-mono align-top w-64 min-w-[250px]">
                          <div
                            className={`relative group/card flex flex-col justify-between p-2.5 rounded-lg bg-[#111215] hover:bg-[#16181e] border border-white/[0.08] hover:border-white/20 transition-all shadow-sm w-full border-l-2 ${
                              isRunning
                                ? "border-l-amber-500/80"
                                : isScam
                                ? "border-l-red-500/80"
                                : "border-l-emerald-500/80"
                            }`}
                          >
                            {/* Top Row: Formatted Case ID + Copy Action */}
                            <div className="flex items-center justify-between gap-1.5">
                              <Link
                                href={`/case/${c.id}`}
                                className="font-mono text-xs font-semibold text-neutral-200 group-hover/card:text-white tracking-wide transition-colors flex items-center gap-1 min-w-0"
                                title={`Inspect dossier #${formatCaseId(c.id)}`}
                              >
                                <span
                                  className={
                                    isRunning
                                      ? "text-amber-400 font-bold"
                                      : isScam
                                      ? "text-red-400 font-bold"
                                      : "text-emerald-400 font-bold"
                                  }
                                >
                                  #
                                </span>
                                <span className="font-mono font-medium text-xs text-neutral-200 group-hover/card:text-white whitespace-nowrap">
                                  {formatCaseId(c.id)}
                                </span>
                              </Link>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  copyToClipboard(c.id, "Case ID", c.id);
                                }}
                                className="p-1 rounded text-neutral-500 hover:text-white hover:bg-white/10 transition-all shrink-0 ml-1"
                                title="Copy full Case ID"
                              >
                                {copiedId === c.id ? (
                                  <span className="text-emerald-400 text-xs font-bold leading-none">✓</span>
                                ) : (
                                  <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="opacity-60 group-hover/card:opacity-100"
                                  >
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                  </svg>
                                )}
                              </button>
                            </div>

                            {/* Bottom Row: Context Tag + Status & Timestamp */}
                            <div className="flex items-center justify-between text-[10px] font-mono pt-2 mt-1.5 border-t border-white/[0.04]">
                              <div className="flex items-center gap-1.5">
                                <span
                                  className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold tracking-wider uppercase border ${
                                    isRunning
                                      ? "bg-amber-950/60 border-amber-700/40 text-amber-300"
                                      : isScam
                                      ? "bg-red-950/70 border-red-800/50 text-red-300"
                                      : "bg-emerald-950/60 border-emerald-700/40 text-emerald-300"
                                  }`}
                                >
                                  {isRunning ? "SANDBOX" : isScam ? "FRAUD" : "CLEARED"}
                                </span>
                                <span className="text-neutral-400 font-medium">
                                  {isRunning ? "Active Probe" : isScam ? "Dossier Ready" : "Assessment Clear"}
                                </span>
                              </div>

                              <span className="text-neutral-500 text-[10px]" suppressHydrationWarning>
                                {formatAge(c.createdAt)}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Target & Input */}
                        <td className="py-3 px-4 max-w-xs align-top min-w-[190px]">
                          <div className="font-mono text-neutral-200 text-xs truncate" title={c.input}>
                            {c.input}
                          </div>
                          {c.targetUrl && c.targetUrl !== c.input && (
                            <div className="font-mono text-[10px] text-neutral-400 truncate mt-0.5" title={c.targetUrl}>
                              ↳ {c.targetUrl}
                            </div>
                          )}
                          <div className="text-[10px] text-neutral-500 font-mono uppercase mt-0.5">
                            {c.inputType}
                          </div>
                        </td>

                        {/* Verdict */}
                        <td className="py-3 px-4 align-top w-28 min-w-[100px]">
                          {isScam && (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium text-red-300 bg-red-950/40 border border-red-800/40">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                              <span>Fraud</span>
                            </span>
                          )}
                          {isLegit && (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium text-emerald-300 bg-emerald-950/40 border border-emerald-800/40">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              <span>Legitimate</span>
                            </span>
                          )}
                          {!isScam && !isLegit && (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium text-amber-300 bg-amber-950/40 border border-amber-800/40">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                              <span>Suspicious</span>
                            </span>
                          )}
                        </td>

                        {/* Impersonation */}
                        <td className="py-3 px-4 align-top w-36 min-w-[130px]">
                          {brand ? (
                            <span className="inline-block px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-xs text-neutral-200 font-medium">
                              {brand}
                            </span>
                          ) : (
                            <span className="text-xs text-neutral-500 font-mono">—</span>
                          )}
                        </td>

                        {/* Extracted Identifiers */}
                        <td className="py-3 px-4 align-top">
                          <div className="flex flex-wrap gap-1.5 max-w-sm">
                            {upis.map((u) => (
                              <button
                                key={u}
                                type="button"
                                onClick={() => copyToClipboard(u, "UPI ID")}
                                title="Click to copy UPI"
                                className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 border border-white/[0.08] transition-colors whitespace-nowrap"
                              >
                                @{u}
                              </button>
                            ))}
                            {phones.map((p) => (
                              <button
                                key={p}
                                type="button"
                                onClick={() => copyToClipboard(p, "Phone")}
                                title="Click to copy Phone"
                                className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 border border-white/[0.06] transition-colors whitespace-nowrap"
                              >
                                {p}
                              </button>
                            ))}
                            {banks.map((b, i) => (
                              <span
                                key={i}
                                className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/[0.03] text-neutral-400 border border-white/[0.06]"
                              >
                                {b}
                              </span>
                            ))}
                            {upis.length === 0 && phones.length === 0 && banks.length === 0 && (
                              <span className="font-mono text-[11px] text-neutral-600">—</span>
                            )}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right font-mono align-top w-36 min-w-[130px] whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                            <Link
                              href={`/case/${c.id}`}
                              className="px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs text-neutral-200 hover:text-white transition-colors whitespace-nowrap shrink-0"
                            >
                              Inspect →
                            </Link>
                            <Link
                              href={`/case/${c.id}/report`}
                              className="px-2 py-1 rounded text-xs text-neutral-400 hover:text-neutral-200 transition-colors whitespace-nowrap shrink-0"
                              title="Legal dossier draft"
                            >
                              Report ↗
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Clean Subdued Footer */}
      <footer className="border-t border-white/[0.06] py-6 text-xs text-neutral-500 font-mono mt-12">
        <div className="max-w-[1380px] w-full mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>OPENFISH · Autonomous Scam Recon &amp; Honeypot Intelligence</div>
          <div>Section 65B Indian Evidence Act Compliant</div>
        </div>
      </footer>
    </div>
  );
}
