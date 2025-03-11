import { z } from "zod";

const StoreCarCategorySchema = z.object({
    name: z.string().min(1, "Enter car category name"),
})

export { StoreCarCategorySchema };