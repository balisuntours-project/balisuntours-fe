import React from "react";

export function EmptyContent({
  children,
  emptyText,
  suggestionElement,
}: {
  children: React.ReactNode;
  emptyText: string;
  suggestionElement?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center gap-6 px-6 py-16">
      <div className="w-16 h-16 md:w-24 md:h-24 text-gray-500">{children}</div>

      {/* Short and Informative Text */}
      <div className="flex flex-col gap-3">
        <h2 className="text-lg md:text-xl font-semibold text-gray-700">
          {emptyText}
        </h2>
        {suggestionElement && (
          <div className="text-gray-500 text-sm md:text-base max-w-lg">
            {suggestionElement}
          </div>
        )}
      </div>
    </div>
  );
}
