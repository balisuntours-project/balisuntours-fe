"use client";

import { IncrementDecrementEnum } from "@/app/enums/activity/activity.enum";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

type ActionProps = {
  onClick: (action: IncrementDecrementEnum) => void;
  qty: number;
};

export function QtyPlusMinusSection({ onClick, qty }: ActionProps) {
  return (
    <div className="flex justify-end gap-4">
      <Button
        onClick={() => onClick(IncrementDecrementEnum.decrement)} // Panggil dengan aksi "decrement"
        className="h-7 w-7 my-auto"
        variant="outline"
        size="icon"
      >
        <Minus className="text-[#EB5E00]" />
      </Button>

      <span className="text-base font-extrabold flex justify-center items-center text-center">
        {qty}
      </span>

      <Button
        onClick={() => onClick(IncrementDecrementEnum.increment)} // Panggil dengan aksi "increment"
        className="h-7 w-7 my-auto"
        variant="outline"
        size="icon"
      >
        <Plus className="text-[#EB5E00]" />
      </Button>
    </div>
  );
}
