import { LargeNavbar } from "@/app/global-components/large.navbar";
import { StoreVechileCategoryForm } from "./components/store.form";

export default function StoreVechileCategoryPage() {
  return (
    <>
      <LargeNavbar forAdmin={true} />
      <div className="pt-20 md:pt-22 lg:pt-28">
        <div className="px-4 pb-11">
            <StoreVechileCategoryForm />
        </div>
      </div>
    </>
  );
}
