"use client";
import { useLandingPageStore } from "@/app/store/landing-page.store";
import { AuthButton } from "@/components/custom-ui/auth.button";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { RegisterFormSchema } from "@/app/api/auth/validation/register.validation";
import { z } from "zod";
import { AuthAction } from "@/app/action/action";
import { GlobalUtility } from "@/lib/global.utility";
import { useAuthStore } from "@/app/store/auth.store";
import { useAuthPopupStore } from "@/app/store/auth-popup.store";
import { useToast } from "@/hooks/use-toast";
import { DisabledButton } from "@/components/custom-ui/disabled.buttont";

export function RegisterForm({ onClick }: { onClick?: () => void }) {
  const { toast } = useToast();
  const RegisterForm = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      password_confirmation: "",
      country: "",
      city: "",
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
  const [onLoadRegister, setOnLoadRegister] = useState(false);
  const setIsLogin = useAuthStore((state) => state.setIsLogin);

  const handleRegister = async (values: z.infer<typeof RegisterFormSchema>) => {
    setOnLoadRegister(true);
    values.password = btoa(values.password);
    values.password_confirmation = btoa(values.password_confirmation);
    const action = await AuthAction.RegisterUser(values);
    setOnLoadRegister(false);

    if (action) {
      setIsLogin(true);
      setShowLoginDialog(false);
      setShowAuthPopup(false);
    } else {
      toast({
        description: `Something went wrong, try signup with google instead!`,
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
      <div className="max-w-lg mx-auto">
        <Form {...RegisterForm}>
          <form
            onSubmit={RegisterForm.handleSubmit(handleRegister)}
            className="grid gap-4"
          >
            {/* Full Name */}
            <FormField
              control={RegisterForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 text-sm font-semibold">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border text-base border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Your Full Name"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone and Email (Side by Side) */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={RegisterForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 text-sm font-semibold">
                      Phone
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="border text-base border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="+628877XXXX"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={RegisterForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 text-sm font-semibold">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="border text-base border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="alexander@gmail.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Password */}
            <FormField
              control={RegisterForm.control}
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

            {/* Confirm Password */}
            <FormField
              control={RegisterForm.control}
              name="password_confirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 text-sm font-semibold">
                    Password Confirmation
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

            {/* Country and City (Side by Side) */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={RegisterForm.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 text-sm font-semibold">
                      Country
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="border text-base border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Australia"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={RegisterForm.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 text-sm font-semibold">
                      City
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="border text-base border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Melbourne"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Register Button */}
            {!onLoadRegister ? (
              <AuthButton title="Register" rouded="rounded-lg" />
            ) : (
              <DisabledButton rouded="rounded-lg" title="Registering..." />
            )}
          </form>
        </Form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500 text-sm font-medium">
            Or Login With
          </span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Register Button */}
        <Button
          onClick={() => (!onLoadRegister ? handleGoogleLogin() : undefined)}
          variant="outline"
          className="hover:bg-[#008000] hover:text-white border-[1px] border-[#008000] w-full"
        >
          Signup with Google
        </Button>
        {/* Footer with Login Link */}
        <div className="mt-4 text-sm text-center">
          <p>
            Already have an account?{" "}
            <span
              onClick={
                onClick
                  ? onClick
                  : () => (!onLoadRegister ? setOnLoginDialog(true) : undefined)
              }
              className="text-[#008000] font-bold cursor-pointer"
            >
              Log in
            </span>{" "}
            now!
          </p>
        </div>
      </div>
    </>
  );
}
