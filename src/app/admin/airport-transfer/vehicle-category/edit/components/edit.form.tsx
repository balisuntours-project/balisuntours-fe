"use client";

import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoaderStore } from "@/app/store/loader.store";
import { VechileCategoryAction } from "@/app/actions/vechile-category/action";
import { HttpStatus } from "@/lib/global.enum";
import { TextLoader } from "@/app/global-components/utility-components/text-loader.popup";
import { ActivityTitleCard } from "@/app/global-components/utility-components/activity-title.card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CHECKOUT_INPUT_STYLE } from "@/lib/global.constant";
import { VechileCategoryResponse } from "@/app/responses/vechile-category/response";
import { EditCarCategorySchema } from "../../validation/edit.validation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VechileCategoryPublishStatusEnum } from "@/app/enums/airport-transfer/airport-transfer.enum";

export function EditVechileCategoryForm({
  currentData,
  vechileCategoryUuid,
}: {
  currentData: VechileCategoryResponse;
  vechileCategoryUuid: string;
}) {
  const { toast } = useToast();

  const editVechileCategoryForm = useForm<
    z.infer<typeof EditCarCategorySchema>
  >({
    resolver: zodResolver(EditCarCategorySchema),
    defaultValues: {
      name: currentData.name,
      is_published: currentData.is_published,
    },
  });

  const setIsLoading = useLoaderStore((state) => state.setIsLoading);

  const handleEditCarCategory = async (
    values: z.infer<typeof EditCarCategorySchema>
  ) => {
    setIsLoading(true);
    const result = await VechileCategoryAction.UpdateVechileCategory(
      {
        name: values.name,
        is_published: values.is_published,
      },
      vechileCategoryUuid
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
      description: `Category updated!`,
      variant: "success",
    });

    return;
  };
  return (
    <>
      <TextLoader title="Hold a second" text="Updating category..." />
      <div className="mx-auto w-1/2 p-6">
        <ActivityTitleCard title="Edit category" />
        <Form {...editVechileCategoryForm}>
          <form
            onSubmit={editVechileCategoryForm.handleSubmit(
              handleEditCarCategory
            )}
          >
            <div className="flex flex-col gap-2 sm:grid sm:grid-cols-12 sm:gap-4 mt-4">
              <div className="flex flex-col col-span-12">
                <FormField
                  control={editVechileCategoryForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">Category Car name</FormLabel>
                      <FormControl>
                        <Input
                          id="vechile-category-name"
                          type="text"
                          placeholder="Economy 1-5 seater"
                          {...field}
                          className={CHECKOUT_INPUT_STYLE}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col col-span-12">
                <FormField
                  control={editVechileCategoryForm.control}
                  name="is_published"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">Publish status (when you set to Unpublish, all related car will not show up on customer search)`</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        {...field}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent id="category">
                          <SelectItem
                            value={VechileCategoryPublishStatusEnum.published}
                          >
                            Publish
                          </SelectItem>
                          <SelectItem
                            value={VechileCategoryPublishStatusEnum.unpublished}
                          >
                            Unpublish
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-6">
              <div
                className={
                  //  GlobalUtility.CheckScreenOnMobile()
                  //   ? "fixed bottom-0 left-0 w-full rounded-t-2xl border-t border-gray-300 bg-white h-auto p-6 z-10 "
                  //   :  "md:flex gap-4 items-start"
                  "md:flex md:gap-4 md:items-start md:rounded-none md:border-none md:p-0 md:z-auto md:static fixed bottom-0 left-0 w-full rounded-t-2xl border-t border-gray-300 bg-white h-auto p-6 z-10 "
                }
              >
                <Button className="ml-auto mt-2 md:mt-0 w-full md:w-auto px-5 py-3 bg-gradient-to-r bg-[#EB5E00] text-white font-bold rounded-lg transition-transform transform-gpu hover:bg-[#EB5E00]/80 hover:-translate-y-1 hover:shadow-lg">
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
