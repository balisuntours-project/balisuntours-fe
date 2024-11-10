"use client"

import { useLandingPageStore } from "@/app/store/landing-page.store";
import { AuthButton } from "@/components/custom-ui/auth.button";
import { CircleUserRound } from "lucide-react";
import { LoginDialog } from "./login-dialog";

export function LoginButtonNavbar() {
    const setShowLoginDialog = useLandingPageStore((state) => state.setShowLoginDialog)
    const showLoginDialog = useLandingPageStore((state) => state.showLoginDialog)

    return (
        <>
            <LoginDialog />
            <div className="flex items-center space-x-4 md:space-x-11">
              {/* Divider */}
              <div className="border-r-2 border-gray-300 h-6" />

              {/* Login Button */}
              <div className="hidden md:block" onClick={() => setShowLoginDialog(true)}>
              <AuthButton title="LOGIN" />
              </div>
              <CircleUserRound className="block md:hidden w-5 h-5 stroke-[1.5]" onClick={() => setShowLoginDialog(true)} />
            </div>
        </>
    )
}