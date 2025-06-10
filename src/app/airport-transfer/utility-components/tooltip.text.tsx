import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

export function ToolTipText({
  children,
  title,
}: {
  children: React.ReactNode;
  title: React.ReactNode;
}) {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            {title}
          </TooltipTrigger>
          <TooltipContent className="bg-white border border-gray-200 text-black text-base shadow-sm max-w-sm w-full">
            {children}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
