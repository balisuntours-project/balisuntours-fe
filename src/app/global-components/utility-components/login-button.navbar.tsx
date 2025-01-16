"use client";

import { useLandingPageStore } from "@/app/store/landing-page.store";
import { AuthButton } from "@/components/custom-ui/auth.button";
import { CircleUserRound } from "lucide-react";
import { LoginDialog } from "./login-dialog";
import { GlobalUtility } from "@/lib/global.utility";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/app/store/auth.store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LoginButtonNavbar({ forAdmin }: { forAdmin?: boolean }) {
  const setShowLoginDialog = useLandingPageStore(
    (state) => state.setShowLoginDialog
  );
  const isLogin = useAuthStore((state) => state.isLogin);
  const setIsLogin = useAuthStore((state) => state.setIsLogin);

  useEffect(() => {
    const loginStatus = GlobalUtility.GetLoginStatusCookie();
    //console.log(loginStatus)
    setIsLogin(loginStatus ? true : false);
  }, []);

  function ShowLoginButtonOrProfilePicture() {
    if (isLogin) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="w-6 h-6 md:w-12 md:h-12 cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>BST</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              Hi, {!forAdmin ? "Traveller" : "Officer"}
            </DropdownMenuLabel>

            {!forAdmin && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => GlobalUtility.DestroyAllCookie()}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    } else {
      return (
        <div>
          <div
            className="hidden md:block"
            onClick={() => setShowLoginDialog(true)}
          >
            <AuthButton title="LOGIN" />
          </div>
          <CircleUserRound
            className="block md:hidden w-5 h-5 stroke-[1.5]"
            onClick={() => setShowLoginDialog(true)}
          />
        </div>
      );
    }
  }

  return (
    <>
      <LoginDialog />
      <div className="flex items-center space-x-4 md:space-x-11">
        {/* Divider */}
        <div className="border-r-2 border-gray-300 h-6" />

        {/* Login Button */}
        <ShowLoginButtonOrProfilePicture />
      </div>
    </>
  );
}
