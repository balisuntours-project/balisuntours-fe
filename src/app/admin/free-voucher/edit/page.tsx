import { LargeNavbar } from "@/app/global-components/large.navbar";
import { EditFreeVoucherForm } from "./components/edit.form";
import { FreeVoucherServerAction } from "@/app/actions/free-voucher/action.server";
import { notFound } from "next/navigation";

export default async function EditFreeVoucherPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const freePackageUnitUuidParam = (await searchParams)?.free_unit_uuid;
  let data = null;
  if (freePackageUnitUuidParam) {
    const result = await FreeVoucherServerAction.GetSingleFreePackageUnit(
      freePackageUnitUuidParam as string
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
      <div className="container pt-20 md:pt-22 lg:pt-28">
        <div className="px-4 pb-11">
          <EditFreeVoucherForm freePackageUnit={data} uuid={freePackageUnitUuidParam as string} />
        </div>
      </div>
    </>
  );
}
