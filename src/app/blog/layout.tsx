
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Bali Sun Tours - Blog",
    description: "Bali Sun Tours Blog Page",
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
