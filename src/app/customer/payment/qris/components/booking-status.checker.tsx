"use client";

import { BookingAction } from "@/app/actions/booking/action";
import { BookingPaymentStatusEnum } from "@/app/enums/booking/booking.enum";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function QRISBookingStatusChecker({ bookingId }: { bookingId: string }) {
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(async () => {
      const result = await BookingAction.CheckActivityBookingTransactionStatus(bookingId);
      
      if (
        result.success &&
        ![
          BookingPaymentStatusEnum.pending,
          BookingPaymentStatusEnum.awaitingPaymentVerification,
          BookingPaymentStatusEnum.choosePaymentMethod,
        ].includes(result.data)
      ) {
        router.push(`/customer/booking/experiences/transaction-status?booking_id=${bookingId}`);
      }
    }, 4000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [bookingId, router]);
  return null;
}
