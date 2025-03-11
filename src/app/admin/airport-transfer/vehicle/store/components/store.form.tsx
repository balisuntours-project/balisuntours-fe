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
import { StoreCarSchema } from "../validation/store.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CustomerTitleEnum } from "@/app/enums/airport-transfer/airport-transfer.enum";
import { Input } from "@/components/ui/input";
import { CHECKOUT_INPUT_STYLE } from "@/lib/global.constant";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { VechileCategoryResponse } from "@/app/responses/vechile-category/response";
import { VechileMainPhotoResponse } from "@/app/responses/vechile/response";
import { DynamicDialog } from "@/app/global-components/utility-components/dynamic-content.dialog";
import { VechilePhotoList } from "../utility-components/photo.list";
import { useVechileStore } from "@/app/store/vechile.store";
import { CanvasOrPreviewImage } from "../utility-components/canvas-image.preview";
import { NewVechileParamater } from "@/app/paramaters/vechile/paramater";
import { VechileAction } from "@/app/actions/vechile/action";
import { TextLoader } from "@/app/global-components/utility-components/text-loader.popup";
import { useLoaderStore } from "@/app/store/loader.store";
import { useToast } from "@/hooks/use-toast";
import { HttpStatus } from "@/lib/global.enum";
import { ActivityTitleCard } from "@/app/global-components/utility-components/activity-title.card";

export function StoreCarForm({
  vechileCategories,
  vechileMainPhotos,
}: {
  vechileCategories: Array<VechileCategoryResponse>;
  vechileMainPhotos: Array<VechileMainPhotoResponse>;
}) {
  const { toast } = useToast();

  const storeVechileForm = useForm<z.infer<typeof StoreCarSchema>>({
    resolver: zodResolver(StoreCarSchema),
    defaultValues: {
      vechile_category_uuid: "",
      name: "",
      total_seat: 4,
      total_luggage: 2,
      cut_off_time_in_hours: 1,
      driver_free_waiting_time_in_minutes: 30,
      price_per_km: 5000,
    },
  });

  const setIsLoading = useLoaderStore((state) => state.setIsLoading);
  const selectedPostVechileImage = useVechileStore(
    (state) => state.selectedPostVechileImage
  );
  const setSelectedPostVechileImage = useVechileStore(
    (state) => state.setSelectedPostVechileImage
  );
  const [shortDescription, setShortDescription] = useState<string | null>(null);
  const shortDescriptionRef = useRef<HTMLParagraphElement>(null);
  const shortDescriptionTextareaRef = useRef<HTMLTextAreaElement>(null);
  const handleAdditionalRequestChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setShortDescription(e.target.value);
    const textarea = shortDescriptionTextareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset dulu agar tidak terus bertambah
      textarea.style.height = `${Math.min(textarea.scrollHeight, 300)}px`; // Sesuaikan dengan konten
    }
  };

  const handleStoreCar = async (values: z.infer<typeof StoreCarSchema>) => {
    if (!selectedPostVechileImage) {
      toast({
        description: `Car image is empty!`,
        variant: "info",
      });
      return;
    }

    if (!shortDescription || shortDescription.length > 253) {
      if (shortDescriptionRef.current) {
        shortDescriptionRef.current.classList.remove("hidden");
        shortDescriptionRef.current.classList.add("block");
        shortDescriptionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

      return;
    }

    const payload: NewVechileParamater = {
      main_photo: {
        file: !("id" in selectedPostVechileImage)
          ? selectedPostVechileImage
          : selectedPostVechileImage.id,
      },
      vechile_category_uuid: values.vechile_category_uuid,
      name: values.name,
      short_description: shortDescription,
      total_seat: values.total_seat,
      total_luggage: values.total_luggage,
      cut_off_time_in_hours: values.cut_off_time_in_hours,
      driver_free_waiting_time_in_minutes:
        values.driver_free_waiting_time_in_minutes,
      price_per_km: values.price_per_km,
    };

    const formData = new FormData();
    // Tambahkan main_photo.file ke FormData jika ada
    if (payload.main_photo.file instanceof File) {
      formData.append("main_photo[file]", payload.main_photo.file);
    } else if (typeof payload.main_photo.file === "number") {
      formData.append("main_photo[file]", payload.main_photo.file.toString());
    }

    // Tambahkan properti lainnya ke FormData
    Object.entries(payload).forEach(([key, value]) => {
      if (key !== "main_photo") {
        formData.append(key, value as string | Blob);
      }
    });

   
    setIsLoading(true);
    const result = await VechileAction.StoreNewVechile(formData);
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

    setSelectedPostVechileImage(null)
    toast({
      description: `New car posted!`,
      variant: "success",
    });

    return;
  };

  useEffect(() => {
    if (shortDescription && shortDescription.length > 3) {
      if (shortDescriptionRef.current) {
        shortDescriptionRef.current.classList.add("hidden");
        shortDescriptionRef.current.classList.remove("block");
      }
    }
  }, [shortDescription]);
  return (
    <>
      <TextLoader title="Hold a second" text="Posting new car..." />
      <div className="mx-auto w-1/2 p-6">
        <ActivityTitleCard title="Post new car" />
        <Form {...storeVechileForm}>
          <form onSubmit={storeVechileForm.handleSubmit(handleStoreCar)}>
            <div className="flex flex-col gap-2 sm:grid sm:grid-cols-12 sm:gap-4 mt-4">
              <div className="col-span-12">
                <DynamicDialog
                  useSmallVersion={true}
                  title="Uploaded image"
                  trigger={<CanvasOrPreviewImage withTriggerInput={false} />}
                >
                  <VechilePhotoList photoList={vechileMainPhotos} />
                </DynamicDialog>
              </div>
              <div className="flex flex-col col-span-4">
                <FormField
                  control={storeVechileForm.control}
                  name="vechile_category_uuid"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">Category</FormLabel>
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
                          {vechileCategories.map((category, key) => (
                            <SelectItem key={key} value={category.uuid}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col col-span-4">
                <FormField
                  control={storeVechileForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">Car name</FormLabel>
                      <FormControl>
                        <Input
                          id="vechile-name"
                          type="text"
                          placeholder="Pajero SPORT"
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
                <FormItem>
                  <FormLabel className="">Short car description</FormLabel>
                  <FormControl>
                    <Textarea
                      ref={shortDescriptionTextareaRef}
                      onChange={(e) => handleAdditionalRequestChange(e)}
                      id="customer-additional-request"
                      placeholder="Super comfy seat..."
                      className={CHECKOUT_INPUT_STYLE}
                    />
                  </FormControl>
                  <p
                    className="short-description text-sm text-red-500 hidden"
                    ref={shortDescriptionRef}
                  >
                    Fill the desciption correctly
                  </p>
                </FormItem>
              </div>

              <div className="flex flex-col col-span-4">
                <FormField
                  control={storeVechileForm.control}
                  name="total_seat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">Total seat</FormLabel>
                      <FormControl>
                        <Input
                          id="total-seat"
                          type="number"
                          placeholder="4"
                          {...field}
                          className={CHECKOUT_INPUT_STYLE}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col col-span-4">
                <FormField
                  control={storeVechileForm.control}
                  name="total_luggage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">Total luggage</FormLabel>
                      <FormControl>
                        <Input
                          id="total-luggage"
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

              <div className="flex flex-col col-span-4">
                <FormField
                  control={storeVechileForm.control}
                  name="cut_off_time_in_hours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">Cut off time in hour</FormLabel>
                      <FormControl>
                        <Input
                          id="cut-off-time"
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

              <div className="flex flex-col col-span-4">
                <FormField
                  control={storeVechileForm.control}
                  name="driver_free_waiting_time_in_minutes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">
                        Driver waiting time in minutes
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="driver-waiting-time"
                          type="number"
                          placeholder="30"
                          {...field}
                          className={CHECKOUT_INPUT_STYLE}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col col-span-4">
                <FormField
                  control={storeVechileForm.control}
                  name="price_per_km"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">Price per km</FormLabel>
                      <FormControl>
                        <Input
                          id="price-per-km"
                          type="number"
                          placeholder="5000"
                          {...field}
                          className={CHECKOUT_INPUT_STYLE}
                        />
                      </FormControl>
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
