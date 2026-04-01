import type { ReactNode } from "react";
import { Space_Grotesk, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { AppProviders } from "./providers";
import { CivicHeader } from "@/components/CivicHeader";
import { APP_NAME, BASE_APP_ID, SITE_URL, TALENT_VERIFICATION } from "@/lib/app-config";

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="base:app_id" content={BASE_APP_ID} />
        <meta name="talentapp:project_verification" content={TALENT_VERIFICATION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="application-name" content={APP_NAME} />
        <meta name="description" content="Open public voting on Base with one wallet one vote and live public results." />
        <meta name="keywords" content="Base, poll, vote, public voting, civic signal, mini app" />
        <meta property="og:title" content="base-open-poll" />
        <meta property="og:description" content="Cast one public vote per wallet and watch the live winner board on Base." />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="base-open-poll" />
        <meta name="twitter:description" content="Cast one public vote per wallet and watch the live winner board on Base." />
        <link rel="canonical" href={SITE_URL} />
        <title>base-open-poll</title>
      </head>
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>
        <AppProviders>
          <div className="app-shell">
            <CivicHeader />
            {children}
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
