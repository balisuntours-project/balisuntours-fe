import { LandingPageFooterSection } from "@/app/global-components/landing-page.footer";
import { LargeNavbar } from "@/app/global-components/large.navbar";
import { BookingServerAction } from "@/app/actions/booking/action.server";
import { EmptyContent } from "@/app/global-components/utility-components/empty-content.page";
import Link from "next/link";
import { Car, ListOrdered } from "lucide-react";
import { UnconfirmedGoodToKnowFlying } from "./utility-components/unconfirmed-good-to-know-flying.button";
import { BookingDetailUnconfirmed } from "./components/booking-detail-unconfirmed.booking";
import { UnconfirmedEmptyContent } from "./utility-components/unconfirmed-empty-content.booking";

export default async function BookingTransaction() {
  const data = await BookingServerAction.GetWaitingBookingData();

  const bookingItems = data.data;
    
  return (
    <>
      <LargeNavbar />
      <div className="mt-24 md:mt-36 px-4 lg:px-0  mb-11 relative">
        <UnconfirmedGoodToKnowFlying />
        <div className="booking-section">
          <div className="sm:grid sm:grid-cols-5 lg:grid-cols-4 sm:gap-8 lg:w-[90%] mx-auto items-start mb-11">
            {bookingItems.bookings && bookingItems.bookings.length > 0 ? (
              <BookingDetailUnconfirmed bookingsData={bookingItems} />
            ) : (
              <UnconfirmedEmptyContent />
            )}

            <div className="hidden sm:col-span-2 lg:col-span-1 h-auto bg-[#EFF7E8] rounded-xl p-5 sm:flex flex-col gap-6 sticky top-36">
              <span className="text-base text-black font-bold text-center">
                Read First!
              </span>
              <div className="text-start">
                <p className="text-sm text-gray-600">
                  Please read the following rules before proceeding to checkout:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  <li>Please review your booking details carefully.</li>
                  <li>
                    If you cancel confirmed booking, you need to make a now one
                    and waiting for confirmation again.
                  </li>
                  <li>
                    You can see canceled booking on booking
                    <Link
                      target="__blank"
                      href="/customer/booking/transaction"
                      className="underline text-blue-500 px-1"
                    >
                      transaction
                    </Link>
                    page.
                  </li>
                </ul>
                <p className="text-sm text-gray-600">
                  Thank you for your cooperation!
                </p>
              </div>
            </div>
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
