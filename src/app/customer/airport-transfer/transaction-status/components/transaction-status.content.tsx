"use client";

import { TransactionStatusResponse } from "@/app/responses/airport-transfer/response";
import { Button } from "@/components/ui/button";
import { GlobalUtility } from "@/lib/global.utility";
import { AlertTriangle, Check, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function TransactionStatusContent({data} : {data: TransactionStatusResponse}) {
    
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center animate-fadeIn">
        {/* Icon dan Pesan Status */}
        {data.status === "berhasil" && (
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

        {data.status === "expired" && (
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

        {data.status === "failed" && (
          <div className="text-red-500 mb-6">
            <XCircle className="w-16 h-16 mx-auto animate-bounce" />
            <h2 className="text-2xl font-bold text-gray-800">
              Payment Status Failed
            </h2>
            <p className="text-gray-600 mt-2">
              Your payment is failed, please consider to make a new booking.
            </p>
          </div>
        )}

        {/* Kartu Kredit */}
        <div className="credit-card mt-8 mb-6 mx-auto w-full max-w-xs p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300 ease-in-out bg-gradient-to-r from-blue-500 to-blue-600">
          <div className="flex justify-between items-center mb-4 mt-4">
            <h4 className="text-white font-bold text-lg">Credit Card</h4>
            <div className="w-12 h-8 bg-white rounded-sm flex items-center justify-center shadow-md">
              <Image
                src="/bst-logo.png"
                alt="Company Logo"
                width={25}
                height={25}
                className="w-11"
              />
            </div>
          </div>
          <p className="text-white text-left tracking-wider mb-4">
            **** **** **** 1234
          </p>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-white text-xs uppercase">Card Holder</p>
              <p className="text-white font-semibold">{data.customer_account_name}</p>
            </div>
            <div>
              <p className="text-white text-xs uppercase">Valid Thru</p>
              <p className="text-white font-semibold">--/--</p>
            </div>
          </div>
        </div>

        {/* Detail Transaksi */}
        <div className="text-left">
          <p>
            <strong>Order ID:</strong> {data.booking_id}
          </p>
          <p>
            <strong>Email:</strong> {data.customer_account_email}
          </p>
          <p>
            <strong>Total Amount:</strong> {GlobalUtility.IdrCurrencyFormat(data.amount)} {/* (
            {data.currencyAmount}) */}
          </p>
          <p>
            <strong>Payment Method:</strong> Credit Card
          </p>
          <p>
            <strong>Transaction Date:</strong> {GlobalUtility.FormatBeautifullDate(data.created_at, true)}
          </p>
          {data.status === "berhasil" && (
            <p>
              <strong>Paid At:</strong> {GlobalUtility.FormatBeautifullDate(data.paid_at, true)}
            </p>
          )}
        </div>

        {/* Tombol Kembali ke Home */}
        <div className="mt-6 w-full max-w-full flex">
          <Link href={"/"}  className="bg-gradient-to-r from-[#EB5E00] to-orange-500 text-white px-4 py-2 rounded hover:shadow-lg hover:from-orange-600 hover:to-orange-400 transition w-full"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
