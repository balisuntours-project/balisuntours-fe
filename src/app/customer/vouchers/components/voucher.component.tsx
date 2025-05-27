"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { FreeActivityVoucherResponse } from "@/app/responses/free-voucher/response";
import Link from "next/link";
import { BadgeStatus } from "../utility-components/status.badge";
import { GlobalUtility } from "@/lib/global.utility";

export function VoucherComponent({
  vouchers,
}: {
  vouchers: Array<FreeActivityVoucherResponse>;
}) {
  return (
    <>
      {vouchers.map((voucher, key) => (
        <Card
          key={key}
          className="hover:shadow-xl transition border border-gray-200 rounded-xl mb-3 md:mb-0"
        >
          <CardHeader className="pb-2 border-b">
            <CardTitle className="text-lg flex justify-between items-start">
              <div>
                <div className="font-semibold">{voucher.voucher_code}</div>
                <div className="text-sm text-gray-500">{voucher.activity}</div>
              </div>
              <BadgeStatus status={voucher.status} />
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-700 space-y-1 pt-3">
            <p>
              <strong>Available from:</strong>{" "}
              {GlobalUtility.FormatBeautifullDate(voucher.available_at, true)}
            </p>
            <p>
              <strong>Expires on:</strong>{" "}
              {GlobalUtility.FormatBeautifullDate(voucher.expired_at, true)}
            </p>
            <p>
              <strong>Slot:</strong> {voucher.slot}{" "}
              {voucher.slot === 1 ? "person" : "people"}
            </p>
            <p className="text-xs text-blue-600 hover:underline mt-2">
              <Link
                passHref
                legacyBehavior
                href={`https://wa.me/${
                  voucher.sales_wa_number
                }?text=${encodeURIComponent(
                  `Hi, I want to redeem my voucher ${voucher.voucher_code}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <a target="_blank">
                  How to redeem? Click or contact WhatsApp number{" "}
                  {voucher.sales_wa_number}
                </a>
              </Link>
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
