import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="text-white"
      style={{
        background: "#020617",
      }}
    >
      <div className="container-page py-16 md:py-20" style={{ paddingBottom: "max(5rem, env(safe-area-inset-bottom, 0px))" }}>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-12 md:gap-16">

          {/* Logo */}
          <div>
            <Link
              href="/"
              className="font-display font-black text-white hover:text-white/80 transition-colors mb-3 inline-block"
              style={{ fontSize: "clamp(28px, 3vw, 40px)", letterSpacing: "-0.04em", lineHeight: 1 }}
            >
              ЗВУК ВОКРУГ
            </Link>
            <p className="text-white/45 text-sm mt-3">
              Волгоград · Элиста · Астрахань · Саратов
            </p>
            <p className="text-white/35 text-xs mt-1">
              С 1994 года. 30 лет звука для Юга России.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="text-white/40 text-[10px] uppercase tracking-[0.16em] mb-4">
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
                  className="block text-white/55 text-sm hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contacts */}
          <div>
            <p className="text-white/40 text-[10px] uppercase tracking-[0.16em] mb-4">
              Контакты
            </p>
            <a
              href="tel:+79033710400"
              className="block text-white text-xl font-bold hover:text-white/80 transition-colors mb-2 tabular-nums"
            >
              +7 (903) 371-04-00
            </a>
            <a
              href="mailto:fmpuzikov@gmail.com"
              className="block text-white/55 text-sm hover:text-white transition-colors"
            >
              fmpuzikov@gmail.com
            </a>
          </div>

          {/* Legal */}
          <div>
            <p className="text-white/40 text-[10px] uppercase tracking-[0.16em] mb-4">
              География
            </p>
            <p className="text-white/55 text-sm leading-relaxed">
              Волгоград<br />
              Элиста<br />
              Астрахань<br />
              Саратов
            </p>
          </div>

        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p className="text-white/35 text-xs">
            © 1994–2026 Звук Вокруг · Фёдор Пузиков
          </p>
          <p className="text-white/25 text-xs">
            Аренда звукового, светового, сценического оборудования и LED-экранов · Волгоград
          </p>
        </div>
      </div>
    </footer>
  );
}
