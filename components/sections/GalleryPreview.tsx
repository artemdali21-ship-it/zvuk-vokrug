"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { previewPhotos } from "@/data/photos";

export function GalleryPreview() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="container-page">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-6"
        >
          <div>
            <p className="text-[10px] text-ink2 uppercase tracking-[0.18em] mb-4">
              Работы
            </p>
            <h2 className="display text-huge text-ink">Проекты.</h2>
          </div>
          <Link
            href="/projects"
            className="px-6 py-3 border border-ink text-ink text-sm font-medium hover:bg-ink hover:text-paper transition-colors self-start md:self-auto shrink-0"
          >
            Все 26 проектов →
          </Link>
        </motion.div>

        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {previewPhotos.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 16 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className={`relative overflow-hidden bg-paper2 group ${
                i === 0 ? "col-span-2 md:col-span-1 aspect-[4/3]" : "aspect-[4/3]"
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-600"
              />
              {photo.caption && (
                <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 bg-ink/60 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-paper text-xs leading-snug">{photo.caption}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
