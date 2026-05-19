"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { artists } from "@/data/artists";
import { clients } from "@/data/clients";

function MarqueeTrack({
  items,
  direction = "left",
  speed = "40s",
  textClass = "text-2xl md:text-4xl",
  colorClass = "text-klein",
}: {
  items: string[];
  direction?: "left" | "right";
  speed?: string;
  textClass?: string;
  colorClass?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  // Double for seamless loop
  const doubled = [...items, ...items];
  const animStyle = prefersReducedMotion
    ? {}
    : {
        animationDuration: speed,
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
        animationName: direction === "left" ? "marquee" : "marquee-reverse",
      };

  return (
    <div className="overflow-hidden py-2 select-none" aria-hidden>
      <div className="flex whitespace-nowrap w-max" style={animStyle}>
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`display ${textClass} ${colorClass} shrink-0 mx-3 md:mx-5`}
          >
            {item}
            <span className="mx-3 md:mx-5 text-ink/20">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function MarqueeArtists() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="bg-paper py-16 md:py-20 overflow-hidden border-y border-ink/[0.07]"
    >
      {/* Row 1: Артисты → */}
      <div className="mb-1 marquee-fade">
        <MarqueeTrack
          items={artists}
          direction="left"
          speed="70s"
          textClass="text-xl md:text-3xl"
          colorClass="text-klein"
        />
      </div>

      {/* Row 2: Клиенты ← */}
      <div className="mt-4 marquee-fade">
        <MarqueeTrack
          items={clients}
          direction="right"
          speed="50s"
          textClass="text-lg md:text-2xl"
          colorClass="text-ink2"
        />
      </div>
    </motion.section>
  );
}
