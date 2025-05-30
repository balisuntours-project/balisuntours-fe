import { LandingPageFooterSection } from "@/app/global-components/landing-page.footer";
import { LargeNavbar } from "@/app/global-components/large.navbar";

import { EmptyContent } from "@/app/global-components/utility-components/empty-content.page";
import Link from "next/link";
import { Car, Gift } from "lucide-react";
import { FreeVoucherServerAction } from "@/app/actions/free-voucher/action.server";
import { VoucherComponent } from "./components/voucher.component";

export default async function FreeVouchersPage() {
  const data = await FreeVoucherServerAction.GetCustomerFreeActivityVouchers();

  const freeVouchers = data.data;

  return (
    <>
      <LargeNavbar />
      <div className="mt-36 md:mt-36 px-4 lg:px-0  mb-11 relative">
       
        <div className="booking-section">
          <div className=" sm:gap-8 lg:w-[90%] mx-auto items-start mb-11">
            {Array.isArray(freeVouchers) && freeVouchers.length > 0 ? (
              <VoucherComponent vouchers={freeVouchers} />
            ) : (
              <div className="mx-auto">
                <EmptyContent
                  emptyText="Seems you don't have vouchers yet!"
                  suggestionElement={
                    <p>
                      {" "}
                      You have no vouchers yet.{" "}
                      <Link
                        href="/customer/activities"
                        className="text-blue-600"
                      >
                        Lets book an attractions and get your free vouchers 🚜.
                      </Link>
                    </p>
                  }
                >
                  <Gift className="w-full h-full" />
                </EmptyContent>
              </div>
            )}

          </div>
          <hr />
          <div className="container flex flex-col gap-11 px-3 md:px-8  pt-11 pb-11">
            <LandingPageFooterSection />
          </div>
        </div>
      </div>
    </>
  );
}
