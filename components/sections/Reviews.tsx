"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { RadialGlowOrb } from "@/components/ui/RadialGlowOrb";

const reviews = [
  {
    author: "Звукорежиссёр Григория Лепса",
    role: "Григорий Лепс",
    photo: "/artists/leps-v2.jpg",
    photoPos: "center 15%",
    text: "Работали с «Звук Вокруг» на площадке в Волгограде — всё чётко, без сюрпризов. Оборудование в отличном состоянии, райдер выполнен полностью. Ребята понимают, что такое живой звук на открытой площадке. Отдельное спасибо Фёдору Пузикову.",
  },
  {
    author: "Звукорежиссёр Машины Времени",
    role: "Машина Времени",
    photo: "/artists/mashina-v2.jpg",
    photoPos: "center 15%",
    text: "Волгоград, «Звук Вокруг» — однозначно рекомендую. Подготовились заранее, всё согласовали по технической карте, на саундчеке не было ни одной проблемы. Такой уровень сервиса встречается редко в регионах.",
  },
  {
    author: "ЛЮБЭ",
    role: "Артист",
    photo: "/artists/lyube-v2.jpg",
    photoPos: "center 15%",
    text: "Волгоград — особый город для нас, и важно, чтобы всё звучало достойно. «Звук Вокруг» не подвели: звук был мощным и чистым, даже на большой открытой площадке. Спасибо команде за уважение к нашей музыке и к зрителям.",
  },
  {
    author: "АНТОХА МС",
    role: "Артист",
    photo: "/artists/antokha-v2.jpg",
    photoPos: "center 15%",
    text: "Редко пишу отзывы, но здесь не могу не отметить. Ребята из «Звук Вокруг» сделали всё, чтобы концерт прошёл на высшем уровне. Никакой суеты, никаких косяков — просто хорошая работа. Волгоград, до встречи!",
  },
  {
    author: "Виктор Гепфнер",
    role: "Заслуженный артист России, экс-министр культуры Волгоградской области",
    photo: "/artists/gepfner.jpg",
    photoPos: "center 15%",
    text: "«Звук Вокруг» — один из тех партнёров, на которых можно положиться. На протяжении многих лет компания стабильно обеспечивает техническое сопровождение городских мероприятий: праздников, концертов, официальных событий. Качество не падает, команда всегда готова, оборудование в порядке. Для города это важно — когда есть на кого рассчитывать.",
  },
  {
    author: "НЭТ",
    role: "Директор Волгоградского Нового Экспериментального Театра (НЭТ)",
    photo: "/artists/net-v2.jpg",
    photoPos: "center",
    text: "Сотрудничество с «Звук Вокруг» — это надёжная техническая база для наших постановок и выездных мероприятий. Они понимают специфику театрального звука, работают аккуратно и внимательно к деталям. Для нас важно, чтобы техника не отвлекала от искусства — с этой командой именно так и происходит.",
  },
  {
    author: "АКИ",
    role: "Директор Агентства культурных инициатив Волгограда",
    photo: "/artists/aki2.jpg",
    photoPos: "center",
    text: "Праздничные мероприятия 2026 года в честь годовщины Победы в Великой Отечественной войне — событие особой важности для всего Волгограда. «Звук Вокруг» взяли на себя полное техническое обеспечение Парада и сопутствующей программы и справились безупречно. Сложная площадка, высокие требования, большая ответственность — всё было учтено. Благодарим команду за профессионализм и за вклад в этот значимый день.",
  },
];

type Review = typeof reviews[0];

export function Reviews() {
  const [activeReview, setActiveReview] = useState<Review | null>(null);

  return (
    <section
      className="relative overflow-hidden section-py"
      style={{ background: "#020617" }}
    >
      <NoiseOverlay />

      <div className="absolute left-[-15vw] top-1/2 -translate-y-1/2 pointer-events-none z-0" aria-hidden>
        <RadialGlowOrb size="50vw" />
      </div>

      <div className="relative z-10">
        <div
          className="flex gap-4 overflow-x-auto scrollbar-none px-[clamp(20px,5vw,80px)]"
          style={{ paddingBottom: 8 }}
        >
          {reviews.map((review, i) => (
            <ReviewCard
              key={i}
              review={review}
              index={i}
              onClick={() => setActiveReview(review)}
            />
          ))}
          <div className="shrink-0 w-[clamp(20px,5vw,80px)]" />
        </div>
      </div>

      {/* Popup modal */}
      <AnimatePresence>
        {activeReview && (
          <ReviewModal review={activeReview} onClose={() => setActiveReview(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function ReviewCard({
  review,
  index,
  onClick,
}: {
  review: Review;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="shrink-0 flex flex-col overflow-hidden rounded-2xl cursor-pointer group"
      style={{
        width: 248,
        aspectRatio: "9 / 16",
        background: "#07091a",
      }}
    >
      {/* Photo — top 54%, author name overlaid at top */}
      <div className="relative shrink-0" style={{ height: "54%" }}>
        <Image
          src={review.photo}
          fill
          alt={review.author}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ objectPosition: review.photoPos }}
          sizes="248px"
        />
        {/* Dark gradient bottom — merges into card */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(2,6,23,0.55) 0%, rgba(2,6,23,0.0) 40%, #07091a 100%)" }}
        />
        {/* Author overlay — TOP of photo */}
        <div className="absolute top-0 inset-x-0 p-3">
          <p style={{ fontSize: 12, fontWeight: 700, color: "#ffffff", lineHeight: 1.2, marginBottom: 2 }}>
            {review.author}
          </p>
          <p style={{ fontSize: 10, letterSpacing: "0.06em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
            {review.role}
          </p>
        </div>
      </div>

      {/* Bottom panel — text */}
      <div
        className="flex flex-col"
        style={{ height: "46%", padding: "10px 16px 16px" }}
      >
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

        <p
          style={{
            fontSize: 10,
            letterSpacing: "0.06em",
            color: "#2155FF",
            textTransform: "uppercase",
            marginTop: 10,
          }}
        >
          Читать полностью →
        </p>
      </div>
    </motion.div>
  );
}

function ReviewModal({ review, onClose }: { review: Review; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(2,6,23,0.85)", backdropFilter: "blur(12px)" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 24 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative overflow-hidden rounded-2xl flex flex-col md:flex-row"
        style={{
          background: "#07091a",
          maxWidth: 680,
          width: "100%",
          maxHeight: "90svh",
        }}
      >
        {/* Photo side */}
        <div className="relative shrink-0 md:w-56" style={{ height: 220, minHeight: 0 }}>
          <Image
            src={review.photo}
            fill
            alt={review.author}
            className="object-cover"
            style={{ objectPosition: review.photoPos }}
            sizes="224px"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(2,6,23,0.5) 0%, transparent 50%, rgba(2,6,23,0.4) 100%)" }}
          />
          {/* Author top overlay */}
          <div className="absolute top-0 inset-x-0 p-4">
            <p style={{ fontSize: 13, fontWeight: 700, color: "#ffffff", lineHeight: 1.2, marginBottom: 3 }}>
              {review.author}
            </p>
            <p style={{ fontSize: 10, letterSpacing: "0.07em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
              {review.role}
            </p>
          </div>
        </div>

        {/* Text side */}
        <div className="flex flex-col overflow-y-auto p-6 md:p-8">
          <span
            style={{
              display: "block",
              fontFamily: "Georgia, serif",
              fontSize: 36,
              lineHeight: 1,
              color: "#2155FF",
              marginBottom: 12,
            }}
          >
            &ldquo;
          </span>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.7,
              color: "rgba(237,240,255,0.88)",
            }}
          >
            {review.text}
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 flex items-center justify-center rounded-full transition-colors"
          style={{
            width: 32,
            height: 32,
            background: "rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.7)",
            fontSize: 16,
          }}
          aria-label="Закрыть"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
}
