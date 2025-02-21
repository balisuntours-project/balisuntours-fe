import { TransferTypeEnum } from "@/app/enums/airport-transfer/airport-transfer.enum";
import { z } from "zod";

const SearchVechileSchema = z.object({
  transfer_type: z.nativeEnum(TransferTypeEnum),
  origin: z.string().nullable(),
  destination: z.string().nullable(),
  origin_coordinate: z.string().nullable(),
  destination_coordinate: z.string().nullable(),
  administrative_area_level_3: z.string().nullable(),
  administrative_area_level_4: z.string().nullable(),
  total_passanger: z.coerce
    .number()
    .int()
    .min(1, { message: "How many passengers?" }),
  transfer_date_time: z
    .string()
    .min(1, { message: "Fill the transfer date" }) // ✅ Harus diisi
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
});

export { SearchVechileSchema };
