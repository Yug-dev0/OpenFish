'use client';

import React, { useEffect, useState } from 'react';

export default function ServerHealthBadge() {
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    // Ping check
    const checkHealth = async () => {
      try {
        const res = await fetch('/api/cases', { method: 'HEAD' });
        setIsOnline(res.ok);
      } catch {
        setIsOnline(false);
      }
    };
    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono">
      <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-red-500'}`} />
      <span className="text-white/70">{isOnline ? 'Port 4010 Active' : 'Offline'}</span>
    </div>
  );
}
