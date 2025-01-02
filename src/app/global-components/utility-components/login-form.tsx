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

export function LoginForm() {
  const { toast } = useToast();

  const LoginForm = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const setOnLoginDialog = useLandingPageStore(
    (state) => state.setOnLoginDialog
  );
  const setShowLoginDialog = useLandingPageStore(
    (state) => state.setShowLoginDialog
  );

  const setShowBrowserPopupDialog = useAuthStore(
    (state) => state.setShowBrowserPopupDialog
  );
  const setShowAuthPopup = useAuthPopupStore((state) => state.setShowAuthPopup);
  const [onLoadLogin, setOnLoadLogin] = useState(false)
  const handleLogin = async (values: z.infer<typeof LoginFormSchema>) => {
    setOnLoadLogin(true)
    values.password = btoa(values.password);
    const action = await AuthAction.LoginUser(values);
    setOnLoadLogin(false)
    if (action) {
      setShowLoginDialog(false);
      setShowAuthPopup(false);
    } else {
      toast({
        description: `Well, we can't found your account!`,
        variant: "danger",
      });
    }
  };

  const handleGoogleLogin = () => {
    const url = (process.env.BACKEND_DOMAIN +
      "/customer/auth/jwt/google/redirect") as string;
    const data = GlobalUtility.OpenBrowserPopup(url);
    setShowBrowserPopupDialog(data);
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

        {/* Divider */}
        <div className="flex items-center my-3">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500 text-sm font-medium">
            Or Login With
          </span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Login Button */}
        <Button
          onClick={() => !onLoadLogin ? handleGoogleLogin() : undefined}
          variant="outline"
          className="hover:bg-[#008000] hover:text-white border-[1px] border-[#008000] w-full"
        >
          Signup with Google
        </Button>

        <div className="mt-4 text-sm text-center">
          <p>
            Don't have an account?{" "}
            <span
              onClick={() => !onLoadLogin ? setOnLoginDialog(false) : undefined}
              className="text-[#008000] font-bold cursor-pointer"
            >
              Sign up
            </span>{" "}
            and start exploring!
          </p>
        </div>
      </div>
    </>
  );
}
