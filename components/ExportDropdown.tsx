'use client';

import React, { useState } from 'react';

interface ExportDropdownProps {
  caseId: string;
}

export default function ExportDropdown({ caseId }: ExportDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1.5 text-xs font-mono rounded bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 flex items-center gap-1.5 transition-colors"
      >
        <span>Export Case</span>
        <span className="text-[10px]">▼</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-44 rounded-lg bg-[#141417] border border-white/10 shadow-xl py-1 z-30 font-mono text-xs">
          <a
            href={`/api/cases/${caseId}/export?format=json`}
            download
            className="block px-3 py-1.5 text-white/80 hover:bg-white/10 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            Download JSON
          </a>
          <a
            href={`/api/cases/${caseId}/export?format=md`}
            download
            className="block px-3 py-1.5 text-white/80 hover:bg-white/10 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            Download Markdown
          </a>
          <button
            type="button"
            onClick={() => {
              window.print();
              setIsOpen(false);
            }}
            className="w-full text-left px-3 py-1.5 text-white/80 hover:bg-white/10 hover:text-white"
          >
            Print Dossier (PDF)
          </button>
        </div>
      )}
    </div>
  );
}
