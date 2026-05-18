import { Volume2, Lightbulb, LayoutGrid, Monitor, Sparkles } from "lucide-react";
import { services } from "@/data/services";

const iconMap = {
  Volume2,
  Lightbulb,
  LayoutGrid,
  Monitor,
  Sparkles,
} as const;

export function Services() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="container-page">
        <h2 className="display text-huge text-ink mb-12 md:mb-16">
          Аренда профессионального звукового оборудования и сцен.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => {
            const Icon = iconMap[s.icon as keyof typeof iconMap];
            return (
              <div
                key={s.title}
                className="bg-paper2 p-8 group hover:bg-ink transition-colors duration-300"
              >
                <Icon className="w-6 h-6 text-klein group-hover:text-klein mb-6 stroke-[1.5]" />
                <h3 className="display text-2xl md:text-3xl text-ink group-hover:text-paper mb-3 transition-colors">
                  {s.title}
                </h3>
                <p className="text-ink2 group-hover:text-paper/60 text-sm leading-relaxed transition-colors">
                  {s.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
