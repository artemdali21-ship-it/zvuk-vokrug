"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";

export function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });
  const photoRef = useRef<HTMLDivElement>(null);
  const photoInView = useInView(photoRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Photo moves up slower than the scroll — classic parallax depth
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden section-py-large"
      style={{ background: "#020617" }}
    >
      <NoiseOverlay />

      <div className="container-page relative z-10 mb-16 md:mb-20">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow text-white/35 mb-5">Люди за звуком</p>
          <h2
            className="font-display font-black text-white mb-4"
            style={{ fontSize: "clamp(48px, 7vw, 104px)", lineHeight: 0.92, letterSpacing: "-0.055em" }}
          >
            Команда.
          </h2>
          <p className="text-white/50 text-lg max-w-sm">
            Одиннадцать человек, держащих звук Юга.
          </p>
        </motion.div>
      </div>

      {/* Parallax photo frame — fixed height container, photo scrolls slower */}
      <motion.div
        ref={photoRef}
        initial={{ opacity: 0 }}
        animate={photoInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(360px, 60vw, 780px)" }}
      >
        {/* Photo layer — moves at parallax speed */}
        <motion.div
          style={{ y: photoY }}
          className="absolute inset-0 scale-[1.22] will-change-transform"
        >
          <Image
            src="/team/team-new-2.png"
            alt="Команда Звук Вокруг"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover object-top"
          />
        </motion.div>

        {/* Overlay gradients — at normal scroll speed (stay fixed relative to frame) */}
        <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 200px rgba(107,78,255,0.22)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(2,6,23,0.06) 0%, rgba(2,6,23,0.80) 100%)" }} />
        <div className="absolute inset-x-0 bottom-0" style={{ height: 120, background: "linear-gradient(to top, #020617, transparent)" }} />
      </motion.div>

      <div className="container-page relative z-10 mt-8 md:mt-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={photoInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-white/30 text-sm tracking-widest uppercase"
        >
          В центре — Фёдор Пузиков. С 1994 года.
        </motion.p>
      </div>
    </section>
  );
}
