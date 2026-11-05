import { Stripes } from "@/components/brand/Stripes";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  lede?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

/** Blue page head that continues the header field, used on inner pages. */
export function PageHero({
  title,
  lede,
  actions,
  className,
  children,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-brand text-white",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-10 sm:px-8 md:pb-16 md:pt-14">
        <Stripes className="mb-6 w-14 text-white/70" />
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <h1 className="display text-[clamp(3rem,7vw,5.5rem)]">{title}</h1>
            {lede && (
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-mist md:text-xl">
                {lede}
              </p>
            )}
          </div>
          {actions && <div className="flex shrink-0 gap-3">{actions}</div>}
        </div>
        {children}
      </div>
    </section>
  );
}
