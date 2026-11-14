"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import { PrefetchLink } from "./PrefetchLink";

export default function AuthNavLinks({ mobile = false }: { mobile?: boolean }) {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { t } = useTranslation("header");
  const pathname = usePathname();

  if (!isSignedIn) return null;

  const isAdmin = user?.publicMetadata?.role === "admin";
  const isMember = user?.publicMetadata?.role === "member";

  const links = [
    ...(isAdmin ? [{ href: "/admin", label: t("navigation.admin") }] : []),
    ...(isMember || isAdmin
      ? [{ href: "https://cloud.europetalks.eu", label: t("navigation.cloud") }]
      : []),
  ];

  if (!links.length) return null;

  const baseClass = mobile
    ? "text-white hover:text-marker transition-colors"
    : "text-white/75 hover:text-white transition-colors";

  return (
    <>
      {links.map(({ href, label }) =>
        href.startsWith("http") ? (
          <a
            key={href}
            href={href}
            className={baseClass}
            target="_blank"
            rel="noopener noreferrer"
          >
            {label}
          </a>
        ) : (
          <PrefetchLink
            key={href}
            href={href}
            prefetchOnViewport={!mobile}
            className={`${baseClass} ${pathname === href ? "!text-marker" : ""}`}
          >
            {label}
          </PrefetchLink>
        )
      )}
    </>
  );
}
