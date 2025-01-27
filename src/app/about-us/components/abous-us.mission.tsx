import { FooterBackgroundContent } from "@/app/footer-components/footer-content.background";

export function AboutUsMissionBST() {
  return (
    <FooterBackgroundContent backgroundColor="bg-white">
      <div className="flex flex-col items-center text-center py-12 px-6">
        <h1 className="text-xl md:text-4xl font-extrabold text-green-600 mb-6">
          Our Goal
        </h1>
        <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">
          Delivering Tour Services that Exceed Your Needs
        </h3>
        <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl">
          Facilitate travellers the easiest way to experience Bali by innovation
          to create unforgettable, memorable, and high-quality moments.
        </p>
        <br />
        <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl">
          ⁠Providing professional team that responsive, knowledgeable of local
          culture, unique and helpful, attentive and always ready to give the
          service beyond your expectation.
        </p>
      </div>
    </FooterBackgroundContent>
  );
}
