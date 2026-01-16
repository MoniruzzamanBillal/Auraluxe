import { imageSchema } from "@/components/share/schema/imageSchema";
import { z } from "zod";

export const productSchema = z.object({
  name: z.string().trim().min(1, "Product name is required").max(100),

  brandId: z.string().min(1, "Brand is required"),

  categoryId: z.string().min(1, "Category is required"),

  price: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        const parsed = Number(val.replace(/,/g, "").trim());
        return isNaN(parsed) ? val : parsed;
      }
      return val;
    },
    z.number().min(0, "Price must be greater than 0")
  ),

  keyFeatures: z.string().trim().min(1, "Key features required"),
  specifications: z.string().trim().min(1, "Specifications required"),
  productDes: z.string().trim().min(1, "Product description required"),
  shippingDelivery: z.string().trim().optional(),
  productImage: imageSchema,
});

export type TProductForm = z.infer<typeof productSchema>;

export type TProduct = TProductForm & {
  id: string;
  brandName?: string;
  categoryName?: string;
  productCode?: string;
};
