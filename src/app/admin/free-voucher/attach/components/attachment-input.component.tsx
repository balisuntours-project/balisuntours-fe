"use client";
import { FreeVoucherAction } from "@/app/actions/free-voucher/action";
import {
  ActivityListResponse,
  PackageListResponse,
  PriceListResponse,
} from "@/app/responses/free-voucher/response";
import { FormLabel } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { InputSkeleton } from "@/app/skeletons-component/input.skeleton";
import { useFreeVoucherStore } from "@/app/store/free-voucher.store";

export function AttachmentInputComponent() {
  const [activityList, setActivityList] = useState<Array<ActivityListResponse>>(
    []
  );
  const [packageList, setPackageList] = useState<Array<PackageListResponse>>(
    []
  );
  const [priceList, setPriceList] = useState<Array<PriceListResponse>>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [valueActivity, setValueActivity] = useState<string>("");
  const [valuePackage, setValuePackage] = useState<string>("");
  const [valueActivitySkeleton, setValueActivitySkeleton] =
    useState<boolean>(false);
  const [valuePackageSkeleton, setValuePackageSkeleton] =
    useState<boolean>(false);
    
  const setSelectedPriceUuid = useFreeVoucherStore((state) => state.setSelectedPriceUid)
  const selectedPriceUuid = useFreeVoucherStore((state) => state.selectedPriceUuid)

  const getActivityList = async () => {
    const action = await FreeVoucherAction.GetActivityList();
    setActivityList(action.data);
  };

  const getPackageList = async () => {
    setPackageList([]);
    const activity = activityList.find(
      (activity) => activity.title == valueActivity
    );
    if (activity) {
      setValueActivitySkeleton(true);
      if(selectedPriceUuid) {
        setValuePackageSkeleton(true)
      }
      const action = await FreeVoucherAction.GetPackageList(activity?.uuid);
      setPackageList(action.data);
      setValueActivitySkeleton(false);
      setValuePackageSkeleton(false)
    }
  };

  const getPriceList = async () => {
    setPriceList([]);
    if (valuePackage) {
      setValuePackageSkeleton(true);
      const action = await FreeVoucherAction.GetPriceList(valuePackage);
      setPriceList(action.data);
      setValuePackageSkeleton(false);
    }
  };

  useEffect(() => {
    getActivityList();
  }, []);

  useEffect(() => {
    if (valueActivity) {
      getPackageList();
    }
  }, [valueActivity]);

  useEffect(() => {
    if (valuePackage) {
      getPriceList();
    }
  }, [valuePackage]);

  return (
    <>
       <div className="col-span-12">
          <Label className="">Activity list</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {valueActivity
                  ? activityList.find(
                      (activity) => activity.title === valueActivity
                    )?.title
                  : "Select activity..."}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput
                  placeholder="Search activity..."
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No activity found.</CommandEmpty>
                  <CommandGroup>
                    {activityList.map((activity) => (
                      <CommandItem
                        key={activity.uuid}
                        value={activity.title}
                        onSelect={(currentValue) => {
                          setValueActivity(
                            currentValue === valueActivity ? "" : currentValue
                          );
                          setOpen(false);
                        }}
                      >
                        {activity.title}
                        <Check
                          className={cn(
                            "ml-auto",
                            valueActivity === activity.title
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="col-span-12">
          <Label className="">Package list</Label>
          {!valueActivitySkeleton ? (
            <Select onValueChange={(value) => setValuePackage(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select package..." />
              </SelectTrigger>
              <SelectContent id="package">
                {packageList.map((pack, key) => (
                  <SelectItem key={key} value={pack.uuid}>
                    {pack.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <InputSkeleton />
          )}
        </div>

        <div className="col-span-12">
          <Label className="">Price list</Label>
          {!valuePackageSkeleton ? (
            <Select onValueChange={(value) => setSelectedPriceUuid(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select price unit..." />
              </SelectTrigger>
              <SelectContent id="package">
                {priceList.map((price, key) => (
                  <SelectItem key={key} value={price.uuid}>
                    {price.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <InputSkeleton />
          )}
        </div>
    </>
  );
}
