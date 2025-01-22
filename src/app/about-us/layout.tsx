
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Bali Sun Tours - About Us",
    description: "Bali Sun Tours About Us Page",
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
