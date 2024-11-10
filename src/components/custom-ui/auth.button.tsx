import { BaseButtonProps } from "@/lib/global.type";
import { Button } from "../ui/button";

export function AuthButton(props: BaseButtonProps) {
    return (
        <Button className={`bg-[#008000]  hover:bg-[#008000] hover:opacity-90 ${props.rouded ? props.rouded : 'rounded-full'}`}>{props.title}</Button>
    )
}