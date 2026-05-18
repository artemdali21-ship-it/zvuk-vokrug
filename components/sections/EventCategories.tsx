const categories = [
  {
    title: "КОНЦЕРТЫ И ТУРЫ",
    description:
      "Площадки от клубов до открытых стадионов. Райдер под крупных артистов.",
    photo: "/photos/02ac7b6d.jpg",
  },
  {
    title: "ЧАСТНЫЕ И КОРПОРАТИВНЫЕ ПРАЗДНИКИ",
    description:
      "Дни рождения, юбилеи, корпоративы. Звук + свет + сцена под ключ.",
    photo: "/photos/13d4e9e3.jpg",
  },
  {
    title: "ФЕСТИВАЛИ И КОНФЕРЕНЦИИ",
    description:
      "Многодневный монтаж, несколько сцен, видеопроекция.",
    photo: "/photos/0935157f.jpg",
  },
  {
    title: "ГОРОДСКИЕ СОБЫТИЯ",
    description:
      "Парад Победы, юбилеи города, минуты молчания. Высокая ответственность.",
    photo: "/photos/bf925159.jpg",
  },
  {
    title: "ИНСТАЛЛЯЦИИ",
    description:
      "Постоянные и временные звуковые/световые решения для пространств.",
    photo: "/photos/2d600a69.jpg",
  },
  {
    title: "СПОРТИВНЫЕ СОБЫТИЯ",
    description:
      "Стадионы, манежи, открытые площадки. PA + комментаторские пульты.",
    photo: "/photos/f4ca6ed7.jpg",
  },
];

export function EventCategories() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="container-page">
        <div className="mb-12 md:mb-16">
          <h2 className="display text-huge text-ink mb-3">Для каких событий.</h2>
          <p className="text-ink2 text-lg">
            От камерного концерта до городской площади.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="group relative aspect-square overflow-hidden bg-paper2"
            >
              {/* Photo placeholder — реальные фото в P2 */}
              <div
                className="absolute inset-0 bg-paper2 group-hover:scale-105 transition-transform duration-500"
                style={{
                  backgroundImage: `url(${cat.photo})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "grayscale(100%)",
                }}
              />
              <div className="absolute inset-0 bg-ink/50 group-hover:bg-ink/40 transition-colors" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="display text-sm md:text-lg text-paper mb-2 leading-tight">
                  {cat.title}
                </h3>
                <p className="text-paper/60 text-xs md:text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {cat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
