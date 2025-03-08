export function TransactionStatusSkeleton() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center animate-pulse">
            {/* Icon Skeleton */}
            <div className="h-16 w-16 bg-gray-300 rounded-full mx-auto mb-6"></div>
            {/* Judul Skeleton */}
            <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
            {/* Pesan Skeleton */}
            <div className="h-4 bg-gray-300 rounded w-5/6 mx-auto mb-6"></div>
    
            {/* Kartu Kredit Skeleton */}
            <div className="credit-card mt-8 mb-6 mx-auto w-full max-w-xs p-4 rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-blue-600">
              <div className="flex justify-between items-center mb-4 mt-4">
                <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                <div className="w-12 h-8 bg-white rounded-sm flex items-center justify-center shadow-md">
                  <div className="h-6 w-6 bg-gray-300 rounded"></div>
                </div>
              </div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="h-4 bg-gray-300 rounded w-16 mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded w-24"></div>
                </div>
                <div>
                  <div className="h-4 bg-gray-300 rounded w-16 mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded w-16"></div>
                </div>
              </div>
            </div>
    
            {/* Detail Transaksi Skeleton */}
            <div className="text-left space-y-2">
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
    
            {/* Tombol Skeleton */}
            <div className="mt-6">
              <div className="h-10 bg-gray-300 rounded w-full"></div>
            </div>
          </div>
        </div>
      );
}