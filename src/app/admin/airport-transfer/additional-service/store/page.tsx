import { LargeNavbar } from "@/app/global-components/large.navbar";
import { StoreAdditinalServiceForm } from "./components/store.form";

export default function AdditionalServiceStorePage() {
    return (
        <>
         <LargeNavbar forAdmin={true} />
              <div className="pt-11 md:pt-22 lg:pt-28">
                <div className="px-4 pb-11">
                  <StoreAdditinalServiceForm  />
                </div>
              </div>
        </>
    )
}