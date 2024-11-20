import { z } from "zod";

const RegisterFormSchema = z
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

    password: z.string().min(6, {
      message: "At least 8 character",
    }),
    password_confirmation: z.string(),
    country: z.string().min(3, {
      message: "Enter valid country",
    }),
    city: z.string().min(3, {
      message: "Enter valid city",
    }),
  })
  .refine(
    (data) => {
      return data.password === data.password_confirmation;
    },
    {
      message: "Password confirmation tidak sesuai",
      path: ["password_confirmation"],
    }
  );

export { RegisterFormSchema };
