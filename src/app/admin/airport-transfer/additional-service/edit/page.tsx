import { AdditionalServiceServerAction } from "@/app/actions/airport-transfer/additional-service/action.server";
import { LargeNavbar } from "@/app/global-components/large.navbar";
import { notFound } from "next/navigation";
import { EditAdditinalServiceForm } from "./components/edit.form";

export default async function EditAdditionalServicePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const serviceUuidParam = (await searchParams)?.service_uuid;
  let data = null;
  if (serviceUuidParam) {
    const result =
      await AdditionalServiceServerAction.GetSingleAdditionalServiceItem(
        serviceUuidParam as string
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
      <div className="pt-11 md:pt-22 lg:pt-28">
        <div className="px-4 pb-11">
          <EditAdditinalServiceForm currentData={data} serviceUuid={serviceUuidParam as string} />
        </div>
      </div>
    </>
  );
}
