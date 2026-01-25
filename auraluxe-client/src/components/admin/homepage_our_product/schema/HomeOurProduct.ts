import { imageSchema } from "@/components/share/schema/imageSchema";
import { z } from "zod";

export const HomeOurProductSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(80, "Title cannot exceed 80 characters"),

  imageUrl: imageSchema,

  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(300, "Description cannot exceed 300 characters"),
});

export type THomeOurProductFormData = z.infer<typeof HomeOurProductSchema>;

export type THomeOurProduct = THomeOurProductFormData & {
  id: string;
  createdAt: string;
  updatedAt: string;
  isDeleted?: boolean;
};
