import { FooterBackgroundContent } from "@/app/footer-components/footer-content.background";

export function AboutUsWhatIsBST() {
  return (
    <FooterBackgroundContent backgroundColor="bg-gray-50">
      <div className="flex flex-col items-center text-center py-12 px-6">
        <h1 className="text-xl md:text-4xl font-extrabold text-green-600 mb-6">
          What is Bali Sun Tours?
        </h1>
        <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">
          Your Trusted Travel Agent in Bali
        </h3>
        <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl">
          Bali Sun Tours is a premier travel agent since 2013 specializing in transportation, tours, and exciting travel experiences. We are also expanding into the hotel industry in Bali, catering to both domestic and international guests.
        </p>
      </div>
    </FooterBackgroundContent>
  );
}
