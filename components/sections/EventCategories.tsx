"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const categories = [
  {
    title: "КОНЦЕРТЫ И ТУРЫ",
    description: "Площадки от клубов до открытых стадионов. Райдер под крупных артистов.",
    photo: "/photos/02ac7b6d.jpg",
  },
  {
    title: "КОРПОРАТИВНЫЕ ПРАЗДНИКИ",
    description: "Дни рождения, юбилеи, корпоративы. Звук + свет + сцена под ключ.",
    photo: "/photos/13d4e9e3.jpg",
  },
  {
    title: "ФЕСТИВАЛИ И КОНФЕРЕНЦИИ",
    description: "Многодневный монтаж, несколько сцен, видеопроекция.",
    photo: "/photos/0935157f.jpg",
  },
  {
    title: "ГОРОДСКИЕ СОБЫТИЯ",
    description: "Парад Победы, юбилеи города, минуты молчания. Высокая ответственность.",
    photo: "/photos/bf925159.jpg",
  },
  {
    title: "ИНСТАЛЛЯЦИИ",
    description: "Постоянные и временные звуковые/световые решения для пространств.",
    photo: "/photos/2d600a69.jpg",
  },
  {
    title: "СПОРТИВНЫЕ СОБЫТИЯ",
    description: "Стадионы, манежи, открытые площадки. PA + комментаторские пульты.",
    photo: "/photos/f4ca6ed7.jpg",
  },
];

export function EventCategories() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="container-page">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          <p className="text-[10px] text-ink2 uppercase tracking-[0.18em] mb-4">
            Специализация
          </p>
          <h2 className="display text-huge text-ink mb-3">Для каких событий.</h2>
          <p className="text-ink2 text-lg">
            От камерного концерта до городской площади.
          </p>
        </motion.div>

        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group relative aspect-square overflow-hidden bg-paper2 cursor-default"
            >
              {/* Photo */}
              <Image
                src={cat.photo}
                alt={cat.title}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-ink/50 group-hover:bg-ink/35 transition-colors duration-500" />
              {/* Content */}
              <div className="absolute inset-0 p-5 md:p-7 flex flex-col justify-end">
                <h3 className="display text-xs md:text-sm text-paper mb-2 leading-tight group-hover:text-klein transition-colors duration-300">
                  {cat.title}
                </h3>
                <p className="text-paper/0 group-hover:text-paper/65 text-xs leading-relaxed transition-all duration-400 max-h-0 group-hover:max-h-20 overflow-hidden">
                  {cat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
