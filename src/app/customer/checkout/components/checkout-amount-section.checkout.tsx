"use client";
import { ImageWithLoader } from "@/app/global-components/utility-components/with-loader.image";
import { CheckoutDataPackageResponse } from "@/app/responses/activity-package/response";
import { CheckoutDataActivityResponse } from "@/app/responses/activity/response";
import { useBookingStore } from "@/app/store/booking.store";
import { CurrencyListEnum } from "@/lib/global.enum";
import { GlobalUtility } from "@/lib/global.utility";

export function CheckoutAmountSection({
  checkoutActivities,
  checkoutPackages,
}: {
  checkoutActivities: Array<CheckoutDataActivityResponse>;
  checkoutPackages: Array<CheckoutDataPackageResponse>;
}) {
  const bookingScopedState = useBookingStore(
    (state) => state.bookingScopedState
  );

  const currencyValue = useBookingStore((state) => state.currencyValue);
  const checkoutAmount = useBookingStore((state) => state.checkoutAmount);
  return (
    <>
      <div
        id="amountSection"
        className="flex flex-col gap-6 mb-44 md:mb-0 mt-4 md:mt-0 lg:flex lg:flex-col lg:gap-6 lg:col-span-4 lg:sticky lg:top-5 shadow-lg"
      >
        <div className="amount-section bg-white rounded-lg p-5 lg:block">
          <div className="mb-6 mt-3 bg-[#5FA22A] p-4 rounded-md">
            <div className="text-sm sm:text-base  text-white">
              Free cancellation (depend on each package)
            </div>
          </div>
          {checkoutActivities.map((activity, key) => (
            <div
              v-for="(activity, index) in props.activity.data"
              key={key}
              className="flex gap-3 my-5"
            >
              <ImageWithLoader
                fillAllView={false}
                src={activity.main_photo}
                alt={`Activity banner`}
                fallbackSrc="/fallback-image.png"
                classNameProp="rounded-lg w-28 h-20 object-cover"
                skeletonClassName="rounded-lg w-20 h-20"
                priority={false} // Gambar ini tidak diberi prioritas
                width={100}
                height={100}
              />

              <div className=" max-w-auto w-full items-start">
                <span className="text-black text-lg lg:text-xl font-bold">
                  {activity.title}
                </span>
                {activity.packages.map((packageName, index) => (
                  <div key={index}>
                    <p className="text-sm sm:text-base lg:text-base">
                      {packageName}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <hr />
          {checkoutPackages.map((itemPackage, key) => (
            <div
              v-for="(pack, index) in props.package.data"
              key={key}
              className="mt-3 mb-5 sm:flex sm:flex-col sm:gap-1 lg:block"
            >
              <div className="flex flex-col gap-2">
                <span className="text-black font-bold text-lg">
                  {itemPackage.activity_title}
                </span>

                <div className="flex flex-col">
                  <span className="text-gray-500">
                    - {itemPackage.package_title}
                  </span>
                  <span className="text-gray-500">
                    - Free cancellation ({itemPackage.cancellation_policy})
                  </span>
                  {!itemPackage.self_confirmation && (
                    <span
                      v-show="pack.self_confirmation == false"
                      className="text-red-500"
                    >
                      - Need confirmation ({itemPackage.confirmation_time}){" "}
                      before book
                    </span>
                  )}
                </div>

                <hr />
              </div>

              {itemPackage.prices.map((price, index) => (
                <div
                  v-for="(price, index) in pack.prices"
                  key={index}
                  className="flex flex-col gap-2 mt-5"
                >
                  <div className="flex gap-6">
                    <span className="text-gray-500 text-sm">Quantity</span>

                    <div className="ml-auto flex flex-col">
                      <p className="text-black text-end text-sm">
                        {price.title} x {price.qty}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6 w-full">
                    <span className="text-gray-500 text-sm">Date</span>

                    <div className="ms-auto text-end">
                      <span className="text-black text-sm">
                        {GlobalUtility.FormatBeautifullDate(
                          price.activity_date
                        )}
                      </span>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}

              <div className="flex gap-2 mt-3">
                <span className="text-gray-500 text-sm">Total</span>
                <span className="ml-auto text-black text-end font-bold text-sm">
                  {GlobalUtility.IdrCurrencyFormat(
                    bookingScopedState[itemPackage.base_uuid]?.checkoutPayload
                      ?.final_price ?? itemPackage.final_price
                  )}{" "}
                  {currencyValue &&
                    `(${GlobalUtility.ConvertionCurrencyFormat(
                      bookingScopedState[itemPackage.base_uuid]?.checkoutPayload
                        ?.final_price ?? itemPackage.final_price,
                      currencyValue,
                      CurrencyListEnum.usd
                    )})`}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/*  <!-- Sticky total big screen/PC--> */}
        <div className="hidden lg:block total-amount-section bg-gray-50 p-5">
          <div className="flex gap-2">
            <span className="text-gray-500">Amount</span>
            {checkoutAmount && (
              <span className="ml-auto text-[#EB5E00] text-end text-xl font-extrabold">
                {GlobalUtility.IdrCurrencyFormat(checkoutAmount)}{" "}
                {currencyValue &&
                  `(${GlobalUtility.ConvertionCurrencyFormat(
                    checkoutAmount,
                    currencyValue,
                    CurrencyListEnum.usd
                  )})`}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
