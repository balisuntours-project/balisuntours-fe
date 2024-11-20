"use client"
import { useLandingPageStore } from "@/app/store/landing-page.store";
import { AuthButton } from "@/components/custom-ui/auth.button";
import { ExpandedButton } from "@/components/custom-ui/expanded.button";
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import axios from "axios";
import { GoalIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"
import api from "@/lib/axios-instance";
import { GlobalUtility } from "@/lib/global.utility";
import { useAuthStore } from "@/app/store/auth.store";
import { LoginFormSchema } from "@/app/api/auth/validation/login.validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { AuthAction } from "@/app/action/action";

export function LoginForm() {

    const LoginForm = useForm<z.infer<typeof LoginFormSchema>>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
          email: "",
          password: ""
        },
      });

    const setOnLoginDialog = useLandingPageStore((state) => state.setOnLoginDialog)
    const setShowLoginDialog = useLandingPageStore((state) => state.setShowLoginDialog)
    

    const setShowBrowserPopupDialog = useAuthStore((state) => state.setShowBrowserPopupDialog)

    const handleLogin = async (values: z.infer<typeof LoginFormSchema>) => {
        const action = await AuthAction.LoginUser(values)
    
        if(action) {
            setShowLoginDialog(false)
        }else{
            window.alert("Data not found")
        }
      };

    const handleGoogleLogin = () => {
        const url = process.env.BACKEND_DOMAIN + "/customer/auth/jwt/google/redirect" as string;
       const data = GlobalUtility.OpenBrowserPopup(url)
        setShowBrowserPopupDialog(data)
    };

  

    return (
        <>
       
             <div>
      <Form {...LoginForm}>
      <form onSubmit={LoginForm.handleSubmit(handleLogin)} className="grid gap-4">
            {/* Email Input */}
            <FormField
              control={LoginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 text-sm font-semibold">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="alejandor@gmail.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
               
            
            {/* Password Input */}
            <FormField
              control={LoginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 text-sm font-semibold">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="*****"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
               

            {/* Login Button */}
            <AuthButton title="Login" rouded="rounded-lg" />
           
        </form>
      </Form>

        {/* Divider */}
        <div className="flex items-center my-3">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500 text-sm font-medium">Or Login With</span>
            <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Login Button */}
        <Button onClick={() => handleGoogleLogin()} variant="outline" className="hover:bg-[#008000] hover:text-white border-[1px] border-[#008000] w-full">
             Signup with Google
        </Button>
       
        <div className="mt-4 text-sm text-center">
            <p>Don't have an account? <span onClick={() => setOnLoginDialog(false)} className="text-[#008000] font-bold cursor-pointer">Sign up</span> and start exploring!</p>
        </div>
        </div>
        </>
    )
}