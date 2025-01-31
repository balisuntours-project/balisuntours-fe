"use client";
import { useLandingPageStore } from "@/app/store/landing-page.store";
import { AuthButton } from "@/components/custom-ui/auth.button";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
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
import { useAuthPopupStore } from "@/app/store/auth-popup.store";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { DisabledButton } from "@/components/custom-ui/disabled.buttont";

export function InternalLoginForm() {
  const { toast } = useToast();

  const LoginForm = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

 
  const setShowLoginDialog = useLandingPageStore(
    (state) => state.setShowLoginDialog
  );

  
  const setShowAuthPopup = useAuthPopupStore((state) => state.setShowAuthPopup);
  const [onLoadLogin, setOnLoadLogin] = useState(false)
  const setIsLogin = useAuthStore((state) => state.setIsLogin);

  const handleLogin = async (values: z.infer<typeof LoginFormSchema>) => {
    setOnLoadLogin(true)
    values.password = btoa(values.password);
    const action = await AuthAction.LoginInternalUser(values);
    setOnLoadLogin(false)
    if (action) {
      setIsLogin(true)
      setShowLoginDialog(false);
      setShowAuthPopup(false);
    } else {
      toast({
        description: `Well, we can't found your account!`,
        variant: "danger",
      });
    }
  };

  return (
    <>
      <div>
        <Form {...LoginForm}>
          <form
            onSubmit={LoginForm.handleSubmit(handleLogin)}
            className="grid gap-4"
          >
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
                      className="border text-base border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                      className="border text-base border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            {!onLoadLogin ? (
              <AuthButton title="Login" rouded="rounded-lg" />
            ) : (
              <DisabledButton rouded="rounded-lg" title="Loging in..." />
            )}
          </form>
        </Form>
      </div>
    </>
  );
}
