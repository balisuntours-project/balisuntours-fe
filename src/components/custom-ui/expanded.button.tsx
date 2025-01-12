import { BaseButtonProps, ButtonActionProps } from "@/lib/global.type";
import { Button } from "../ui/button";

export function ExpandedButton(props: BaseButtonProps & ButtonActionProps) {
  return (
    <Button
      onClick={props.onClick}
      variant="outline"
      className="hover:bg-[#008000] hover:text-white border-[1px] border-[#008000] w-full text-wrap"
    >
      {props.title}
    </Button>
  );
}
