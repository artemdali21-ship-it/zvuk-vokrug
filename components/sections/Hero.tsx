"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";

const WaveBackground = dynamic(() => import("@/components/ui/WaveBackground"), {
  ssr: false,
});

const ease = [0.22, 1, 0.36, 1] as const;
const fade = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease },
});

export function Hero() {
  return (
    <section className="relative bg-paper min-h-[100dvh] flex flex-col justify-center overflow-hidden pt-20">

      {/* Wave shader — light theme, full resolution */}
      <WaveBackground darkTheme={false} resolutionScale={1.0} />

      {/* Klein blue left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-klein z-[1]" aria-hidden />

      <div className="container-page py-16 md:py-24 relative z-[1]">
        {/* Eyebrow */}
        <motion.p {...fade(0.1)} className="text-[11px] text-ink2 uppercase tracking-[0.22em] mb-8 md:mb-10">
          ЗВУК ВОКРУГ · с 1994 года · Волгоград
        </motion.p>

        {/* Main headline */}
        <motion.h1
          {...fade(0.2)}
          className="display text-ink leading-[0.95] mb-6 md:mb-8"
          style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)", letterSpacing: "-0.03em" }}
        >
          ЗВУК<br />
          СВЕТ<br />
          СЦЕНА<br />
          <span className="text-klein">ЭКРАНЫ</span>
        </motion.h1>

        {/* Descriptor */}
        <motion.p {...fade(0.35)} className="text-ink2 text-base md:text-xl max-w-lg mb-10 md:mb-12 leading-relaxed">
          Комплексное техническое обеспечение мероприятий.
        </motion.p>

        {/* Cities */}
        <motion.p
          {...fade(0.45)}
          className="display text-ink uppercase tracking-[0.06em] mb-6 md:mb-8"
          style={{ fontSize: "clamp(1.1rem, 3vw, 2rem)" }}
        >
          Волгоград · Элиста · Астрахань · Саратов
        </motion.p>

        {/* Stats */}
        <motion.p {...fade(0.55)} className="text-ink/60 text-sm md:text-base mb-12 md:mb-16 tabular-nums">
          30 лет опыта · 9 000+ мероприятий
        </motion.p>

        {/* CTAs */}
        <motion.div {...fade(0.65)} className="flex flex-col sm:flex-row gap-3">
          <a
            href="tel:+79033710400"
            className="inline-flex items-center justify-center px-7 py-3.5 bg-klein text-paper text-sm font-medium uppercase tracking-[0.1em] hover:bg-klein-deep transition-colors"
          >
            Получить смету
          </a>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center px-7 py-3.5 border border-ink/20 text-ink text-sm font-medium uppercase tracking-[0.1em] hover:border-ink/50 transition-colors"
          >
            Проекты
          </Link>
        </motion.div>
      </div>

      {/* Bottom ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="mt-auto border-t border-ink/[0.08] relative z-[1]"
      >
        <div className="container-page py-4 flex items-center gap-6 md:gap-10 overflow-x-auto scrollbar-none">
          {[
            "Scorpions · Лепс · ЛЮБЭ",
            "Газпром · Министерство культуры",
            "Парад Победы · 9 Мая",
            "ParkSeason Festival",
          ].map((item, i) => (
            <span key={i} className="text-[11px] text-ink2 whitespace-nowrap uppercase tracking-[0.12em] shrink-0">
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
