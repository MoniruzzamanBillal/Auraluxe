import { imageSchema } from "@/components/share/schema/imageSchema";
import { z } from "zod";
import { TBrandType } from "../../BrandType/schema/brandType.schema";

export const brandSchema = z.object({
  name: z.string().trim().min(1, "Brand name is required").max(100),
  logo: imageSchema,
  brandTypeId: z.string().min(1, "Brand type is required"),
});

export type TBrandForm = z.infer<typeof brandSchema>;

export type TBrand = TBrandForm & {
  id: string;

  createdAt: string;
  updatedAt: string;
  isDeleted?: boolean;

  brandType?: TBrandType;
};
