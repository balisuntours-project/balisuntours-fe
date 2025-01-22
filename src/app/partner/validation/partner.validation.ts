import { z } from "zod";

const PartnerFormSchema = z
  .object({
    name: z.string().min(5, {
      message: "Fill the full name",
    }),
    phone: z.string().min(11, {
      message: "Enter phone number",
    }),
    email: z.string().email({
      message: "Email not valid",
    }),

    company_name: z.string().min(1, {
      message: "Enter company name",
    }),
    company_nationality: z.string().min(3, {
      message: "Enter valid country",
    }),
    website_url: z
    .string()
    .optional()
    .refine((value) => !value || value.length >= 5, {
      message: "Web URL must be valid if provided",
    }),
  })

export { PartnerFormSchema };
