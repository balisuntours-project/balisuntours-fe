import {
  BookingPaymentStatusEnum,
} from "@/app/enums/booking/booking.enum";
import { Badge } from "@/components/ui/badge";

export function UnconfirmedStatusBooking({
  status,
}: {
  status: BookingPaymentStatusEnum;
}) {
  if (status == BookingPaymentStatusEnum.confirmed) {
    return (
      <Badge
        variant="secondary"
        className="lg:w-auto h-10 p-4 bg-[#bacf83] hover:bg-[#bacf83]/80 text-white text-base text-center flex justify-center items-center font-bold"
      >
        Confirmed
      </Badge>
    );
  } else if (status == BookingPaymentStatusEnum.unconfirmed) {
    return (
      <Badge
        variant="secondary"
        className="lg:w-auto h-10 p-4 bg-[#cbf269] hover:bg-[#cbf269]/80 text-white text-base text-center flex justify-center items-center font-bold"
      >
        Waiting for Confirmation
      </Badge>
    );
  }
}
