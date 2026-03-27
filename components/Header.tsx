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

  return (
    <header className="sticky top-0 z-50 w-full bg-blue-900">
      <div className="container flex h-14 items-center justify-between max-w-6xl mx-auto px-4">
        <PrefetchLink href="/" className="mr-4 flex items-center h-full">
          <Image
            src="/images/etlogo.png"
            alt="Logo"
            width={768}
            height={182}
            className="h-full w-auto object-contain"
            quality={100}
            priority={true}
          />
        </PrefetchLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map(({ href, label }) =>
            href.startsWith("http") ? (
              <a
                key={href}
                href={href}
                className="text-white hover:text-accent transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {label}
              </a>
            ) : (
              <PrefetchLink
                key={href}
                href={href}
                prefetchOnViewport
                className={`text-white hover:text-accent transition-colors ${
                  pathname === href ? "text-accent" : ""
                }`}
              >
                {label}
              </PrefetchLink>
            )
          )}
          <AuthNavLinks />
        </nav>

        <div className="flex items-center space-x-4">
          <LanguageSelector />
          <ThemeToggle />
          <AuthSection />

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>{t("other.menu")}</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-6">
                {navLinks.map(({ href, label }) =>
                  href.startsWith("http") ? (
                    <a
                      key={href}
                      href={href}
                      className="text-foreground hover:text-accent transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {label}
                    </a>
                  ) : (
                    <PrefetchLink
                      key={href}
                      href={href}
                      className={`text-foreground hover:text-accent transition-colors ${
                        pathname === href ? "text-accent" : ""
                      }`}
                    >
                      {label}
                    </PrefetchLink>
                  )
                )}
                <AuthNavLinks mobile />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
