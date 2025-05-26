import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Admin Page - Add Package Free Voucher",
    description: "Admin Page Add Package Free Voucher",
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
