import { useLandingPageStore } from "@/app/store/landing-page.store";
import { AuthButton } from "@/components/custom-ui/auth.button";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";


export function LoginDialog() {
    const showLoginDialog = useLandingPageStore((state) => state.showLoginDialog)
    const setShowLoginDialog = useLandingPageStore((state) => state.setShowLoginDialog)
    const onLoginDialog = useLandingPageStore((state) => state.onLoginDialog)
    const setOnLoginDialog = useLandingPageStore((state) => state.setOnLoginDialog)

   
    return (
        <Dialog open={showLoginDialog} onOpenChange={() => setShowLoginDialog(false)} modal={true}>
    <DialogContent className="max-w-[95%] md:max-w-[425px] xl:max-w-[480px] rounded-lg shadow-lg p-8">
        {/* Header with Company Logo */}
        <DialogTitle>
        <div className="flex justify-center mb-6">
        <Image
              src="/bst-logo.png"
              alt="BST LOGO"
              width="135"
              height="58"
              objectFit="cover"
             className="w-[140px] h-[60px] md:w-[150px] md:h-[45px]"
            />
        </div>
        </DialogTitle>
        
        {onLoginDialog && <LoginForm />}
        {!onLoginDialog && <RegisterForm />}
        
    </DialogContent>
</Dialog>

    
    )
}