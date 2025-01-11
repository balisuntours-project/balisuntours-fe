import { Input } from "@/components/ui/input";
import { api }from "@/lib/axios-instance";
import { SearchIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Activity } from "@/app/responses/activity/response";
import { ActivityAction } from "@/app/actions/activity/action";
import { useAllActivityStore } from "@/app/store/all-activity.store";

export function SearchBoxComponent({
  className,
  inputClassName,
  listClassName,
  showSearchIcon = true,
}: {
  className?: string;
  inputClassName?: string;
  listClassName?: string;
  showSearchIcon?: boolean;
}) {
  const [placeHolders, setPlaceHolders] = useState<Array<string>>([]);
  const [currentPlaceholder, setCurrentPlaceholder] = useState<string>(
    "Find Best Attractions"
  );
  const [placeholderIndex, setPlaceholderIndex] = useState<number>(0);
  const [isShowList, setIsShowList] = useState("");
  const [activityTitles, setActivityTitles] = useState<
    Array<Pick<Activity, "uuid" | "title" | "slug">>
  >([]);

  const setOnFiltering = useAllActivityStore((state) => state.setOnFiltering);
  const setSearchBoxValue = useAllActivityStore(
    (state) => state.setSearchBoxValue
  );
  const searchBoxValue = useAllActivityStore((state) => state.searchBoxValue);

  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const commandInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBoxValue(e.target.value.length > 0 ? e.target.value : undefined);
    setOnFiltering(true);
    setIsShowList(e.target.value.length > 0 ? e.target.value : "");

    setTimeout(() => {
      setOnFiltering(false);
    }, 500);
  };

  const getPopularActivityPlaceholder = async (): Promise<void> => {
    const finalResult = await ActivityAction.GetPopularActivityTitleForPlaceholder()
      setPlaceHolders(finalResult.data);
  };

  const getAllActivitiesTitle = async (): Promise<void> => {
    const result = await ActivityAction.GetActivityTitleWithSlug();
    setActivityTitles(result.data);
  };

  const toAllActivity = () => {
    if (isShowList.length < 1) {
      return;
    }
    router.push(
      `/customer/activities?title=${isShowList}`
    );
  };

  useEffect(() => {
    getAllActivitiesTitle();
    getPopularActivityPlaceholder();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) =>
        placeHolders.length > 0 ? (prevIndex + 1) % placeHolders.length : 0
      );
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [placeHolders]);

  useEffect(() => {
    if (placeHolders.length > 0) {
      setCurrentPlaceholder(placeHolders[placeholderIndex]);
    }
  }, [placeholderIndex, placeHolders]);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsShowList(""); // Hide the list if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${
        className ?? "relative mt-6 md:w-[70%] lg:w-[40%] mx-auto"
      } relative`}
    >
      <Command>
        <div className="relative">
          <CommandInput
            value={searchBoxValue || ""}
            onInput={commandInput}
            placeholder={currentPlaceholder}
            className={`${
              inputClassName ??
              "pr-20 w-full bg-white h-12 rounded-lg text-base md:text-sm"
            }`}
          />
          {showSearchIcon && (
            <button
              onClick={() => toAllActivity()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#008000] text-white px-4 py-2 rounded-lg font-semibold text-xs md:text-sm"
            >
              Search
            </button>
          )}
        </div>
        <CommandList
          className={`${isShowList.length > 0 ? "block" : "hidden"} ${
            listClassName ?? "max-h-[200px] overflow-y-scroll  w-full text-start scrollbar-hide"
          }`}
        >
          <CommandEmpty>No activities found.</CommandEmpty>
          {activityTitles?.length > 0 &&
            activityTitles.map((activity) => (
              <CommandItem key={activity.uuid} asChild>
                <Link
                  href={`/customer/preview/activity/${activity.slug}`}
                  target="_blank"
                >
                  {activity.title}
                </Link>
              </CommandItem>
            ))}
        </CommandList>
      </Command>
    </div>
  );
}
