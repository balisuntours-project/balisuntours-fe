import Link from "next/link";

export function FooterFooterSection({useFixedStyle} : {useFixedStyle?: boolean}) {
  return (
    <>
      <div className={`${useFixedStyle ? "lg:fixed lg:bottom-0 lg:w-full bg-white lg:z-50" : ""}`}>
        <div className="flex pb-5 px-3 m-auto pt-5 border-t text-gray-800 text-xs md:text-sm flex-col w-full max-w-full items-center">
          <Link href="/" className="md:my-2 text-black no-underline hover:text-black">© 2013 - 2025 PT. Surya Utama Nirmala</Link>
        </div>
      </div>
    </>
  );
}
