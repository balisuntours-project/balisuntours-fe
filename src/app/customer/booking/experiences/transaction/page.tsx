import { LandingPageFooterSection } from "@/app/global-components/landing-page.footer";
import { LargeNavbar } from "@/app/global-components/large.navbar";

import { BookingServerAction } from "@/app/actions/booking/action.server";

import { EmptyContent } from "@/app/global-components/utility-components/empty-content.page";
import Link from "next/link";
import { Car } from "lucide-react";
import { GoodToKnowFlying } from "./utility-components/good-to-know-flying.button";
import { BookingDetail } from "./components/booking-detail.booking";

export default async function BookingTransaction() {
  const data = await BookingServerAction.GetTransactionBookingData();

  const bookingItems = data.data;

  return (
    <>
      <LargeNavbar />
      <div className="mt-36 md:mt-36 px-4 lg:px-0  mb-11 relative">
        <GoodToKnowFlying />
        <div className="booking-section">
          <div className="sm:grid sm:grid-cols-5 lg:grid-cols-4 sm:gap-8 lg:w-[90%] mx-auto items-start mb-11">
            {bookingItems.bookings && bookingItems.bookings.length > 0 ? (
              <BookingDetail bookingsData={bookingItems} />
            ) : (
              <div className="md:col-span-3">
                <EmptyContent
                  emptyText="Seems your booking history empty!"
                  suggestionElement={
                    <p>
                      {" "}
                      You have no booking history yet.{" "}
                      <Link
                        href="/customer/activities"
                        className="text-blue-600"
                      >
                        Lets book an attractions and release your stress 🚜.
                      </Link>
                    </p>
                  }
                >
                  <Car className="w-full h-full" />
                </EmptyContent>
              </div>
            )}

            <div className="hidden sm:col-span-2 lg:col-span-1 h-auto bg-[#EFF7E8] rounded-xl p-5 sm:flex flex-col gap-6 sticky top-36">
              <span className="text-lg text-black font-bold text-center">
                Good to know ?!
              </span>
              <p className="text-sm text-gray-600">
                Please read the following rules before proceeding to checkout:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-700">
                <li>Please review your booking details carefully.</li>
                <li>
                  If you cancel confirmed booking, you need to make a now one
                  and waiting for confirmation again.
                </li>
                <li>Double-check the items in your cart.</li>
              </ul>
              <p className="text-sm text-gray-600">
                Thank you for your cooperation!
              </p>
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
