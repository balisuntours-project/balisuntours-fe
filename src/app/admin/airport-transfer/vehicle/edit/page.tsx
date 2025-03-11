import { LargeNavbar } from "@/app/global-components/large.navbar";
import { EditCarForm } from "./components/edit.form";
import { notFound } from "next/navigation";
import { VechileActionServer } from "@/app/actions/vechile/action.server";
import { VechileCategoryActionServer } from "@/app/actions/vechile-category/action.server";
import { VechileMainPhotoResponse } from "@/app/responses/vechile/response";
import { VechileCategoryResponse } from "@/app/responses/vechile-category/response";

export default async function EditVechilePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const vechileUuidParam = (await searchParams)?.car_uuid;
  let data = null;
  if (vechileUuidParam) {
    const result = await VechileActionServer.GetSingleVechile(
      vechileUuidParam as string
    );
   
    if (!result.success) {
      notFound();
    }

    data = result.data;
  } else {
    notFound();
  }

  let vechileCategories: Array<VechileCategoryResponse> = [];
  let vechileMainPhotos: Array<VechileMainPhotoResponse> = [];
  const getCategories =
    await VechileCategoryActionServer.GetAllVechileCategory();
  const getMainPhotos = await VechileActionServer.GetAllVechileMainPhoto();

  if(getCategories.success) {
    vechileCategories = getCategories.data
   }

   if(getMainPhotos.success) {
    vechileMainPhotos = getMainPhotos.data
   }

  return (
    <>
      <LargeNavbar forAdmin={true} />
      <div className="pt-11 md:pt-22 lg:pt-28">
        <div className="px-4 pb-11">
            <EditCarForm carUuid={vechileUuidParam as string} currentData={data} vechileCategories={vechileCategories} vechileMainPhotos={vechileMainPhotos} />
        </div>
      </div>
    </>
  );
}
