"use client";

import { WhatsappFixedBadge } from "@/app/global-components/utility-components/whatsapp-fixed.badge";
import { useAirportTransferStore } from "@/app/store/airport-transfer.store";

export function WhatsappBadgeDynamicSection() {
  const onInteractWithSearch = useAirportTransferStore(
    (state) => state.onInteractWithSearch
  );
  if (onInteractWithSearch) {
    return (
      <WhatsappFixedBadge
        bottomHeightAfterComponent="bottom-[20%] md:bottom-4"
        templateMessage="Hi Bali SUN Tours, I'm interested on your luxury cars collection. Could you send me your best recommendations?"
      />
    );
  } else {
    return (
      <WhatsappFixedBadge templateMessage="Hi Bali SUN Tours, I'm interested on your luxury cars collection. Could you send me your best recommendations?" />
    );
  }
}
