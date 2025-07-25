import Image from "next/image";
import Link from "next/link";

export function WhatsappFixedBadge({
  templateMessage,
  bottomHeightAfterComponent,
}: {
  templateMessage?: string;
  bottomHeightAfterComponent?: string;
}) {
  return (
    <div className={`fixed z-20 right-2 md:right-4 ${bottomHeightAfterComponent ? bottomHeightAfterComponent : "bottom-4"}`}>
      <Link
        href={`https://wa.me/6285211005008?text=${templateMessage ?? "Hello Bali SUN Tours"}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-8 h-8 md:w-14 md:h-14 hover:scale-105 transition-transform duration-200"
        aria-label="Chat via WhatsApp"
      >
        <Image
          src="/whatsapp.png"
          alt="WhatsApp Icon"
          className="w-full h-full object-contain drop-shadow-lg"
          width={50}
          height={50}
        />
      </Link>
    </div>
  );
}
