import Link from "next/link";

export function Footer() {
  return (
    <footer className="text-white" style={{ background: "#020617" }}>
      {/* Top rule — mirrors header bottom */}
      <div className="h-px" style={{ background: "rgba(255,255,255,0.08)" }} />

      <div
        className="container-page"
        style={{ paddingTop: "clamp(64px, 8vw, 96px)", paddingBottom: "max(clamp(64px, 8vw, 96px), env(safe-area-inset-bottom, 0px))" }}
      >
        {/* Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-10 md:gap-16"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "clamp(40px, 5vw, 56px)" }}
        >
          {/* Tagline */}
          <div>
            <p
              className="font-display font-black text-white mb-4"
              style={{ fontSize: "clamp(18px, 2.2vw, 28px)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
            >
              Техническое<br />оснащение событий
            </p>
            <p className="text-white/40 text-sm leading-relaxed">
              Волгоград · Элиста<br />Астрахань · Саратов
            </p>
            <p className="text-white/25 text-xs mt-2">С 1994 года — 30 лет звука для Юга России.</p>
          </div>

          {/* Nav */}
          <div>
            <p
              className="uppercase mb-4"
              style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.16em" }}
            >
              Разделы
            </p>
            <nav className="space-y-2.5">
              {[
                { href: "/", label: "Главная" },
                { href: "/projects", label: "Проекты" },
                { href: "tel:+79033710400", label: "Связаться" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block text-white/50 text-sm hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contacts */}
          <div>
            <p
              className="uppercase mb-4"
              style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.16em" }}
            >
              Контакты
            </p>
            <a
              href="tel:+79033710400"
              className="block font-display font-black text-white hover:text-white/75 transition-colors duration-200 mb-3 tabular-nums"
              style={{ fontSize: "clamp(20px, 2vw, 26px)", letterSpacing: "-0.03em" }}
            >
              +7 (903) 371-04-00
            </a>
            <a
              href="mailto:fmpuzikov@gmail.com"
              className="block text-white/45 text-sm hover:text-white transition-colors duration-200 mb-1"
            >
              fmpuzikov@gmail.com
            </a>
            <a
              href="https://t.me/fmpuzikov"
              target="_blank"
              rel="noreferrer"
              className="block text-white/45 text-sm hover:text-white transition-colors duration-200"
            >
              @fmpuzikov
            </a>
          </div>

          {/* Geography */}
          <div>
            <p
              className="uppercase mb-4"
              style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.16em" }}
            >
              География
            </p>
            <p className="text-white/50 text-sm leading-loose">
              Волгоград<br />
              Элиста<br />
              Астрахань<br />
              Саратов
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-7 flex flex-col md:flex-row justify-between items-start md:items-center gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-white/30 text-xs">
            © 1994–2026 Звук Вокруг · Фёдор Пузиков
          </p>
          <p className="text-white/18 text-xs">
            Аренда звукового, светового, сценического оборудования и LED-экранов · Волгоград
          </p>
        </div>
      </div>
    </footer>
  );
}
