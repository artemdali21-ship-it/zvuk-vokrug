"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { reviews } from "@/data/reviews";

export function Reviews() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  return (
    <section className="bg-ink py-20 md:py-28">
      <div className="container-page">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 md:mb-20"
        >
          <p className="text-[10px] text-paper/30 uppercase tracking-[0.18em] mb-4">
            Отзывы
          </p>
          <h2 className="display text-huge text-paper">
            Говорят артисты и заказчики.
          </h2>
        </motion.div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="bg-paper/[0.04] border border-paper/[0.08] p-6 md:p-7 flex flex-col gap-4 hover:border-klein/40 transition-colors duration-300"
            >
              {/* Message bubble */}
              <p className="text-paper/80 text-sm md:text-base leading-relaxed flex-1">
                &ldquo;{r.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-3 border-t border-paper/[0.08]">
                <div className="w-9 h-9 rounded-full bg-klein/20 border border-klein/30 flex items-center justify-center shrink-0">
                  <span className="text-klein text-[10px] font-bold tracking-wide">
                    {r.initials}
                  </span>
                </div>
                <div>
                  <p className="text-paper text-sm font-semibold leading-tight">
                    {r.author}
                  </p>
                  <p className="text-paper/40 text-xs leading-snug mt-0.5">
                    {r.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
