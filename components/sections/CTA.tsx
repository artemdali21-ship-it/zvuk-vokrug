export function CTA() {
  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="container-page">
        <div className="max-w-3xl">
          <h2 className="display text-huge text-paper mb-6">
            Готовы взяться за вашу площадку.
          </h2>
          <p className="text-paper/60 text-lg mb-12 max-w-xl">
            Райдер, тех. карта, монтаж под ключ. Расчёт по описанию
            мероприятия — в день обращения.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:+79033710400"
              className="px-8 py-4 bg-klein text-paper text-base font-medium hover:bg-klein-deep transition-colors text-center"
            >
              Позвонить Фёдору
            </a>
            <a
              href="mailto:fmpuzikov@gmail.com"
              className="px-8 py-4 border border-paper/30 text-paper text-base font-medium hover:border-paper/60 transition-colors text-center"
            >
              Написать на почту
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
