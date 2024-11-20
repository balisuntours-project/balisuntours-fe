import { z } from "zod";

const LoginFormSchema = z
  .object({
    email: z.string().min(5, {
      message: "Enter valid email",
    }),
    password: z.string().min(8, {
      message: "Enter password",
    }),
  })

export { LoginFormSchema };
