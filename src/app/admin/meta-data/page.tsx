import { LargeNavbar } from "@/app/global-components/large.navbar";
import { MetaDataListTable } from "./components/meta-data-list.table";
import { MetaDataActionServer } from "@/app/actions/meta-data/action.server";
import { HttpStatus } from "@/lib/global.enum";
import { notFound } from "next/navigation";

export default async function MetaDataActivity() {
    const data = await MetaDataActionServer.GetActivityMetaData();
    if(!data.success && data.status_code == HttpStatus.FORBIDDEN) {
        notFound()
    }

    // console.log(data)
    const metaDataLists = data.data
  return (
    <>
      <LargeNavbar forAdmin={true} />
      <div className="pt-20 md:pt-22 lg:pt-28">
       <div className="px-4 pb-11">
       <MetaDataListTable metaDataLists={metaDataLists} />
       </div>
      </div>
    </>
  );
}
