"use client";

import { PageHero } from "@/components/brand/PageHero";
import { SplashHeading } from "@/components/brand/SplashHeading";
import { ArrowUpRight, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const { t } = useTranslation("contact");
  
  const contactFormSchema = z.object({
    name: z.string().min(1, t("form.errors.nameRequired")),
    email: z.string().email(t("form.errors.emailInvalid")),
    subject: z.string().min(1, t("form.errors.subjectRequired")),
    message: z.string().min(10, t("form.errors.messageMinLength")),
  });

  type ContactFormData = z.infer<typeof contactFormSchema>;
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast({
        title: t("success.title"),
        description: t("success.messageSent"),
      });

      form.reset();
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: t("error.title"),
        description: t("error.messageFailed"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHero title={t("title")} lede={t("description")} />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 md:py-20 lg:grid-cols-12 lg:gap-10">
        <aside className="relative lg:col-span-4">
          <SplashHeading color="gelb" variant={8} className="text-4xl leading-[0.92] text-brand dark:text-white">
            {t("info.title")}
          </SplashHeading>
          <p className="relative mt-6 text-muted-foreground">{t("info.email")}</p>
          <a
            href="mailto:mail@europetalks.eu"
            className="relative mt-1 inline-flex items-center gap-2 text-xl font-bold text-brand underline decoration-marker decoration-[3px] underline-offset-[6px] dark:text-white"
          >
            <Mail aria-hidden className="h-5 w-5" />
            mail@europetalks.eu
          </a>
          <p className="relative mt-8 text-muted-foreground">{t("info.social")}</p>
          <ul className="relative mt-2 flex flex-col gap-2 text-lg font-semibold">
            {[
              ["Instagram", "https://www.instagram.com/europetalksofficial/"],
              ["Facebook", "https://www.facebook.com/europetalks"],
              ["YouTube", "https://www.youtube.com/channel/UCoRo0glOhBGz4qyKxj73STw"],
            ].map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 hover:text-brand dark:hover:text-marker"
                >
                  {label}
                  <ArrowUpRight
                    aria-hidden
                    className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <div className="rounded-[14px] bg-card p-6 shadow-[0_1px_2px_hsl(var(--brand-ink)/0.06),0_16px_40px_-20px_hsl(var(--brand-ink)/0.35)] sm:p-10 lg:col-span-7 lg:col-start-6 dark:ring-1 dark:ring-white/5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.name")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.email")}</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            </div>

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.subject")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.message")}</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={6} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting ? t("sending") : t("form.submit")}
            </Button>
          </form>
        </Form>
        </div>
      </div>
    </>
  );
}
