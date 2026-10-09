import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://noderastudio.com"),
  applicationName: "Nodera Studio",
  title: "Nodera Studio | Web development studio",
  description:
    "Nodera Studio izrađuje custom web sajtove, e-commerce iskustva i digitalne proizvode za savremene biznise.",
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Nodera Studio | Web development studio",
    description:
      "Custom web sajtovi, e-commerce iskustva i tehnička podrška za savremene biznise.",
    siteName: "Nodera Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nodera Studio | Web development studio",
    description:
      "Custom web sajtovi, e-commerce iskustva i tehnička podrška za savremene biznise.",
  },
};

export const viewport: Viewport = {
  themeColor: "#090907",
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${display.variable}`}
        suppressHydrationWarning
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
