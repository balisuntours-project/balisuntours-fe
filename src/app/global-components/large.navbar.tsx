import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ArrowRight, ShoppingCart, TicketCheck } from "lucide-react";
import Image from "next/image";
import { LoginButtonNavbar } from "./utility-components/login-button.navbar";
import Link from "next/link";

export function LargeNavbar({ forAdmin }: { forAdmin?: boolean }) {
  return (
    <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-full mx-auto px-4 py-4 md:px-6 lg:px-28 lg:py-4">
        <div className="flex justify-between items-center sm:py-5 lg:py-3">
          {/* Left - Company Icon */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/bst-logo-dark-green.png"
              alt="best-travell-agent-bali-sun-tours"
              width="135"
              height="58"
              className="w-[150px] h-[35px] md:w-[200px] md:h-[45px]"
            />
          </Link>

          {/* Right - Nav Links and Login Button */}
          <div className="flex md:flex md:space-x-8 items-center">
            {!forAdmin && (
              <NavigationMenu>
                <NavigationMenuList className="space-x-[-20px] md:space-x-0">
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      <span className="hidden md:block">Bookings</span>
                      <TicketCheck className="block md:hidden w-5 h-5 stroke-[1.5]" />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-3 md:p-6 w-[180px] max-w-[180px] md:max-w-max md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <div className="flex flex-col gap-2 md:hidden">
                        <Link
                            href="/customer/booking/airport-transfer/transaction"
                            className="flex items-center gap-2 text-xs md:text-base  cursor-pointer hover:text-blue-500"
                          >
                            <ArrowRight className="w-3 h-3" />
                            <span>Your Airport Transfer Booking</span>
                          </Link>
                          <Link
                            href="/customer/booking/activities/transaction"
                            className="flex items-center gap-2 text-xs md:text-base  cursor-pointer hover:text-blue-500"
                          >
                            <ArrowRight className="w-3 h-3" />
                            <span>Your Activities Booking</span>
                          </Link>
                          <Link
                            href="/customer/booking/activities/unconfirmed"
                            className="flex items-center gap-2 text-xs md:text-base cursor-pointer hover:text-blue-500"
                          >
                            <ArrowRight className="w-3 h-3" />
                            <span>Unconfirmed Activities Booking</span>
                          </Link>
                        </div>
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link
                              href="/"
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-3 md:p-6 no-underline outline-none focus:shadow-md"
                            >
                              <div className="mb-2 mt-2 md:mt-4 text-sm md:text-lg font-medium">
                                Before Book
                              </div>
                              <p className="text-xs md:text-sm leading-tight text-muted-foreground">
                                Check activity details, schedule, and policies
                                to ensure it fits your needs. Happy travelling!
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <div className="hidden md:block">
                        <Link
                            href="/customer/booking/airport-transfer/transaction"
                            className="flex items-center gap-2 text-sm md:text-base  cursor-pointer hover:text-blue-500"
                          >
                            <ArrowRight className="w-3 h-3" />
                            <span>Your Airport Transfer Booking</span>
                          </Link>
                          <Link
                            href="/customer/booking/activities/transaction"
                            className="flex items-center gap-2 text-sm md:text-base  cursor-pointer hover:text-blue-500"
                          >
                            <ArrowRight className="w-3 h-3" />
                            <span>Your Activities Booking</span>
                          </Link>
                          <Link
                            href="/customer/booking/activities/unconfirmed"
                            className="flex items-center gap-2 text-sm md:text-base cursor-pointer hover:text-blue-500"
                          >
                            <ArrowRight className="w-3 h-3" />
                            <span>Unconfirmed Activities Booking</span>
                          </Link>
                        </div>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* <NavigationMenuItem>
                 <NavigationMenuTrigger>
                 <span className="hidden md:block">Currency</span>
                 <BadgeDollarSign className="block md:hidden w-5 h-5 stroke-[1.5]" />
                 </NavigationMenuTrigger>
                 <NavigationMenuContent></NavigationMenuContent>
               </NavigationMenuItem> */}

                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="/customer/cart"
                      className={navigationMenuTriggerStyle()}
                    >
                      <ShoppingCart className="w-5 h-5 md:w-auto md:h-auto stroke-[1.5]" />
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            )}

            <LoginButtonNavbar forAdmin={forAdmin} />
          </div>
        </div>
      </div>
    </nav>
  );
}
