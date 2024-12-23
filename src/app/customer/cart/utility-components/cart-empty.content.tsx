import { EmptyContent } from "@/app/global-components/utility-components/empty-content.page";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export function CartEmptyContent () {
    return (
        <>
         <EmptyContent emptyText="Seems your cart is clean!" suggestionElement={
          <p> No items in your cart. <Link href="/customer/activities" className="text-blue-600">Start adding activities to explore 🚜.</Link></p>
        }>
          <ShoppingCart className="w-full h-full" />
        </EmptyContent>
        </>
    )
}