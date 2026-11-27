'use client';

import React from 'react';

interface TimelineStep {
  step: number;
  title: string;
  status: 'PENDING' | 'ACTIVE' | 'COMPLETE';
}

export default function InvestigationTimeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <div className="w-full py-3 flex items-center justify-between border-b border-white/10 font-mono text-xs">
      {steps.map((s, idx) => (
        <div key={s.step} className="flex items-center gap-2">
          <span
            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              s.status === 'COMPLETE'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : s.status === 'ACTIVE'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse'
                : 'bg-white/5 text-white/40 border border-white/10'
            }`}
          >
            {s.step}
          </span>
          <span className={s.status === 'COMPLETE' ? 'text-white/90' : 'text-white/50'}>
            {s.title}
          </span>
          {idx < steps.length - 1 && <span className="text-white/20 ml-2">→</span>}
        </div>
      ))}
    </div>
  );
}
