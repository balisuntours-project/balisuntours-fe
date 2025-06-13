import { z } from "zod";

const EditFreeVoucherSchema = z.object({
  expiry_time_in_day: z.coerce
    .number()
    .int()
    .min(1, "Fill voucher expiry time in day"),
  slot: z.coerce.number().int().min(1, "Free for how many person?"),
  is_published: z.boolean()
});

export { EditFreeVoucherSchema };
