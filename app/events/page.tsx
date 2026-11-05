"use client";

import EventCard from "@/components/events/EventCard";
import { EventGridSkeleton } from "@/components/events/EventGridSkeleton";
import { PageHero } from "@/components/brand/PageHero";
import { Watercolor } from "@/components/brand/Watercolor";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import useSWR from "swr";

// Create a reusable fetcher function
const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.message = await res.text();
    throw error;
  }

  return res.json();
};

export default function EventsPage() {
  const { t } = useTranslation(["events", "header"]);

  // Use SWR for data fetching with automatic caching and revalidation
  const { data, error, isLoading } = useSWR("/api/events", fetcher, {
    revalidateOnFocus: false, // Don't revalidate when window gets focus
    revalidateOnReconnect: true, // Revalidate when browser regains connection
    refreshInterval: 300000, // Refresh every 5 minutes
  });

  const events = data?.upcoming || [];

  return (
    <>
      <PageHero
        title={t("events.title")}
        actions={
          <Button variant="inverse" asChild>
            <Link href="/past-events">{t("events.viewPastEvents")}</Link>
          </Button>
        }
      />

      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-20">
        {error ? (
          <div className="mx-auto max-w-lg py-12 text-center">
            <h2 className="text-2xl font-bold">{t("errorLoading")}</h2>
            <p className="mt-2 text-muted-foreground">{t("tryAgain")}</p>
            <Button onClick={() => window.location.reload()} className="mt-6">
              {t("refresh")}
            </Button>
          </div>
        ) : isLoading ? (
          <>
            <span className="sr-only" role="status">
              {t("events.loading")}
            </span>
            <EventGridSkeleton />
          </>
        ) : events.length === 0 ? (
          <div className="relative mx-auto flex max-w-2xl flex-col items-center py-16 text-center">
            <Watercolor
              color="blau"
              variant={1}
              className="left-1/2 top-0 h-40 w-[28rem] -translate-x-1/2 opacity-50"
            />
            <p className="display relative text-[clamp(2rem,4vw,3rem)] text-brand dark:text-white">
              {t("events.noEvents")}
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild>
                <Link href="/past-events">{t("events.viewPastEvents")}</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/gallery">{t("navigation.gallery", { ns: "header" })}</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event: Parameters<typeof EventCard>[0]["event"]) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
