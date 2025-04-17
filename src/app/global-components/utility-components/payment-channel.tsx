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
  finalBookingPayload,
}: {
  finalBookingPayload?: CheckoutFinalPayloadParamater;
}) {
  const setIsLoading = useLoaderStore((state) => state.setIsLoading);
  const { toast } = useToast();
  const router = useRouter();
  const handlePostCheckoutBooking = async (paymentChannel: BayarindPaymentChannelEnum) => {
    if (!finalBookingPayload) {
      toast({
        description: `Please retry click checkout button!`,
        variant: "info",
      });
      return;
    }

    finalBookingPayload.bayarind_payment_channel = paymentChannel
    setIsLoading(true);
    const result = await BookingAction.CheckoutBooking(finalBookingPayload);

    //setIsCheckoutButtonTriggered(false)
    if (result.success) {
      const finalResult = result.data as CheckoutBookingResponse;
      if (finalResult.payment_gateway == PaymentGatewayEnum.IPAYMU) {
        const paymentGatewayPayload =
          finalResult.payload as CheckoutBookingIpaymuResponse;
        router.push(paymentGatewayPayload.next_url);
      } else if (finalResult.payment_gateway == PaymentGatewayEnum.IPAY88) {
        const paymentGatewayPayload =
          finalResult.payload as CheckoutBookingIpay88Response;
        BookingUtility.handleIpay88Checkout(
          paymentGatewayPayload.checkout_id,
          paymentGatewayPayload.signature,
          paymentGatewayPayload.checkout_url
        );
      } else if (finalResult.payment_gateway == PaymentGatewayEnum.BAYARIND) {
        const paymentGatewayPayload =
          finalResult.payload as CheckoutBookingBayarindResponse;
        router.push(paymentGatewayPayload.next_url);
      }
      setIsLoading(false);
    } else {
      setIsLoading(false);
      const finalResult = result.data as string; //errror response from backend
      toast({
        description: `${finalResult}`,
        variant: "danger",
      });
    }
  };

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
          <Button onClick={() => handlePostCheckoutBooking(BayarindPaymentChannelEnum.creditCard)} variant="default" className="w-full bg-[#EB5E00] ">
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
          <Button onClick={() => handlePostCheckoutBooking(BayarindPaymentChannelEnum.qris)} variant="default" className="w-full bg-[#EB5E00] ">
            Select QRIS
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
