"use client";

import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { QuoteDeck } from "@/components/QuoteDeck";
import { Stripes } from "@/components/brand/Stripes";
import { Watercolor, type WatercolorColor } from "@/components/brand/Watercolor";
import { DateBlock } from "@/components/events/DateBlock";
import { SplashHeading } from "@/components/brand/SplashHeading";
import { fetcher } from "@/lib/api-client";
import { seriesColor, seriesDot } from "@/lib/event-series";
import type { GalleryEvent } from "@/types/gallery";

interface UpcomingEvent {
  id: string;
  title: string;
  startDate: string;
  location: string;
}

/** Sets "EuropeTalks" in highlight yellow, as the quote cards highlight key words. */
function markBrand(text: string) {
  return text.split(/(EuropeTalks)/i).map((part, i) =>
    /^europetalks$/i.test(part) ? (
      <span key={i} className="text-marker">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

const pillars: { key: string; color: WatercolorColor; variant: number }[] = [
  { key: "cultural", color: "rot", variant: 1 },
  { key: "community", color: "gelb", variant: 6 },
  { key: "knowledge", color: "grün", variant: 5 },
];

export default function HomeView({ gallery }: { gallery: GalleryEvent[] }) {
  const { t, i18n } = useTranslation(["home", "about", "header", "events"]);
  const { data } = useSWR<{ upcoming: UpcomingEvent[] }>("/api/events", fetcher, {
    revalidateOnFocus: false,
  });
  const upcoming = (data?.upcoming ?? []).slice(0, 3);
  const featured = gallery.slice(0, 5);
  const monthYear = new Intl.DateTimeFormat(i18n.language || "en", {
    month: "long",
    year: "numeric",
  });

  return (
    <>
      {/* Hero: continues the blue header field */}
      <section className="relative isolate overflow-hidden bg-brand text-white">
        <Watercolor
          color="blau"
          variant={4}
          priority
          className="-right-[20%] top-[10%] -z-10 h-[120%] w-[90%] opacity-40 md:-right-[8%] md:w-[60%] dark:opacity-25"
        />
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-16 pt-12 sm:px-8 md:pb-24 md:pt-16 lg:grid-cols-12 lg:gap-8">
          <div className="min-w-0 lg:col-span-7">
            <Stripes className="mb-8 w-16 text-white/70" />
            <h1 className="display text-[clamp(3.5rem,9vw,7.5rem)] [hyphens:auto]">
              {markBrand(t("hero.title"))}
            </h1>
            <p className="mt-8 max-w-xl text-xl leading-relaxed text-brand-mist md:text-2xl md:leading-snug">
              {t("whoWeAre.intro", { ns: "about" })}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button size="lg" variant="marker" asChild>
                <Link href="/about">
                  {t("cta.buttons.learnMore")}
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
              <Button size="lg" variant="inverse" asChild>
                <Link href="/events">{t("cta.buttons.explore")}</Link>
              </Button>
            </div>
          </div>
          <div className="mx-auto w-full min-w-0 max-w-[min(26rem,82vw)] lg:col-span-5 lg:max-w-[28rem]">
            <QuoteDeck />
          </div>
        </div>
      </section>

      {/* Who we are: mission statement and three ways of working */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-16 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <h2 className="display text-[clamp(2.75rem,5.5vw,4.5rem)] text-brand dark:text-white">
              {t("whoWeAre.title", { ns: "about" })}
            </h2>
            <p className="mt-8 text-xl leading-relaxed md:text-[1.4rem] md:leading-[1.55]">
              {t("whoWeAre.mission", { ns: "about" })}
            </p>
            <Link
              href="/about"
              className="group mt-8 inline-flex items-center gap-2 text-lg font-bold text-brand underline decoration-marker decoration-[3px] underline-offset-[6px] dark:text-white"
            >
              {t("cta.buttons.learnMore")}
              <ArrowRight
                aria-hidden
                className="h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-1"
              />
            </Link>
          </div>

          <ul className="flex flex-col gap-12 lg:col-span-5 lg:col-start-8 lg:pt-4">
            {pillars.map(({ key, color, variant }) => (
              <li key={key}>
                <SplashHeading
                  as="h3"
                  color={color}
                  variant={variant}
                  className="text-[2.75rem] text-brand-ink dark:text-white"
                >
                  {t(`features.${key}.title`)}
                </SplashHeading>
                <p className="mt-3 max-w-md text-lg leading-relaxed text-muted-foreground">
                  {t(`features.${key}.description`)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Upcoming events, only when there are any */}
      {upcoming.length > 0 && (
        <section className="bg-secondary/60 dark:bg-secondary/40">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20">
            <div className="mb-10 flex items-end justify-between gap-6">
              <h2 className="display text-[clamp(2.5rem,5vw,4rem)] text-brand dark:text-white">
                {t("events.title", { ns: "events" })}
              </h2>
              <Link
                href="/events"
                className="hidden shrink-0 items-center gap-1 font-bold text-brand underline decoration-marker decoration-[3px] underline-offset-[6px] sm:inline-flex dark:text-white"
              >
                {t("cta.buttons.explore")}
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </div>
            <ul className="divide-y divide-border border-y border-border">
              {upcoming.map((event) => (
                <li key={event.id}>
                  <Link
                    href="/events"
                    className="group flex items-center gap-6 py-5 transition-colors"
                  >
                    <DateBlock date={event.startDate} />
                    <div className="min-w-0 flex-1">
                      <p className="text-xl font-bold leading-snug group-hover:text-brand md:text-2xl dark:group-hover:text-marker">
                        {event.title}
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 text-muted-foreground">
                        <MapPin aria-hidden className="h-4 w-4" />
                        {event.location}
                      </p>
                    </div>
                    <ArrowRight
                      aria-hidden
                      className="h-6 w-6 shrink-0 text-brand transition-transform duration-300 ease-out group-hover:translate-x-1 dark:text-white"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Where we have been: real event photos */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
          <div className="mb-10 flex items-end justify-between gap-6">
            <h2 className="display text-[clamp(2.75rem,5.5vw,4.5rem)] text-brand dark:text-white">
              {t("navigation.gallery", { ns: "header" })}
            </h2>
            <Link
              href="/gallery"
              aria-label={t("navigation.gallery", { ns: "header" })}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-brand text-brand transition-colors duration-200 hover:bg-brand hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-brand"
            >
              <ArrowUpRight aria-hidden className="h-5 w-5" />
            </Link>
          </div>
          <div className="grid auto-rows-[13rem] grid-cols-2 gap-3 md:auto-rows-[15rem] md:grid-cols-4 md:gap-4">
            {featured.map((event, i) => {
              const color = seriesColor(event.name);
              return (
                <Link
                  key={event.id}
                  href={`/gallery#${encodeURIComponent(event.id)}`}
                  className={`group relative overflow-hidden rounded-[14px] bg-brand-deep ${
                    i === 0 ? "col-span-2 row-span-2" : ""
                  }`}
                >
                  <Image
                    src={event.images[0]}
                    alt=""
                    fill
                    sizes={i === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(4,14,40,0.92)] via-[rgba(4,14,40,0.35)] to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white md:p-5">
                    <p
                      className={`display ${
                        i === 0 ? "text-4xl leading-[0.92] md:text-5xl md:leading-[0.92]" : "text-2xl leading-[0.95]"
                      }`}
                    >
                      {event.name}
                    </p>
                    <p className="mt-1 flex items-start gap-2 text-sm font-medium leading-snug text-white/90">
                      <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${seriesDot[color]}`} />
                      <span>
                        {event.location} · {monthYear.format(new Date(event.date))}
                      </span>
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Closing call to action */}
      <section className="relative isolate overflow-hidden bg-brand text-white">
        <Watercolor
          color="gelb"
          variant={6}
          className="-left-[15%] -bottom-[30%] -z-10 h-[140%] w-[70%] opacity-[0.18] mix-blend-screen dark:opacity-[0.12]"
        />
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-20 sm:px-8 md:flex-row md:items-end md:justify-between md:py-24">
          <div className="max-w-2xl">
            <Stripes className="mb-6 w-14 text-white/70" />
            <h2 className="display text-[clamp(3rem,7vw,5.5rem)]">{t("cta.title")}</h2>
            <p className="mt-5 text-xl leading-relaxed text-brand-mist">
              {t("cta.description")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" variant="marker" asChild>
              <Link href="/contact">
                {t("cta.buttons.contact")}
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button size="lg" variant="inverse" asChild>
              <Link href="/events">{t("cta.buttons.explore")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
