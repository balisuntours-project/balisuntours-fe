"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ActivityTitleCard } from "@/app/global-components/utility-components/activity-title.card";
import { useToast } from "@/hooks/use-toast";
import { StoreFreeVoucherSchema } from "../validation/store.validation";
import { Input } from "@/components/ui/input";
import { CHECKOUT_INPUT_STYLE } from "@/lib/global.constant";
import { AttachmentInputComponent } from "./attachment-input.component";
import { useLoaderStore } from "@/app/store/loader.store";
import { Button } from "@/components/ui/button";
import { TextLoader } from "@/app/global-components/utility-components/text-loader.popup";
import { StoreFreeVoucherParamater } from "@/app/paramaters/free-voucher/paramater";
import { useFreeVoucherStore } from "@/app/store/free-voucher.store";
import { FreeVoucherAction } from "@/app/actions/free-voucher/action";
import { HttpStatus } from "@/lib/global.enum";

export function StoreFreeVoucherForm() {
  const { toast } = useToast();
  const setIsLoading = useLoaderStore((state) => state.setIsLoading);
  const selectedPriceUuid = useFreeVoucherStore(
    (state) => state.selectedPriceUuid
  );

  const storeFreeVoucherForm = useForm<z.infer<typeof StoreFreeVoucherSchema>>({
    resolver: zodResolver(StoreFreeVoucherSchema),
    defaultValues: {
      expiry_time_in_day: 14,
      slot: 1,
    },
  });

  const handleStoreFreeVoucher = async (
    values: z.infer<typeof StoreFreeVoucherSchema>
  ) => {
    if (!selectedPriceUuid) {
      toast({
        description: `Select the price unit!`,
        variant: "info",
      });
      return;
    }

    const payload: StoreFreeVoucherParamater = {
      expiry_time_in_day: values.expiry_time_in_day,
      slot: values.slot,
      price_uuid: selectedPriceUuid,
    };

    setIsLoading(true);
    const result = await FreeVoucherAction.StoreFreeVoucher(payload);
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
      description: `New voucher stored!`,
      variant: "success",
    });
  };

  return (
    <>
      <TextLoader title="Hold a second" text="Storing free voucher..." />
      <div className="mx-auto w-1/2 p-6">
        <ActivityTitleCard title="Store free voucher" />
        <Form {...storeFreeVoucherForm}>
          <form
            onSubmit={storeFreeVoucherForm.handleSubmit(handleStoreFreeVoucher)}
          >
            <div className="flex flex-col gap-2 sm:grid sm:grid-cols-12 sm:gap-4 mt-4">
              <AttachmentInputComponent />

              <div className="flex flex-col col-span-6">
                <FormField
                  control={storeFreeVoucherForm.control}
                  name="expiry_time_in_day"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">Expiry time in day</FormLabel>
                      <FormControl>
                        <Input
                          id="exipiry-time"
                          type="number"
                          placeholder="14"
                          {...field}
                          className={CHECKOUT_INPUT_STYLE}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col col-span-6">
                <FormField
                  control={storeFreeVoucherForm.control}
                  name="slot"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">
                        For how many traveller?
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="slot"
                          type="number"
                          placeholder="2"
                          {...field}
                          className={CHECKOUT_INPUT_STYLE}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-4 mt-6">
                <div
                  className={
                    "md:flex md:gap-4 md:items-start md:rounded-none md:border-none md:p-0 md:z-auto md:static fixed bottom-0 left-0 w-full rounded-t-2xl border-t border-gray-300 bg-white h-auto p-6 z-10 "
                  }
                >
                  <Button className="ml-auto mt-2 md:mt-0 w-full md:w-auto px-5 py-3 bg-gradient-to-r bg-[#EB5E00] text-white font-bold rounded-lg transition-transform transform-gpu hover:bg-[#EB5E00]/80 hover:-translate-y-1 hover:shadow-lg">
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
