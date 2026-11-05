"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PageHero } from "@/components/brand/PageHero";
import { seriesColor, seriesDot } from "@/lib/event-series";
import { useGallery } from "./GalleryContext";

export default function GalleryPage() {
  const { t, i18n } = useTranslation("gallery");
  const events = useGallery();
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const monthYear = new Intl.DateTimeFormat(i18n.language || "en", {
    month: "long",
    year: "numeric",
  });

  const active = events.find((e) => e.id === selectedEvent);
  const images = active?.images ?? [];

  const total = images.length;
  const step = (delta: number) => {
    if (!total) return;
    setCurrentIndex((i) => (i + delta + total) % total);
  };

  return (
    <>
      <PageHero title={t("title")}>
        <nav aria-label={t("title")} className="mt-10 flex flex-wrap gap-2">
          {events.map((event) => (
            <a
              key={event.id}
              href={`#${encodeURIComponent(event.id)}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-3.5 py-1.5 text-sm font-semibold text-white/90 transition-colors hover:border-white hover:bg-white hover:text-brand"
            >
              <span className={`h-2 w-2 rounded-full ${seriesDot[seriesColor(event.name)]}`} />
              {event.name}
              <span className="font-normal opacity-70">{event.location}</span>
            </a>
          ))}
        </nav>
      </PageHero>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {events.map((event) => (
          <section
            key={event.id}
            id={event.id}
            className="scroll-mt-24 border-t border-border py-14 first:border-t-0 md:py-20"
          >
            <header className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="display text-[clamp(2.25rem,4.5vw,3.5rem)] text-brand dark:text-white">
                  {event.name}
                </h2>
                <p className="mt-2 flex items-center gap-2 text-base font-medium text-muted-foreground">
                  <span className={`h-2.5 w-2.5 rounded-full ${seriesDot[seriesColor(event.name)]}`} />
                  {event.location} · {monthYear.format(new Date(event.date))}
                </p>
              </div>
              <p className="text-sm font-semibold tabular-nums text-muted-foreground">
                {t("photos", { count: event.images.length })}
              </p>
            </header>

            <div className="grid auto-rows-[9rem] grid-cols-2 gap-2 sm:auto-rows-[11rem] md:grid-cols-4 md:gap-3 lg:auto-rows-[13rem]">
              {event.images.map((image, index) => (
                <button
                  type="button"
                  key={image}
                  className={`group relative overflow-hidden rounded-[12px] bg-muted focus-visible:outline-offset-2 ${
                    index === 0 ? "col-span-2 row-span-2" : ""
                  }`}
                  onClick={() => {
                    setSelectedEvent(event.id);
                    setCurrentIndex(index);
                  }}
                >
                  <Image
                    src={image}
                    alt={`${event.name}, ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    sizes={
                      index === 0
                        ? "(max-width: 768px) 100vw, 50vw"
                        : "(max-width: 768px) 50vw, 25vw"
                    }
                  />
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      <DialogPrimitive.Root
        open={selectedEvent !== null}
        onOpenChange={(open) => !open && setSelectedEvent(null)}
      >
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-[rgba(3,10,30,0.94)] backdrop-blur-sm" />
          <DialogPrimitive.Content
            className="fixed inset-0 z-50 flex flex-col text-white outline-none"
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") step(1);
              if (e.key === "ArrowLeft") step(-1);
            }}
          >
            <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
              <DialogPrimitive.Title className="min-w-0 truncate text-base font-semibold">
                {active?.name}
                <span className="ml-3 font-normal tabular-nums text-white/60">
                  {currentIndex + 1} / {images.length}
                </span>
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="sr-only">
                {active ? `${active.location} · ${monthYear.format(new Date(active.date))}` : ""}
              </DialogPrimitive.Description>
              <DialogPrimitive.Close
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 transition-colors hover:border-white hover:bg-white hover:text-brand-ink"
                aria-label={t("close")}
              >
                <X className="h-5 w-5" />
              </DialogPrimitive.Close>
            </div>

            <div className="relative flex-1">
              {images[currentIndex] && (
                <Image
                  key={images[currentIndex]}
                  src={images[currentIndex]}
                  alt={`${active?.name}, ${currentIndex + 1}`}
                  fill
                  className="object-contain px-2 sm:px-20"
                  sizes="100vw"
                  priority
                />
              )}
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label={t("previous")}
                className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 backdrop-blur transition-colors hover:bg-white hover:text-brand-ink sm:left-6"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label={t("next")}
                className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 backdrop-blur transition-colors hover:bg-white hover:text-brand-ink sm:right-6"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            <div className="flex gap-2 overflow-x-auto px-5 py-4 sm:justify-center sm:px-8">
              {images.map((src, i) => (
                <button
                  type="button"
                  key={src}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`${i + 1}`}
                  aria-current={i === currentIndex}
                  className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-md transition-opacity ${
                    i === currentIndex
                      ? "opacity-100 ring-2 ring-marker"
                      : "opacity-45 hover:opacity-80"
                  }`}
                >
                  <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
}
