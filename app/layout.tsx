import type { Metadata } from "next";
import "@fontsource/barlow/400.css";
import "@fontsource/barlow/500.css";
import "@fontsource/barlow/600.css";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/barlow-condensed/800.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "RCMP Prep — Practice Tests for the RCMP Online Assessment",
    template: "%s | RCMP Prep",
  },
  description: "The most realistic practice tests for the RCMP Online Assessment. 6 sections, timed, with full answer explanations. Try free — no account needed.",
  metadataBase: new URL("https://rcmpprep.ca"),
  openGraph: {
    type: "website",
    siteName: "RCMP Prep",
    title: "RCMP Prep — Practice Tests for the RCMP Online Assessment",
    description: "The most realistic practice tests for the RCMP Online Assessment. 6 sections, timed, with full answer explanations. Try free — no account needed.",
    url: "https://rcmpprep.ca",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "RCMP Prep — Practice for the RCMP Online Assessment" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RCMP Prep — Practice Tests for the RCMP Online Assessment",
    description: "The most realistic practice tests for the RCMP Online Assessment. Try free.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://rcmpprep.ca",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
