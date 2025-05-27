import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bali Sun Tours - Maintenance",
  description: "Bali Sun Tours Maintenance Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
