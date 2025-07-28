"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function QrisIllustration({ name }: { name: string }) {
  const [qrPattern, setQrPattern] = useState<boolean[]>([]);

  useEffect(() => {
    // Generate random pattern once on mount (only on client)
    const pattern = Array.from({ length: 36 }, () => Math.random() > 0.5);
    setQrPattern(pattern);
  }, []);
  return (
    <>
      <div className="qris-card mt-8 mb-6 mx-auto w-full max-w-xs p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300 ease-in-out bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="flex justify-between items-center mb-4 mt-4">
          <h4 className="text-white font-bold text-lg">QRIS Payment</h4>
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

        <div className="bg-white rounded-md p-4 shadow-inner flex items-center justify-center mb-4">
          <div className="w-28 h-28 bg-gray-300 grid grid-cols-6 grid-rows-6 gap-[2px]">
            {qrPattern.map((isBlack, i) => (
              <div
                key={i}
                className={`w-full h-full ${isBlack ? "bg-black" : "bg-white"}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center text-white">
          <p className="text-sm uppercase">Customer name</p>
          <p className="font-semibold text-base">{name}</p>

          {/* <p className="text-xs italic">
            Scan the QR above to complete your payment
          </p> */}
        </div>
      </div>
    </>
  );
}
