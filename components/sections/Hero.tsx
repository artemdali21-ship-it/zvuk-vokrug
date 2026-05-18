"use client";

import { useRef } from "react";
import { SoundObject } from "@/components/ui/SoundObject";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const zvukY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["0%", "-35%"]
  );
  const vokrugY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["0%", "25%"]
  );
  const objY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["0%", "-15%"]
  );
  const objScale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1, 1.08]
  );

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] overflow-hidden bg-paper"
    >
      {/* SEO-only h1 */}
      <h1 className="sr-only">
        30 лет звука для Юга России. Аренда звукового, светового и сценического
        оборудования.
      </h1>

      {/* z-10: ЗВУК — за шейдером, едет вверх */}
      <motion.div
        style={{ y: zvukY }}
        className="absolute inset-0 z-10 flex items-start justify-start pt-28 md:pt-36 pl-6 md:pl-12 pointer-events-none will-change-transform"
      >
        <motion.span
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="display text-[22vw] md:text-[18vw] lg:text-[16vw] leading-[0.82] tracking-[-0.04em] text-ink select-none"
        >
          ЗВУК
        </motion.span>
      </motion.div>

      {/* z-20: Sound-object */}
      <motion.div
        style={{ y: objY, scale: objScale }}
        className="absolute inset-0 z-20 will-change-transform"
      >
        <SoundObject />
      </motion.div>

      {/* z-30: ВОКРУГ — перед шейдером */}
      <motion.div
        style={{ y: vokrugY }}
        className="absolute inset-0 z-30 flex items-end justify-end pb-32 md:pb-40 pr-6 md:pr-12 pointer-events-none will-change-transform"
      >
        <motion.span
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="display text-[22vw] md:text-[18vw] lg:text-[16vw] leading-[0.82] tracking-[-0.04em] text-ink select-none"
        >
          ВОКРУГ
        </motion.span>
      </motion.div>

      {/* z-40: Sub-block bottom-right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-6 right-6 md:bottom-8 md:right-12 z-40 max-w-md text-right"
      >
        <p className="display text-sm md:text-base font-bold uppercase tracking-wide text-ink mb-1">
          30 лет звука для Юга России
        </p>
        <p className="text-xs md:text-sm text-ink2">
          9000+ мероприятий · Волгоград · Элиста · Астрахань · Саратов · с 1994
        </p>
      </motion.div>

      {/* z-40: CTA bottom-left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-6 left-6 md:bottom-8 md:left-12 z-40 flex gap-3"
      >
        <a
          href="tel:+79033710400"
          className="px-5 py-3 bg-klein text-paper text-sm font-medium hover:bg-klein-deep transition-colors"
        >
          Позвонить Фёдору
        </a>
        <a
          href="/projects"
          className="px-5 py-3 border border-ink text-ink text-sm font-medium hover:bg-ink hover:text-paper transition-colors"
        >
          Проекты
        </a>
      </motion.div>
    </section>
  );
}
