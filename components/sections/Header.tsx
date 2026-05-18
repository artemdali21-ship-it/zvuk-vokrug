"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* Klein blue 2px top accent line */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-klein" />

      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-[2px] left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-paper/96 backdrop-blur-sm border-b border-ink/[0.07]"
            : "bg-paper border-b border-ink/[0.07]"
        }`}
      >
        <div className="container-page flex items-center justify-between h-20 md:h-[80px]">

          {/* ─── Logo ─── */}
          <Link
            href="/"
            className="shrink-0 hover:opacity-80 transition-opacity duration-200"
            aria-label="Звук Вокруг — на главную"
          >
            <Image
              src="/logo.png"
              alt="Звук Вокруг"
              width={280}
              height={200}
              className="h-[60px] w-auto object-contain"
              priority
            />
          </Link>

          {/* ─── Desktop nav ─── */}
          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Основная навигация"
          >
            {/* Status indicator */}
            <div className="flex items-center gap-2" aria-hidden>
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-klein opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-klein" />
              </span>
              <span className="text-[10px] text-ink2 uppercase tracking-[0.16em] tabular-nums">
                Волгоград
              </span>
            </div>

            <Link
              href="/projects"
              className="text-[11px] text-ink2 uppercase tracking-[0.14em] hover:text-ink transition-colors duration-200"
            >
              Проекты
            </Link>

            <a
              href="tel:+79033710400"
              className="text-sm text-ink2 hover:text-ink transition-colors duration-200 tabular-nums"
            >
              +7 (903) 371-04-00
            </a>
          </nav>

          {/* ─── CTA button (desktop) + Burger (mobile) ─── */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+79033710400"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-klein text-paper text-[11px] uppercase tracking-[0.12em] font-medium hover:bg-klein-deep transition-colors duration-200"
            >
              {/* Corner decorations */}
              <span aria-hidden className="text-paper/40 text-[9px] font-mono leading-none">+</span>
              Связаться
            </a>

            {/* Mobile burger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] group"
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={menuOpen}
            >
              <span
                className={`block w-5 h-[1.5px] bg-ink transition-all duration-300 origin-center ${
                  menuOpen ? "translate-y-[6.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-ink transition-all duration-300 ${
                  menuOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-ink transition-all duration-300 origin-center ${
                  menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* ─── Mobile menu ─── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden border-t border-ink/[0.07] bg-paper"
            >
              <nav className="container-page py-6 flex flex-col gap-5">
                {/* Status */}
                <div className="flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-klein opacity-60" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-klein" />
                  </span>
                  <span className="text-[10px] text-ink2 uppercase tracking-[0.16em]">
                    Волгоград
                  </span>
                </div>

                <Link
                  href="/projects"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-ink2 uppercase tracking-[0.12em] hover:text-ink transition-colors"
                >
                  Проекты
                </Link>

                <div className="border-t border-ink/[0.06] pt-5 flex flex-col gap-3">
                  <a
                    href="tel:+79033710400"
                    className="text-xl font-medium text-ink tabular-nums"
                  >
                    +7 (903) 371-04-00
                  </a>
                  <a
                    href="mailto:fmpuzikov@gmail.com"
                    className="text-sm text-ink2 hover:text-ink transition-colors"
                  >
                    fmpuzikov@gmail.com
                  </a>
                  <a
                    href="tel:+79033710400"
                    className="mt-2 inline-flex items-center gap-2 px-5 py-3 bg-klein text-paper text-[11px] uppercase tracking-[0.12em] font-medium hover:bg-klein-deep transition-colors w-fit"
                  >
                    <span aria-hidden className="text-paper/40 text-[9px] font-mono">+</span>
                    Связаться
                  </a>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
