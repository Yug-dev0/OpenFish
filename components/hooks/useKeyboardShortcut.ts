'use client';

import { useEffect } from 'react';

export function useKeyboardShortcut(targetKey: string, callback: () => void, modifier = true) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const isModifierActive = event.metaKey || event.ctrlKey;
      if (modifier && !isModifierActive) return;
      if (event.key.toLowerCase() === targetKey.toLowerCase()) {
        event.preventDefault();
        callback();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [targetKey, callback, modifier]);
}
