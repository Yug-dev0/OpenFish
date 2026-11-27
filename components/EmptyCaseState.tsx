'use client';

import React from 'react';

export default function EmptyCaseState({ onDeploySample }: { onDeploySample?: () => void }) {
  return (
    <div className="text-center py-16 px-4 rounded-xl border border-dashed border-white/15 bg-white/[0.02]">
      <div className="w-12 h-12 mx-auto rounded-full bg-white/5 flex items-center justify-center text-xl mb-3">
        🛡️
      </div>
      <h3 className="text-sm font-semibold text-white/90 mb-1">No Active Incidents in Queue</h3>
      <p className="text-xs text-white/50 max-w-sm mx-auto mb-4">
        Paste a suspicious payment link, UPI ID, or SMS smishing text in the dispatcher console above to launch an investigation.
      </p>
      {onDeploySample && (
        <button
          type="button"
          onClick={onDeploySample}
          className="px-3.5 py-1.5 text-xs font-mono bg-white/10 hover:bg-white/15 text-white rounded-lg transition-colors border border-white/10"
        >
          Load Sample Phishing Target
        </button>
      )}
    </div>
  );
}
