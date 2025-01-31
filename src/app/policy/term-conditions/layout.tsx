
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Bali Sun Tours - Term Conditions",
    description: "Bali Sun Tours Term Conditions Page",
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
