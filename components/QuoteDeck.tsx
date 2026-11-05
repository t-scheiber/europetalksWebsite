"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const TOTAL = 26;
// Newest card first, matching the order the cards were published.
const cards = Array.from({ length: TOTAL }, (_, i) => ({
  id: TOTAL - i,
  src: `/images/slideshow/quotes${TOTAL - i}.webp`,
}));

// Poses are full transform strings, not x/y/scale/rotate shorthands, so Motion can run
// them on the compositor. Every string keeps the same function order to interpolate.
const pose = (x: number, y: number, scale: number, rotate: number) =>
  `translate(${x}%, ${y}%) scale(${scale}) rotate(${rotate}deg)`;

// Resting pose for the three visible cards: top, middle, back.
const poses = [pose(0, 0, 1, -2.5), pose(5, 2.5, 0.95, 4), pose(-5, 5, 0.9, -7)];
const enterFromBack = pose(-5, 5, 0.84, -7);
const throwLeft = pose(-55, 8, 1, -16);
const enterFromLeft = pose(-45, 6, 1, -14);

const ease = [0.16, 1, 0.3, 1] as const;

interface QuoteDeckProps {
  interval?: number;
  className?: string;
}

export function QuoteDeck({ interval = 6000, className }: QuoteDeckProps) {
  const { t } = useTranslation("home");
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);

  const go = useCallback((step: 1 | -1) => {
    setDirection(step);
    setIndex((i) => (i + step + TOTAL) % TOTAL);
  }, []);

  const autoplay = playing && !hovered && !reduceMotion;

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => go(1), interval);
    return () => clearInterval(timer);
  }, [autoplay, go, interval]);

  const visible = [0, 1, 2].map((offset) => cards[(index + offset) % TOTAL]);

  return (
    <div
      className={cn("relative", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={t("quotes.label")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <div className="relative mx-auto aspect-square w-full">
        <AnimatePresence initial={false} custom={direction}>
          {visible
            .map((card, depth) => ({ card, depth }))
            .reverse()
            .map(({ card, depth }) => (
              <motion.div
                key={card.id}
                custom={direction}
                className="absolute inset-0 overflow-hidden rounded-[14px] bg-brand-deep shadow-[0_24px_60px_-20px_rgba(3,10,35,0.65)] ring-1 ring-white/15"
                style={{ zIndex: 3 - depth }}
                initial={
                  reduceMotion
                    ? { opacity: 0, transform: poses[2] }
                    : direction === 1
                      ? { transform: enterFromBack, opacity: 0 }
                      : { transform: enterFromLeft, opacity: 0 }
                }
                animate={{ transform: poses[depth], opacity: 1 }}
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : direction === 1
                      ? { transform: throwLeft, opacity: 0, zIndex: 4 }
                      : { transform: enterFromBack, opacity: 0 }
                }
                transition={{ duration: reduceMotion ? 0.2 : 0.7, ease }}
                aria-hidden={depth !== 0}
              >
                <Image
                  src={card.src}
                  alt={depth === 0 ? `EuropeTalks member quote ${card.id}` : ""}
                  fill
                  sizes="(max-width: 768px) 85vw, 460px"
                  quality={85}
                  priority={depth === 0 && index === 0}
                  className="object-cover"
                />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      <div className="relative z-10 mt-10 flex items-center justify-center gap-2 text-white">
        <button
          type="button"
          onClick={() => go(-1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 transition-colors hover:border-white hover:bg-white hover:text-brand"
          aria-label={t("quotes.previous")}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 transition-colors hover:border-white hover:bg-white hover:text-brand"
          aria-label={playing ? t("quotes.pause") : t("quotes.play")}
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 transition-colors hover:border-white hover:bg-white hover:text-brand"
          aria-label={t("quotes.next")}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <span
          className="ml-3 min-w-[4.5ch] text-sm font-semibold tabular-nums text-white/70"
          aria-live="polite"
        >
          {String(index + 1).padStart(2, "0")} / {TOTAL}
        </span>
      </div>
    </div>
  );
}
