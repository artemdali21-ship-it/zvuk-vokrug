"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";

const testimonials = [
  {
    role: "Звукорежиссёр Григория Лепса",
    text: "Работали с «Звук Вокруг» на площадке в Волгограде — всё чётко, без сюрпризов. Оборудование в отличном состоянии, райдер выполнен полностью. Ребята понимают, что такое живой звук на открытой площадке. Отдельное спасибо Фёдору Пузикову.",
  },
  {
    role: "Звукорежиссёр Машина Времени",
    text: "Волгоград, «Звук Вокруг» — однозначно рекомендую. Подготовились заранее, всё согласовали по технической карте, на саундчеке не было ни одной проблемы. Такой уровень сервиса встречается редко в регионах.",
  },
  {
    name: "ЛЮБЭ",
    text: "Волгоград — особый город для нас, и важно, чтобы всё звучало достойно. «Звук Вокруг» не подвели: звук был мощным и чистым, даже на большой открытой площадке. Спасибо команде за уважение к нашей музыке и к зрителям.",
  },
  {
    name: "АНТОХА МС",
    text: "Редко пишу отзывы, но здесь не могу не отметить. Ребята из «Звук Вокруг» сделали всё, чтобы концерт прошёл на высшем уровне. Никакой суеты, никаких косяков — просто хорошая работа. Волгоград, до встречи!",
  },
  {
    name: "Виктор Гепфнер",
    role: "Заслуженный артист России, экс-министр культуры Волгоградской области",
    text: "«Звук Вокруг» — один из тех партнёров, на которых можно положиться. На протяжении многих лет компания стабильно обеспечивает техническое сопровождение городских мероприятий. Качество не падает, команда всегда готова, оборудование в порядке.",
  },
  {
    role: "Директор Волгоградского Нового Экспериментального Театра (НЭТ)",
    text: "Сотрудничество с «Звук Вокруг» — это надёжная техническая база для наших постановок и выездных мероприятий. Они понимают специфику театрального звука, работают аккуратно и внимательно к деталям.",
  },
  {
    role: "Директор Агентства культурных инициатив Волгограда",
    text: "Праздничные мероприятия 2026 года в честь годовщины Победы — событие особой важности для всего Волгограда. «Звук Вокруг» взяли на себя полное техническое обеспечение Парада и справились безупречно. Высокие требования, большая ответственность — всё было учтено.",
  },
];

export function Testimonials() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });

  return (
    <section
      className="relative overflow-hidden section-py"
      style={{ background: "#020617" }}
    >
      <NoiseOverlay />

      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden>
        <div style={{ position: "absolute", right: "-8vw", top: "50%", transform: "translateY(-50%)", width: "clamp(200px, 26vw, 380px)", height: "clamp(200px, 26vw, 380px)", mixBlendMode: "screen", opacity: 0.08 }}>
          <Image src="/3d/y-bracket.png" fill alt="" style={{ objectFit: "contain" }} sizes="380px" />
        </div>
      </div>

      <div className="container-page relative z-10">
        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 32 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-24"
        >
          <p className="eyebrow text-white/35 mb-5">Отзывы</p>
          <h2
            className="font-display font-black text-white"
            style={{ fontSize: "clamp(48px, 7vw, 104px)", lineHeight: 0.92, letterSpacing: "-0.055em" }}
          >
            Нам доверяют те,<br />кто не имеет права<br />на сбой.
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} item={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  item,
  index,
}: {
  item: { name?: string; role?: string; text: string };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(18px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 28,
        padding: 32,
      }}
    >
      {/* Quote mark */}
      <span
        style={{
          display: "block",
          fontFamily: "Georgia, serif",
          fontSize: 36,
          lineHeight: 1,
          color: "#2155FF",
          marginBottom: 16,
        }}
      >
        &ldquo;
      </span>

      <p
        style={{
          fontSize: 15,
          lineHeight: 1.65,
          color: "rgba(255,255,255,0.75)",
          marginBottom: 24,
        }}
      >
        {item.text}
      </p>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16 }}>
        {item.name && (
          <p className="font-display font-bold text-white text-base leading-tight mb-1">
            {item.name}
          </p>
        )}
        {item.role && (
          <p style={{ fontSize: 11, letterSpacing: "0.08em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>
            {item.role}
          </p>
        )}
      </div>
    </motion.div>
  );
}
