"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";

export function DarkModeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const initial = window.localStorage.getItem("rcmp-dark") === "1";
    setDark(initial);
    document.documentElement.classList.toggle("dark", initial);
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    window.localStorage.setItem("rcmp-dark", next ? "1" : "0");
    document.documentElement.classList.toggle("dark", next);
  };
  return <button onClick={toggle} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs">{dark ? "Light" : "Dark"}</button>;
}
