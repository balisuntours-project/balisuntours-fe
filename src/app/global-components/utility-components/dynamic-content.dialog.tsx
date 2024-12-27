import { useLoaderStore } from "@/app/store/loader.store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

export function DynamicDialog({
  trigger,
  children,
  title,
  useSmallVersion,
}: {
  trigger: React.ReactNode;
  children?: React.ReactNode;
  title?: string;
  useSmallVersion?: boolean;
}) {
  const forceCloseDialog = useLoaderStore((state) => state.forceCloseDialog);
  const setForceCloseDialog = useLoaderStore(
    (state) => state.setForceCloseDialog
  );
  const [isOpen, setIsOpen] = useState(false);

  // Effect untuk menutup dialog ketika forceCloseDialog berubah menjadi true
  useEffect(() => {
    if (forceCloseDialog) {
      setIsOpen(false); // Menutup dialog
      setForceCloseDialog(false); // Mengembalikan nilai forceCloseDialog ke false
    }
  }, [forceCloseDialog, setForceCloseDialog]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {/* Render trigger dari komponen parent */}
          <div>{trigger}</div>
        </DialogTrigger>
        <DialogContent
          className={`${
            !useSmallVersion
              ? "max-w-[340px] md:max-w-2xl lg:max-w-5xl "
              : "max-w-[340px] md:max-w-xl lg:max-w-3xl "
          } rounded-lg w-full px-4 py-8 sm:px-8 sm:py-8 md:px-10 md:py-10 max-h-[90vh] overflow-y-auto`}
        >
          <DialogHeader>
            <DialogTitle className="mb-3">{title}</DialogTitle>

            {children}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
