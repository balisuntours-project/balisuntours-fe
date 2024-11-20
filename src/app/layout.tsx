import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { poppins } from "@/lib/global.font";
import { cn } from "@/lib/utils";


export const metadata: Metadata = {
  title: "Bali Sun Tours",
  description: "Bali Sun Tours Landing page",
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
        {children}
      </body>
    </html>
  );
}
