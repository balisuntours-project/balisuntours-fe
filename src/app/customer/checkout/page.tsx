import { BookingServerAction } from "@/app/actions/booking/action.server";
import { SmallNavbar } from "@/app/global-components/small.navbar";
import { CheckoutDetail } from "./components/checkout-detail.checkout";

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
    data = result.data
  }
  return (
    <>
      <SmallNavbar />
      <div className="mt-11 px-5 pb-12 sm:pb-11 absolute top-[20%]">
        <div className="lg:w-[90%] mx-auto">
          {data && (
            <CheckoutDetail minCost={data.min_cost} checkoutActivity={data.activity} checkoutPackages={data.package} />
          )}
        </div>
      </div>
    </>
  );
}
