"use client";

import { GlobalUtility } from "@/lib/global.utility";
import { CheckCircle } from "lucide-react";
import { CheckoutAmountSectionAirportTransfer } from "./checkout-amount-section.airport-checkout";
import { Input } from "@/components/ui/input";
import { CHECKOUT_INPUT_STYLE } from "@/lib/global.constant";
import { BookedVechileResponse, BookingDataResponse } from "@/app/responses/airport-transfer/response";
import React, { useRef } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CheckoutAirportTransferSchema } from "../validation/checkout.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CustomerTitleEnum } from "@/app/enums/airport-transfer/airport-transfer.enum";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function CheckoutDetailAirportTransfer({
  bookingData,
  bookedVechile,
  additionalServiceItem,
}: {
  bookingData: BookingDataResponse;
  bookedVechile: Array<BookedVechileResponse>
  additionalServiceItem?: React.ReactNode;
}) {
  const checkoutDataForm = useForm<
    z.infer<typeof CheckoutAirportTransferSchema>
  >({
    resolver: zodResolver(CheckoutAirportTransferSchema),
    defaultValues: {
      customer_title: undefined,
      customer_first_name: "",
      customer_last_name: "",
      customer_country: "",
      customer_email: "",
      customer_phone: "",
    },
  });

  const handleCheckoutBooking = async (
    values: z.infer<typeof CheckoutAirportTransferSchema>
  ) => {};

  const additionalRequestTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const handleAdditionalRequestChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const textarea = additionalRequestTextAreaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset dulu agar tidak terus bertambah
      textarea.style.height = `${Math.min(textarea.scrollHeight, 300)}px`; // Sesuaikan dengan konten
    }
  };
  return (
    <>
      <div className="lg:grid lg:grid-cols-12 lg:gap-6 items-start">
        <div className="col-span-8 bg-white rounded-lg h-auto shadow-lg sm:mb-6">
          <div className="p-5 sm:p-5 lg:p-8">
            <div className="flex gap-3 items-center text-sm sm:text-base bg-[#5FA22A] text-white !py-3 p-4 rounded-md">
              <CheckCircle className="w-6 h-6 flex-shrink-0" />
              <p>
                {" "}
                Please enter your info carefully. Once submitted it cannot be
                changed.
              </p>
            </div>

            <div className="mt-4 md:mt-6 pb-4">
              <div className="flex flex-col">
                <span className="text-bold text-black text-lg font-bold mb-2">
                  Flight No.
                </span>
                <Input
                  type="text"
                  placeholder="e.g CX666"
                  required
                  className={CHECKOUT_INPUT_STYLE}
                />
              </div>
            </div>

            {/* Additional service */}
            <div className="mt-4 md:mt-6 pb-4">{additionalServiceItem}</div>

            <div className="mt-4 md:mt-6 pb-4">
              <div className="flex flex-col">
                <span className="text-bold text-black text-lg font-bold mb-2">
                  Participant details
                </span>
                <Form {...checkoutDataForm}>
                  <form
                    onSubmit={checkoutDataForm.handleSubmit(
                      handleCheckoutBooking
                    )}
                  >
                    <div className="flex flex-col gap-2 sm:grid sm:grid-cols-12 sm:gap-4">
                      <div className="flex flex-col col-span-4">
                        <FormField
                          control={checkoutDataForm.control}
                          name="customer_title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="">Title</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select title" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent id="customer-title">
                                  <SelectItem value={CustomerTitleEnum.mr}>
                                    {CustomerTitleEnum.mr}
                                  </SelectItem>
                                  <SelectItem value={CustomerTitleEnum.mrs}>
                                    {CustomerTitleEnum.mrs}
                                  </SelectItem>
                                  <SelectItem value={CustomerTitleEnum.ms}>
                                    {CustomerTitleEnum.ms}
                                  </SelectItem>
                                  <SelectItem value={CustomerTitleEnum.dr}>
                                    {CustomerTitleEnum.dr}
                                  </SelectItem>
                                  <SelectItem value={CustomerTitleEnum.sir}>
                                    {CustomerTitleEnum.sir}
                                  </SelectItem>
                                  <SelectItem value={CustomerTitleEnum.prof}>
                                    {CustomerTitleEnum.prof}
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex flex-col col-span-4">
                        <FormField
                          control={checkoutDataForm.control}
                          name="customer_first_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="">
                                First name (as on passport)
                              </FormLabel>
                              <FormControl>
                                <Input
                                  id="customer-first-name"
                                  type="text"
                                  placeholder="As on ID user for check-in"
                                  required
                                  {...field}
                                  className={CHECKOUT_INPUT_STYLE}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex flex-col col-span-4">
                        <FormField
                          control={checkoutDataForm.control}
                          name="customer_last_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="">
                                Last name (as on passport)
                              </FormLabel>
                              <FormControl>
                                <Input
                                  id="customer-last-name"
                                  type="text"
                                  placeholder="As on ID user for check-in"
                                  required
                                  {...field}
                                  className={CHECKOUT_INPUT_STYLE}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex flex-col col-span-4">
                        <FormField
                          control={checkoutDataForm.control}
                          name="customer_country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="">
                                Country (as on passport)
                              </FormLabel>
                              <FormControl>
                                <Input
                                  id="customer-country"
                                  type="text"
                                  placeholder="Australia"
                                  required
                                  {...field}
                                  className={CHECKOUT_INPUT_STYLE}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex flex-col col-span-4">
                        <FormField
                          control={checkoutDataForm.control}
                          name="customer_phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="">Phone Number</FormLabel>
                              <FormControl>
                                <Input
                                  id="customer-phone"
                                  placeholder="+918712xxx"
                                  required
                                  {...field}
                                  onChange={(e) => {
                                    const formattedValue =
                                      GlobalUtility.InputFormatterForPhoneAllowNumberAndPlus(
                                        e.target.value
                                      );
                                    field.onChange(formattedValue); // Panggil onChange bawaan React Hook Form
                                  }}
                                  className={CHECKOUT_INPUT_STYLE}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex flex-col col-span-4">
                        <FormField
                          control={checkoutDataForm.control}
                          name="customer_email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="">
                                Email (for booking confirmation)
                              </FormLabel>
                              <FormControl>
                                <Input
                                  id="customer-email"
                                  type="email"
                                  placeholder="yukikato@gmail.com"
                                  required
                                  {...field}
                                  className={CHECKOUT_INPUT_STYLE}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex flex-col col-span-12">
                        <FormItem>
                          <FormLabel className="">
                            Additional requests (Not include in Additional
                            services, directly payable to driver)
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              ref={additionalRequestTextAreaRef}
                              onChange={(e) => handleAdditionalRequestChange(e)}
                              id="customer-additional-request"
                              placeholder="Your request..."
                              required
                              className={CHECKOUT_INPUT_STYLE}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </div>
                    </div>
                       <div className="flex flex-col gap-4 mt-6">
                    <div
                      className={
                        //  GlobalUtility.CheckScreenOnMobile()
                        //   ? "fixed bottom-0 left-0 w-full rounded-t-2xl border-t border-gray-300 bg-white h-auto p-6 z-10 "
                        //   :  "md:flex gap-4 items-start"
                        "md:flex md:gap-4 md:items-start md:rounded-none md:border-none md:p-0 md:z-auto md:static fixed bottom-0 left-0 w-full rounded-t-2xl border-t border-gray-300 bg-white h-auto p-6 z-10 "
                      }
                    >
                      <div className="flex gap-2 md:hidden mb-3">
                        <span className="text-gray-500">Amount</span>
                        <span className="ml-auto text-[#EB5E00] text-end text-xl font-extrabold">
                            {GlobalUtility.IdrCurrencyFormat(bookingData.total_amount)}{" "}
                            {/* {currencyValue &&
                              `(${GlobalUtility.ConvertionCurrencyFormat(
                                checkoutAmount,
                                currencyValue,
                                CurrencyListEnum.usd
                              )})`} */}
                          </span>
                      </div>
                      <hr />
                      <span className="w-3/4 text-gray-500">
                        Your booking will be submitted once you continue to the
                        next step. (You can choose your payment method in the
                        next step)
                      </span>
                      <Button className="ml-auto mt-2 md:mt-0 w-full md:w-auto px-5 py-3 bg-gradient-to-r bg-[#EB5E00] text-white font-bold rounded-lg transition-transform transform-gpu hover:bg-[#EB5E00]/80 hover:-translate-y-1 hover:shadow-lg">
                        Go to payment
                      </Button>
                    </div>
                  </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>

        <CheckoutAmountSectionAirportTransfer bookingData={bookingData} bookedVechile={bookedVechile} />
      </div>
    </>
  );
}
