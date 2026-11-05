"use client";

import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Stripes } from "./brand/Stripes";
import { useTranslation } from "react-i18next";

function Facebook({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function Instagram({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function Youtube({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

export default function Footer() {
  const { t } = useTranslation(["footer", "header", "home"]);
  const year = new Date().getFullYear();

  const nav = [
    { href: "/about", label: t("navigation.about", { ns: "header" }) },
    { href: "/events", label: t("navigation.events", { ns: "header" }) },
    { href: "/gallery", label: t("navigation.gallery", { ns: "header" }) },
    { href: "/contact", label: t("navigation.contact", { ns: "header" }) },
  ];

  const social = [
    {
      href: "https://www.instagram.com/europetalksofficial/",
      label: t("instagram"),
      Icon: Instagram,
    },
    {
      href: "https://www.facebook.com/europetalks",
      label: t("facebook"),
      Icon: Facebook,
    },
    {
      href: "https://www.youtube.com/channel/UCoRo0glOhBGz4qyKxj73STw",
      label: t("youtube"),
      Icon: Youtube,
    },
  ];

  return (
    <footer className="relative w-full overflow-hidden bg-brand-deep text-white">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8 md:pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Image
              src="/images/etlogo.png"
              alt="EuropeTalks"
              width={768}
              height={182}
              className="h-12 w-auto"
            />
            <p className="mt-6 max-w-sm text-base leading-relaxed text-brand-mist/85">
              {t("hero.subtitle", { ns: "home" })}
            </p>
            <a
              href="mailto:mail@europetalks.eu"
              className="mt-6 inline-flex items-center gap-2 text-lg font-semibold text-white underline decoration-marker decoration-2 underline-offset-[6px] transition-colors hover:text-marker"
            >
              <Mail className="h-5 w-5" aria-hidden />
              mail@europetalks.eu
            </a>
          </div>

          <nav className="md:col-span-3" aria-label="Footer">
            <ul className="flex flex-col gap-3">
              {nav.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="display text-3xl leading-[0.95] text-white transition-colors hover:text-marker"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex flex-col gap-3 md:col-span-4">
            {social.map(({ href, label, Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-base font-semibold text-white/85 transition-colors hover:text-white"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 transition-colors group-hover:border-marker group-hover:bg-marker group-hover:text-brand-ink">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/15 pt-6 text-sm text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Stripes className="w-8 gap-[3px] text-white/40 [&>span]:h-[2px]" />
            <span>© {year} EuropeTalks</span>
          </div>
          <div className="flex gap-6">
            <Link href="/legal-notice" className="transition-colors hover:text-white">
              {t("legalNotice")}
            </Link>
            <Link href="/privacy-policy" className="transition-colors hover:text-white">
              {t("privacyPolicy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
