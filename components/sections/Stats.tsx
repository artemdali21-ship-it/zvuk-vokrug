const stats = [
  { value: "30", label: "ЛЕТ НА РЫНКЕ С 1994" },
  { value: "9 000+", label: "МЕРОПРИЯТИЙ" },
  { value: "4", label: "РЕГИОНА" },
  { value: "60+", label: "ТОПОВЫХ АРТИСТОВ" },
];

export function Stats() {
  return (
    <section className="bg-paper2 py-20 md:py-28">
      <div className="container-page">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="display text-mega text-ink leading-none mb-2">
                {s.value}
              </p>
              <p className="text-xs md:text-sm text-ink2 uppercase tracking-widest font-medium">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
