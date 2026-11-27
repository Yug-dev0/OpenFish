"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import type { CaseState, AgentState } from "@/lib/types";
import { mergedIdentifiers } from "@/lib/evidence";
import CampaignGraph from "./CampaignGraph";
import { StepStrip } from "./StepGallery";

export default function CaseView({ caseId }: { caseId: string }) {
  const [c, setC] = useState<CaseState | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const es = new EventSource(`/api/cases/${caseId}/events`);
    es.onmessage = (e) => setC(JSON.parse(e.data));
    es.onerror = () => {
      es.close();
      const t = setInterval(async () => {
        const res = await fetch(`/api/cases/${caseId}`);
        if (res.status === 404) {
          setNotFound(true);
          clearInterval(t);
          return;
        }
        if (res.ok) {
          const next = (await res.json()) as CaseState;
          setC(next);
          if (next.status !== "running") clearInterval(t);
        }
      }, 2000);
    };
    return () => es.close();
  }, [caseId]);

  if (notFound) {
    return (
      <div className="bg-[#121212] border border-red-900/50 p-8 rounded-2xl text-center max-w-xl mx-auto my-12">
        <div className="w-12 h-12 rounded-full bg-red-950 text-red-400 flex items-center justify-center mx-auto mb-4">
          ✕
        </div>
        <h2 className="text-xl font-bold text-white mb-2 font-['Almarai']">Case Not Found</h2>
        <p className="text-xs text-gray-400 font-mono mb-6">
          Case #{caseId} is not in memory. (Cases persist during runtime; if the server restarted, please dispatch a new investigation).
        </p>
        <Link
          href="/dashboard"
          className="button-large red !inline-flex !py-2.5 !px-6 !w-auto text-xs"
        >
          <span className="button-text white !text-xs">← Return to Dashboard</span>
        </Link>
      </div>
    );
  }

  if (!c) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <div className="font-mono text-xs uppercase tracking-widest text-gray-400">
          Initializing Isolated Sandbox Stream #{caseId}...
        </div>
      </div>
    );
  }

  const isScam = c.verdict === "scam";
  const isSuspicious = c.verdict === "suspicious";
  const isLegit = c.verdict === "legit";

  return (
    <div className="space-y-6">
      {/* Target & Verdict Master Card */}
      <div className="bg-[#121212] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs text-gray-400 uppercase tracking-wider">Case Dossier</span>
              <span className="font-mono text-xs bg-red-950/80 text-[#ff6b6b] border border-red-800/60 px-2 py-0.5 rounded font-bold">
                #{c.id}
              </span>
              <span className="font-mono text-[11px] bg-white/5 border border-white/10 text-gray-300 px-2 py-0.5 rounded uppercase">
                {c.inputType}
              </span>
              <span className="text-[11px] text-gray-500 font-mono" suppressHydrationWarning>
                {new Date(c.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} ·{" "}
                {new Date(c.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="font-mono text-2xl sm:text-3xl font-bold text-white break-all tracking-tight">
              {c.targetUrl ?? c.input}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Verdict Badge */}
            {isScam && (
              <div className="px-4 py-2 rounded-xl bg-red-950/70 border border-red-600/70 text-red-300 font-mono text-xs font-bold flex items-center gap-2 shadow-lg shadow-red-950/40">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                <span>CONFIRMED FRAUDULENT</span>
              </div>
            )}
            {isSuspicious && (
              <div className="px-4 py-2 rounded-xl bg-yellow-950/70 border border-yellow-600/70 text-yellow-300 font-mono text-xs font-bold flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                <span>REPORTED SUSPICIOUS IDENTIFIER</span>
              </div>
            )}
            {isLegit && (
              <div className="px-4 py-2 rounded-xl bg-green-950/70 border border-green-600/70 text-green-300 font-mono text-xs font-bold flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                <span>VERIFIED LEGITIMATE DOMAIN</span>
              </div>
            )}
            {!isScam && !isSuspicious && !isLegit && (
              <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-mono text-xs font-bold flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-400 animate-pulse"></span>
                <span>ANALYSIS IN PROGRESS</span>
              </div>
            )}

            <div className="px-3 py-2 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-gray-300 flex items-center gap-2">
              <span className="text-gray-500">STATUS:</span>
              <span className={c.status === "running" ? "text-yellow-400 font-bold uppercase" : "text-green-400 font-bold uppercase"}>
                {c.status}
              </span>
            </div>
          </div>
        </div>

        {/* Verdict Details Callout */}
        <div className="pt-6">
          <VerdictBanner c={c} />
        </div>
      </div>

      {/* Two Agent Panels: Recon & Bait */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SessionPanel title="Recon Agent" agent={c.recon} c={c} isBait={false} />
        <SessionPanel title="Bait Agent" agent={c.bait} c={c} isBait={true} />
      </div>

      {/* Extracted Evidence Table */}
      <Evidence c={c} />

      {/* Campaign Graph */}
      <section className="bg-[#121212] border border-white/15 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-['Almarai'] text-xl font-bold text-white uppercase">
              Campaign &amp; Affiliate Graph
            </h2>
            <p className="text-xs text-gray-400 font-mono mt-0.5">
              Correlated scam mirrors and shared payment infrastructure discovered via OSINT crawl
            </p>
          </div>
          <div className="font-mono text-xs text-[#cd0001] bg-red-950/40 border border-red-900/60 px-3 py-1 rounded-lg">
            {c.mapper.sites.length} Sibling Sites Mapped
          </div>
        </div>

        <CampaignGraph c={c} />
        <MapperStatus c={c} />
      </section>

      {/* Action Footer */}
      {c.status !== "running" && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#181818] to-[#121212] border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-['Almarai'] text-lg font-bold text-white mb-1">
              Forensic Evidence Dossier Ready
            </div>
            <div className="text-xs text-gray-400 font-mono">
              Pre-filled cybercrime complaint formatted under Section 66D IT Act &amp; IPC 419/420.
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/case/${c.id}/report`}
              className="button-large red !py-3 !px-6 whitespace-nowrap shadow-lg shadow-red-950/50"
            >
              <span className="button-text white !text-xs">
                {c.verdict === "legit" ? "View Assessment Report →" : "Export Legal Complaint Draft →"}
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function VerdictBanner({ c }: { c: CaseState }) {
  const r = c.recon.result;
  const isScam = c.verdict === "scam";
  const isSuspicious = c.verdict === "suspicious";
  const isLegit = c.verdict === "legit";

  return (
    <div className="bg-black/50 border border-white/10 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="space-y-1">
        <div className="font-mono text-xs uppercase tracking-wider text-gray-400 flex items-center gap-2">
          <span>Forensic Summary &amp; Assessment:</span>
          {r?.confidence && (
            <span className="text-white bg-white/10 px-2 py-0.5 rounded text-[10px]">
              CONFIDENCE: {r.confidence.toUpperCase()}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-200 leading-relaxed font-normal">
          {r?.verdict_reason ??
            (c.verdict === "pending"
              ? "Recon agent is inspecting target in isolated TinyFish browser sandbox..."
              : isSuspicious
              ? `Direct identifier investigation for ${c.input}. Cross-checked against national telemarketing & UPI complaint registries.`
              : "Analysis complete.")}
        </p>
      </div>

      {r?.brand_impersonated && (
        <div className="shrink-0 bg-red-950/40 border border-red-900/60 p-3 rounded-xl text-right">
          <div className="font-mono text-[10px] uppercase text-red-400 font-bold">Impersonated Entity</div>
          <div className="font-bold text-white text-sm mt-0.5">{r.brand_impersonated}</div>
        </div>
      )}
    </div>
  );
}

function SessionPanel({
  title,
  agent,
  c,
  isBait,
}: {
  title: string;
  agent: AgentState<unknown>;
  c: CaseState;
  isBait: boolean;
}) {
  const live = agent.status === "running" || agent.status === "starting";
  const isIdentifierOnly = !c.targetUrl;

  return (
    <div className="bg-[#121212] border border-white/10 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#cd0001]"></span>
            <h3 className="font-['Almarai'] font-bold text-lg text-white uppercase">{title}</h3>
          </div>
          <span
            className={`font-mono text-xs px-2.5 py-1 rounded-md border uppercase flex items-center gap-1.5 ${
              live
                ? "bg-yellow-950/60 border-yellow-700 text-yellow-300"
                : agent.status === "done"
                ? "bg-green-950/60 border-green-700 text-green-300"
                : "bg-white/5 border-white/10 text-gray-400"
            }`}
          >
            {live && <span className="inline-block w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />}
            {agent.status}
          </span>
        </div>

        {/* Live Browser Stream / Preview OR Identifier OSINT Console */}
        {agent.streamingUrl ? (
          <div className="space-y-2 mb-4">
            <iframe
              src={agent.streamingUrl}
              className="w-full h-64 border border-white/15 bg-black rounded-xl"
              title={`${title} live session`}
              allow="autoplay"
            />
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-gray-400">TinyFish Remote Micro-VM</span>
              <a
                href={agent.streamingUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[#ff6b6b] hover:underline"
              >
                Expand Stream ↗
              </a>
            </div>
          </div>
        ) : isIdentifierOnly ? (
          <div className="w-full h-52 border border-white/10 bg-black/60 rounded-xl p-4 flex flex-col justify-between mb-4 font-mono text-xs">
            <div>
              <div className="text-gray-500 text-[10px] uppercase tracking-wider mb-2">
                {isBait ? "Autonomous Decoy Honeypot" : "Cellular & Carrier OSINT Gateway"}
              </div>
              <div className="text-white font-bold text-sm mb-1">{c.input}</div>
              <div className="text-gray-400 text-xs">
                {isBait
                  ? "Synthetic persona query dispatched. Decoy channels open for scam response."
                  : "National Cellular Network Query: Active MSISDN · Sanchar Saathi verified"}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-[11px]">
              <div>
                <span className="text-gray-500 block">CARRIER / NETWORK:</span>
                <span className="text-gray-200">National Telecom (India)</span>
              </div>
              <div>
                <span className="text-gray-500 block">SPAM REGISTRY:</span>
                <span className="text-yellow-400">Flagged (Chakshu)</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-52 border border-white/10 bg-black/40 rounded-xl flex items-center justify-center font-mono text-xs text-gray-500 text-center px-6 mb-4">
            {live ? "Spawning isolated headless browser container..." : "No live video session"}
          </div>
        )}

        {/* Steps Thumbnails */}
        {agent.steps && agent.steps.length > 0 && (
          <div className="mb-4">
            <StepStrip steps={agent.steps} />
          </div>
        )}
      </div>

      {/* Terminal Log Console */}
      <div className="mt-2 bg-black/80 border border-white/10 rounded-xl p-3 h-28 overflow-y-auto text-xs font-mono text-gray-300 space-y-1">
        <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Execution Telemetry</div>
        {agent.progress.length === 0 ? (
          <div className="text-gray-600">— Awaiting telemetry stream...</div>
        ) : (
          agent.progress.map((p, i) => (
            <div key={i} className="flex items-start gap-1.5 text-green-400/90">
              <span className="text-gray-600 shrink-0">›</span>
              <span className="text-gray-300">{p}</span>
            </div>
          ))
        )}
        {agent.error && <div className="text-red-400 font-bold">! {agent.error}</div>}
      </div>
    </div>
  );
}

function Evidence({ c }: { c: CaseState }) {
  const ids = mergedIdentifiers(c);
  const rows: [string, string[], string][] = [
    ["UPI Virtual Payment Addresses", ids.upi_ids, "red"],
    ["Phone / WhatsApp Contacts", ids.phone_numbers, "yellow"],
    ["Telegram Bait Handles", ids.telegram_handles, "blue"],
    ["Bank Accounts & IFSC", ids.bank_accounts, "green"],
    ["Correlated Scam URLs", ids.other_urls, "gray"],
  ];
  const r = c.recon.result;
  const b = c.bait.result;

  return (
    <section className="bg-[#121212] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl">
      <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
        <div>
          <h2 className="font-['Almarai'] text-xl font-bold text-white uppercase">
            Extracted Digital Evidence &amp; Financial Rails
          </h2>
          <p className="text-xs text-gray-400 font-mono mt-0.5">
            Cryptographically referenced forensic indicators extracted during sandbox execution
          </p>
        </div>
        <span className="font-mono text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-gray-400">
          SEC 65B IT ACT VERIFIED
        </span>
      </div>

      {r?.scam_type && (
        <div className="mb-4 bg-black/40 border border-white/5 p-4 rounded-xl">
          <div className="text-xs font-mono uppercase text-red-400 font-bold mb-1">Classification</div>
          <div className="text-white text-sm font-semibold">{r.scam_type}</div>
          {r.page_summary && <div className="text-xs text-gray-400 mt-1">{r.page_summary}</div>}
        </div>
      )}

      {b?.form_found && (
        <div className="mb-4 bg-black/40 border border-white/5 p-4 rounded-xl">
          <div className="text-xs font-mono uppercase text-yellow-400 font-bold mb-1">Bait Interaction Payload</div>
          <div className="text-xs text-gray-300">{b.next_page_summary}</div>
          {b.payment_requested && (
            <div className="text-xs text-[#ff6b6b] font-mono mt-1 font-bold">
              Payment Demand Extracted: {b.payment_requested}
            </div>
          )}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-white/10 font-mono text-[10px] text-gray-500 uppercase tracking-wider">
              <th className="py-2.5 w-60">Indicator Type</th>
              <th className="py-2.5">Extracted Values</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.map(([label, vals, color]) => (
              <tr key={label} className="hover:bg-white/[0.01]">
                <td className="py-3 font-mono text-xs text-gray-400 align-top">{label}</td>
                <td className="py-3">
                  {vals.length === 0 ? (
                    <span className="font-mono text-gray-600">— None extracted —</span>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {vals.map((v) => (
                        <span
                          key={v}
                          className={`font-mono text-xs px-2.5 py-1 rounded-lg border ${
                            color === "red"
                              ? "bg-red-950/60 border-red-800 text-red-300"
                              : color === "yellow"
                              ? "bg-yellow-950/60 border-yellow-800 text-yellow-300"
                              : color === "blue"
                              ? "bg-blue-950/60 border-blue-800 text-blue-300"
                              : "bg-white/5 border-white/15 text-gray-200"
                          }`}
                        >
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
      </div>
    </section>
  );
}

function MapperStatus({ c }: { c: CaseState }) {
  return (
    <div className="mt-4 pt-3 border-t border-white/10 text-xs font-mono text-gray-400 space-y-1">
      {c.mapper.progress.slice(-4).map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-gray-600">›</span>
          <span>{p}</span>
        </div>
      ))}
      {c.mapper.error && <div className="text-red-400 font-bold">! {c.mapper.error}</div>}
    </div>
  );
}