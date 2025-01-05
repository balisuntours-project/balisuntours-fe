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
        className="flex flex-col gap-6 lg:flex lg:flex-col lg:gap-6 lg:col-span-4 lg:sticky lg:top-5 shadow-lg"
      >
        <div className="amount-section bg-white rounded-lg p-5 lg:block">
          <div className="mb-6 mt-3">
            <div className="text-sm sm:text-base !text-[#1A56DB]">
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

        {/*   <!-- Sticky total Tablet--> */}
        <div className="hidden sm:block lg:hidden total-amount-section bg-gray-200 bg-opacity-20 rounded-xl sticky top-24 p-5">
          <div className="flex gap-2 w-1/4 mx-auto mb-3">
            <span className="text-gray-500 text-lg">Amount</span>
            <span className="ml-auto text-end font-bold text-lg text-[#EB5E00]">
              {/* {{ idrCurrencyFormat(amount)
                                }}{{
                                    amountUsd > 0 ? `($${amountUsd})` : ""
                                }} */}
            </span>
          </div>
          <hr />
          <div className="hidden sm:flex sm:flex-col lg:hidden gap-4 items-start mt-3">
            <span className="w-full">
              Your booking will be submitted once you continue to the next step.
              (You can choose your payment method in the next step)
            </span>
            <button
              /* @click="handleToPayment" */
              className="ml-auto w-auto px-8 py-2 bg-gradient-to-r bg-[#EB5E00] text-white font-bold rounded-lg transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
            >
              Go to payment
            </button>
          </div>
        </div>
        {/* <!-- Payment checkout mobile view --> */}
        <div
          id="mobileCheckout"
          className="hidden sm:hidden h-auto p-5 elevation-4 sticky bottom-0 left-0 right-0 bg-white"
        >
          <div className="flex gap-4 w-full mb-2">
            <span className="text-gray-500 text-lg">Amount</span>
            <span className="ml-auto text-[#EB5E00] text-end font-bold text-lg">
              {/* {{ idrCurrencyFormat(amount)
                                }}{{
                                    amountUsd > 0 ? `($${amountUsd})` : ""
                                }} */}
            </span>
          </div>
          <hr />
          <div className="flex flex-col gap-4 items-start mt-4">
            <span className="w-full font-bold text-xs">
              Your booking will be submitted once you continue to the next step.
              (You can choose your payment method in the next step)
            </span>
            <button
              /*   @click="handleToPayment"
                                :disabled="processingPayment" */
              className="mx-auto w-auto px-8 py-2 bg-gradient-to-r bg-[#EB5E00] text-white font-bold rounded-lg transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
            >
              Go to payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
