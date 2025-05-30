import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bali Sun Tours - Maintenance",
  description: "We’re currently performing scheduled maintenance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
