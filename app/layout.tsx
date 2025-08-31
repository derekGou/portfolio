import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Mono, Open_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";
import Persist from "./persist";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Derek Gou",
  description: "My personal portfolio",
};

export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ibmPlexMono.variable}, ${openSans.variable} antialiased`}
      >
        <Persist>
          {children}
        </Persist>
      </body>
    </html>
  );
}
