import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Goal, HandHelping, Handshake } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function FooterNavbarSection() {
  return (
    <>
      <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
        <div className="max-w-full mx-auto px-4 py-4 md:px-6 lg:px-28 lg:py-0">
          <div className="flex justify-between items-center sm:py-5 lg:py-3">
            {/* Left - Company Icon */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/bst-logo-dark-green.png"
                alt="best-travell-agent-bali-sun-tours"
                width="135"
                height="58"
                objectFit="cover"
                className="w-[150px] h-[35px] md:w-[200px] md:h-[45px]"
              />
            </Link>

            {/* Right - Nav Links and Login Button */}
            <div className="flex md:flex md:space-x-8 items-center">
              {
                <NavigationMenu>
                  <NavigationMenuList className="space-x-[-15px] md:space-x-1  lg:space-x-5">
                    <NavigationMenuItem>
                      <div className={navigationMenuTriggerStyle()}>
                        <Link href="/about-us" passHref legacyBehavior>
                          <a target="_blank">
                            <span className="hidden md:inline">About BST</span>
                            <Goal className="inline md:hidden w-5 h-5 md:w-auto md:h-auto stroke-[1.5]" />
                          </a>
                        </Link>
                      </div>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <div className={navigationMenuTriggerStyle()}>
                        <Link href="/partner" passHref legacyBehavior>
                          <a target="_blank">
                            <span className="hidden md:inline">
                              Partner With Us
                            </span>
                            <Handshake className="inline md:hidden w-5 h-5 md:w-auto md:h-auto stroke-[1.5]" />
                          </a>
                        </Link>
                      </div>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <div className={navigationMenuTriggerStyle()}>
                        <Link href="/charity" passHref legacyBehavior>
                          <a target="_blank">
                            <span className="hidden md:inline">Charity</span>
                            <HandHelping className="inline md:hidden w-6 h-6 md:w-auto md:h-auto stroke-[1.5]" />
                          </a>
                        </Link>
                      </div>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              }
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
