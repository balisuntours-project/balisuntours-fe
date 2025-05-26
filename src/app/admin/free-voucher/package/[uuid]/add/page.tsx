
import { LargeNavbar } from "@/app/global-components/large.navbar";
import { notFound } from "next/navigation";
import { AddFormComponent } from "./components/add.form";
import { FreeVoucherServerAction } from "@/app/actions/free-voucher/action.server";


export default async function AddPackageFreeVoucherPage({params} : { params: Promise<{ uuid: string }>;}) {
  const uuid = (await params).uuid;

  const activityPackageData = await FreeVoucherServerAction.GetAddVoucherPageData(uuid)
  if(!activityPackageData.success) {
    notFound()
  }

  const freePackageUnits = await FreeVoucherServerAction.GetFreePackageUnitList();

  return (
    <>
      <LargeNavbar forAdmin={true} />
      <div className="container pt-20 md:pt-22 lg:pt-28">
          <AddFormComponent freePackageUnits={freePackageUnits.data} activityPackage={activityPackageData.data} />
      </div>
    </>
  );
}
