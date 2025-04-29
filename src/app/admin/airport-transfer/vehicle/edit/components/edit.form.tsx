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
import {
  GetSingleVechileResponse,
  VechileMainPhotoResponse,
} from "@/app/responses/vechile/response";
import { DynamicDialog } from "@/app/global-components/utility-components/dynamic-content.dialog";
import { useVechileStore } from "@/app/store/vechile.store";
import { VechileAction } from "@/app/actions/vechile/action";
import { TextLoader } from "@/app/global-components/utility-components/text-loader.popup";
import { useLoaderStore } from "@/app/store/loader.store";
import { useToast } from "@/hooks/use-toast";
import { HttpStatus } from "@/lib/global.enum";
import { ActivityTitleCard } from "@/app/global-components/utility-components/activity-title.card";
import { VechilePhotoList } from "../../store/utility-components/photo.list";
import { EditCarSchema } from "../validation/edit.validation";
import { NewVechileParamater } from "@/app/paramaters/vechile/paramater";
import { CanvasOrPreviewImage } from "../../store/utility-components/canvas-image.preview";
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";

const modules = {
  toolbar: [
    ["bold"], // tombol bold
    ["link"], // tombol link
  ],
};

// Dynamic import untuk ReactQuill
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse">
      <div className="h-12 bg-gray-200 mt-3 rounded-md"></div>
    </div>
  ),
});

export function EditCarForm({
  currentData,
  vechileCategories,
  vechileMainPhotos,
  carUuid,
}: {
  currentData: GetSingleVechileResponse;
  vechileCategories: Array<VechileCategoryResponse>;
  vechileMainPhotos: Array<VechileMainPhotoResponse>;
  carUuid: string;
}) {
  const { toast } = useToast();

  const editVechileForm = useForm<z.infer<typeof EditCarSchema>>({
    resolver: zodResolver(EditCarSchema),
    defaultValues: {
      vechile_category_uuid: currentData.vechile_category.vechile_category_uuid,
      name: currentData.name,
      total_seat: currentData.total_seat,
      total_luggage: currentData.total_luggage,
      cut_off_time_in_hours: currentData.cut_off_time_in_hours,
      driver_free_waiting_time_in_minutes:
        currentData.driver_free_waiting_time_in_minutes,
      price_per_km: currentData.price_per_km,
      increment_start_km: currentData.increment_start_km,
      increment_price_rate_percentage:
        currentData.increment_price_rate_percentage,
      minimum_charge: currentData.minimum_charge,
      mininum_charge_applies_until_km:
        currentData.mininum_charge_applies_until_km,
    },
  });

  const setIsLoading = useLoaderStore((state) => state.setIsLoading);
  const selectedPostVechileImage = useVechileStore(
    (state) => state.selectedPostVechileImage
  );
  const setSelectedPostVechileImage = useVechileStore(
    (state) => state.setSelectedPostVechileImage
  );
  const [shortDescription, setShortDescription] = useState<string>(
    currentData.short_description
  );
  const shortDescriptionRef = useRef<HTMLParagraphElement>(null);
  const shortDescriptionTextareaRef = useRef<HTMLTextAreaElement>(null);
  const handleShortDescriptionChange = (
    quilString: string
  ) => {
    setShortDescription(quilString);
    const textarea = shortDescriptionTextareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset dulu agar tidak terus bertambah
      textarea.style.height = `${Math.min(textarea.scrollHeight, 300)}px`; // Sesuaikan dengan konten
    }
  };

  const handleStoreCar = async (values: z.infer<typeof EditCarSchema>) => {
    if (!selectedPostVechileImage) {
      toast({
        description: `Car image is empty!`,
        variant: "info",
      });
      return;
    }

    if (shortDescription == "" || shortDescription.length > 253) {
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
      minimum_charge: values.minimum_charge,
      mininum_charge_applies_until_km: values.mininum_charge_applies_until_km,
      increment_start_km: values.increment_start_km,
      increment_price_rate_percentage: values.increment_price_rate_percentage,
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

    formData.append("_method", "PUT");
    setIsLoading(true);
    const result = await VechileAction.UpdateVechile(formData, carUuid);
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

    if (result.data.vechile_main_photo_file) {
      setSelectedPostVechileImage(
        result.data.vechile_main_photo_file as VechileMainPhotoResponse
      );
    }
    toast({
      description: `Car updated!`,
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

  useEffect(() => {
    if (currentData && currentData.vechile_main_photo_file) {
      const currentMainPhoto: Omit<VechileMainPhotoResponse, "type"> = {
        id: currentData.vechile_main_photo_file.id,
        uuid: currentData.vechile_main_photo_file.uuid,
        url: currentData.vechile_main_photo_file.url,
      };
      setSelectedPostVechileImage(currentMainPhoto as VechileMainPhotoResponse);
    } else {
      setSelectedPostVechileImage(null);
    }
  }, [currentData]);
  return (
    <>
      <TextLoader title="Hold a second" text="Updating the car..." />
      <div className="mx-auto w-1/2 p-6">
        <ActivityTitleCard title="Edit car" />
        <Form {...editVechileForm}>
          <form onSubmit={editVechileForm.handleSubmit(handleStoreCar)}>
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
                  control={editVechileForm.control}
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
                  control={editVechileForm.control}
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
                    {/* <Textarea
                      ref={shortDescriptionTextareaRef}
                      onChange={(e) => handleShortDescriptionChange(e)}
                      id="customer-additional-request"
                      placeholder="Super comfy seat..."
                      className={CHECKOUT_INPUT_STYLE}
                      defaultValue={shortDescription ?? ""}
                    /> */}
                    <ReactQuill
                      modules={modules}
                      formats={["bold", "link"]}
                      theme="snow"
                      value={shortDescription}
                      onChange={(e) => handleShortDescriptionChange(e)}
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
                  control={editVechileForm.control}
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
                  control={editVechileForm.control}
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
                  control={editVechileForm.control}
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
                  control={editVechileForm.control}
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

              <div className="flex flex-col col-span-4">
                <FormField
                  control={editVechileForm.control}
                  name="minimum_charge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">Minimum charge</FormLabel>
                      <FormControl>
                        <Input
                          id="minimum-charge"
                          type="number"
                          placeholder="100000"
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
                  control={editVechileForm.control}
                  name="mininum_charge_applies_until_km"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">Charge up to km</FormLabel>
                      <FormControl>
                        <Input
                          id="minimum-charge-applies"
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
                  control={editVechileForm.control}
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
                  control={editVechileForm.control}
                  name="increment_price_rate_percentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">
                        Price per km percentage
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="percentage-price-per-km"
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
                  control={editVechileForm.control}
                  name="increment_start_km"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">Percentage up to km</FormLabel>
                      <FormControl>
                        <Input
                          id="percentage-up-to-km"
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
