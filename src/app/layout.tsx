import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { poppins } from "@/lib/global.font";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Bali Tour Company : Explore Bali Tours and Activities",
  description:
    "Discover the best Bali Tours and Activities with Bali Sun Tours. Explore Ubud Bali and beyond with a trusted Bali tour company offering unforgettable experiences and expert-guided tours.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    url: "https://balisuntours.com",
    title: "Bali Tour Company : Explore Bali Tours and Activities",
    type: "website",
    description:
      "Discover the best Bali Tours and Activities with Bali Sun Tours. Explore Ubud Bali and beyond with a trusted Bali tour company offering unforgettable experiences and expert-guided tours.",
    images: {
      url: "https://balisuntours.com/about-us-banner.jpeg",
      width: 1200,
      height: 630,
      alt: "Bali Tour Company : Explore Bali Tours and Activities",
    },
  },
  alternates: {
    canonical: "https://balisuntours.com/",
  },
  keywords:
    "bali tour company, Bali Sun Tours, Ubud Bali, Bali Tours, bali tours and activities",
  other: {
    "google-site-verification": "RhW2VCDPnxsGj5WqApklKvcUWq3ZvzrHkOv8g4FNWC8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* GTM Script */}
        {/* <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-T95MTBKJ');
          `}
        </Script> */}

        {/* GA4 Script */}
        {/* <Script id="ga4-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6E6SEWT31Q');
          `}
        </Script> */}
      </head>
      <body className={cn(" font-sans antialiased", poppins.variable)}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T95MTBKJ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <div className="relative min-h-[100vh]">
          <Toaster />
          {children}
        </div>
      </body>

      <GoogleTagManager
        gtmId="GTM-T95MTBKJ"
        gtmScriptUrl={`https://www.googletagmanager.com/gtm.js`}
      />
      <GoogleAnalytics gaId="G-6E6SEWT31Q" />
    </html>
  );
}
