import { z } from "zod";

const EditMetaDataSchema = z
  .object({
    meta_title: z.string().min(5, {
      message: "Meta title must be at least 5 characters long",
    }),
    meta_description: z
      .string()
      .optional()
      .refine((value) => value === undefined || value.length >= 5, {
        message: "Meta description must be at least 5 characters long if provided",
      }),
    og_title: z
      .string()
      .optional()
      .refine((value) => value === undefined || value.length >= 5, {
        message: "OG title must be at least 5 characters long if provided",
      }),
    og_description: z
      .string()
      .optional()
      .refine((value) => value === undefined || value.length >= 5, {
        message: "OG description must be at least 5 characters long if provided",
      }),
    og_image: z
      .string()
      .optional()
      .refine((value) => value === undefined || value.length >= 5, {
        message: "OG image URL must be at least 5 characters long if provided",
      }),
    canonical_url: z.string().min(1, {
      message: "Canonical URL cannot be empty",
    }),
  });

export { EditMetaDataSchema };
