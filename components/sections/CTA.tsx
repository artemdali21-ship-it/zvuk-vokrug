"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function CTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="bg-ink py-24 md:py-36 overflow-hidden relative">
      {/* Klein dot — subtle accent */}
      <div
        aria-hidden
        className="absolute right-0 bottom-0 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full opacity-[0.04]"
        style={{
          background:
            "radial-gradient(circle at 60% 60%, #1C45D6 0%, transparent 70%)",
        }}
      />

      <div className="container-page relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[10px] text-paper/30 uppercase tracking-[0.18em] mb-6">
            Напишите нам
          </p>
          <h2 className="display text-huge text-paper mb-6 max-w-2xl">
            Готовы взяться за вашу площадку.
          </h2>
          <p className="text-paper/50 text-lg mb-14 max-w-xl leading-relaxed">
            Райдер, тех. карта, монтаж под ключ. Расчёт по описанию
            мероприятия — в день обращения.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:+79033710400"
              className="inline-flex items-center justify-center px-8 py-4 bg-klein text-paper text-base font-medium hover:bg-klein-deep transition-colors duration-200"
            >
              Позвонить Фёдору
              <span className="ml-3 text-paper/60 text-sm font-normal">
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
      </div>
    </section>
  );
}
