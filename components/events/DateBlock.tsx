"use client";

import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface DateBlockProps {
  date: Date | string;
  className?: string;
}

/** Calendar-leaf date: big day number, localised short month and year. */
export function DateBlock({ date, className }: DateBlockProps) {
  const { i18n } = useTranslation();
  const d = new Date(date);
  const locale = i18n.language || "en";
  const month = new Intl.DateTimeFormat(locale, { month: "short" })
    .format(d)
    .replace(".", "");
  const year = d.getFullYear();

  return (
    <div
      className={cn(
        "flex w-[4.5rem] shrink-0 flex-col items-center overflow-hidden rounded-[10px] bg-card text-center text-card-foreground shadow-[0_6px_20px_-8px_hsl(var(--brand-ink)/0.45)] dark:ring-1 dark:ring-white/15",
        className
      )}
    >
      <span className="w-full bg-brand py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
        {month}
      </span>
      <span className="display pt-1.5 text-[2.4rem] leading-none tabular-nums">
        {d.getDate()}
      </span>
      <span className="pb-1.5 text-[11px] font-semibold tabular-nums text-muted-foreground">
        {year}
      </span>
    </div>
  );
}
