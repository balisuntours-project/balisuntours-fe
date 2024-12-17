import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export function DynamicDialog({
    trigger,
    children,
    title
  }: {
    trigger: React.ReactNode;
    children?: React.ReactNode;
    title?: string
  }) {
    return (
        <>
          <Dialog>
            <DialogTrigger asChild>
                {/* Render trigger dari komponen parent */}
                <div>
                    {trigger}
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-[340px] rounded-lg md:max-w-2xl lg:max-w-5xl w-full px-4 py-8 sm:px-8 sm:py-8 md:px-10 md:py-10">
                <DialogHeader>
                    <DialogTitle className="mb-3">
                       {title}
                    </DialogTitle>

                    {children}
                </DialogHeader>
            </DialogContent>
        </Dialog>
        </>
    )
}