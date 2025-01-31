import type { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { FooterFooterSection } from "../footer-components/footer.footer";

export const metadata: Metadata = {
  title: "Bali Sun Tours - Rules",
  description: "Bali Sun Tours Rules Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/*  <Toaster /> */}
      <SidebarProvider>
        <AppSidebar />
        <main>
          {/*   <SidebarTrigger />
           */}
          {children}
         
        </main>
      </SidebarProvider>
      <FooterFooterSection useFixedStyle={true} />
    </>
  );
}
