import type React from "react";
import type { Metadata } from "next";
import { League_Gothic, Lato } from "next/font/google";
import { LayoutWrapper } from "@/components/layout-wrapper";
import { WebsiteJsonLd } from "@/components/json-ld";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";

const leagueGothic = League_Gothic({
  subsets: ["latin"],
  variable: "--font-league-gothic",
  display: "swap",
});
const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Major League Numbers",
    template: "%s | Major League Numbers",
  },
  description:
    "Sports stats and music encyclopedias — MLB, NHL, GBV, AmRep, and Revelation Records.",
  metadataBase: new URL("https://majorleaguenumbers.com"),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (theme === 'dark' || (!theme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
        <WebsiteJsonLd />
      </head>
      <body
        className={`${lato.className} antialiased min-h-screen flex flex-col ${leagueGothic.variable} ${lato.variable}`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
        <Toaster />
      </body>
    </html>
  );
}
