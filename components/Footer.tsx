"use client";

import { Mail } from "lucide-react";
import Link from "next/link";
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
  const { t } = useTranslation("footer");
  return (
    <footer className="border-t w-full h-64 bg-gray-900 flex justify-center items-center">
      <div className="container py-6">
        <div className="flex flex-col items-center gap-4">
          {/* Social Media Links */}
          <div className="flex space-x-6">
            <a
              href="https://www.facebook.com/europetalks"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 transition-colors"
            >
              <Facebook className="h-5 w-5" />
              <span className="sr-only">{t("facebook")}</span>
            </a>
            <a
              href="https://www.youtube.com/channel/UCoRo0glOhBGz4qyKxj73STw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 transition-colors"
            >
              <Youtube className="h-5 w-5" />
              <span className="sr-only">{t("youtube")}</span>
            </a>
            <a
              href="https://www.instagram.com/europetalksofficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 transition-colors"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">{t("instagram")}</span>
            </a>
            <a
              href="mailto:mail@europetalks.eu"
              className="text-accent hover:text-accent/80 transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">{t("email")}</span>
            </a>
          </div>

          {/* Legal Links */}
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <Link
              href="/legal-notice"
              className="hover:text-foreground transition-colors"
            >
              {t("legalNotice")}
            </Link>
            <span>•</span>
            <Link
              href="/privacy-policy"
              className="hover:text-foreground transition-colors"
            >
              {t("privacyPolicy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
