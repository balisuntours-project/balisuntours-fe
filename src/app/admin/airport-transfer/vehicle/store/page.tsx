import { LargeNavbar } from "@/app/global-components/large.navbar";
import { StoreCarForm } from "./components/store.form";
import { VechileCategoryActionServer } from "@/app/actions/vechile-category/action.server";
import { VechileCategoryResponse } from "@/app/responses/vechile-category/response";
import { VechileMainPhotoResponse } from "@/app/responses/vechile/response";
import { VechileActionServer } from "@/app/actions/vechile/action.server";

export default async function AdminAirportTransferStore() {
    
   let vechileCategories : Array<VechileCategoryResponse> = []
   let vechileMainPhotos : Array<VechileMainPhotoResponse> = []
   const getCategories = await VechileCategoryActionServer.GetAllVechileCategory()
   const getMainPhotos = await VechileActionServer.GetAllVechileMainPhoto()

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
          <StoreCarForm vechileMainPhotos={vechileMainPhotos} vechileCategories={vechileCategories} />
        </div>
      </div>
    </>
  );
}
