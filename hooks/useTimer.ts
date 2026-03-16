"use client";

import { useEffect, useState } from "react";

export function useTimer(initialSeconds: number | null, active: boolean, onExpire?: () => void) {
  const [secondsLeft, setSecondsLeft] = useState<number | null>(initialSeconds);
  useEffect(() => { setSecondsLeft(initialSeconds); }, [initialSeconds]);
  useEffect(() => {
    if (!active || secondsLeft === null) return;
    if (secondsLeft <= 0) { onExpire?.(); return; }
    const id = window.setTimeout(() => setSecondsLeft((value) => (value === null ? null : value - 1)), 1000);
    return () => window.clearTimeout(id);
  }, [active, secondsLeft, onExpire]);
  return { secondsLeft, setSecondsLeft };
}
