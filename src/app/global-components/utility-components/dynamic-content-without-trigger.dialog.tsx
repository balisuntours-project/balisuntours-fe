import { useLoaderStore } from "@/app/store/loader.store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

export function DynamicDialogWithTrigger({
  trigger,
  children,
  title,
  useSmallVersion,
}: {
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  title?: string;
  useSmallVersion?: boolean;
}) {
  const dynamicDialogOpen = useLoaderStore((state) => state.dynamicDialogOpen);
  const setDynamicDialogOpen = useLoaderStore(
    (state) => state.setDynamicDialogOpen
  );

  return (
    <Dialog open={dynamicDialogOpen} onOpenChange={setDynamicDialogOpen}>
      {trigger && (
        <div onClick={() => setDynamicDialogOpen(true)}>{trigger}</div>
      )}

      <DialogContent
        className={`${
          !useSmallVersion
            ? "max-w-[340px] md:max-w-2xl lg:max-w-5xl"
            : "max-w-[340px] md:max-w-xl lg:max-w-3xl"
        } rounded-lg w-full px-4 py-8 sm:px-8 sm:py-8 md:px-10 md:py-10 max-h-[90vh] overflow-y-auto`}
      >
        <DialogHeader>
          <DialogTitle className="mb-3">{title}</DialogTitle>
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
