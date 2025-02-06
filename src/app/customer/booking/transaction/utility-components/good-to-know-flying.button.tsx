"use client";

import { DynamicDialog } from "@/app/global-components/utility-components/dynamic-content.dialog";
import { CircleHelp } from "lucide-react";

export function GoodToKnowFlying() {
  return (
    <div className="fixed bottom-4 right-4 h-14 w-14 rounded-full bg-blue-600 text-white flex md:hidden items-center justify-center shadow-lg hover:bg-blue-700 transition">
      <DynamicDialog
        useSmallVersion={true}
        trigger={<CircleHelp className="w-8 h-8" />}
      >
        <div className=" h-auto bg-[#EFF7E8] rounded-xl p-5 sm:flex flex-col gap-6">
          <span className="text-base text-black font-bold text-center">
            Good to know ?!
          </span>
          <div className="text-start">
            <p className="text-sm text-gray-600">
              Please read the following rules before proceeding to checkout:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-700">
              <li>Please review your booking details carefully.</li>
              <li>
                If you cancel confirmed booking, you need to make a now one and
                waiting for confirmation again.
              </li>
              <li>Double-check the items in your cart.</li>
            </ul>
            <p className="text-sm text-gray-600">
              Thank you for your cooperation!
            </p>
          </div>
        </div>
      </DynamicDialog>
    </div>
  );
}
