"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export function Team() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });
  const photoRef = useRef<HTMLDivElement>(null);
  const photoInView = useInView(photoRef, { once: true, margin: "-80px" });

  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="container-page mb-10 md:mb-14">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[10px] text-ink2 uppercase tracking-[0.18em] mb-4">
            Люди за звуком
          </p>
          <h2 className="display text-huge text-ink mb-3">Команда.</h2>
          <p className="text-ink2 text-lg max-w-sm">
            Одиннадцать человек, держащих звук Юга.
          </p>
        </motion.div>
      </div>

      {/* Full-width photo */}
      <motion.div
        ref={photoRef}
        initial={{ opacity: 0, scale: 1.02 }}
        animate={photoInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-paper2"
      >
        <Image
          src="/team/team-bw.jpg"
          alt="Команда Звук Вокруг — одиннадцать человек, Фёдор Пузиков в центре"
          fill
          sizes="100vw"
          quality={80}
          className="object-cover object-center"
        />
        {/* Subtle gradient bottom for caption readability */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-paper/60 to-transparent" />
      </motion.div>

      <div className="container-page mt-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={photoInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-sm text-ink2 text-center"
        >
          В центре — Фёдор Пузиков. С 1994 года.
        </motion.p>
      </div>
    </section>
  );
}
