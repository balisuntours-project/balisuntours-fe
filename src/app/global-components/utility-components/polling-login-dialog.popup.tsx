"use client";

import { useAuthPopupStore } from "@/app/store/auth-popup.store";
import { useAuthStore } from "@/app/store/auth.store";
import { useLandingPageStore } from "@/app/store/landing-page.store";
import { GlobalUtility } from "@/lib/global.utility";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function PollingLoginDialogPopUpToken() {
  const setShowLoginDialog = useLandingPageStore(
    (state) => state.setShowLoginDialog
  );

  const showBrowserPopup = useAuthStore(
    (state) => state.showBrowserPopupDialog
  );
  const setShowBrowserPopupDialog = useAuthStore(
    (state) => state.setShowBrowserPopupDialog
  );

  const setIsLogin = useAuthStore((state) => state.setIsLogin);

  const setShowAuthPopup = useAuthPopupStore((state) => state.setShowAuthPopup);
  const setTriggerNextRouteAfterLogin = useAuthPopupStore((state) => state.setTriggerNextRouteAfterLogin);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    const getTheCookie = async () => {
      try {
        interval = setInterval(async () => {
          const cookie = GlobalUtility.GetLoginStatusCookie(); // Ambil cookie

          if (cookie) {
            setIsLogin(true);
            if (interval) clearInterval(interval); // Hentikan polling
            if (showBrowserPopup){
              
              showBrowserPopup.close(),
                setTriggerNextRouteAfterLogin(true),
                setShowAuthPopup(false),
                setShowLoginDialog(false); // Tutup popup
            setShowBrowserPopupDialog(null); // Reset state
          }
        }
        }, 1000); // Periksa cookie setiap 1 detik
      } catch (error) {
        console.error("Error saat memeriksa cookie:", error);
      }
    };

    getTheCookie();

    return () => {
      if (interval) clearInterval(interval); // Bersihkan interval saat komponen dilepas
    };
  }, [showBrowserPopup]);

  return (
    <>
    </>
  )
}
