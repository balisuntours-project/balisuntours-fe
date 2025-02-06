import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "@/lib/global.font";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

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
      <body className={cn(" font-sans antialiased", poppins.variable)}>
        <div className="relative min-h-[100vh]">
          <Toaster />
          {children}
        </div>
      </body>
    </html>
  );
}
