
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Bali Airport Transfer | Private & Reliable Pickup Service",
    description: "Book your Bali airport transfer for a hassle-free arrival or departure. Private car with driver, fixed rates, and 24/7 service from Ngurah Rai Airport to all destinations.",
    keywords: "bali airport transfer, airport pickup bali, bali airport shuttle, private transfer bali, ngurah rai airport transfer, bali airport to hotel, bali transport service, Bali Sun Tours",
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      url: "https://balisuntours.com/customer/airport-transfer",
      title: "Bali Airport Transfer | Private & Reliable Pickup Service",
      type: "website",
      description:
        "Book your Bali airport transfer for a hassle-free arrival or departure. Private car with driver, fixed rates, and 24/7 service from Ngurah Rai Airport to all destinations.",
      images: {
        url: "https://balisuntours.com/airport-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Bali Airport Transfer | Private & Reliable Pickup Service",
      },
    },
    alternates: {
      canonical: "https://balisuntours.com/customer/airport-transfer",
    },
  };

  
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
}
