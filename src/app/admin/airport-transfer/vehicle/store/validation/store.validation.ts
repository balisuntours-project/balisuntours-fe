import { z } from "zod";

const StoreCarSchema = z.object({
  //   main_photo: z.union([
  //     z.number(), // Jika main_photo adalah numeric (ID)
  //     z.instanceof(File), // Jika main_photo adalah file
  //   ]),
  vechile_category_uuid: z.string().min(1, "Select category"),
  name: z.string().min(1, "Enter car name"),
  total_seat: z.coerce.number().int().min(1, "Fill total seat"),
  total_luggage: z.coerce.number().int().min(1, "Fill total luggage"),
  cut_off_time_in_hours: z.coerce.number().int().min(1, "Fill cut off time"),
  driver_free_waiting_time_in_minutes: z.coerce
    .number()
    .int()
    .min(1, "Fill driver waiting time"),
  price_per_km: z.coerce.number().int().min(1, "Fill price per km"),
  increment_start_km: z.coerce
    .number()
    .int()
    .min(1, "Fill increment percentage charge"),
  increment_price_rate_percentage: z.coerce
    .number()
    .min(0, "Fill percetange of increment")
    .max(100, "Max percentage is 100"),
  minimum_charge: z.coerce.number().int().min(1, "Fill minimum charge"),
  mininum_charge_applies_until_km: z.coerce
    .number()
    .int()
    .min(1, "Min charge applies from (?) km"),
});

export { StoreCarSchema };
