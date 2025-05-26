"use client";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AddVoucherPackageResponse,
  FreePackageUnitResponse,
} from "@/app/responses/free-voucher/response";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { UpdatePackageVoucherableParamater } from "@/app/paramaters/free-voucher/paramater";
import { FreeVoucherAction } from "@/app/actions/free-voucher/action";
import { useLoaderStore } from "@/app/store/loader.store";
import { TextLoader } from "@/app/global-components/utility-components/text-loader.popup";
import { HttpStatus } from "@/lib/global.enum";

export function AddFormComponent({
  activityPackage,
  freePackageUnits,
}: {
  activityPackage: AddVoucherPackageResponse;
  freePackageUnits: Array<FreePackageUnitResponse>;
}) {
  const { toast } = useToast();
  const [selectedPrices, setSelectedPrices] = useState<string[]>(
    activityPackage.affected_prices ?? []
  );
  const [selectedPackageUnit, setSelectedPackageUnit] = useState<
    string | undefined
  >(activityPackage.selected_free_package_unit_uuid ?? undefined);
  const setIsLoading = useLoaderStore((state) => state.setIsLoading);

  const togglePrice = (uuid: string) => {
    setSelectedPrices((prev) =>
      prev.includes(uuid) ? prev.filter((id) => id !== uuid) : [...prev, uuid]
    );
  };

  const handlePostVoucherable = async () => {
    if (selectedPackageUnit && selectedPackageUnit != "none") {
      if (selectedPrices.length < 1) {
        toast({
          description: `Choose affected prices!`,
          variant: "warning",
        });

        return;
      }
    }

    if (!selectedPackageUnit) {
      toast({
        description: `Choose free voucher package unit!`,
        variant: "warning",
      });

      return;
    }

    if (selectedPrices.length > 0) {
      if (!selectedPackageUnit || selectedPackageUnit == "none") {
        toast({
          description: `Choose free voucher package unit!`,
          variant: "warning",
        });

        return;
      }
    }

    const payload: UpdatePackageVoucherableParamater = {
      affected_prices: selectedPackageUnit == "none" ? null : selectedPrices,
      selected_package_unit_uuid:
        selectedPackageUnit == "none" ? null : selectedPackageUnit,
    };

    setIsLoading(true);
    const result = await FreeVoucherAction.EditVoucherablePackage(
      payload,
      activityPackage.uuid
    );
    setIsLoading(false);

    if (!result.success) {
      toast({
        description: `${result.data}`,
        variant:
          result.status_code == HttpStatus.INTERNAL_SERVER_ERROR
            ? "danger"
            : "info",
      });
      return;
    }

    toast({
      description: `Attachment success`,
      variant: "success",
    });

    return;
  };

  useEffect(() => {
    if (selectedPackageUnit == "none") {
      setSelectedPrices([]);
    }
  }, [selectedPackageUnit]);

  useEffect(() => {
    console.log(activityPackage.affected_prices)
  }, [])

  return (
    <>
      <TextLoader title="Hold a second" text="Attaching voucherable..." />
      <div className="px-4 pb-11 max-w-xl mx-auto space-y-6">
        {/* Judul */}
        <h2 className="text-lg font-semibold">
          Add affected voucher price unit for package{" "}
          <span className="text-primary">{activityPackage.title}</span>
        </h2>

        {/* Select Input */}
        <div className="space-y-2">
          <Label>Voucher Type</Label>
          <Select
            value={selectedPackageUnit}
            onValueChange={(value) => setSelectedPackageUnit(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a voucher type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key={0} value="none">
                None
              </SelectItem>
              {freePackageUnits.map((unit, index) => (
                <SelectItem key={index + 1} value={unit.uuid}>
                  {unit.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Checklist Price Units */}
        <div className="space-y-3">
          <Label>Select affected price units</Label>
          {activityPackage.prices.map((price) => (
            <div key={price.uuid} className="flex items-center space-x-3">
              <Checkbox
                id={price.uuid}
                disabled={!selectedPackageUnit || selectedPackageUnit == "none"}
                checked={selectedPrices.includes(price.uuid)}
                onCheckedChange={() => togglePrice(price.uuid)}
              />
              <Label htmlFor={price.uuid}>
                {price.title} – Rp{price.price.toLocaleString()} /{" "}
                {price.price_suffix}
              </Label>
            </div>
          ))}
        </div>

        <div
          className={
            //  GlobalUtility.CheckScreenOnMobile()
            //   ? "fixed bottom-0 left-0 w-full rounded-t-2xl border-t border-gray-300 bg-white h-auto p-6 z-10 "
            //   :  "md:flex gap-4 items-start"
            "md:flex md:gap-4 md:items-start md:rounded-none md:border-none md:p-0 md:z-auto md:static fixed bottom-0 left-0 w-full rounded-t-2xl border-t border-gray-300 bg-white h-auto p-6 z-10 "
          }
        >
          <Button
            onClick={handlePostVoucherable}
            className="ml-auto mt-2 md:mt-0 w-full md:w-auto px-5 py-3 bg-gradient-to-r bg-[#EB5E00] text-white font-bold rounded-lg transition-transform transform-gpu hover:bg-[#EB5E00]/80 hover:-translate-y-1 hover:shadow-lg"
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}
