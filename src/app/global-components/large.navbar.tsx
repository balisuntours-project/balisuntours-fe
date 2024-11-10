import { AuthButton } from "@/components/custom-ui/auth.button";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { BadgeDollarSign, CarTaxiFront, CircleDollarSign, CircleUserRound, Currency, LogIn, LucideCurrency, ShoppingBagIcon, ShoppingCart, TicketCheck, Trees } from "lucide-react";
import Image from "next/image";
import { LoginButtonNavbar } from "./utility-components/login-button.navbar";

export function LargeNavbar() {
  return (
    <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-full mx-auto px-4 py-4 md:px-6 lg:px-28 lg:py-4">
        <div className="flex justify-between items-center sm:py-5 lg:py-3">
          {/* Left - Company Icon */}
          <div className="flex-shrink-0">
            <Image
              src="/bst-logo.png"
              alt="logo be hati"
              width="135"
              height="58"
              objectFit="cover"
             className="w-[100px] h-[35px] md:w-[135px] md:h-[45px]"
            />
          </div>

          {/* Right - Nav Links and Login Button */}
          <div className="flex md:flex md:space-x-8 items-center">
            <NavigationMenu>
              <NavigationMenuList className="space-x-[-20px] md:space-x-0">
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <span className="hidden md:block">Bookings</span>
                    <TicketCheck className="block md:hidden w-5 h-5 stroke-[1.5]" />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6  md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              Before Book
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Beautifully designed components that you can copy
                              and paste into your apps. Accessible.
                              Customizable. Open Source.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <span>
                        Re-usable components built using Radix UI and Tailwind
                        CSS.
                      </span>
                      <span>
                        How to install dependencies and structure your app.
                      </span>
                      <span>Styles for headings, paragraphs, lists...etc</span>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                  <span className="hidden md:block">Currency</span>
                  <BadgeDollarSign className="block md:hidden w-5 h-5 stroke-[1.5]" />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent></NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <ShoppingCart className="w-5 h-5 md:w-auto md:h-auto stroke-[1.5]" />
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

           <LoginButtonNavbar />
          </div>
        </div>
      </div>
    </nav>
  );
}
