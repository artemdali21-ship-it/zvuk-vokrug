export function Footer() {
  return (
    <footer className="bg-ink text-paper py-16 md:py-20">
      <div className="container-page">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          <div>
            <p className="display text-2xl md:text-3xl text-klein mb-4">
              ЗВУК ВОКРУГ
            </p>
            <p className="text-paper/50 text-sm">
              Волгоград · Элиста · Астрахань · Саратов
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-paper/40 text-xs uppercase tracking-widest mb-4">
              Контакты
            </p>
            <a
              href="tel:+79033710400"
              className="block text-paper hover:text-klein transition-colors text-lg font-medium"
            >
              +7 (903) 371-04-00
            </a>
            <a
              href="mailto:fmpuzikov@gmail.com"
              className="block text-paper/70 hover:text-klein transition-colors text-sm"
            >
              fmpuzikov@gmail.com
            </a>
          </div>

          <div className="space-y-2">
            <p className="text-paper/40 text-xs uppercase tracking-widest mb-4">
              Фёдор Пузиков
            </p>
            <p className="text-paper/60 text-sm leading-relaxed">
              30 лет в индустрии.<br />
              9000+ мероприятий.<br />
              С 1994 года.
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-paper/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-paper/30 text-sm">© 1994–2026 Звук Вокруг</p>
          <p className="text-paper/20 text-xs">
            Аренда звукового, светового и сценического оборудования · Волгоград
          </p>
        </div>
      </div>
    </footer>
  );
}
