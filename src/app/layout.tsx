import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
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
  title: "Nodera Studio | Independent Web Development Studio",
  description:
    "Nodera Studio builds custom websites, e-commerce experiences, ongoing improvements, and technical support for modern businesses.",
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    title: "Nodera Studio | Independent Web Development Studio",
    description:
      "Custom websites, e-commerce experiences, ongoing improvements, and technical support for modern businesses.",
    siteName: "Nodera Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nodera Studio | Independent Web Development Studio",
    description:
      "Custom websites, e-commerce experiences, ongoing improvements, and technical support for modern businesses.",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${display.variable}`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
