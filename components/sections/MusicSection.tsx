"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamic import — Howler.js выгружается в отдельный чанк, не в page bundle
const MusicCard = dynamic(
  () => import("@/components/ui/MusicCard").then((m) => ({ default: m.MusicCard })),
  { ssr: false, loading: () => <div className="w-full max-w-xs h-96 bg-paper rounded-lg animate-pulse" /> }
);

const AUDIO_SRC = "/audio/funkformer-check-for-real.mp3";
const COVER_SRC = "/audio/cover.jpg";

export function MusicSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [assetsReady, setAssetsReady] = useState<boolean | null>(null);

  useEffect(() => {
    fetch(AUDIO_SRC, { method: "HEAD" })
      .then((r) => setAssetsReady(r.ok))
      .catch(() => {
        console.warn("[MusicSection] Audio file not found:", AUDIO_SRC);
        setAssetsReady(false);
      });
  }, []);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="bg-paper2 py-24 md:py-32"
    >
      <div className="container-page">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left: typographic block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[10px] text-ink2 uppercase tracking-[0.18em] mb-4">
              Музыка в семье
            </p>
            <h2 className="display text-huge text-ink mb-4">
              Звук, который мы любим.
            </h2>
            <p className="text-ink2 leading-relaxed max-w-[38ch]">
              Трек Ильи Пузикова. Сын пишет музыку. Отец строит сцены.
              Это про нашу семью звука.
            </p>
          </motion.div>

          {/* Right: MusicCard */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center md:justify-end"
          >
            {assetsReady === false ? (
              <div className="w-full max-w-xs bg-paper border border-ink/[0.08] rounded-lg p-8 text-center opacity-50">
                <div className="w-full aspect-square bg-paper2 rounded-md mb-5" />
                <p className="text-sm text-ink2">Трек скоро появится.</p>
              </div>
            ) : (
              <MusicCard
                src={AUDIO_SRC}
                poster={COVER_SRC}
                title="For Real"
                artist="Funkformer × Check"
                mainColor="#1C45D6"
              />
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
