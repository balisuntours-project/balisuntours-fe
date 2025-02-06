// pages/404.tsx
import { Button } from "@/components/ui/button"; // ShadCN Button
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 px-6 overflow-hidden">
      {/* Logo sebagai latar belakang */}
      <div className="absolute inset-0 flex justify-center items-center opacity-10 pointer-events-none">
        <Image
          src="/bst-logo-dark-green.png" // Ganti dengan path logo perusahaan Anda
          alt="Balisuntours Logo"
          width={500} // Ukuran logo besar
          height={500}
          className="object-contain"
        />
      </div>

      {/* Konten utama */}
      <div className="relative text-center max-w-lg z-10">
        {/* Judul dan teks */}
        <h1 className="text-8xl font-extrabold mb-4 text-[#008000]">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Oops! Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-6">
          The page you&quot;re looking for might have been removed, or is
          temporarily unavailable. Let’s get you back on track.{" "}
          <Link
            href="/customer/activities"
            className="text-lg text-blue-500 underline mb-6"
          >
            See more activities here!
          </Link>
        </p>

        {/* Tombol Kembali */}
        <Link href="/">
          <Button
            variant="default"
            className="px-6 py-3 text-lg bg-[#008000] text-white hover:bg-[#008000]/80"
          >
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Footer */}
      <div className="relative mt-8 text-sm text-gray-500 z-10">
        &copy; {new Date().getFullYear()} Bali Sun Tours. Exceed your needs.
      </div>
    </div>
  );
}
