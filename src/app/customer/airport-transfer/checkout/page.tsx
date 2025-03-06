import { AirportTransferActionServer } from "@/app/actions/airport-transfer/action.server";
import { LandingPageFooterSection } from "@/app/global-components/landing-page.footer";
import { SmallNavbar } from "@/app/global-components/small.navbar";
import { notFound } from "next/navigation";
import { CheckoutDetailAirportTransfer } from "./components/checkout-detail.airport-checkout";
import { AdditionalServiceItemSection } from "./components/utility-components/additional-service-item.section";

export default async function AirportTransferCheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const bookingUuidParam = (await searchParams)?.booking_uuid;
  let data = null;
  let additionalServiceItem = null
  if (bookingUuidParam) {
    const result = await AirportTransferActionServer.GetBookedVechileData(
      bookingUuidParam as string
    );

    if (!result.success) {
      notFound();
    }

    const resultAdditionalServiceItem = await AirportTransferActionServer.GetAdditionalServiceItem();
    if(resultAdditionalServiceItem.success) {
        console.log(resultAdditionalServiceItem.data)
        additionalServiceItem = resultAdditionalServiceItem.data.map((item) => {
            return {
                ...item,
                qty: 0
            }
        })
    }

    data = result.data;
    console.log(result.data)
  }else {
    notFound()
  }

  return (
    <>
      <SmallNavbar />
      <div className="mt-11 absolute top-[20%]">
        <div className="lg:w-[90%] mx-auto px-5 pb-16">
          {data && <CheckoutDetailAirportTransfer bookedVechile={data.booked_vechiles} bookingData={data.booking_data} additionalServiceItem={additionalServiceItem ? <AdditionalServiceItemSection additionalServiceItems={additionalServiceItem} /> : false} />}
        </div>
        <hr />
        <div className="container flex flex-col gap-11 px-3 md:px-8  pt-11 pb-11">
          <LandingPageFooterSection className="mb-40 md:mb-0" />
        </div>
      </div>
    </>
  );
}
