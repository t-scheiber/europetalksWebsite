import EventSignupForm from "@/components/events/EventSignupForm";
import EventDetailsDialog from "@/components/events/EventDetailsDialog";
import { Button } from "@/components/ui/button";
import { formatEventDate, formatEventRange } from "@/lib/format-date";
import { CalendarIcon, MapPinIcon, Clock } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { FormField } from "@/lib/types/event-form";
import { EventTerms } from "@/lib/types/event-form";
import { Badge } from "@/components/ui/badge";
import { DateBlock } from "./DateBlock";
import { Stripes } from "@/components/brand/Stripes";

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    startDate: Date | string;
    endDate: Date | string;
    location: string;
    imageUrl?: string;
    formSchema?: {
      fields: FormField[];
      terms: EventTerms[];
    };
    signup_period_json?: {
      startDate: string | null;
      endDate: string | null;
    };
  };
}

export function EventCard({ event }: EventCardProps) {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { t, i18n } = useTranslation("events");
  const [isImageLoading, setIsImageLoading] = useState(true);

  const formatDateRange = (
    start: Date | string,
    end: Date | string | undefined
  ) => formatEventRange(start, end, i18n.language);

  const isEventEnded = () => {
    const endDate = new Date(event.endDate);
    const now = new Date();
    return endDate < now;
  };

  const getRegistrationStatus = () => {
    const now = new Date();
    
    if (!event.signup_period_json) {
      return now > new Date(event.startDate) ? "closed" : "open";
    }

    // If both dates are set in signup_period_json, use them directly
    if (event.signup_period_json.startDate && event.signup_period_json.endDate) {
      const signupStart = new Date(event.signup_period_json.startDate);
      const signupEnd = new Date(event.signup_period_json.endDate);

      if (now < signupStart) {
        return "not_started";
      } else if (now > signupEnd) {
        return "closed";
      }
      return "open";
    }

    // Fallback behavior for when only some dates are set
    const signupStart = event.signup_period_json.startDate
      ? new Date(event.signup_period_json.startDate)
      : new Date(0); // If not set, registration is open from the beginning
    const signupEnd = event.signup_period_json.endDate
      ? new Date(event.signup_period_json.endDate)
      : new Date(event.startDate); // If not set, registration closes at event start

    if (now < signupStart) {
      return "not_started";
    } else if (now > signupEnd) {
      return "closed";
    }
    return "open";
  };

  const registrationStatus = getRegistrationStatus();
  const isRegistrationOpen = registrationStatus === "open";

  const getRegistrationPeriodText = () => {
    if (!event.signup_period_json) {
      return t("eventCard.registrationOpenUntil", {
        date: formatEventDate(event.startDate, i18n.language),
      });
    }

    if (!event.signup_period_json.startDate && !event.signup_period_json.endDate) {
      return t("eventCard.registrationOpenUntilStart");
    }

    const start = event.signup_period_json.startDate
      ? formatEventDate(event.signup_period_json.startDate, i18n.language)
      : t("eventCard.now");
    const end = formatEventDate(
      event.signup_period_json.endDate || event.startDate,
      i18n.language
    );

    return t("eventCard.registrationPeriod", { start, end });
  };

  const ended = isEventEnded();
  const statusLabel =
    registrationStatus === "open"
      ? t("eventCard.registrationOpen")
      : registrationStatus === "not_started"
        ? t("eventCard.registrationNotStarted")
        : t("eventCard.registrationClosed");

  return (
    <>
      <article className="group relative flex flex-col rounded-[14px] bg-card text-card-foreground shadow-[0_1px_2px_hsl(var(--brand-ink)/0.06),0_10px_30px_-14px_hsl(var(--brand-ink)/0.28)] transition-[box-shadow,translate] duration-(--dur-base) ease-out hover:-translate-y-0.5 hover:shadow-[0_2px_4px_hsl(var(--brand-ink)/0.08),0_22px_44px_-18px_hsl(var(--brand-ink)/0.4)] dark:ring-1 dark:ring-white/5">
        <div className={`relative w-full overflow-hidden rounded-t-[14px] bg-brand ${event.imageUrl ? "h-48" : "h-28"}`}>
          {event.imageUrl ? (
            <>
              <Image
                src={event.imageUrl}
                alt=""
                fill
                className={`object-cover transition-[opacity,scale] duration-300 ease-out group-hover:scale-(--hover-zoom) ${
                  isImageLoading ? "opacity-0" : "opacity-100"
                } ${ended ? "grayscale-[60%]" : ""}`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={85}
                onLoad={() => setIsImageLoading(false)}
              />
              {isImageLoading && (
                <div className="absolute inset-0 animate-pulse bg-brand/80" />
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex items-start p-5 pl-28">
              <Stripes className="text-white/50" />
            </div>
          )}
          <Badge
            variant={
              registrationStatus === "open"
                ? "open"
                : registrationStatus === "not_started"
                  ? "soon"
                  : "closed"
            }
            className="absolute right-3 top-3 shadow-sm"
          >
            {statusLabel}
          </Badge>
        </div>

        <div className="relative flex flex-1 flex-col px-6 pb-6">
          <DateBlock date={event.startDate} className="-mt-10 mb-4" />
          <h3 className="text-2xl font-bold leading-tight">
            <button
              type="button"
              onClick={() => setIsDetailsOpen(true)}
              className="text-left after:absolute after:inset-0 after:rounded-[14px] after:content-[''] focus-visible:outline-none group-hover:text-brand focus-visible:after:outline focus-visible:after:outline-[3px] focus-visible:after:outline-offset-2 focus-visible:after:outline-marker dark:group-hover:text-marker"
            >
              {event.title}
            </button>
          </h3>

          <dl className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <dt className="sr-only">{t("eventCard.date")}</dt>
              <CalendarIcon aria-hidden className="h-4 w-4 shrink-0" />
              <dd>
                <time dateTime={new Date(event.startDate).toISOString()}>
                  {formatDateRange(event.startDate, event.endDate)}
                </time>
              </dd>
            </div>
            <div className="flex items-center gap-2">
              <dt className="sr-only">{t("eventCard.location")}</dt>
              <MapPinIcon aria-hidden className="h-4 w-4 shrink-0" />
              <dd>{event.location}</dd>
            </div>
          </dl>
          <p className="mt-1.5 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
            <Clock aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
            {getRegistrationPeriodText()}
          </p>

          <p className="mt-4 line-clamp-3 text-[15px] leading-relaxed">
            {event.description}
          </p>

          {!isRegistrationOpen && !ended && (
            <p className="mt-4 rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
              {registrationStatus === "not_started"
                ? t("eventCard.registrationNotStartedMessage")
                : t("eventCard.registrationEndedMessage")}
            </p>
          )}

          <div className="mt-auto pt-6">
            <Button
              className="relative z-10 w-full"
              onClick={() => setIsSignupOpen(true)}
              disabled={ended || !isRegistrationOpen}
              variant={isRegistrationOpen && !ended ? "default" : "secondary"}
            >
              {ended
                ? t("eventCard.eventEnded")
                : !isRegistrationOpen
                  ? statusLabel
                  : t("eventCard.signUp")}
            </Button>
          </div>
        </div>
      </article>

      <EventDetailsDialog
        event={event}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />

      {!isEventEnded() && isRegistrationOpen && (
        <EventSignupForm
          eventId={event.id}
          eventTitle={event.title}
          formFields={event.formSchema?.fields || []}
          terms={event.formSchema?.terms || []}
          isOpen={isSignupOpen}
          onClose={() => setIsSignupOpen(false)}
        />
      )}
    </>
  );
}

export default EventCard;
