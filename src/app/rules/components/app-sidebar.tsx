"use client"

import { Calendar, Home, Inbox, Ruler, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LargeNavbar } from "@/app/global-components/large.navbar";
import { FooterFooterSection } from "@/app/footer-components/footer.footer";
import { usePathname, useRouter } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Term and Conditions",
    url: "/rules/term-conditions",
    icon: Ruler,
  },
];

export function AppSidebar() {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <>
      <LargeNavbar />
      <Sidebar className="lg:ms-[5%] mt-60 md:mt-24">
        <SidebarContent className="bg-white">
          <div className="lg:ms-auto">
            <SidebarGroup>
              {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => {
                    // Cek apakah URL saat ini sesuai dengan URL item
                    const isActive = pathName === item.url;

                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <a
                            href={item.url}
                            className={`flex items-center space-x-2 p-2 rounded-md transition-all ${
                              isActive
                                ? "underline text-[#008000]"
                                : "text-gray-800 hover:text-blue-500"
                            }`}
                          >
                            <item.icon />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </div>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
