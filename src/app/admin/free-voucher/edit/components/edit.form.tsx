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
import { Input } from "@/components/ui/input";
import { CHECKOUT_INPUT_STYLE } from "@/lib/global.constant";
import { useLoaderStore } from "@/app/store/loader.store";
import { Button } from "@/components/ui/button";
import { TextLoader } from "@/app/global-components/utility-components/text-loader.popup";
import { EditFreeVoucherParamater, StoreFreeVoucherParamater } from "@/app/paramaters/free-voucher/paramater";
import { useFreeVoucherStore } from "@/app/store/free-voucher.store";
import { FreeVoucherAction } from "@/app/actions/free-voucher/action";
import { HttpStatus } from "@/lib/global.enum";
import { EditFreeVoucherSchema } from "../validation/edit.validation";
import { FreePackageUnitResponse } from "@/app/responses/free-voucher/response";
import { Switch } from "@/components/ui/switch";

export function EditFreeVoucherForm({
  freePackageUnit,
  uuid
}: {
  freePackageUnit: FreePackageUnitResponse;
  uuid: string
}) {
  const { toast } = useToast();
  const setIsLoading = useLoaderStore((state) => state.setIsLoading);
  
  const editFreeVoucherForm = useForm<z.infer<typeof EditFreeVoucherSchema>>({
    resolver: zodResolver(EditFreeVoucherSchema),
    defaultValues: {
      expiry_time_in_day: freePackageUnit.expiry_time_in_day,
      slot: freePackageUnit.slot,
      is_published: freePackageUnit.is_published ? true : false,
    },
  });

  const handleEditFreeVoucher = async (
    values: z.infer<typeof EditFreeVoucherSchema>
  ) => {
  
    const payload: EditFreeVoucherParamater = {
      expiry_time_in_day: values.expiry_time_in_day,
      slot: values.slot,
      is_published: values.is_published,
    };

    setIsLoading(true);
    const result = await FreeVoucherAction.EditFreeVoucher(payload, uuid);
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
      description: `Voucher updated!`,
      variant: "success",
    });
  };

  return (
    <>
      <TextLoader title="Hold a second" text="Updating free voucher..." />
      <div className="mx-auto w-1/2 p-6">
        <ActivityTitleCard title={"Edit free voucher"} />
        <Form {...editFreeVoucherForm}>
          <form
            onSubmit={editFreeVoucherForm.handleSubmit(handleEditFreeVoucher)}
          >
            <div className="flex flex-col gap-2 sm:grid sm:grid-cols-12 sm:gap-4 mt-4">
              <div className="flex flex-col col-span-12">
                <Input
                  id="title"
                  type="string"
                  placeholder="Unit title..."
                  readOnly
                  value={freePackageUnit.title}
                  className={CHECKOUT_INPUT_STYLE}
                />
              </div>
              <div className="flex flex-col col-span-6">
                <FormField
                  control={editFreeVoucherForm.control}
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
                  control={editFreeVoucherForm.control}
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
              <div className="flex items-center col-span-12">
                <FormField
                  control={editFreeVoucherForm.control}
                  name="is_published"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="published"
                        />
                      </FormControl>
                      <FormLabel htmlFor="published" className="cursor-pointer">
                        Publish
                      </FormLabel>
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
