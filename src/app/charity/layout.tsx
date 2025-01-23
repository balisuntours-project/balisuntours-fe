
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Bali Sun Tours - Charity",
    description: "Bali Sun Tours Charity Page",
  };

  
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
     {/*  <Toaster /> */}
      {children}
    </>
  );
}
