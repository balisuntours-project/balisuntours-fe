import { BookingPaymentStatusEnum } from "@/app/enums/booking/booking.enum";
import { Badge } from "@/components/ui/badge";

export function PaymentStatusBooking({
  status,
}: {
  status: BookingPaymentStatusEnum;
}) {
  if (status == BookingPaymentStatusEnum.choosePaymentMethod) {
    return (
      <Badge
        variant="secondary"
        className="lg:w-auto h-10 p-4 bg-[#9bcbec] hover:bg-[#9bcbec]/80 text-white text-base text-center flex justify-center items-center font-bold"
      >
        Choose Payment Method
      </Badge>
    );
  } else if (status == BookingPaymentStatusEnum.pending) {
    return (
      <Badge
        variant="secondary"
        className="lg:w-auto h-10 p-4 bg-[#cbf269] hover:bg-[#cbf269]/80 text-white text-base text-center flex justify-center items-center font-bold"
      >
        Waiting for Payment
      </Badge>
    );
  } else if (status == BookingPaymentStatusEnum.paid) {
    return (
      <Badge
        variant="secondary"
        className="lg:w-auto h-10 p-4 bg-[#bacf83] hover:bg-[#bacf83]/80 text-white text-base text-center flex justify-center items-center font-bold"
      >
        Paid
      </Badge>
    );
  } else if (
    status == BookingPaymentStatusEnum.expired
  ) {
    return (
      <Badge
        variant="secondary"
        className="lg:w-auto h-10 p-4 bg-[#cfc0c4] hover:bg-[#cfc0c4]/80 text-white text-base text-center flex justify-center items-center font-bold"
      >
        Expired
      </Badge>
    );
  } else if (
    status == BookingPaymentStatusEnum.cancel
  ) {
    return (
      <Badge
        variant="secondary"
        className="lg:w-auto h-10 p-4 bg-[#cfc0c4] hover:bg-[#cfc0c4]/80 text-white text-base text-center flex justify-center items-center font-bold"
      >
        Canceled
      </Badge>
    );
  } else if (
    status == BookingPaymentStatusEnum.failed
  ) {
    return (
      <Badge
        variant="secondary"
        className="lg:w-auto h-10 p-4 bg-[#cfc0c4] hover:bg-[#cfc0c4]/80 text-white text-base text-center flex justify-center items-center font-bold"
      >
        Failed
      </Badge>
    );
  }
}
