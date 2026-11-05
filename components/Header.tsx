"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LanguageSelector } from "./LanguageSelector";
import { ThemeToggle } from "./ThemeToggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PrefetchLink } from "./PrefetchLink";
import { Stripes } from "./brand/Stripes";

const AuthSection = dynamic(() => import("@/components/AuthSection"), {
  ssr: false,
});
const AuthNavLinks = dynamic(() => import("@/components/AuthNavLinks"), {
  ssr: false,
});

export default function Header() {
  const pathname = usePathname();
  const { t } = useTranslation("header");

  const navLinks = [
    { href: "/", label: t("navigation.home") },
    { href: "/about", label: t("navigation.about") },
    { href: "/events", label: t("navigation.events") },
    { href: "/gallery", label: t("navigation.gallery") },
    { href: "/contact", label: t("navigation.contact") },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full bg-brand text-white shadow-[0_1px_0_hsl(0_0%_100%/0.08)]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <PrefetchLink
          href="/"
          className="flex h-full min-w-0 shrink items-center py-3.5 sm:py-3"
          aria-label="EuropeTalks"
        >
          <Image
            src="/images/etlogo.png"
            alt="EuropeTalks"
            width={768}
            height={182}
            className="h-full w-auto object-contain"
            quality={100}
            priority={true}
          />
        </PrefetchLink>

        {/* Desktop Navigation */}
        <nav className="hidden h-full items-stretch gap-1 lg:flex">
          {navLinks.map(({ href, label }) => (
            <PrefetchLink
              key={href}
              href={href}
              prefetchOnViewport
              aria-current={isActive(href) ? "page" : undefined}
              className={`relative flex items-center px-3 text-[15px] font-semibold tracking-wide transition-colors after:absolute after:inset-x-3 after:bottom-0 after:h-[3px] after:origin-left after:bg-marker after:transition-transform after:duration-(--dur-base) after:ease-out ${
                isActive(href)
                  ? "text-white after:scale-x-0"
                  : "text-white/75 after:scale-x-0 hover:text-white hover:after:scale-x-100"
              }`}
            >
              {label}
              {isActive(href) && (
                <span
                  aria-hidden
                  className="absolute inset-x-3 bottom-0 h-[3px] bg-marker"
                  style={{ viewTransitionName: "nav-indicator" }}
                />
              )}
            </PrefetchLink>
          ))}
          <div className="flex items-center gap-4 pl-3 text-[15px] font-semibold text-white/75">
            <AuthNavLinks />
          </div>
        </nav>

        <div className="flex items-center gap-1">
          <LanguageSelector />
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <div className="ml-2 hidden items-center sm:flex">
            <AuthSection />
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 text-white hover:bg-white/10 hover:text-white"
                aria-label={t("other.menu")}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col border-none bg-brand text-white [&>button]:text-white">
              <SheetHeader>
                <SheetTitle className="sr-only">
                  {t("other.menu")}
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-4 flex flex-col gap-1">
                {navLinks.map(({ href, label }) => (
                  <PrefetchLink
                    key={href}
                    href={href}
                    aria-current={isActive(href) ? "page" : undefined}
                    className={`display py-1.5 text-5xl leading-[0.92] transition-colors ${
                      isActive(href) ? "text-marker" : "text-white hover:text-marker"
                    }`}
                  >
                    {label}
                  </PrefetchLink>
                ))}
              </nav>
              <div className="mt-6 flex flex-col gap-3 border-t border-white/15 pt-6 text-lg font-semibold [&_a]:text-white">
                <AuthNavLinks mobile />
              </div>
              <div className="mt-6 flex items-center gap-3 sm:hidden">
                <ThemeToggle />
                <AuthSection />
              </div>
              <Stripes className="mt-auto w-20 text-white/40" />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
