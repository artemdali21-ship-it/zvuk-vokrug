"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { reviews } from "@/data/reviews";

export function Reviews() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  // 3-column masonry split
  const col1 = reviews.filter((_, i) => i % 3 === 0);
  const col2 = reviews.filter((_, i) => i % 3 === 1);
  const col3 = reviews.filter((_, i) => i % 3 === 2);

  const ReviewCard = ({ r, delay }: { r: typeof reviews[0]; delay: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={gridInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlowCard>
        {/* Quote */}
        <blockquote className="text-ink/75 text-sm leading-relaxed mb-5">
          &ldquo;{r.text}&rdquo;
        </blockquote>
        {/* Author — role first (more recognisable), name below */}
        <div className="flex items-center gap-3 pt-4 border-t border-ink/[0.08]">
          <div className="w-9 h-9 rounded-full bg-klein/10 border border-klein/25 flex items-center justify-center shrink-0">
            <span className="text-klein text-[9px] font-bold tracking-wide leading-none">
              {r.initials}
            </span>
          </div>
          <div>
            <p className="text-ink text-sm font-semibold leading-tight">{r.role}</p>
            <p className="text-ink2 text-xs mt-0.5 leading-snug">{r.author}</p>
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );

  return (
    <section className="bg-paper2 py-20 md:py-28 border-t border-ink/[0.07]">
      <div className="container-page">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          <h2 className="display text-huge text-klein uppercase">
            Отзывы
          </h2>
        </motion.div>

        {/* Desktop: 3-column masonry */}
        <div ref={gridRef} className="hidden md:grid grid-cols-3 gap-4 items-start">
          <div className="flex flex-col gap-4">
            {col1.map((r, i) => <ReviewCard key={i} r={r} delay={i * 3 * 0.07} />)}
          </div>
          <div className="flex flex-col gap-4">
            {col2.map((r, i) => <ReviewCard key={i} r={r} delay={(i * 3 + 1) * 0.07} />)}
          </div>
          <div className="flex flex-col gap-4">
            {col3.map((r, i) => <ReviewCard key={i} r={r} delay={(i * 3 + 2) * 0.07} />)}
          </div>
        </div>

        {/* Mobile: single column */}
        <div className="md:hidden flex flex-col gap-4">
          {reviews.map((r, i) => (
            <ReviewCard key={i} r={r} delay={i * 0.05} />
          ))}
        </div>
      </div>
    </section>
  );
}
