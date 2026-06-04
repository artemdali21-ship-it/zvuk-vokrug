"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { RadialGlowOrb } from "@/components/ui/RadialGlowOrb";

const reviews = [
  {
    author: "Звукорежиссёр Григория Лепса",
    role: "Григорий Лепс",
    photo: "/artists/leps-v2.jpg",
    photoPos: "center 15%",
    text: "Работали с «Звук Вокруг» на площадке в Волгограде — всё чётко, без сюрпризов. Оборудование в отличном состоянии, райдер выполнен полностью.",
  },
  {
    author: "Звукорежиссёр Машины Времени",
    role: "Машина Времени",
    photo: "/artists/mashina-v2.jpg",
    photoPos: "center 15%",
    text: "Волгоград, «Звук Вокруг» — однозначно рекомендую. На саундчеке не было ни одной проблемы. Такой уровень сервиса встречается редко в регионах.",
  },
  {
    author: "ЛЮБЭ",
    role: "Артист",
    photo: "/artists/lyube-v2.jpg",
    photoPos: "center 15%",
    text: "«Звук Вокруг» не подвели: звук был мощным и чистым, даже на большой открытой площадке. Спасибо команде за уважение к нашей музыке.",
  },
  {
    author: "АНТОХА МС",
    role: "Артист",
    photo: "/artists/antokha-v2.jpg",
    photoPos: "center 15%",
    text: "Ребята из «Звук Вокруг» сделали всё, чтобы концерт прошёл на высшем уровне. Никакой суеты, никаких косяков — просто хорошая работа.",
  },
  {
    author: "Виктор Гепфнер",
    role: "Заслуженный артист России",
    photo: "/artists/gepfner.jpg",
    photoPos: "center 15%",
    text: "На протяжении многих лет компания стабильно обеспечивает техническое сопровождение городских мероприятий. Качество не падает, команда всегда готова.",
  },
  {
    author: "НЭТ",
    role: "Волгоградский Новый Экспериментальный Театр",
    photo: "/artists/net-v2.jpg",
    photoPos: "center",
    text: "Сотрудничество с «Звук Вокруг» — это надёжная техническая база для наших постановок. Они понимают специфику театрального звука.",
  },
  {
    author: "АКИ",
    role: "Агентство культурных инициатив",
    photo: "/artists/aki2.jpg",
    photoPos: "center",
    text: "«Звук Вокруг» взяли на себя полное техническое обеспечение Парада Победы и справились безупречно. Благодарим за профессионализм.",
  },
];

export function Reviews() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });

  return (
    <section
      className="relative overflow-hidden section-py"
      style={{ background: "#020617" }}
    >
      <NoiseOverlay />

      {/* Blue glow — left atmospheric accent */}
      <div className="absolute left-[-15vw] top-1/2 -translate-y-1/2 pointer-events-none z-0" aria-hidden>
        <RadialGlowOrb size="50vw" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 32 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="container-page mb-12 md:mb-16"
        >
          <p className="eyebrow text-white/35 mb-5">ОТЗЫВЫ</p>
          <h2
            className="font-display font-black text-white"
            style={{ fontSize: "clamp(40px, 6vw, 88px)", lineHeight: 0.92, letterSpacing: "-0.055em" }}
          >
            Говорят те, кто работал с нами.
          </h2>
        </motion.div>

        {/* Horizontal scroll carousel */}
        <div
          className="flex gap-4 overflow-x-auto scrollbar-none px-[clamp(20px,5vw,80px)]"
          style={{ paddingBottom: 8 }}
        >
          {reviews.map((review, i) => (
            <ReviewCard key={i} review={review} index={i} />
          ))}
          {/* trailing spacer */}
          <div className="shrink-0 w-[clamp(20px,5vw,80px)]" />
        </div>
      </div>
    </section>
  );
}

function ReviewCard({
  review,
  index,
}: {
  review: { author: string; role: string; photo: string; photoPos: string; text: string };
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
      className="shrink-0 flex flex-col overflow-hidden rounded-2xl"
      style={{
        width: 248,
        aspectRatio: "9 / 16",
        background: "#07091a",
      }}
    >
      {/* Photo — top 54% */}
      <div className="relative shrink-0" style={{ height: "54%" }}>
        <Image
          src={review.photo}
          fill
          alt={review.author}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ objectPosition: review.photoPos }}
          sizes="248px"
        />
        {/* Gradient to dark panel */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(2,6,23,0.05) 30%, #07091a 100%)" }}
        />
      </div>

      {/* Bottom panel */}
      <div
        className="flex flex-col justify-between"
        style={{ height: "46%", padding: "12px 16px 16px" }}
      >
        {/* Quote mark */}
        <span
          style={{
            display: "block",
            fontFamily: "Georgia, serif",
            fontSize: 28,
            lineHeight: 1,
            color: "#2155FF",
            marginBottom: 8,
          }}
        >
          &ldquo;
        </span>

        {/* Quote text */}
        <p
          style={{
            fontSize: 11.5,
            lineHeight: 1.55,
            color: "rgba(237,240,255,0.82)",
            flex: 1,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 5,
            WebkitBoxOrient: "vertical",
          }}
        >
          {review.text}
        </p>

        {/* Divider + name/role */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: 10, paddingTop: 10 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#ffffff", marginBottom: 2, lineHeight: 1.2 }}>
            {review.author}
          </p>
          <p style={{ fontSize: 10, letterSpacing: "0.06em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>
            {review.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
