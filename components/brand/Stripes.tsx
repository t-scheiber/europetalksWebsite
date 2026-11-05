import { cn } from "@/lib/utils";

/**
 * The three horizontal bars from the top of the EuropeTalks logo,
 * used as the structural rule between brand surfaces.
 */
export function Stripes({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("flex w-16 flex-col gap-[5px]", className)}>
      <span className="h-[3px] w-full bg-current" />
      <span className="h-[3px] w-full bg-current" />
      <span className="h-[3px] w-full bg-current" />
    </div>
  );
}
