"use client";

import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { CircleCheckBig, CircleX, Info, Siren } from "lucide-react";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        variant,
        ...props
      }) {
        return (
          <Toast key={id} variant={variant} {...props}>
            <div className="flex items-center gap-2 md:gap-4">
              {variant === "success" && (
                <CircleCheckBig  strokeWidth={2.75}
                className="h-9 w-9 text-green-500 items-start" />
              )}
              {variant === "danger" && (
                <CircleX  strokeWidth={2.75}
                className="h-9 w-9 text-red-500 items-start" />
              )}
              {variant === "info" && (
                <Info  strokeWidth={2.75}
                className="h-9 w-9 text-blue-500 items-start" />
              )}
              {variant === "warning" && (
                <Siren  strokeWidth={2.75}
                className="h-9 w-9 text-yellow-500 items-start" />
              )}
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
