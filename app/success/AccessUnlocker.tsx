'use client';

import { useEffect } from 'react';

interface Props {
  plan?: string;
  section?: string;
}

export function AccessUnlocker({ plan, section }: Props) {
  useEffect(() => {
    if (plan === 'section' && section) {
      // Section purchase: merge into unlocked sections list
      const existing = JSON.parse(localStorage.getItem('rcmp-unlocked-sections') ?? '[]') as string[];
      if (!existing.includes(section)) {
        existing.push(section);
        localStorage.setItem('rcmp-unlocked-sections', JSON.stringify(existing));
      }
    } else {
      // Full access (default / backward compatible)
      localStorage.setItem('rcmp-access-unlocked', '1');
    }
  }, [plan, section]);

  return null;
}
