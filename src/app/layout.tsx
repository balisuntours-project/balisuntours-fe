import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { poppins } from "@/lib/global.font";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Bali Tour Company : Explore Bali Tours and Activities",
  description: "Discover the best Bali Tours and Activities with Bali Sun Tours. Explore Ubud Bali and beyond with a trusted Bali tour company offering unforgettable experiences and expert-guided tours.",
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    url: "https://balisuntours.com/",
    title: "Bali Tour Company : Explore Bali Tours and Activities",
    type: "website",
    description: "Discover the best Bali Tours and Activities with Bali Sun Tours. Explore Ubud Bali and beyond with a trusted Bali tour company offering unforgettable experiences and expert-guided tours.",
    images:  {
      url: "https://balisuntours.com/about-us-banner.jpeg",
      width: 1200,
      height: 630,
      alt: "Bali Tour Company : Explore Bali Tours and Activities",
    },
  },
  alternates: {
    canonical: "https://balisuntours.com/"
  },
  keywords: "bali tour company, Bali Sun Tours, Ubud Bali, Bali Tours, bali tours and activities"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
       className={cn(" font-sans antialiased", poppins.variable)}
      >
       <div className="relative min-h-[100vh]">
       <Toaster />
       {children}
       </div>
      </body>
      <GoogleTagManager gtmId="GTM-NLQFDTB4" gtmScriptUrl={`https://www.googletagmanager.com/gtm.js`} />
    </html>
  );
}
