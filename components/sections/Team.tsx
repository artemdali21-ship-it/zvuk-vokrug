import Image from "next/image";

export function Team() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="container-page">
        <div className="mb-10 md:mb-12">
          <h2 className="display text-huge text-ink mb-3">Команда.</h2>
          <p className="text-ink2 text-lg">
            Одиннадцать человек, держащих звук Юга.
          </p>
        </div>
      </div>

      {/* Full-width photo */}
      <div className="w-full">
        {/* TODO: скопировать ~/Desktop/Сайт Илья/ФОТО/all_black.PNG → public/team/team-bw.jpg */}
        <div className="relative w-full aspect-[16/9] bg-paper2">
          <Image
            src="/team/team-bw.jpg"
            alt="Команда Звук Вокруг — одиннадцать человек на площадке"
            fill
            className="object-cover"
            sizes="100vw"
            priority={false}
          />
        </div>
      </div>

      <div className="container-page">
        <p className="text-center text-sm text-ink2 mt-6">
          В центре — Фёдор Пузиков. С 1994 года.
        </p>
      </div>
    </section>
  );
}
