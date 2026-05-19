"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { trustPrinciples } from "@/data/testimonials";

export function Testimonials() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  return (
    <section className="bg-paper2 py-20 md:py-28">
      <div className="container-page">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 md:mb-20"
        >
          <p className="eyebrow text-ink2 mb-5">30 лет в деле</p>
          <h2 className="display text-huge text-ink mb-3">
            Что ценят заказчики.
          </h2>
          <p className="text-ink2 max-w-md text-base md:text-lg leading-relaxed">
            Не реклама. Рабочие принципы, которые держат 30 лет.
          </p>
        </motion.div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 divide-ink/[0.08]">
          {trustPrinciples.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 16 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className={`flex gap-5 py-8 md:py-10 px-0 md:px-8 border-t border-ink/[0.08] group ${
                i % 2 === 0 ? "md:border-r md:border-ink/[0.08]" : ""
              }`}
            >
              <span className="display text-3xl text-klein leading-none shrink-0 tabular-nums pt-0.5 w-10">
                {p.number}
              </span>
              <div>
                <h3 className="display text-lg md:text-xl text-ink mb-2 group-hover:text-klein transition-colors duration-300">
                  {p.title}
                </h3>
                <p className="text-ink2 text-sm leading-relaxed">{p.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
