import { BookingServerAction } from "@/app/actions/booking/action.server";
import { SmallNavbar } from "@/app/global-components/small.navbar";
import { CheckoutDetail } from "./components/checkout-detail.checkout";
import { notFound } from "next/navigation";
import { LandingPageFooterSection } from "@/app/global-components/landing-page.footer";

export default async function CheckoutBooking({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  notFound();
  const cartUuidsParam = (await searchParams)?.cart_data;
  //let data = null
  const data : any = null
  if (cartUuidsParam) {
    const result = await BookingServerAction.GetBookingCheckoutData(
      cartUuidsParam as string
    );

    if(!result.success) {
      notFound()
    }

  //  data = result.data
  }else {
    notFound()
  }
  

  return (
    <>
      <SmallNavbar />
      <div className="mt-11 absolute top-[20%]">
        <div className="lg:w-[90%] mx-auto px-5 pb-16">
          {data && (
            <CheckoutDetail cartData={JSON.parse(data.cart_data)} userData={data.user_data} minCost={data.min_cost} checkoutActivities={data.activity} checkoutPackages={data.package} />
          )}
        </div>
        <hr />
        <div className="container flex flex-col gap-11 px-3 md:px-8  pt-11 pb-11">
          <LandingPageFooterSection className="mb-40 md:mb-0" />
        </div>
      </div>
     
    </>
  );
}
