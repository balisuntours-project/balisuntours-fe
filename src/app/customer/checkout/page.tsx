import { BookingServerAction } from "@/app/actions/booking/action.server";
import { SmallNavbar } from "@/app/global-components/small.navbar";
import { CheckoutDetail } from "./components/checkout-detail.checkout";
import { notFound } from "next/navigation";

export default async function CheckoutBooking({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const cartUuidsParam = (await searchParams)?.cart_data;
  let data = null
  if (cartUuidsParam) {
    const result = await BookingServerAction.GetBookingCheckoutData(
      cartUuidsParam as string
    );

    if(!result.success) {
      notFound()
    }

    data = result.data
  }
  
  


  return (
    <>
      <SmallNavbar />
      <div className="mt-11 px-5 pb-12 sm:pb-11 absolute top-[20%]">
        <div className="lg:w-[90%] mx-auto">
          {data && (
            <CheckoutDetail cartData={JSON.parse(data.cart_data)} userData={data.user_data} minCost={data.min_cost} checkoutActivities={data.activity} checkoutPackages={data.package} />
          )}
        </div>
      </div>
    </>
  );
}
