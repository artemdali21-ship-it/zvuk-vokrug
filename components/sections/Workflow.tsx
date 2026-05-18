"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { workflow } from "@/data/workflow";

function WorkflowStep({
  step,
  index,
}: {
  step: { number: string; title: string; description: string };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-1 md:grid-cols-12 gap-0 py-8 md:py-10 border-t border-ink/[0.08] group"
    >
      {/* Number */}
      <div className="md:col-span-2 mb-3 md:mb-0">
        <span className="display text-2xl md:text-mega text-klein leading-none font-black tabular-nums">
          {step.number}
        </span>
      </div>

      {/* Title */}
      <div className="md:col-span-4 mb-2 md:mb-0 md:pr-8">
        <h3 className="display text-xl md:text-2xl text-ink group-hover:text-klein transition-colors duration-300 leading-tight">
          {step.title}
        </h3>
      </div>

      {/* Description */}
      <div className="md:col-span-6">
        <p className="text-ink2 text-sm md:text-base leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

export function Workflow() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });

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
          <p className="text-[10px] text-ink2 uppercase tracking-[0.18em] mb-4">
            Процесс
          </p>
          <h2 className="display text-huge text-ink mb-3">
            Как мы работаем.
          </h2>
          <p className="text-ink2 text-lg max-w-sm">
            От запроса до демонтажа. Без сюрпризов.
          </p>
        </motion.div>

        <div>
          {workflow.map((step, i) => (
            <WorkflowStep key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
