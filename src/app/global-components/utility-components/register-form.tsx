"use client"
import { useLandingPageStore } from "@/app/store/landing-page.store";
import { AuthButton } from "@/components/custom-ui/auth.button";
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";

export function RegisterForm() {

    const setOnLoginDialog = useLandingPageStore((state) => state.setOnLoginDialog)
    const handleRegister = () => {

    }

    const handleGoogleLogin = () => {
        window.location.href = "https://booking.balisuntours.com/api/customer/auth/google/redirect"
    };


    return (
        <>
        <div className="max-w-lg mx-auto">
    <form onSubmit={handleRegister} className="grid gap-4">
        {/* Full Name */}
        <div className="flex flex-col gap-1">
            <Label htmlFor="fullName" className="text-gray-700 text-sm font-semibold">
                Full Name
            </Label>
            <Input
                id="fullName"
                type="text"
                // value={fullName}
                // onChange={(e) => setFullName(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your Full Name"
            />
        </div>

        {/* Phone and Email (Side by Side) */}
        <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
                <Label htmlFor="phone" className="text-gray-700 text-sm font-semibold">
                    Phone
                </Label>
                <Input
                    id="phone"
                    type="tel"
                    // value={phone}
                    // onChange={(e) => setPhone(e.target.value)}
                    required
                    className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+1234567890"
                />
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor="email" className="text-gray-700 text-sm font-semibold">
                    Email
                </Label>
                <Input
                    id="email"
                    type="email"
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="example@example.com"
                />
            </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
            <Label htmlFor="password" className="text-gray-700 text-sm font-semibold">
                Password
            </Label>
            <Input
                id="password"
                type="password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="********"
            />
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1">
            <Label htmlFor="confirmPassword" className="text-gray-700 text-sm font-semibold">
                Confirm Password
            </Label>
            <Input
                id="confirmPassword"
                type="password"
                // value={confirmPassword}
                // onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="********"
            />
        </div>

        {/* Country and City (Side by Side) */}
        <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
                <Label htmlFor="country" className="text-gray-700 text-sm font-semibold">
                    Country
                </Label>
                <Input
                    id="country"
                    type="text"
                    // value={country}
                    // onChange={(e) => setCountry(e.target.value)}
                    required
                    className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your Country"
                />
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor="city" className="text-gray-700 text-sm font-semibold">
                    City
                </Label>
                <Input
                    id="city"
                    type="text"
                    // value={city}
                    // onChange={(e) => setCity(e.target.value)}
                    required
                    className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your City"
                />
            </div>
        </div>

        {/* Register Button */}
        <AuthButton title="Register" rouded="rounded-lg" />
    </form>

    {/* Divider */}
    <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-500 text-sm font-medium">Or Login With</span>
        <div className="flex-grow border-t border-gray-300"></div>
    </div>

    {/* Google Register Button */}
    <Button variant="outline" className="hover:bg-[#008000] hover:text-white border-[1px] border-[#008000] w-full">
             Signup with Google
        </Button>
    {/* Footer with Login Link */}
    <div className="mt-4 text-sm text-center">
        <p>Already have an account? <span onClick={() => setOnLoginDialog(true)} className="text-[#008000] font-bold cursor-pointer">Log in</span> now!</p>
    </div>
</div>

        </>
    )
}