
import { LandingPageFooterSection } from "@/app/global-components/landing-page.footer";
import { LargeNavbar } from "@/app/global-components/large.navbar";

import { CartAction } from "@/app/actions/cart/action";
import { CartServerAction } from "@/app/actions/cart/action.server";
import { CartItemsList } from "./components/cart-items.cart";
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