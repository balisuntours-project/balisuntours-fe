import { SearchBoxComponent } from "./searchbox";

export function LandingPageSearchBoxUtility({
  flatPosition,
}: {
  flatPosition?: boolean;
}) {
  return (
    <>
      <div
        className={`${
          flatPosition
            ? "mx-auto w-[100%]"
            : "absolute top-1/2 left-1/2 transform -translate-x-1/2 md:-translate-y-1/4 lg:-translate-y-1/2"
        } md:w-[100%] bg-opacity-90 text-center p-6 z-10`}
      >
        {!flatPosition && (
          <h1 className="text-2xl md:text-5xl font-semibold text-white">
            Exceed Your Needs,
          </h1>
        )}
        {!flatPosition && (
          <h2 className="text-lg md:text-xl text-white mt-3">
            Let’s Book Tours and Activities.
          </h2>
        )}
        {/* Input with Search Icon and Button */}
        <SearchBoxComponent />
      </div>
    </>
  );
}
