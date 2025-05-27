import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Bali Sun Tours - Customer Free Vouchers",
    description: "Bali Sun Tours Free Vouchers Page",
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
