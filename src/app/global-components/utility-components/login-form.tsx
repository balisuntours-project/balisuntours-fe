"use client"
import { useLandingPageStore } from "@/app/store/landing-page.store";
import { AuthButton } from "@/components/custom-ui/auth.button";
import { ExpandedButton } from "@/components/custom-ui/expanded.button";
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { GoalIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function LoginForm() {
    const setOnLoginDialog = useLandingPageStore((state) => state.setOnLoginDialog)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Logic untuk login
    };

    const handleGoogleLogin = () => {
        window.location.href = "https://booking.balisuntours.com/api/customer/auth/google/redirect"
    };


    return (
        <>
             <div>
        <form onSubmit={handleLogin} className="grid gap-4">
            {/* Email Input */}
            <div className="flex flex-col gap-1">
                <Label htmlFor="email" className="text-gray-700 text-sm font-semibold">
                    Email
                </Label>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="example@example.com"
                />
            </div>
            
            {/* Password Input */}
            <div className="flex flex-col gap-1">
                <Label htmlFor="password" className="text-gray-700 text-sm font-semibold">
                    Password
                </Label>
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="********"
                />
            </div>

            {/* Login Button */}
            <AuthButton title="Login" rouded="rounded-lg" />
        </form>

        {/* Divider */}
        <div className="flex items-center my-3">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500 text-sm font-medium">Or Login With</span>
            <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Login Button */}
        <Button variant="outline" className="hover:bg-[#008000] hover:text-white border-[1px] border-[#008000] w-full">
             Signup with Google
        </Button>
       
        <div className="mt-4 text-sm text-center">
            <p>Don't have an account? <span onClick={() => setOnLoginDialog(false)} className="text-[#008000] font-bold cursor-pointer">Sign up</span> and start exploring!</p>
        </div>
        </div>
        </>
    )
}