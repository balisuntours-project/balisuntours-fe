"use client";

import { FreeVoucherStatusEnum } from "@/app/enums/free-voucher/free-voucher.enum";
import { Badge } from "@/components/ui/badge";

const getStatusStyle = (status: FreeVoucherStatusEnum) => {
  switch (status) {
    case FreeVoucherStatusEnum.active:
      return "bg-green-100 text-green-800";
    case FreeVoucherStatusEnum.redeemed:
      return "bg-red-100 text-red-800";
    case FreeVoucherStatusEnum.expired:
      return "bg-gray-200 text-gray-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export function BadgeStatus({ status }: { status: FreeVoucherStatusEnum }) {
  return (
    <>
      <Badge variant={"outline"} className={`${getStatusStyle(status)} px-2 py-0.5 text-sm rounded`}>{status}</Badge>
    </>
  );
}
