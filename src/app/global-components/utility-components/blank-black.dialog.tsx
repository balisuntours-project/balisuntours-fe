import {
  Dialog,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

export function BlankBlackDialog({
  children,
  content,
}: {
  children: React.ReactNode;
  content?: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>{children}</div>
      </DialogTrigger>
      <DialogOverlay className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
        {content && (
          <div className="relative z-50 w-full px-7 md:px-0 md:max-w-screen-sm lg:max-w-screen-lg">
            {/* Konten utama */}
            {content}
            {/* Tombol Close */}
            <DialogClose asChild>
                <div className="absolute right-4 top-4 bg-white rounded-full p-1 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
                </div>
             
            
            </DialogClose>
          </div>
        )}
      </DialogOverlay>
    </Dialog>
  );
}
