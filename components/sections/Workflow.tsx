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
      className="grid grid-cols-[72px_1fr] md:grid-cols-[140px_1fr] gap-6 md:gap-16 py-10 md:py-12 border-t border-ink/[0.09] group"
    >
      <span className="display text-[3.5rem] md:text-[5rem] text-klein leading-none font-black tabular-nums">
        {step.number}
      </span>
      <div className="flex flex-col justify-center">
        <h3 className="display text-xl md:text-2xl text-ink mb-2 group-hover:text-klein transition-colors duration-300">
          {step.title}
        </h3>
        <p className="text-ink2 text-sm md:text-base leading-relaxed max-w-lg">
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
            От запроса до демонтажа — без сюрпризов.
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
