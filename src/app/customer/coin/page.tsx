import { LargeNavbar } from "@/app/global-components/large.navbar";
import { CoinBalanceCard } from "./components/coin-balance.card";
import { CoinHistoryFilterSection } from "./components/filter.section";
import { CoinServerAction } from "@/app/actions/coin/action.server";
import { LandingPageFooterSection } from "@/app/global-components/landing-page.footer";
import { WhatsappFixedBadge } from "@/app/global-components/utility-components/whatsapp-fixed.badge";

export default async function CoinPage() {
  const dataCoinBalance = await CoinServerAction.CoinBalance();
  const dataCoinConfig = await CoinServerAction.CoinConfiguration();

  const coinBalance = dataCoinBalance.data.balance;
  const coinConfig = dataCoinConfig.data;

  return (
    <>
      <LargeNavbar />
      <div className="relative">
        <div className="pb-11 mb-11">
          <div className="pt-32 md:pt-36 max-md:bg-gradient-to-b max-md:from-[#008000] max-md:to-white">
              <div className="px-4 lg:px-0 max-w-2xl mx-auto">
                <CoinBalanceCard coinBalance={coinBalance} coinConfig={coinConfig} />

              </div>
          </div>
          
           <div className="px-4 lg:px-0 max-w-2xl mx-auto">
               <CoinHistoryFilterSection />
          </div>
        </div>
        <hr />
        <div className="container flex flex-col gap-11 px-3 md:px-8  pt-11 pb-11">
          <LandingPageFooterSection />
        </div>
        <WhatsappFixedBadge templateMessage="Hi Bali SUN Tours, I have a question about my coins/transactions. Could you help check?" />        
      </div>
    </>
  );
}
