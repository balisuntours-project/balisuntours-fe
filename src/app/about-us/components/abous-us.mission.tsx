import { FooterBackgroundContent } from "@/app/footer-components/footer-content.background";

export function AboutUsMissionBST() {
  return (
    <FooterBackgroundContent backgroundColor="bg-white">
      <div className="flex flex-col items-center text-center py-12 px-6">
      <h1 className="text-xl md:text-4xl font-extrabold text-green-600 mb-6">
          What is Our Goal?
        </h1>
        <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">
          Delivering the Best Travel Experience in Bali
        </h3>
        <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl">
          To provide exceptional travel experiences with 100+ professional drivers,
          diverse vehicles, and outstanding service that ensures guest
          satisfaction.
        </p>
      </div>
    </FooterBackgroundContent>
  );
}
