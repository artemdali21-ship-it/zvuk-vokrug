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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* Electric blue top line */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px]" style={{ background: "#2155FF" }} />

      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-[2px] left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(2,6,23,0.92)" : "rgba(2,6,23,0.72)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="container-page flex items-center justify-between h-[54px] md:h-[68px]">

          {/* Logo */}
          <Link href="/" className="shrink-0 hover:opacity-80 transition-opacity duration-200" aria-label="Звук Вокруг — на главную">
            <Image
              src="/logo.png"
              alt="Звук Вокруг"
              width={280}
              height={200}
              className="h-[48px] w-auto object-contain brightness-0 invert"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Основная навигация">
            <div className="flex items-center gap-2" aria-hidden>
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: "#2155FF" }} />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: "#2155FF" }} />
              </span>
              <span className="text-[10px] text-white/40 uppercase tracking-[0.16em]">Волгоград</span>
            </div>
            <Link href="/projects" className="text-[11px] text-white/50 uppercase tracking-[0.14em] hover:text-white transition-colors duration-200">
              Проекты
            </Link>
            <a href="tel:+79033710400" className="text-sm text-white/50 hover:text-white transition-colors duration-200 tabular-nums">
              +7 (903) 371-04-00
            </a>
          </nav>

          {/* CTA + Burger */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+79033710400"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-[11px] uppercase tracking-[0.12em] font-bold transition-colors duration-200"
              style={{ background: "#2155FF", height: 44 }}
              onMouseEnter={e => (e.currentTarget.style.background = "#346BFF")}
              onMouseLeave={e => (e.currentTarget.style.background = "#2155FF")}
            >
              Связаться
            </a>

            <button
              onClick={() => setMenuOpen(v => !v)}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={menuOpen}
            >
              <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 origin-center ${menuOpen ? "translate-y-[6.5px] rotate-45" : ""}`} />
              <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 origin-center ${menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "rgba(2,6,23,0.96)" }}
            >
              <nav className="container-page py-6 flex flex-col gap-5">
                <Link href="/projects" onClick={() => setMenuOpen(false)} className="text-sm text-white/60 uppercase tracking-[0.12em] hover:text-white transition-colors">
                  Проекты
                </Link>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} className="pt-5 flex flex-col gap-3">
                  <a href="tel:+79033710400" className="text-xl font-bold text-white tabular-nums">
                    +7 (903) 371-04-00
                  </a>
                  <a href="mailto:fmpuzikov@gmail.com" className="text-sm text-white/50 hover:text-white transition-colors">
                    fmpuzikov@gmail.com
                  </a>
                  <a
                    href="tel:+79033710400"
                    className="mt-2 inline-flex items-center gap-2 px-5 py-3 rounded-full text-white text-[11px] uppercase tracking-[0.12em] font-bold w-fit"
                    style={{ background: "#2155FF" }}
                  >
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
