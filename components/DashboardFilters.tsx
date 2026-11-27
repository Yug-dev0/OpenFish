'use client';

import React from 'react';

interface FilterProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
  counts: { all: number; scams: number; legit: number };
}

export default function DashboardFilters({ currentFilter, onFilterChange, counts }: FilterProps) {
  const filters = [
    { id: 'all', label: `All (${counts.all})` },
    { id: 'scams', label: `Confirmed Scams (${counts.scams})` },
    { id: 'legit', label: `Cleared Legit (${counts.legit})` },
  ];

  return (
    <div className="flex items-center gap-2">
      {filters.map(f => (
        <button
          key={f.id}
          type="button"
          onClick={() => onFilterChange(f.id)}
          className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
            currentFilter === f.id
              ? 'bg-white/15 text-white border border-white/20'
              : 'bg-white/5 text-white/60 hover:text-white/80 border border-transparent'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
