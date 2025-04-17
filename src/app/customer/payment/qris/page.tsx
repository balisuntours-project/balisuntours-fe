import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function QrisPaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const qrisImageUrl = (await searchParams)?.code;
  if (!qrisImageUrl) {
    notFound();
  }
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br px-4 py-12">
        <Card className="w-full max-w-md shadow-xl border-none rounded-2xl bg-white">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold text-orange-600 mb-2">
              Complete Your Payment
            </h1>
            <p className="text-sm text-gray-600 mb-4">
              Scan the QR code below using your e-wallet or mobile banking app
              to complete your payment securely.
            </p>

            <div className="w-60 h-60 relative mb-4">
              <a href={qrisImageUrl as string} download="balisuntours-qris.png">
                <img
                  src={qrisImageUrl as string}
                  alt="QRIS Payment"
                  className="w-60 h-60 object-contain rounded-lg border"
                />
              </a>
            </div>

            <p className="text-xs text-gray-500 mb-4">
              This QR code is generated for your current booking. Please do not
              share it with others.
            </p>

            <div className="mt-6 w-full max-w-full flex">
              <Link
                href={"/"}
                className="bg-gradient-to-r from-[#EB5E00] to-orange-500 text-white px-4 py-2 rounded hover:shadow-lg hover:from-orange-600 hover:to-orange-400 transition w-full"
              >
                Back to Home
              </Link>
            </div>

            <hr className="w-full my-6 border-t" />

            <div className="text-xs text-gray-500 text-center">
              <p>
                <strong>Bali Sun Tours</strong>
              </p>
              <p>Exceed your needs</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
