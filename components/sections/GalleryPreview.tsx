import Image from "next/image";
import Link from "next/link";
import { previewPhotos } from "@/data/photos";

export function GalleryPreview() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-4">
          <h2 className="display text-huge text-ink">Проекты.</h2>
          <Link
            href="/projects"
            className="px-5 py-3 border border-ink text-ink text-sm font-medium hover:bg-ink hover:text-paper transition-colors self-start md:self-auto"
          >
            Все проекты →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {previewPhotos.map((photo) => (
            <div
              key={photo.src}
              className="relative aspect-[4/3] overflow-hidden bg-paper2 group"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
              />
              {photo.caption && (
                <div className="absolute inset-x-0 bottom-0 p-3 bg-ink/60 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-paper text-xs">{photo.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
