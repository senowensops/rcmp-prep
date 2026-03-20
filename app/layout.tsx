import type { Metadata } from "next";
import Script from "next/script";
import "@fontsource/barlow/400.css";
import "@fontsource/barlow/500.css";
import "@fontsource/barlow/600.css";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/barlow-condensed/800.css";
import "./globals.css";

// GA4 Measurement ID
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-C60PNKEMZX";

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
      <head>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                page_path: window.location.pathname,
              });
            `}</Script>
          </>
        )}
      </head>
      <body>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-[var(--red)] focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "RCMP Prep",
              url: "https://rcmpprep.ca",
              description: "Unofficial practice tests for the RCMP Online Assessment. Covers all 6 sections with timed practice and answer explanations.",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://rcmpprep.ca/blog?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
