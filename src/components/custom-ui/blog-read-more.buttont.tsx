import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export function BlogReadMoreButton() {
  return (
    <>
      <Button
        className="bg-[#008000]  hover:bg-[#008000] hover:opacity-90 sm:w-auto hover:underline text-white"
      >
        Read more <ArrowRight className="ml-2 size-4" />{" "}
      </Button>
    </>
  );
}
