import { z } from "zod";

const AddReviewFormSchema = z
  .object({
    name: z.string().min(5, {
      message: "Enter valid shown name",
    }),
    comment: z.string().min(25, {
      message: "At least 25 characters",
    }),
  })

export { AddReviewFormSchema };
