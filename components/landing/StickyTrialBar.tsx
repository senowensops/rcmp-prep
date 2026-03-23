'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

export function StickyTrialBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Hide if user has already visited /sample or /test
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.startsWith('/sample') || path.startsWith('/test')) {
        setDismissed(true);
        return;
      }
    }

    const onScroll = () => {
      setVisible(window.scrollY > 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (dismissed) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-center justify-between gap-4 bg-[#1a1a1a]/95 px-4 py-3 backdrop-blur-sm sm:px-6">
        <p className="font-head text-sm font-bold uppercase tracking-[0.08em] text-white/80 sm:text-base">
          RCMP Online Assessment coming up?
        </p>
        <Link
          href="/sample"
          className="shrink-0 rounded-full bg-[var(--red)] px-5 py-2 font-head text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[var(--red-dk)]"
        >
          Try Free →
        </Link>
      </div>
    </div>
  );
}
