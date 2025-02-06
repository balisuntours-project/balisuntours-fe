import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ButtonActionProps } from "@/lib/global.type";

export function UnTriggeredConfirmationDialog({
  openState,
  dialogTitle,
  dialogDescription,
  onClick,
  onClickCancel,
}: {
  openState: boolean;
  dialogTitle: string;
  dialogDescription?: string;
} & ButtonActionProps) {
  return (
    <AlertDialog open={openState}>
      <AlertDialogContent className="max-w-xs md:max-w-lg rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClickCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onClick}
            className="bg-[#008000]  hover:bg-[#008000] hover:opacity-90"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
