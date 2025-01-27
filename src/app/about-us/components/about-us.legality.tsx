import { FooterBackgroundContent } from "@/app/footer-components/footer-content.background";

export function AboutUsLegality() {
  return (
    <>
      <FooterBackgroundContent backgroundColor="bg-white">
        <div className="flex flex-col items-center text-center py-12 px-6">
          <h1 className="text-xl md:text-4xl font-extrabold text-green-600 mb-6">
            Trusted & Legit!
          </h1>
          <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">
            Our Legality
          </h3>
          <div className="flex flex-col">
            <h2 className="text-base md:text-lg font-semibold text-gray-700 mb-1">
              PT. SURYA UTAMA NIRMALA
            </h2>
            <span className="text-sm md:text-base text-gray-600 leading-relaxed max-w-3xl">
              Licensed Number: 9120300832964
            </span>
            <span className="text-sm md:text-base text-gray-600 leading-relaxed max-w-3xl">
              Bali - Indonesia
            </span>
          </div>
        </div>
      </FooterBackgroundContent>
    </>
  );
}
