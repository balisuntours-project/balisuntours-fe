"use client"
import React, { useState } from "react";
import { Star } from "lucide-react";

export function StarRating({ defaultValue = 4, onChange }: { defaultValue?: number; onChange?: (value: number) => void }) {
  const [rating, setRating] = useState(defaultValue);
  const [hover, setHover] = useState<number | null>(null);

  const handleClick = (value: number) => {
    setRating(value);
    if (onChange) {
      onChange(value);
    }
  };

  const handleMouseEnter = (value: number) => {
    setHover(value);
  };

  const handleMouseLeave = () => {
    setHover(null);
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        const isFilled = hover ? starValue <= hover : starValue <= rating;

        return (
          <Star
            key={index}
            className={`cursor-pointer transition-colors h-6 w-6 ${
              isFilled ? "text-yellow-500" : "text-gray-400"
            }`}
            fill={isFilled ? "currentColor" : "none"}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
          />
        );
      })}
    </div>
  );
}