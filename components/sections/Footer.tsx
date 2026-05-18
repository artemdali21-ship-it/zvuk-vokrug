import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-ink text-paper py-16 md:py-20">
      <div className="container-page">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-12 md:gap-20">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="display text-3xl md:text-4xl text-klein hover:text-klein-deep transition-colors mb-3 inline-block"
            >
              ЗВУК ВОКРУГ
            </Link>
            <p className="text-paper/35 text-sm mt-3">
              Волгоград · Элиста · Астрахань · Саратов
            </p>
            <p className="text-paper/25 text-xs mt-1">
              С 1994 года. 30 лет звука для Юга России.
            </p>
          </div>

          {/* Contacts */}
          <div>
            <p className="text-paper/30 text-[10px] uppercase tracking-[0.16em] mb-4">
              Контакты
            </p>
            <a
              href="tel:+79033710400"
              className="block text-paper text-xl font-medium hover:text-klein transition-colors mb-2"
            >
              +7 (903) 371-04-00
            </a>
            <a
              href="mailto:fmpuzikov@gmail.com"
              className="block text-paper/50 text-sm hover:text-klein transition-colors"
            >
              fmpuzikov@gmail.com
            </a>
          </div>

          {/* Nav */}
          <div>
            <p className="text-paper/30 text-[10px] uppercase tracking-[0.16em] mb-4">
              Разделы
            </p>
            <nav className="space-y-2">
              {[
                { href: "/", label: "Главная" },
                { href: "/projects", label: "Проекты" },
                { href: "tel:+79033710400", label: "Связаться" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block text-paper/50 text-sm hover:text-paper transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-paper/[0.07] flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <p className="text-paper/20 text-xs">
            © 1994–2026 Звук Вокруг · Фёдор Пузиков
          </p>
          <p className="text-paper/15 text-xs">
            Аренда звукового, светового и сценического оборудования · Волгоград
          </p>
        </div>
      </div>
    </footer>
  );
}
