import { useLandingPageStore } from "@/app/store/landing-page.store";
import { AuthButton } from "@/components/custom-ui/auth.button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import { GlobalUtility } from "@/lib/global.utility";
import { useAuthStore } from "@/app/store/auth.store";
import { useAuthPopupStore } from "@/app/store/auth-popup.store";
import { PollingLoginDialogPopUpToken } from "./polling-login-dialog.popup";

export function LoginDialog() {
  const showLoginDialog = useLandingPageStore((state) => state.showLoginDialog);
  const setShowLoginDialog = useLandingPageStore(
    (state) => state.setShowLoginDialog
  );
  const onLoginDialog = useLandingPageStore((state) => state.onLoginDialog);

  const showBrowserPopup = useAuthStore(
    (state) => state.showBrowserPopupDialog
  );
  const setShowBrowserPopupDialog = useAuthStore(
    (state) => state.setShowBrowserPopupDialog
  );

  const setIsLogin = useAuthStore((state) => state.setIsLogin);

  const setShowAuthPopup = useAuthPopupStore((state) => state.setShowAuthPopup);
  const showAuthPopup = useAuthPopupStore((state) => state.showAuthPopup);

  // useEffect(() => {
  //   let interval: NodeJS.Timeout | null = null;

  //   const getTheCookie = async () => {
  //     try {
  //       interval = setInterval(async () => {
  //         const cookie = GlobalUtility.GetLoginStatusCookie(); // Ambil cookie
            
  //         if (cookie) {
  //           setIsLogin(true);
  //           if (interval) clearInterval(interval); // Hentikan polling
  //           if (showBrowserPopup)
  //             showBrowserPopup.close(), setShowAuthPopup(false) , setShowLoginDialog(false); // Tutup popup
  //           setShowBrowserPopupDialog(null); // Reset state
  //         }
  //       }, 1000); // Periksa cookie setiap 1 detik
  //     } catch (error) {
  //       console.error("Error saat memeriksa cookie:", error);
  //     }
  //   };

  //   getTheCookie();

  //   return () => {
  //     if (interval) clearInterval(interval); // Bersihkan interval saat komponen dilepas
  //   };
  // }, [showBrowserPopup]);


  

  return (
  <>
  <PollingLoginDialogPopUpToken />
    <Dialog
      open={showLoginDialog || showAuthPopup}
      onOpenChange={() => (setShowLoginDialog(false), setShowAuthPopup(false))}
      modal={true}
    >
      <DialogContent className="max-w-[95%] md:max-w-[425px] xl:max-w-[480px] rounded-lg shadow-lg p-8 overflow-y-scroll max-h-screen scrollbar-hide">
        {/* Header with Company Logo */}
        <DialogTitle>
          <div className="flex justify-center mb-6">
            <Image
              src="/bst-logo.png"
              alt="BST LOGO"
              width="135"
              height="58"
              objectFit="cover"
              className="w-[180px] h-[45px] md:w-[200px] md:h-[45px]"
            />
          </div>
        </DialogTitle>

        {onLoginDialog && <LoginForm />}
        {!onLoginDialog && <RegisterForm />}
      </DialogContent>
    </Dialog>
  </>
  );
}
