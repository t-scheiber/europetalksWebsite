import Image from "next/image";
import { cn } from "@/lib/utils";

export type WatercolorColor = "blau" | "rot" | "gelb" | "grün";

interface WatercolorProps {
  color: WatercolorColor;
  /** Which of the eight hand-painted splashes to use (1-8). Fixed so SSR and client match. */
  variant?: number;
  className?: string;
  priority?: boolean;
  /** "fill" stretches the splash to the box, for strokes behind headings. */
  fit?: "contain" | "fill";
}

/**
 * A hand-painted watercolour splash placed behind content.
 * Position and size come from `className`; the wrapper is decorative.
 */
export function Watercolor({
  color,
  variant = 1,
  className,
  priority = false,
  fit = "contain",
}: WatercolorProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute select-none mix-blend-multiply dark:opacity-40 dark:mix-blend-screen",
        className
      )}
    >
      <Image
        src={`/images/aquarelle/${color}/${variant}.webp`}
        alt=""
        fill
        priority={priority}
        sizes="(max-width: 768px) 90vw, 50vw"
        quality={60}
        className={fit === "fill" ? "object-fill" : "object-contain"}
      />
    </div>
  );
}
