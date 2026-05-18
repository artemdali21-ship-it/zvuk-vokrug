"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-paper/95 backdrop-blur-md border-b border-ink/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="container-page flex items-center justify-between h-16 md:h-20">
        <Link
          href="/"
          className="display text-base md:text-lg text-klein hover:text-klein-deep transition-colors duration-200 tracking-tight"
        >
          ЗВУК ВОКРУГ
        </Link>

        <nav className="flex items-center gap-4 md:gap-6">
          <a
            href="tel:+79033710400"
            className={`text-sm md:text-base font-medium transition-colors duration-200 hidden sm:block ${
              scrolled ? "text-ink hover:text-klein" : "text-ink hover:text-klein"
            }`}
          >
            +7 (903) 371-04-00
          </a>
          <Link
            href="/projects"
            className={`text-sm font-medium transition-colors duration-200 hidden md:block ${
              scrolled ? "text-ink2 hover:text-ink" : "text-ink2 hover:text-ink"
            }`}
          >
            Проекты
          </Link>
          <a
            href="tel:+79033710400"
            className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              scrolled
                ? "border border-ink text-ink hover:bg-ink hover:text-paper"
                : "border border-ink text-ink hover:bg-ink hover:text-paper"
            }`}
          >
            Связаться
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
