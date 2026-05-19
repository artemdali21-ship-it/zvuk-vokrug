"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ShaderAnimation } from "@/components/ui/ShaderAnimation";

export function CTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="bg-ink py-24 md:py-36 overflow-hidden relative min-h-[480px]">
      {/* Shader animation background */}
      <ShaderAnimation />

      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-ink/70 z-[1]" aria-hidden />

      <div className="container-page relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[10px] text-paper/30 uppercase tracking-[0.18em] mb-6">
              Напишите нам
            </p>
            <h2 className="display text-huge text-paper mb-6 max-w-2xl">
              Готовы рассчитать смету.
            </h2>
            <p className="text-paper/50 text-lg mb-14 max-w-xl leading-relaxed">
              Звуковое, световое, сценическое и видеооборудование. Расчёт в день обращения.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+79033710400"
                className="inline-flex items-center justify-center px-8 py-4 bg-klein text-paper text-base font-medium hover:bg-klein-deep transition-colors duration-200"
              >
                Позвонить Фёдору
                <span className="ml-3 text-paper/60 text-sm font-normal whitespace-nowrap hidden md:inline">
                  +7 (903) 371-04-00
                </span>
              </a>
              <a
                href="mailto:fmpuzikov@gmail.com"
                className="inline-flex items-center justify-center px-8 py-4 border border-paper/20 text-paper text-base font-medium hover:border-paper/50 hover:bg-paper/5 transition-all duration-200"
              >
                Написать на почту
              </a>
            </div>
          </motion.div>

          {/* Right — photo */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative w-full aspect-video overflow-hidden">
              {/* Klein blue shimmer border */}
              <div className="absolute inset-0 ring-1 ring-klein/30 z-10 pointer-events-none" />
              <Image
                src="/final_zvuk.png"
                alt="Звук Вокруг — концертное мероприятие"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Blue tint overlay matching shader */}
              <div className="absolute inset-0 bg-klein/10 mix-blend-color z-[2] pointer-events-none" />
            </div>
            {/* Caption */}
            <p className="mt-3 text-paper/30 text-xs uppercase tracking-[0.14em]">
              Концертное производство · Волгоград
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
