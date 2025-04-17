"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, QrCode } from "lucide-react";
import { useLoaderStore } from "@/app/store/loader.store";
import { CheckoutFinalPayloadParamater } from "@/app/paramaters/booking/paramater";
import { useToast } from "@/hooks/use-toast";
import { BookingAction } from "@/app/actions/booking/action";
import {
  CheckoutBookingBayarindResponse,
  CheckoutBookingIpay88Response,
  CheckoutBookingIpaymuResponse,
  CheckoutBookingResponse,
} from "@/app/responses/booking/response";
import { PaymentGatewayEnum } from "@/lib/global.enum";
import { useRouter } from "next/navigation";
import { BookingUtility } from "@/lib/booking.utility";
import { TextLoader } from "./text-loader.popup";
import { BayarindPaymentChannelEnum } from "@/app/enums/bayarind/bayarind.enum";

export function PaymentChannelList({
  onCheckoutChannel,
}: {
  onCheckoutChannel: (channel: BayarindPaymentChannelEnum) => void}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <TextLoader title="Wait a second" text="Redirecting to payment page..." />
      {/* Credit Card Option */}
      <Card className="flex flex-col items-center p-6 shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="flex flex-col items-center">
          <CreditCard className="h-12 w-12 text-blue-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Credit Card</h3>
          <p className="text-sm text-gray-500 text-center mb-4">
            Pay securely using your Visa, MasterCard, or other cards.
          </p>
          <Button
            onClick={() => onCheckoutChannel(BayarindPaymentChannelEnum.creditCard)}
            variant="default"
            className="w-full bg-[#EB5E00] "
          >
            Select Credit Card
          </Button>
        </CardContent>
      </Card>

      {/* QRIS Option */}
      <Card className="flex flex-col items-center p-6 shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="flex flex-col items-center">
          <QrCode className="h-12 w-12 text-green-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">QRIS</h3>
          <p className="text-sm text-gray-500 text-center mb-4">
            Scan the QR code with your e-wallet or mobile banking app.
          </p>
          <Button
            onClick={() => onCheckoutChannel(BayarindPaymentChannelEnum.qris)}
            variant="default"
            className="w-full bg-[#EB5E00] "
          >
            Select QRIS
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
