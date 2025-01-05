import * as React from "react";

import { cn } from "@/lib/utils";

export interface AdormentInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startAdornment?: JSX.Element;
  endAdornment?: JSX.Element;
}

const AdormentInput = React.forwardRef<HTMLInputElement, AdormentInputProps>(
  ({ className, type, startAdornment, endAdornment, ...props }, ref) => {
    return (
      <>
        <div
          className="flex items-center justify-center gap-2 h-10 rounded-md border border-input bg-transparent ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50"
          data-disabled={props.disabled}
        >
          {startAdornment && (
            <div
              className={cn(
                "flex items-center justify-center h-full text-muted-foreground"
              )}
            >
              {startAdornment}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "flex h-full w-full rounded-md bg-transparent py-2 text-sm file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground shadow-none outline-none border-none focus-visible:outline-none focus-visible:border-none focus-visible:shadow-none",
              className
            )}
            ref={ref}
            {...props}
          />
          {endAdornment && (
            <div
              className={cn(
                "flex items-center justify-center h-full text-muted-foreground"
              )}
            >
              {endAdornment}
            </div>
          )}
        </div>
      </>
    );
  }
);
AdormentInput.displayName = "AdormentInput";

export { AdormentInput };
