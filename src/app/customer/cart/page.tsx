
import { LandingPageFooterSection } from "@/app/global-components/landing-page.footer";
import { LargeNavbar } from "@/app/global-components/large.navbar";
import { CartItemsList } from "./components/cart-items.cart";
import { CartAction } from "@/app/actions/cart/action";
import { CartServerAction } from "@/app/actions/cart/action.server";
import {EmptyContent} from "@/app/global-components/utility-components/empty-content.page";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { CartEmptyContent } from "./utility-components/cart-empty.content";



export default async function Cart() {
    
    const data = await CartServerAction.GetCartData();

    const cartItems = data.data
  
    return (
        <>
        <LargeNavbar />
        <div className="pt-11 md:pt-22 lg:pt-24">
        <div className="cart-section">
            {cartItems ? (
              <CartItemsList items={cartItems} />
            ) : (
              <CartEmptyContent />
            )}
         
          <hr />
          <div className="container flex flex-col gap-11 px-3 md:px-8  pt-11 pb-11">
          
          <LandingPageFooterSection />
          </div>
        </div>
      </div>
        </>
    )
}