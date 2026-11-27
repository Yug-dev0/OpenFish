"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { CaseState } from "@/lib/types";
import { mergedIdentifiers } from "@/lib/evidence";
import { StepGallery } from "@/components/StepGallery";

export default function Report({ c, complaint }: { c: CaseState; complaint: string }) {
  const [copied, setCopied] = useState(false);
  const r = c.recon.result;
  const b = c.bait.result;
  const ids = mergedIdentifiers(c);

  async function copy() {
    await navigator.clipboard.writeText(complaint);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const rows: [string, string[]][] = [
    ["UPI IDs", ids.upi_ids],
    ["Phone / WhatsApp", ids.phone_numbers],
    ["Telegram", ids.telegram_handles],
    ["Emails", ids.emails],
    ["Bank accounts", ids.bank_accounts],
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-[#f2f2f0] font-['Open_Sans',sans-serif]">
      {/* Top Navbar */}
      <header className="no-print border-b border-white/10 bg-[#0f0f0f]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-['Almarai'] font-bold text-xl tracking-tight text-white uppercase">
                OPEN<span className="text-[#cd0001]">FISH</span>
              </span>
              <span className="inline-block w-2 h-2 rounded-full bg-[#cd0001] animate-pulse"></span>
            </Link>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-black/60 border border-white/10 rounded-full font-mono text-[10px] text-green-400">
              <span>LEGAL EVIDENCE DOSSIER · SEC 65B IT ACT</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/case/${c.id}`}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono uppercase tracking-wider text-gray-300 hover:text-white transition-all flex items-center gap-1.5"
            >
              <span>← Back to Case Audit</span>
            </Link>
            <button
              onClick={() => window.print()}
              className="button-large red !py-1.5 !px-4 !h-auto text-xs"
            >
              <span className="button-text white !text-xs">Download PDF 🖨</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        {/* Title */}
        <div className="border-b border-white/15 pb-6 flex items-start justify-between">
          <div>
            <div className="font-mono text-xs text-[#cd0001] uppercase tracking-wider mb-1">
              National Cybercrime Reporting Package
            </div>
            <h1 className="text-3xl font-bold font-['Almarai'] text-white">
              {c.verdict === "legit" ? "Assessment: Verified Legitimate Entity" : "Cybercrime Evidence Dossier"}
            </h1>
            <p className="font-mono text-xs text-gray-400 mt-1" suppressHydrationWarning>
              Case Ref #{c.id} · Ingested {new Date(c.createdAt).toLocaleString()} · Status: {c.status.toUpperCase()}
            </p>
          </div>
        </div>

        {/* Suspect Target */}
        <section className="bg-[#121212] border border-white/10 rounded-2xl p-6">
          <div className="font-mono text-xs uppercase text-[#cd0001] font-bold mb-2">Target Entity / Suspect</div>
          <div className="font-mono text-xl text-white font-bold break-all bg-black/50 p-3 rounded-xl border border-white/5">
            {c.targetUrl ?? c.input}
          </div>
          {r?.verdict_reason && (
            <div className="mt-4 text-sm text-gray-300 leading-relaxed">
              <span className="font-mono text-xs bg-red-950 text-red-300 border border-red-800 px-2 py-0.5 rounded mr-2 uppercase">
                {c.verdict}
              </span>
              {r.verdict_reason}
              {r.confidence && <span className="font-mono text-xs text-gray-500 ml-2">(Confidence: {r.confidence})</span>}
            </div>
          )}
          {r?.scam_type && (
            <div className="mt-3 text-xs text-gray-400 font-mono">
              Classification: <span className="text-white font-semibold">{r.scam_type}</span>
              {r.brand_impersonated ? ` · Impersonating ${r.brand_impersonated}` : ""}
            </div>
          )}
          {b?.payment_requested && (
            <div className="mt-2 text-xs text-[#ff6b6b] font-mono font-bold">
              Extracted Payment Demand: {b.payment_requested}
            </div>
          )}
        </section>

        {/* Extracted Identifiers */}
        <section className="bg-[#121212] border border-white/10 rounded-2xl p-6">
          <div className="font-mono text-xs uppercase text-gray-400 font-bold mb-4">
            Forensic Identifiers &amp; Financial Rails
          </div>
          <table className="w-full text-sm">
            <tbody className="divide-y divide-white/5">
              {rows.map(([label, vals]) => (
                <tr key={label}>
                  <td className="font-mono text-xs text-gray-400 py-3 pr-4 w-48 align-top">{label}</td>
                  <td className="py-3">
                    {vals.length === 0 ? (
                      <span className="font-mono text-xs text-gray-600">— None —</span>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {vals.map((v) => (
                          <span key={v} className="font-mono text-xs px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white">
                            {v}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Screenshots if available */}
        {(c.recon.steps.some((s) => s.screenshot) || c.bait.steps.some((s) => s.screenshot)) && (
          <section className="bg-[#121212] border border-white/10 rounded-2xl p-6">
            <div className="font-mono text-xs uppercase text-gray-400 font-bold mb-4">
              Cryptographic Browser Screenshots (Sandbox Session)
            </div>
            <StepGallery title="Reconnaissance Milestones" steps={c.recon.steps} />
            <StepGallery title="Bait Honeypot Milestones" steps={c.bait.steps} />
          </section>
        )}

        {/* Pre-filled Complaint */}
        <section className="bg-[#121212] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="font-mono text-xs uppercase text-[#cd0001] font-bold">
              {c.verdict === "legit" ? "Assessment Findings" : "Pre-Filled Cybercrime.gov.in Complaint Draft"}
            </div>
            <button
              onClick={copy}
              className="no-print font-mono text-xs bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-1.5 rounded-lg text-white transition-colors"
            >
              {copied ? "✓ Copied to Clipboard" : "Copy Complaint Text"}
            </button>
          </div>

          <pre className="bg-black border border-white/10 rounded-xl p-4 text-xs font-mono text-gray-300 whitespace-pre-wrap leading-relaxed overflow-x-auto">
            {complaint}
          </pre>

          {c.verdict !== "legit" && (
            <p className="text-xs text-gray-500 font-mono mt-3">
              This text is formatted to match the National Cybercrime Reporting Portal complaint submission fields. Copy and paste at{" "}
              <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" className="text-[#cd0001] underline">
                cybercrime.gov.in
              </a>.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}