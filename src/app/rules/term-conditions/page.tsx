import { LargeNavbar } from "@/app/global-components/large.navbar";
import { TermAndConditionsContentSection } from "./components/tnc.content";
import { FooterFooterSection } from "@/app/footer-components/footer.footer";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function TermConditions() {
  return (
    <>
      <div className="pt-20 md:pt-36 lg:pt-[90px] lg:pb-11 ms-[5%]">
        <div className="flex flex-col md:flex-row">
          <div className="lg:px-11 relative">
            <div className="fixed bottom-0 right-0 mb-4 mr-4 lg:hidden">
              <SidebarTrigger
                className="p-4 md:p-6 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 cursor-pointer transition-all"
                aria-label="Open Sidebar"
              />
            </div>
            <TermAndConditionsContentSection />
          </div>
        </div>
      </div>
    </>
  );
}
