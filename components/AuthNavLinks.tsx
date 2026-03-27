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
  const memberLanguages = user?.publicMetadata?.languages as string[] | undefined;

  const links = [
    ...(isAdmin ? [{ href: "/admin", label: t("navigation.admin") }] : []),
    ...(isMember && memberLanguages?.length
      ? [{ href: "/member/translations", label: t("navigation.translations") }]
      : []),
    ...(isMember || isAdmin
      ? [{ href: "https://cloud.europetalks.eu", label: t("navigation.cloud") }]
      : []),
  ];

  if (!links.length) return null;

  const baseClass = mobile
    ? "text-foreground hover:text-accent transition-colors"
    : "text-white hover:text-accent transition-colors";

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
            className={`${baseClass} ${pathname === href ? "text-accent" : ""}`}
          >
            {label}
          </PrefetchLink>
        )
      )}
    </>
  );
}
