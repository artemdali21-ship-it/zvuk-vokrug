"use client";

import { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import { CirclePlay, CirclePause, SkipForward, SkipBack } from "lucide-react";

interface MusicCardProps {
  src: string;
  poster: string;
  mainColor?: string;
  title?: string;
  artist?: string;
}

export function MusicCard({
  src,
  poster,
  mainColor = "#1C45D6",
  title = "Unknown Title",
  artist = "Unknown Artist",
}: MusicCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const howler = useRef<Howl | null>(null);
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const ensureHowl = () => {
    if (howler.current) return howler.current;
    const sound = new Howl({
      src: [src],
      preload: false,
      html5: true,
      onload: () => setDuration(sound.duration()),
      onpause: () => {
        setIsPlaying(false);
        if (progressInterval.current) clearInterval(progressInterval.current);
      },
      onplay: () => {
        setIsPlaying(true);
        updateProgress();
      },
      onend: () => {
        setIsPlaying(false);
        if (progressInterval.current) clearInterval(progressInterval.current);
        setProgress(0);
      },
      onstop: () => {
        setIsPlaying(false);
        if (progressInterval.current) clearInterval(progressInterval.current);
        setProgress(0);
      },
    });
    howler.current = sound;
    return sound;
  };

  useEffect(() => {
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
      howler.current?.unload();
      howler.current = null;
    };
  }, []);

  const updateProgress = () => {
    if (!howler.current) return;
    progressInterval.current = setInterval(() => {
      const seek = (howler.current?.seek() as number) || 0;
      setProgress(seek);
    }, 500);
  };

  const handlePlayPause = () => {
    const sound = ensureHowl();
    if (isPlaying) sound.pause();
    else sound.play();
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!howler.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percentage = (e.clientX - rect.left) / rect.width;
    const newPosition = percentage * duration;
    howler.current.seek(newPosition);
    setProgress(newPosition);
  };

  const handleSkip = (direction: "forward" | "backward") => {
    if (!howler.current) return;
    const currentTime = howler.current.seek() as number;
    const skipAmount = 10;
    const newTime =
      direction === "forward"
        ? Math.min(currentTime + skipAmount, duration)
        : Math.max(currentTime - skipAmount, 0);
    howler.current.seek(newTime);
    setProgress(newTime);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const cardStyle = {
    "--main-color": mainColor,
  } as React.CSSProperties;

  return (
    <section
      className="w-full max-w-xs bg-paper2 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
      style={cardStyle}
    >
      <div className="relative w-full aspect-square mb-5 rounded-md overflow-hidden bg-paper">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={poster}
          alt="Обложка трека For Real"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="mb-5">
        <h3 className="text-lg font-display font-bold text-ink truncate">
          {title}
        </h3>
        <p className="text-sm text-ink2 truncate">{artist}</p>
      </div>

      <div className="mb-5">
        <div
          className="h-1 bg-klein/15 rounded-full cursor-pointer"
          onClick={handleSeek}
          role="slider"
          aria-label="Перемотка"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={progress}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: duration ? `${(progress / duration) * 100}%` : "0%",
              background: "var(--main-color)",
            }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-ink2 tabular-nums">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between px-2">
        <button
          onClick={() => handleSkip("backward")}
          className="p-2 text-ink2 hover:text-klein transition-colors"
          title="-10 сек"
          aria-label="Назад 10 секунд"
        >
          <SkipBack className="w-6 h-6" />
        </button>
        <button
          onClick={handlePlayPause}
          className="p-2 text-klein hover:text-klein-deep transition-colors"
          aria-label={isPlaying ? "Пауза" : "Играть"}
        >
          {isPlaying ? (
            <CirclePause className="w-10 h-10" />
          ) : (
            <CirclePlay className="w-10 h-10" />
          )}
        </button>
        <button
          onClick={() => handleSkip("forward")}
          className="p-2 text-ink2 hover:text-klein transition-colors"
          title="+10 сек"
          aria-label="Вперёд 10 секунд"
        >
          <SkipForward className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
