"use client";

import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PartnerFormSchema } from "../validation/partner.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { AuthButton } from "@/components/custom-ui/auth.button";
import { DisabledButton } from "@/components/custom-ui/disabled.buttont";
import { PartnerAction } from "@/app/actions/partner/action";

export function PartnerForm() {
  const { toast } = useToast();
  const [onLoadInquiry, setOnLoadInquiry] = useState(false);

  const PartnerForm = useForm<z.infer<typeof PartnerFormSchema>>({
    resolver: zodResolver(PartnerFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      company_name: "",
      company_nationality: "",
      website_url: "",
    },
  });

  const handleInquiry = async (values: z.infer<typeof PartnerFormSchema>) => {
    setOnLoadInquiry(true)
    const action = await PartnerAction.SendPartnerRequest(values);
    setOnLoadInquiry(false)
    if (action) {
        toast({
            description: `Request sent, we will contact you soon!`,
            variant: "success",
          });
    } else {
      toast({
        description: `Something went wrong, try to send again later!`,
        variant: "danger",
      });
    }
  };

  return (
    <>
      <div className="max-w-lg mx-auto">
        <Form {...PartnerForm}>
          <form
            onSubmit={PartnerForm.handleSubmit(handleInquiry)}
            className="grid gap-4"
          >
            {/* Full Name */}
            <FormField
              control={PartnerForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 text-sm font-semibold">
                    Your Name
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
                control={PartnerForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 text-sm font-semibold">
                      Whatsapp to Reply
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
                control={PartnerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 text-sm font-semibold">
                     Email to reply
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

            {/* Country and City (Side by Side) */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={PartnerForm.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 text-sm font-semibold">
                      Company Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="border text-base border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Bali Sun Tours"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={PartnerForm.control}
                name="company_nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 text-sm font-semibold">
                      Company Nationality
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="border text-base border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Indonesia"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={PartnerForm.control}
              name="website_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 text-sm font-semibold">
                    Website URL (optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border text-base border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://balisuntours.com"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Register Button */}
            {!onLoadInquiry ? (
              <AuthButton title="Send" rouded="rounded-lg" />
            ) : (
              <DisabledButton rouded="rounded-lg" title="Sending..." />
            )}
          </form>
        </Form>

       
      </div>
    </>
  );
}
