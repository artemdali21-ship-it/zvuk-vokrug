import { trustPrinciples } from "@/data/testimonials";

// §6.8b — безопасный дефолт. При подтверждении Фёдором переключить на §6.8a
export function Testimonials() {
  return (
    <section className="bg-paper2 py-20 md:py-28">
      <div className="container-page">
        <div className="mb-12 md:mb-16">
          <h2 className="display text-huge text-ink mb-3">
            Что ценят заказчики.
          </h2>
          <p className="text-ink2 text-lg max-w-xl">
            Не реклама — рабочие принципы, которые держат 30 лет.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {trustPrinciples.map((p) => (
            <div
              key={p.number}
              className="grid grid-cols-[48px_1fr] gap-4 py-6 border-t border-ink/10"
            >
              <span className="display text-2xl text-klein leading-none pt-0.5">
                {p.number}
              </span>
              <div>
                <h3 className="display text-lg text-ink mb-2">{p.title}</h3>
                <p className="text-ink2 text-sm leading-relaxed">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
