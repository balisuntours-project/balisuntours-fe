// app/maintenance/page.tsx (jika pakai app dir)
// atau pages/maintenance.tsx (jika pakai pages dir)

import { AlertTriangle } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Maintenance | Your Website",
  description: "We’re currently performing scheduled maintenance.",
};

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-lg text-center space-y-4 border border-gray-200">
        <div className="flex justify-center">
          <Image
            src="/bst-logo-dark-green.png"
            alt="best-travell-agent-bali-sun-tours"
            width="135"
            height="58"
            className="w-[150px] h-[35px] md:w-[200px] md:h-[45px]"
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">
          We'll Be Back Soon!
        </h1>
        <p className="text-gray-600">
          Our website is currently undergoing scheduled maintenance. We are
          working hard to bring everything back online as quickly as possible.
        </p>
        <p className="text-sm text-gray-500">
          Thank you for your patience and understanding. Please check back
          shortly.
        </p>
        <div className="mt-4">
          <p className="text-sm text-gray-400">
            &mdash; Bali Sun Tours
          </p>
        </div>
      </div>
    </div>
  );
}
