import { z } from "zod";

const StoreAdditionalServiceSchema = z.object({
    name: z.string().min(1, "Enter service name"),
    price: z.coerce.number().int().min(1, "Fill price"),
    min_qty: z.coerce.number().int().min(1, "Minimum qty").max(125, "Max exceed"),
    max_qty: z.coerce.number().int().min(1, "Maximum qty").max(125, "Max exceed"),
})

export { StoreAdditionalServiceSchema };