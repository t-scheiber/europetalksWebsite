/**
 * Locale-aware event dates. date-fns `format` without a locale always prints English,
 * so event cards and dialogs format through Intl with the active i18n language.
 */
export function formatEventDate(
  value: string | Date,
  language: string | undefined,
  withTime = true
) {
  return new Intl.DateTimeFormat(language || "en", {
    dateStyle: "medium",
    ...(withTime ? { timeStyle: "short" } : {}),
  }).format(new Date(value));
}

/** One day: date and time. Several days: start and end dates only. */
export function formatEventRange(
  start: string | Date,
  end: string | Date | undefined,
  language: string | undefined
) {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : undefined;
  if (!endDate || startDate.toDateString() === endDate.toDateString()) {
    return formatEventDate(startDate, language);
  }
  return new Intl.DateTimeFormat(language || "en", { dateStyle: "medium" }).formatRange(
    startDate,
    endDate
  );
}
