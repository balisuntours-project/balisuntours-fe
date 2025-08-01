
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Bali Sun Tours - Help Center",
    description: "Bali Sun Tours Help Center Page",
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
