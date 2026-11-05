import { Watercolor, type WatercolorColor } from "@/components/brand/Watercolor";
import { cn } from "@/lib/utils";

/**
 * Use splashes whose paint stays clear of the image edge, or the stroke shows a cut line:
 * blau 1/7/8, rot 1/5/6, gelb 1/6/8, grün 4-7.
 */
interface SplashHeadingProps {
  as?: "h2" | "h3";
  color: WatercolorColor;
  variant?: number;
  className?: string;
  children: React.ReactNode;
}

/** Display heading with a watercolour stroke painted behind the words. */
export function SplashHeading({
  as: Tag = "h2",
  color,
  variant = 1,
  className,
  children,
}: SplashHeadingProps) {
  return (
    <Tag className={cn("display relative", className)}>
      <span className="relative inline-block">
        <Watercolor
          color={color}
          variant={variant}
          bloom="scroll"
          className={cn(
            "-left-[0.5em] -right-[0.9em] -top-[0.9em] -bottom-[0.5em] opacity-60 dark:opacity-25",
            // Yellow screened onto navy turns olive; the stroke only works on paper.
            color === "gelb" && "dark:hidden"
          )}
        />
        <span className="relative">{children}</span>
      </span>
    </Tag>
  );
}
