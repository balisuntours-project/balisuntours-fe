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
import { StoreAdditionalServiceSchema } from "../validation/store.validation";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { AdditionalServiceAction } from "@/app/actions/airport-transfer/additional-service/action";
import { StoreNewAdditionalServiceParamater } from "@/app/paramaters/airport-transfer/additional-service/paramater";

export function StoreAdditinalServiceForm() {
  const { toast } = useToast();

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

  const storeAdditionalServiceForm = useForm<
    z.infer<typeof StoreAdditionalServiceSchema>
  >({
    resolver: zodResolver(StoreAdditionalServiceSchema),
    defaultValues: {
      name: "",
      price: 0,
      min_qty: 1,
      max_qty: 100,
    },
  });

  const setIsLoading = useLoaderStore((state) => state.setIsLoading);

  const handleStoreAdditionalService = async (
    values: z.infer<typeof StoreAdditionalServiceSchema>
  ) => {
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

    const payload : StoreNewAdditionalServiceParamater = {
        ...values,
        short_description: shortDescription
    }
    setIsLoading(true);
    const result = await AdditionalServiceAction.StoreNewAdditionalService(payload);

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
      description: `New service posted!`,
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
      <TextLoader title="Hold a second" text="Posting new service..." />
      <div className="mx-auto w-1/2 p-6">
        <ActivityTitleCard title="Post new additional service" />
        <Form {...storeAdditionalServiceForm}>
          <form
            onSubmit={storeAdditionalServiceForm.handleSubmit(
              handleStoreAdditionalService
            )}
          >
            <div className="flex flex-col gap-2 sm:grid sm:grid-cols-12 sm:gap-4 mt-4">
              <div className="flex flex-col col-span-6">
                <FormField
                  control={storeAdditionalServiceForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">Service name</FormLabel>
                      <FormControl>
                        <Input
                          id="service-name"
                          type="text"
                          placeholder="Lazy pillow"
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
                  control={storeAdditionalServiceForm.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">Price</FormLabel>
                      <FormControl>
                        <Input
                          id="price"
                          type="number"
                          placeholder="150000"
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
                  <FormLabel className="">Short service description</FormLabel>
                  <FormControl>
                    <Textarea
                      ref={shortDescriptionTextareaRef}
                      onChange={(e) => handleAdditionalRequestChange(e)}
                      id="customer-additional-service-desc"
                      placeholder="Cotton pilow with..."
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
              <div className="flex flex-col col-span-6">
                <FormField
                  control={storeAdditionalServiceForm.control}
                  name="min_qty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">Min qty</FormLabel>
                      <FormControl>
                        <Input
                          id="price"
                          type="number"
                          placeholder="1"
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
                  control={storeAdditionalServiceForm.control}
                  name="max_qty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">Max qty</FormLabel>
                      <FormControl>
                        <Input
                          id="price"
                          type="number"
                          placeholder="100"
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
