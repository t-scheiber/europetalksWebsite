import type { WatercolorColor } from "@/components/brand/Watercolor";

/**
 * Colour-code event series with the brand watercolours:
 * Beer and Roses is red, conferences and congresses blue, trips green.
 */
export function seriesColor(name: string): WatercolorColor {
  const n = name.toLowerCase();
  if (n.includes("beer") || n.includes("roses")) return "rot";
  if (n.includes("conference") || n.includes("congress")) return "blau";
  if (n.includes("goes to") || n.includes("visits")) return "grün";
  return "gelb";
}

export const seriesDot: Record<WatercolorColor, string> = {
  rot: "bg-[hsl(0_68%_52%)]",
  blau: "bg-[hsl(214_80%_52%)]",
  grün: "bg-[hsl(150_50%_40%)]",
  gelb: "bg-marker",
};
