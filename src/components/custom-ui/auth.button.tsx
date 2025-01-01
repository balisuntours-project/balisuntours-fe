import { BaseButtonProps, ButtonActionProps } from "@/lib/global.type";
import { Button } from "../ui/button";

export function AuthButton(props: BaseButtonProps & ButtonActionProps) {
    return (
        <Button onClick={props.onClick} className={`bg-[#008000]  hover:bg-[#008000] hover:opacity-90 ${props.rouded ? props.rouded : 'rounded-full'}`}>{props.title}</Button>
    )
}