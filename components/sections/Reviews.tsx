"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { reviews } from "@/data/reviews";

export function Reviews() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  // Split into 3 columns for masonry effect
  const col1 = reviews.filter((_, i) => i % 3 === 0);
  const col2 = reviews.filter((_, i) => i % 3 === 1);
  const col3 = reviews.filter((_, i) => i % 3 === 2);
  const columns = [col1, col2, col3];

  return (
    <section className="bg-paper py-20 md:py-28 border-t border-ink/[0.07]">
      <div className="container-page">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          <p className="text-[10px] text-ink2 uppercase tracking-[0.18em] mb-4">
            Отзывы
          </p>
          <h2 className="display text-huge text-ink">
            Отзывы.
          </h2>
        </motion.div>

        {/* Desktop: 3-column masonry */}
        <div ref={gridRef} className="hidden md:grid grid-cols-3 gap-4 items-start">
          {columns.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-4">
              {col.map((r, i) => {
                const globalIdx = colIdx + i * 3;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={gridInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: globalIdx * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="bg-paper border border-ink/[0.09] p-5 hover:border-klein/40 hover:shadow-sm transition-all duration-300"
                  >
                    <div className="grid grid-cols-[auto_1fr] gap-3">
                      {/* Avatar */}
                      <div className="w-9 h-9 rounded-full bg-klein/10 border border-klein/20 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-klein text-[9px] font-bold tracking-wide leading-none">
                          {r.initials}
                        </span>
                      </div>
                      {/* Name + role */}
                      <div>
                        <p className="text-ink text-sm font-semibold leading-tight">
                          {r.author}
                        </p>
                        <p className="text-ink2 text-xs mt-0.5 leading-snug">
                          {r.role}
                        </p>
                        {/* Quote */}
                        <blockquote className="mt-3">
                          <p className="text-ink/70 text-sm leading-relaxed">
                            {r.text}
                          </p>
                        </blockquote>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Mobile: single column */}
        <div className="md:hidden flex flex-col gap-4">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="bg-paper border border-ink/[0.09] p-5"
            >
              <div className="grid grid-cols-[auto_1fr] gap-3">
                <div className="w-9 h-9 rounded-full bg-klein/10 border border-klein/20 flex items-center justify-center shrink-0">
                  <span className="text-klein text-[9px] font-bold tracking-wide leading-none">
                    {r.initials}
                  </span>
                </div>
                <div>
                  <p className="text-ink text-sm font-semibold leading-tight">{r.author}</p>
                  <p className="text-ink2 text-xs mt-0.5">{r.role}</p>
                  <blockquote className="mt-3">
                    <p className="text-ink/70 text-sm leading-relaxed">{r.text}</p>
                  </blockquote>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
