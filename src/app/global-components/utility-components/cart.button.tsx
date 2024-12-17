import { Button } from "@/components/ui/button";
import { ButtonActionProps } from "@/lib/global.type";

export function CartButton({
  children,
  disabled,
  onClick,
}: { children: React.ReactNode; disabled?: boolean } & ButtonActionProps) {
  return (
    <>
      {!disabled ? (
        <Button
          onClick={onClick}
          variant="default"
          className="flex-1 px-8 md:px-3 lg:px-8 py-3 h-12 bg-gradient-to-r bg-[#65AD2E] hover:bg-[#65AD2E]/80 text-white font-bold  transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
        >
          {children}
        </Button>
      ) : (
        <Button
          onClick={onClick}
          variant="default"
          disabled={true}
          className="flex-1 px-8 md:px-3 lg:px-8 py-3 h-12 bg-gradient-to-r from-[#65AD2E] to-[#65AD2E] text-white font-bold rounded-lg opacity-75 transition-transform transform-gpu hover:cursor-not-allowed hover:shadow-none"
        >
          {children}
        </Button>
      )}
    </>
  );
}
