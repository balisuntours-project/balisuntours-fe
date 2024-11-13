import { BaseButtonProps } from "@/lib/global.type";
import { Button } from "../ui/button";

export function ExpandedButton(props: BaseButtonProps) {
    return (
        <Button variant="outline" className="hover:bg-[#008000] hover:text-white border-[1px] border-[#008000] w-full text-wrap">{props.title}</Button>
    )
}