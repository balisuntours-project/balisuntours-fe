"use client";

import { WhatsappFixedBadge } from "@/app/global-components/utility-components/whatsapp-fixed.badge";
import { useDetailActivityStore } from "@/app/store/detail-activity.store";
import { useEffect, useState } from "react";

export function WhatsappDynamicMessagePackage({
  activityName,
}: {
  activityName: string;
}) {
  const selectedPackage = useDetailActivityStore(
    (state) => state.selectedPackage
  );

  const defaultMessage = `Hi Bali SUN Tours, This ${activityName} tour looks amazing! Do you have any special offers or package available beyond what's shown?`
  const [templateMessage, setTemplateMessage] = useState(defaultMessage)

  useEffect(() => {
    if(selectedPackage) {
        setTemplateMessage(`Hi Bali SUN Tours, This ${activityName} with ${selectedPackage.title} package looks amazing! Do you have any special offers available beyond what's shown?`)
    }else {
        setTemplateMessage(defaultMessage)
    }
  }, [selectedPackage])
  return (
    <>
      <WhatsappFixedBadge bottomHeightAfterComponent="bottom-[22%] md:bottom-4" templateMessage={templateMessage} />
    </>
  );
}
