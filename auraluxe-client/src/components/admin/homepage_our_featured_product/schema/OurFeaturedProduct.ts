import { imageSchema } from "@/components/share/schema/imageSchema";
import { z } from "zod";

export const OurFeaturedProductSchema = z.object({
  imageUrl: imageSchema, // image validation
});

export type TOurFeaturedProductFormData = z.infer<
  typeof OurFeaturedProductSchema
>;

export type TOurFeaturedProduct = TOurFeaturedProductFormData & {
  id: string;
  createdAt: string;
  updatedAt: string;
};
