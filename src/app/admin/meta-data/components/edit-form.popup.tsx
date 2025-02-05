"use client";

import { DynamicDialog } from "@/app/global-components/utility-components/dynamic-content.dialog";
import { ActivityMetaDataResponse } from "@/app/responses/activity-metadata/response";
import { AuthButton } from "@/components/custom-ui/auth.button";
import { z } from "zod";
import { EditMetaDataSchema } from "../validation/edit-metadata.validation";
import { MetaDataAction } from "@/app/actions/meta-data/action";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { DisabledButton } from "@/components/custom-ui/disabled.buttont";
import { useLoaderStore } from "@/app/store/loader.store";
import { useMetaDataStore } from "@/app/store/metadata.store";
import { Badge } from "@/components/ui/badge";
import { MetaDataListImages } from "./meta-data-list.images";

export function EditFormPopUp({
  metadata,
}: {
  metadata: ActivityMetaDataResponse;
}) {
  const { toast } = useToast();
  const setForceCloseDialog = useLoaderStore(
    (state) => state.setForceCloseDialog
  );
  const setTriggerRefetchLists = useMetaDataStore(
    (state) => state.setTriggerRefetchLists
  );
  const [onLoadUpdate, setOnLoadUpdate] = useState(false);
  const EditMataDataForm = useForm<z.infer<typeof EditMetaDataSchema>>({
    resolver: zodResolver(EditMetaDataSchema),
    defaultValues: {
      meta_title: metadata.meta_title,
      meta_description: metadata.meta_description ?? "",
      meta_keyword: metadata.meta_keyword ?? "",
      og_title: metadata.og_title ?? "",
      og_description: metadata.og_description ?? "",
      og_image: metadata.og_image ?? "",
      canonical_url: metadata.canonical_url,
    },
  });

  const handleEditMetaData = async (
    values: z.infer<typeof EditMetaDataSchema>
  ) => {
    if (selectedImage) {
      values.og_image = selectedImage;
    }
    setOnLoadUpdate(true);
    const action = await MetaDataAction.EditMetaData(metadata.uuid, values);

    setOnLoadUpdate(false);
    if (action.success) {
      setTriggerRefetchLists(true);
      setForceCloseDialog(true);
      toast({
        description: `${action.data}`,
        variant: "success",
      });
    } else {
      toast({
        description: `${action.data}`,
        variant: "warning",
      });
    }
  };

  const [selectedImage, setSelectedImage] = useState<string>(
    metadata.og_image ?? ""
  ); // State untuk menyimpan URL gambar yang dipilih

  // Fungsi untuk menangani klik gambar dan mengisi input field
  const handleImageClick = (url: string) => {
    setSelectedImage(url); // Menyimpan URL gambar yang dipilih
    toast({
      description: `URL added to form, you can close this popup`,
      variant: "success",
    });
  };

  return (
    <>
      <DynamicDialog
        title="Edit Metadata"
        useSmallVersion={true}
        trigger={<AuthButton title="Edit" />}
      >
        <div className="max-w-full w-full mx-auto">
          <Form {...EditMataDataForm}>
            <form
              onSubmit={EditMataDataForm.handleSubmit(handleEditMetaData)}
              className="grid gap-4"
            >
              <FormField
                control={EditMataDataForm.control}
                name="meta_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 text-sm font-semibold">
                      Meta Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="border text-base border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Bali Sky Diving"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={EditMataDataForm.control}
                name="meta_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 text-sm font-semibold">
                      Meta Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="border text-base border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Great activity with best view...etc"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={EditMataDataForm.control}
                name="meta_keyword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 text-sm font-semibold">
                      Meta Keyword
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="border text-base border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="tours,activity,travel,atv,etc"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={EditMataDataForm.control}
                name="og_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 text-sm font-semibold">
                      Opengraph Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="border text-base border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Bali Sky Diving"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={EditMataDataForm.control}
                name="og_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 text-sm font-semibold">
                      <span>Opengraph Description</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="border text-base border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Great activity with best view...etc"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={EditMataDataForm.control}
                name="og_image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 text-sm font-semibold flex gap-2">
                      <span>Opengraph Image</span>
                      <MetaDataListImages
                        galleries={metadata.galleries}
                        mainPhoto={metadata.main_photo}
                        onClick={handleImageClick}
                      />
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="border text-base border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        type="text"
                        placeholder="Image url, https://balisuntours.com/storage/activity/atv.jpg etc"
                        onChange={(e) => setSelectedImage(e.target.value)}
                        value={selectedImage}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={EditMataDataForm.control}
                name="canonical_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 text-sm font-semibold">
                      Canonical URL
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="border text-base border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        type="text"
                        placeholder="Preview url, https://balisuntours.com/preview/activity/bali-atv-ubud etc"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-center w-1/2 mx-auto">
                {/* Register Button */}
                {!onLoadUpdate ? (
                  <AuthButton title="Update" rouded="rounded-lg w-full" />
                ) : (
                  <DisabledButton
                    rouded="rounded-lg w-full"
                    title="Updating..."
                  />
                )}
              </div>
            </form>
          </Form>
        </div>
      </DynamicDialog>
    </>
  );
}
