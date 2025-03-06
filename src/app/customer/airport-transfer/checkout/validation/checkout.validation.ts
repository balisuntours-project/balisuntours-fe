import { CustomerTitleEnum, TransferTypeEnum } from "@/app/enums/airport-transfer/airport-transfer.enum";
import { z } from "zod";

const CheckoutAirportTransferSchema = z.object({
  customer_title: z.nativeEnum(CustomerTitleEnum),
  customer_first_name: z.string().min(1, "Enter first name"),
  customer_last_name: z.string().min(1, "Enter last name"),
  customer_country: z.string().min(1, "Fill the country"),
  customer_email: z.string().min(5, "Enter valid email"),
  customer_phone: z.string().min(10, "Enter valid phone").max(20, "Enter valid phone"),
});

export { CheckoutAirportTransferSchema };
