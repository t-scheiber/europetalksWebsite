"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageHero } from "@/components/brand/PageHero";
import { Stripes } from "@/components/brand/Stripes";
import { type WatercolorColor } from "@/components/brand/Watercolor";
import { SplashHeading } from "@/components/brand/SplashHeading";
import { QuoteDeck } from "@/components/QuoteDeck";
import { Button } from "@/components/ui/button";

function AboutSection({
  id,
  title,
  color,
  variant,
  children,
}: {
  id: string;
  title: string;
  color: WatercolorColor;
  variant: number;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="mx-auto grid max-w-7xl gap-8 border-t border-border px-5 py-16 first:border-t-0 sm:px-8 md:py-24 lg:grid-cols-12 lg:gap-10"
    >
      <div className="relative lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <SplashHeading
            color={color}
            variant={variant}
            className="text-[clamp(2.5rem,4.5vw,3.75rem)] text-brand dark:text-white"
          >
            {title}
          </SplashHeading>
        </div>
      </div>
      <div className="measure space-y-6 text-lg leading-[1.7] lg:col-span-7 lg:col-start-6 [&>p:first-child]:text-xl [&>p:first-child]:leading-relaxed md:[&>p:first-child]:text-[1.4rem]">
        {children}
      </div>
    </section>
  );
}

export default function AboutPage() {
  const { t } = useTranslation(["about", "home"]);

  return (
    <>
      <PageHero title={t("title")} lede={t("whoWeAre.intro")} />

      <AboutSection id="who-we-are" title={t("whoWeAre.title")} color="gelb" variant={1}>
        <p>{t("whoWeAre.mission")}</p>
      </AboutSection>

      <AboutSection id="leadership" title={t("leadership.title")} color="rot" variant={5}>
        <p className="text-muted-foreground">{t("leadership.intro")}</p>
        <figure className="flex flex-col gap-6 sm:flex-row sm:items-end">
          <div className="relative aspect-[4/5] w-56 shrink-0 -rotate-2 bg-white p-2.5 pb-9 shadow-[0_2px_4px_hsl(var(--brand-ink)/0.08),0_18px_40px_-16px_hsl(var(--brand-ink)/0.45)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:rotate-0">
            <div className="relative h-full w-full overflow-hidden bg-muted">
            <Image
              src="/images/vivien-costanzo.jpeg"
              alt={t("leadership.name")}
              fill
              sizes="224px"
              className="object-cover"
            />
            </div>
          </div>
          <figcaption>
            <p className="display text-5xl leading-[0.92] text-brand-ink dark:text-white">
              {t("leadership.name")}
            </p>
            <p className="mt-3 text-lg leading-snug text-muted-foreground">
              {t("leadership.role.title")}
              <br />
              {t("leadership.role.party")}
            </p>
          </figcaption>
        </figure>
      </AboutSection>

      <AboutSection id="background" title={t("background.title")} color="blau" variant={7}>
        <p>{t("background.conference")}</p>
        <p>{t("background.activists")}</p>
        <p>{t("background.perspective")}</p>
        <p>{t("background.countries")}</p>
      </AboutSection>

      <AboutSection id="how-we-work" title={t("howWeWork.title")} color="grün" variant={4}>
        <p>{t("howWeWork.intro")}</p>
        <p>{t("howWeWork.method")}</p>
        <p>{t("howWeWork.workshops")}</p>
        <p>{t("howWeWork.papers")}</p>
        <p className="font-semibold">{t("howWeWork.support")}</p>
        <div className="pt-2">
          <Button variant="default" size="lg" asChild>
            <Link href="/contact">
              {t("cta.buttons.contact", { ns: "home" })}
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
      </AboutSection>

      <section className="relative isolate overflow-hidden bg-brand text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Stripes className="mb-6 w-14 text-white/70" />
            <h2 className="display text-[clamp(3rem,6vw,5rem)]">{t("getToKnowUs.title")}</h2>
          </div>
          <div className="mx-auto w-full max-w-[min(26rem,82vw)] lg:col-span-6 lg:col-start-7">
            <QuoteDeck />
          </div>
        </div>
      </section>
    </>
  );
}
