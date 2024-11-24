"use client";
import { Input } from "@/components/ui/input";
import api from "@/lib/axios-instance";
import axios from "axios";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
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
import { Activity } from "@/app/response/activity.response";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function LandingPageSearchBoxUtility({
  flatPosition,
}: {
  flatPosition?: boolean;
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
  const commandInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsShowList(e.target.value.length > 0 ? e.target.value : "");
  };

  const router = useRouter();

  const getPopularActivityPlaceholder = async (): Promise<void> => {
    try {
      const result = await api.get("/customer/placeholder/latest/activity");

      setPlaceHolders(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllActivitiesTitle = async (): Promise<void> => {
    try {
      const result = await api.get("/customer/searchbox/title/activity");
      console.log(result.data);
      setActivityTitles(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toAllActivity = () => {
    if(isShowList.length < 1) {
      return
    }
    router.push(`${process.env.BACKEND_DOMAIN}/customer/activities?title=${isShowList}`)
  }

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

  // Update the current placeholder based on the placeholderIndex
  useEffect(() => {
    if (placeHolders.length > 0) {
      setCurrentPlaceholder(placeHolders[placeholderIndex]);
    }
  }, [placeholderIndex, placeHolders]);

  return (
    <>
      <div
        className={`${
          flatPosition
            ? "mx-auto w-[100%]"
            : "absolute top-1/2 left-1/2 transform -translate-x-1/2 md:-translate-y-1/4 lg:-translate-y-1/2"
        } md:w-[100%] bg-opacity-90 text-center p-6 z-10`}
      >
        {!flatPosition && (
          <h2 className="text-2xl md:text-5xl font-semibold text-white">
            Sleep Doesn’t Help If Your Soul That’s Tired,
          </h2>
        )}
        {!flatPosition && (
          <p className="text-lg md:text-xl text-white mt-3">
            Let’s Book Tours and Activities.
          </p>
        )}
        {/* Input with Search Icon and Button */}
        <div className="relative mt-6  md:w-[70%] lg:w-[40%] mx-auto ">
          <Command>
            <div className="relative">
              {/* <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <SearchIcon size={20} />
          </div> */}

              {/* Input Field */}
              <CommandInput
                onInput={commandInput}
                placeholder={currentPlaceholder}
                className="pr-20 w-full bg-white h-12 rounded-lg text-xs md:text-sm line-clamp-1"
              />

              {/* Search Button */}
              <button onClick={() => toAllActivity()} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#008000] text-white px-4 py-2 rounded-lg  font-semibold text-xs md:text-sm">
                Search
              </button>
            </div>
            <CommandList
              className={`${
                isShowList.length > 0 ? "block" : "hidden"
              } max-h-[200px] overflow-y-scroll scrollbar-hide`}
            >
              <CommandEmpty>No activities found.</CommandEmpty>
              {activityTitles?.length > 0 &&
                activityTitles.map((activity) => (
                  <CommandItem key={activity.uuid} asChild>
                    <Link
                      href={`${process.env.BACKEND_DOMAIN}/customer/preview/activity/${activity.slug}`}
                      target="_blank"
                    >
                      {activity.title}
                    </Link>
                  </CommandItem>
                ))}
            </CommandList>
          </Command>
        </div>
      </div>
    </>
  );
}
