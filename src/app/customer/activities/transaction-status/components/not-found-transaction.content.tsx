"use client";


import { AlertTriangle, Check, Clock, ScanEye, XCircle, ZoomOutIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function NotFoundTransactionStatusContent({bookingId} : {bookingId: string}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center animate-fadeIn">
        {/* Icon dan Pesan Status */}
        <div className="text-red-500 mb-6">
            <ZoomOutIcon className="w-16 h-16 mx-auto animate-bounce" />
            <h2 className="text-2xl font-bold text-gray-800">
              Payment Not Found!
            </h2>
            <p className="text-gray-600 mt-2">
              Well we can't find your booking with this id {bookingId}
            </p>
          </div>

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
              <p className="text-white font-semibold">Mr. Stranger</p>
            </div>
            <div>
              <p className="text-white text-xs uppercase">Valid Thru</p>
              <p className="text-white font-semibold">--/--</p>
            </div>
          </div>
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
