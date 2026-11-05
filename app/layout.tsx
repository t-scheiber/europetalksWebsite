import "@/app/globals.css";
import ClerkThemeProvider from "@/components/ClerkThemeProvider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { I18nextProvider } from "@/components/i18n-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Metadata } from "next";
import { Sofia_Sans, Sofia_Sans_Extra_Condensed } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";


const sofia = Sofia_Sans({
  subsets: ["latin", "latin-ext", "greek", "cyrillic", "cyrillic-ext"],
  variable: "--font-sofia",
  display: "swap",
});

const sofiaDisplay = Sofia_Sans_Extra_Condensed({
  subsets: ["latin", "latin-ext", "greek", "cyrillic", "cyrillic-ext"],
  weight: ["700", "800", "900"],
  variable: "--font-sofia-xc",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EuropeTalks",
  description:
    "Join our community of Europeans sharing ideas, culture, and creating connections across borders.",
  icons: {
    icon: [
      {
        url: "/images/favicon.ico",
        sizes: "any",
      },
      {
        url: "/images/icon.png",
        type: "image/png",
        sizes: "32x32",
      },
    ],
    apple: {
      url: "/images/apple-touch-icon.png",
      sizes: "180x180",
    },
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sofia.variable} ${sofiaDisplay.variable}`}
    >
      <head>
        {/* Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://clerk.com" />
        <link rel="preconnect" href="https://api.clerk.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://img.clerk.com" />
        <link rel="dns-prefetch" href="https://clerk.com" />
        <link rel="dns-prefetch" href="https://api.clerk.com" />
        
      </head>
      <body className="font-sans">
        <ThemeProvider>
          <ClerkThemeProvider>
            <I18nextProvider>
              <Header />
              <main id="main" className="min-h-[60vh]">{children}</main>
              <Footer />
              <Toaster />
              <SonnerToaster />
            </I18nextProvider>
          </ClerkThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
