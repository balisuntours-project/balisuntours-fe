import { FooterBackgroundContent } from "@/app/footer-components/footer-content.background";
import Image from "next/image";

export function AboutUsWhatYouGet() {
  return (
    <>
      <FooterBackgroundContent backgroundColor="bg-gray-50">
        <div className="flex flex-col items-center text-center py-12 px-6">
          <h1 className="text-xl md:text-4xl font-extrabold text-green-600 mb-6">
            What You Get
          </h1>
          <div className="grid grid-cols-12 gap-6">
            <div className="flex flex-col gap-3 col-span-12 md:col-span-4">
              <Image
                src="/tailored.png"
                objectFit="cover"
                width={100}
                height={100}
                className="h-[50px] w-[50px] md:h-[75px] md:w-[75px] mx-auto"
                alt="benefit-svg"
              />
              <h2 className="text-base md:text-lg font-bold">
                Customers Simplicity
              </h2>
              <p className="text-sm md:text-base text-gray-600">
                Providing the easiest way to book tours, activities, and
                experiences for all customers through technology innovation.
              </p>
            </div>
            <div className="flex flex-col gap-3 col-span-12 md:col-span-4">
              <Image
                src="/local-culture.png"
                objectFit="cover"
                width={100}
                height={100}
                className="h-[50px] w-[50px] md:h-[75px] md:w-[75px] mx-auto"
                alt="benefit-svg"
              />
              <h2 className="text-base md:text-lg font-bold">
                Accentuate Local Culture
              </h2>
              <p className="text-sm md:text-base text-gray-600">
                Our teams knowledgeable of Balinese culture with safety and
                comfortable services as top priority concern.
              </p>
            </div>
            <div className="flex flex-col gap-3 col-span-12 md:col-span-4">
              <Image
                src="/togetherness.png"
                objectFit="cover"
                width={100}
                height={100}
                className="h-[50px] w-[50px] md:h-[75px] md:w-[75px] mx-auto"
                alt="benefit-svg"
              />
              <h2 className="text-base md:text-lg font-bold">Togetherness</h2>
              <p className="text-sm md:text-base text-gray-600">
                Enriching collaborations with others for uniqueness and
                sustainable tours and activities experiences.
              </p>
            </div>
          </div>
        </div>
      </FooterBackgroundContent>
    </>
  );
}
