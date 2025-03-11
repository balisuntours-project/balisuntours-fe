import { VechileCategoryPublishStatusEnum } from "@/app/enums/airport-transfer/airport-transfer.enum";
import { z } from "zod";

const EditCarCategorySchema = z.object({
    name: z.string().min(1, "Enter car category name"),
    is_published: z.nativeEnum(VechileCategoryPublishStatusEnum)
})

export { EditCarCategorySchema };