import { VechileCategoryActionServer } from "@/app/actions/vechile-category/action.server";
import { LargeNavbar } from "@/app/global-components/large.navbar";
import { notFound } from "next/navigation";
import { EditVechileCategoryForm } from "./components/edit.form";

export default async function EditVechileCategoryPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const vechileCarUuidParam = (await searchParams)?.car_category_uuid;
  let data = null;
  if (vechileCarUuidParam) {
    const result = await VechileCategoryActionServer.GetSingleVechileCategory(
      vechileCarUuidParam as string
    );

    if (!result.success) {
      notFound();
    }

    data = result.data;
  } else {
    notFound();
  }
  return (
    <>
      <LargeNavbar forAdmin={true} />
      <div className="pt-20 md:pt-22 lg:pt-28">
        <div className="px-4 pb-11">
            <EditVechileCategoryForm currentData={data} vechileCategoryUuid={vechileCarUuidParam as string}  />
        </div>
      </div>
    </>
  );
}
