import { BaseButtonProps, ButtonActionProps } from "@/lib/global.type";
import { Button } from "../ui/button";

export function InfoButton(props: BaseButtonProps & ButtonActionProps) {
    return (
        <Button onClick={props.onClick} className={`bg-[#65AD2E] hover:bg-[#65AD2E]/80 text-white hover:opacity-90 ${props.rouded ? props.rouded : 'rounded-full'}`}>{props.title}</Button>
    )
}