import { LargeNavbar } from "@/app/global-components/large.navbar";
import { StoreFreeVoucherForm } from "./components/store.form";

export default async function AttachFreeVoucherPage() {

  return (
    <>
      <LargeNavbar forAdmin={true} />
      <div className="container pt-20 md:pt-22 lg:pt-28">
        <div className="px-4 pb-11">
            <StoreFreeVoucherForm />
        </div>
      </div>
    </>
  );
}
