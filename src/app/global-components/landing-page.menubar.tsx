import { LandingPageNavigationUtility } from "./utility-components/landing-page.navigation";
import { LandingPageSearchBoxUtility } from "./utility-components/landing-page.searchbox";

export function LandingPageMenuBar() {
    return (
        <>
        <div className="flex flex-col w-full px-0 bg-gradient-to-b from-[#008000] to-white">
        <LandingPageSearchBoxUtility flatPosition={true} />

        <LandingPageNavigationUtility />
        </div>
        </>
    )
}