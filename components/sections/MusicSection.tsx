"use client";

import { MusicCard } from "@/components/ui/MusicCard";
import { useState, useEffect } from "react";

const AUDIO_SRC = "/audio/funkformer-check-for-real.mp3";
const COVER_SRC = "/audio/cover.jpg";

export function MusicSection() {
  const [assetsReady, setAssetsReady] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if audio file exists without loading it
    fetch(AUDIO_SRC, { method: "HEAD" })
      .then((r) => setAssetsReady(r.ok))
      .catch(() => setAssetsReady(false));
  }, []);

  return (
    <section className="bg-paper2 py-24">
      <div className="container-page flex flex-col items-center text-center">
        <h2 className="display text-huge text-ink mb-4">
          Звук, который мы любим.
        </h2>
        <p className="text-ink2 max-w-prose mb-12">
          Трек Ильи Пузикова. Сын — пишет, отец — строит сцены. Это про нашу
          семью звука.
        </p>

        {assetsReady === false ? (
          <div className="w-full max-w-sm bg-paper2 border border-ink/10 rounded-lg p-8 text-center opacity-60">
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
      </div>
    </section>
  );
}
