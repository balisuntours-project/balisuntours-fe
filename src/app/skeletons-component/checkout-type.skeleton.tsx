export function CheckoutTypeSkeleton() {
  return (
    <>
      <div className="mt-2 lg:mt-4">
        <div className="flex flex-col">
          {/* Label Skeleton */}
          <div className="h-4 w-3/4 bg-gray-300 rounded-md mb-1 md:w-1/2 animate-pulse"></div>

          {/* Map Skeleton */}
          <div className="relative">
            <div className="w-full h-[250px] lg:h-[400px] mt-2 bg-gray-300 rounded-md animate-pulse"></div>

            {/* Form Skeleton */}
            <div className="mt-4 p-5 border-2 border-gray-300 rounded-lg flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-4">
              {/* Planned Itinerary Skeleton */}
              <div className="flex flex-col gap-1 col-span-2">
                <div className="h-4 w-1/2 bg-gray-300 rounded-md animate-pulse"></div>
                <div className="h-16 bg-gray-300 rounded-md animate-pulse"></div>
              </div>

              {/* Pickup Time Skeleton */}
              <div className="flex flex-col gap-1">
                <div className="h-4 w-1/2 bg-gray-300 rounded-md animate-pulse"></div>
                <div className="h-10 bg-gray-300 rounded-md animate-pulse"></div>
              </div>

              {/* Note Skeleton */}
              <div className="flex flex-col gap-1">
                <div className="h-4 w-1/2 bg-gray-300 rounded-md animate-pulse"></div>
                <div className="h-16 bg-gray-300 rounded-md animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
