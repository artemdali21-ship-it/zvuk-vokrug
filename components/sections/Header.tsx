"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-paper/95 backdrop-blur-sm border-b border-ink/8" : "bg-transparent"
      }`}
    >
      <div className="container-page flex items-center justify-between h-16 md:h-20">
        <Link
          href="/"
          className="display text-lg md:text-xl text-klein hover:text-klein-deep transition-colors"
        >
          ЗВУК ВОКРУГ
        </Link>

        <div className="flex items-center gap-4 md:gap-6">
          <a
            href="tel:+79033710400"
            className="text-sm md:text-base font-medium text-ink hover:text-klein transition-colors"
          >
            +7 (903) 371-04-00
          </a>
          <a
            href="tel:+79033710400"
            className="px-4 py-2 border border-ink text-ink text-sm font-medium hover:bg-ink hover:text-paper transition-colors hidden md:inline-block"
          >
            Связаться
          </a>
        </div>
      </div>
    </header>
  );
}
