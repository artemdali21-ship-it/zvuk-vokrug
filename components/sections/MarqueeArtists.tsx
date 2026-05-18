"use client";

import { artists } from "@/data/artists";
import { clients } from "@/data/clients";

function MarqueeRow({
  items,
  direction = "left",
  color = "text-klein",
  size = "text-2xl md:text-4xl",
}: {
  items: string[];
  direction?: "left" | "right";
  color?: string;
  size?: string;
}) {
  const doubled = [...items, ...items];
  const animClass =
    direction === "left" ? "animate-marquee" : "animate-marquee-reverse";

  return (
    <div className="overflow-hidden py-3">
      <div className={`flex whitespace-nowrap ${animClass}`}>
        {doubled.map((item, i) => (
          <span key={i} className={`display ${size} ${color} mx-4 shrink-0`}>
            {item}
            <span className="text-ink2 mx-4">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function MarqueeArtists() {
  return (
    <section className="bg-paper py-12 md:py-16 overflow-hidden border-y border-ink/8">
      <div className="mb-2">
        <p className="container-page text-xs text-ink2 uppercase tracking-widest mb-4">
          Опыт технического сопровождения мероприятий с участием:
        </p>
        <MarqueeRow items={artists} direction="left" color="text-klein" size="text-2xl md:text-4xl" />
      </div>
      <div className="mt-6">
        <p className="container-page text-xs text-ink2 uppercase tracking-widest mb-4">
          Среди площадок, заказчиков и партнёров в истории проектов:
        </p>
        <MarqueeRow items={clients} direction="right" color="text-ink2" size="text-xl md:text-2xl" />
      </div>
    </section>
  );
}
