import Image from "next/image";
import Link from "next/link";

export function SmallNavbar() {
  return (
    <>
      <nav className="w-auto text-subtitle-2 text-white bg-[#5FA22A] h-[300px]">
        <div className="flex justify-center py-12">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/bst-logo-white.png"
              alt="best-travell-agent-bali-sun-tours"
              width="250"
              height="100"
              objectFit="cover"
              /* className="w-[100px] h-[35px] md:w-[135px] md:h-[45px]" */
            />
          </Link>
        </div>
      </nav>
    </>
  );
}
