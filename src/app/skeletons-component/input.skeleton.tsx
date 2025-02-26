export function InputSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={`
            border border-gray-300 rounded-md p-2 
            animate-pulse bg-gray-200 ${className}
          `}
    >
      <div className="h-5 w-full"></div>
    </div>
  );
}
