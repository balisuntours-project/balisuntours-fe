import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Bali Sun Tours - Internal SignIn",
    description: "Bali Sun Tours Internal SignIn Page",
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
