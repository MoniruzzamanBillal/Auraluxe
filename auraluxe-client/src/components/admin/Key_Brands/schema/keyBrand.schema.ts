import { imageSchema } from "@/components/share/schema/imageSchema";
import { z } from "zod";

export const keyBrandSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  logo: imageSchema,
  description: z.string().trim().min(1, "Description is required").max(300),
});

export type TKeyBrandForm = z.infer<typeof keyBrandSchema>;

export type TKeyBrand = TKeyBrandForm & {
  id: string;
  status: boolean;
};
