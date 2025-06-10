import { z } from "zod";

const 
TravellerDataSchema = z
  .object({
    email: z.string().min(5, {
      message: "Enter valid email",
    }),
    name: z.string().min(3, {
      message: "Enter full name",
    }),
    phone: z.string().min(11, {
        message: "Enter valid phone number",
    }),
  })

export { TravellerDataSchema };
