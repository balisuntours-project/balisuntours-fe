import { BaseButtonProps, ButtonActionProps } from "@/lib/global.type";
import { Button } from "../ui/button";

export function DisabledButton(props: BaseButtonProps & ButtonActionProps) {
    return (
        <Button disabled onClick={props.onClick} className={`bg-gray-500  hover:bg-gray-500/80 hover:opacity-90 ${props.rouded ? props.rouded : 'rounded-full'}`}>{props.title}</Button>
    )
}