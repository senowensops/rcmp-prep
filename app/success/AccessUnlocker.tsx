'use client';

import { useEffect } from 'react';

export function AccessUnlocker() {
  useEffect(() => {
    localStorage.setItem('rcmp-access-unlocked', '1');
  }, []);

  return null;
}
