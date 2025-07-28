"use client";

import { BayarindPaymentChannelEnum } from "@/app/enums/bayarind/bayarind.enum";
import { BookingPaymentStatusEnum } from "@/app/enums/booking/booking.enum";
import { CCIllustration } from "@/app/global-components/utility-components/cc.illustration";
import { QrisIllustration } from "@/app/global-components/utility-components/qris.illustration";
import { TransactionStatusResponse } from "@/app/responses/airport-transfer/response";
import { Button } from "@/components/ui/button";
import { GlobalUtility } from "@/lib/global.utility";
import { AlertTriangle, Check, Clock, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function TransactionStatusContent({
  data,
}: {
  data: TransactionStatusResponse;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center animate-fadeIn">
        {/* Icon dan Pesan Status */}
        {data.status === BookingPaymentStatusEnum.paid && (
          <div className="text-green-500 mb-6">
            <Check className="w-16 h-16 mx-auto animate-bounce" />
            <h2 className="text-2xl font-bold text-gray-800">
              Payment Successful!
            </h2>
            <p className="text-gray-600 mt-2">
              Thank you for your booking payment. We will contact you soon.
            </p>
          </div>
        )}

        {data.status === BookingPaymentStatusEnum.expired && (
          <div className="text-red-500 mb-6">
            <AlertTriangle className="w-16 h-16 mx-auto animate-bounce" />
            <h2 className="text-2xl font-bold text-gray-800">
              Payment Expired!
            </h2>
            <p className="text-gray-600 mt-2">
              The payment window has expired. Please consider to create a new
              booking.
            </p>
          </div>
        )}

        {(data.status === BookingPaymentStatusEnum.failed ||
          data.status === BookingPaymentStatusEnum.cancel) && (
          <div className="text-red-500 mb-6">
            <XCircle className="w-16 h-16 mx-auto animate-bounce" />
            <h2 className="text-2xl font-bold text-gray-800">
              Payment Status{" "}
              {data.status === BookingPaymentStatusEnum.failed
                ? "Failed"
                : "Canceled"}
            </h2>
            <p className="text-gray-600 mt-2">
              {data.status === BookingPaymentStatusEnum.failed
                ? "Your payment is failed, please consider to make a new booking."
                : "Your payment is canceled, interest with other activities?"}
            </p>
          </div>
        )}

        {(data.status === BookingPaymentStatusEnum.pending ||
          data.status === BookingPaymentStatusEnum.choosePaymentMethod) && (
          <div className="text-yellow-500 mb-6">
            <Clock className="w-16 h-16 mx-auto animate-bounce" />
            <h2 className="text-2xl font-bold text-gray-800">
              Payment on Pending!
            </h2>
            <p className="text-gray-600 mt-2">
              The payment waiting for traveller action.
            </p>
          </div>
        )}

        {data.status ===
          BookingPaymentStatusEnum.awaitingPaymentVerification && (
          <div className="text-yellow-500 mb-6">
            <Clock className="w-16 h-16 mx-auto animate-bounce" />
            <h2 className="text-2xl font-bold text-gray-800">
              Payment Waiting for Bank Verification!
            </h2>
            <p className="text-gray-600 mt-2">
              The payment on process. Please consider to wait for a minutes.
            </p>
          </div>
        )}

        {/* Kartu Kredit */}
        {(data.payment_channel == BayarindPaymentChannelEnum.creditCard ||
          !data.payment_channel) && (
          <CCIllustration name={data.customer_account_name} />
        )}
        {data.payment_channel == BayarindPaymentChannelEnum.qris && (
          <QrisIllustration name={data.customer_account_name} />
        )}

        {/* Detail Transaksi */}
        <div className="text-left">
          <p>
            <strong>Order ID:</strong> {data.booking_id}
          </p>
          <p>
            <strong>Email:</strong> {data.customer_account_email}
          </p>
          <p>
            <strong>Total Amount:</strong>{" "}
            {GlobalUtility.IdrCurrencyFormat(data.amount)}{" "}
            {/* (
            {data.currencyAmount}) */}
          </p>
          <p>
            <strong>Payment Method:</strong>{" "}
            {data.payment_channel == BayarindPaymentChannelEnum.creditCard
              ? "Credit Card"
              : "QRIS"}
          </p>
          <p>
            <strong>Transaction Date:</strong>{" "}
            {GlobalUtility.FormatBeautifullDate(data.created_at, true)}
          </p>
          {data.status === "berhasil" && (
            <p>
              <strong>Paid At:</strong>{" "}
              {GlobalUtility.FormatBeautifullDate(data.paid_at, true)}
            </p>
          )}
        </div>

        {/* Tombol Kembali ke Home */}
        <div className="mt-6 w-full max-w-full flex">
          <Link
            href={"/"}
            className="bg-gradient-to-r from-[#EB5E00] to-orange-500 text-white px-4 py-2 rounded hover:shadow-lg hover:from-orange-600 hover:to-orange-400 transition w-full"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
