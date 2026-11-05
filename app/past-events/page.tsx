"use client";

import { EventCard } from "@/components/events/EventCard";
import { EventGridSkeleton } from "@/components/events/EventGridSkeleton";
import { PageHero } from "@/components/brand/PageHero";
import { Button } from "@/components/ui/button";
import Link from "@/components/TransitionLink";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type PastEvent = Parameters<typeof EventCard>[0]["event"];

export default function PastEventsPage() {
  const { t } = useTranslation("events");
  const [events, setEvents] = useState<PastEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("/api/events");
        const data = await response.json();
        setEvents(data.past ?? []);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return (
    <>
      <PageHero
        title={t("pastEvents.title")}
        actions={
          <Button variant="inverse" asChild>
            <Link href="/events">{t("pastEvents.viewUpcomingEvents")}</Link>
          </Button>
        }
      />
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-20">
        {isLoading ? (
          <>
            <span className="sr-only" role="status">
              {t("events.loading")}
            </span>
            <EventGridSkeleton />
          </>
        ) : events.length === 0 ? (
          <p className="py-16 text-center text-lg text-muted-foreground">
            {t("pastEvents.noEvents")}
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
