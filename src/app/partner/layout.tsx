
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Bali Sun Tours - Partner Inquiry",
    description: "Bali Sun Tours Partner Inquiry Page",
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
