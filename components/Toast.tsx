'use client';

import React from 'react';

export interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose?: () => void;
}

export default function Toast({ message, isVisible }: ToastProps) {
  if (!isVisible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-[#141417] text-white border border-white/10 shadow-2xl transition-all duration-200 animate-in fade-in slide-in-from-bottom-2"
    >
      <span className="w-2 h-2 rounded-full bg-[#10b981]" />
      <span className="text-xs font-mono text-white/90">{message}</span>
    </div>
  );
}
