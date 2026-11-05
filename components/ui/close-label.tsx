"use client";

import { useTranslation } from "react-i18next";

/** Screen-reader label for dialog and sheet close buttons, in the active language. */
export function CloseLabel() {
  const { t } = useTranslation("gallery");
  return <span className="sr-only">{t("close", "Close")}</span>;
}
