"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { VoucherableDataCheckoutPage } from "@/app/responses/free-voucher/response";

export function CheckoutForMFreeVoucherNotificationContent({
  voucherable,
}: {
  voucherable: VoucherableDataCheckoutPage;
}) {
  return (
    <>
      {voucherable && (
        <Accordion type="single" collapsible className="col-span-2 mt-2">
          <AccordionItem
            value="voucher-info"
            className="border border-green-500 rounded-xl bg-green-50 shadow-sm"
          >
            <AccordionTrigger className="px-4 py-3 text-green-800 font-semibold text-sm md:text-sm">
              🎁 Free Activity Voucher Just for You!
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-sm text-gray-700">
              <p className="mb-3">
                After completing your booking, you’ll receive a{" "}
                <span className="font-semibold">{voucherable.slot}-slot</span>{" "}
                voucher for the following activity:
              </p>

              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-sm text-gray-700 space-y-1">
                <p>
                  <strong>Activity:</strong> {voucherable.activity_title} •{" "}
                  {voucherable.package_title} • {voucherable.price_title}
                </p>
                <p>
                  <strong>Valid for:</strong> {voucherable.expiry_time_in_day}{" "}
                  days after your activity date in Bali
                </p>
              </div>

              <p className="mt-3 text-xs text-gray-500 italic">
                *Voucher code will be sent after booking have been made.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </>
  );
}
