export function PriceListSkeleton() {
    return (
      <div className="w-full p-4 rounded-lg mb-2">
        {/* Skeleton untuk judul */}
        <div className="mb-2">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
  
        {/* Skeleton untuk harga dan tombol */}
        <div className="grid grid-cols-12 gap-4 items-center">
          <div className="col-span-6">
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
          <div className="col-span-6 flex justify-end items-center gap-2">
            {/* Skeleton untuk tombol minus */}
            <div className="h-7 w-7 bg-gray-300 rounded-md"></div>
            {/* Skeleton untuk jumlah */}
            <div className="h-5 w-8 bg-gray-300 rounded"></div>
            {/* Skeleton untuk tombol plus */}
            <div className="h-7 w-7 bg-gray-300 rounded-md"></div>
          </div>
        </div>
  
        {/* Skeleton untuk informasi tambahan */}
        <div className="mt-2">
          <div className="h-3 bg-gray-300 rounded w-2/3"></div>
        </div>
      </div>
    );
  }
  