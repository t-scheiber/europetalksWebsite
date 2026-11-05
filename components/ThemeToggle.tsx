"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useTranslation("components");
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="relative text-white hover:bg-white/10 hover:text-white"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 opacity-100 transition-[rotate,scale,opacity] duration-(--dur-base) ease-out motion-reduce:transition-opacity dark:-rotate-90 dark:scale-50 dark:opacity-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-50 opacity-0 transition-[rotate,scale,opacity] duration-(--dur-base) ease-out motion-reduce:transition-opacity dark:rotate-0 dark:scale-100 dark:opacity-100" />
      <span className="sr-only">{t("theme.toggleTheme")}</span>
    </Button>
  );
}
