import type { Metadata } from "next";
import { Archivo, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stereo 1 Production | Sound, Lighting & Staging in Kampala",
  description:
    "Professional sound systems, stage lighting, staging and live stream audio for concerts, weddings, conferences and corporate events across Kampala and beyond. One team, one quote, one point of contact.",
  keywords: [
    "sound system Kampala",
    "event production Uganda",
    "stage lighting",
    "PA system hire",
    "live stream audio",
    "Stereo 1 Production",
  ],
  authors: [{ name: "Stereo 1 Production" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Stereo 1 Production | Make your event sound unforgettable",
    description:
      "Professional sound, lighting, staging and live stream audio for events across Kampala and beyond.",
    siteName: "Stereo 1 Production",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${archivo.variable} ${inter.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
