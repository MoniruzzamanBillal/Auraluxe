import { imageSchema } from "@/components/share/schema/imageSchema";
import { z } from "zod";

export const homeOurFeaturedSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(300, "Description cannot exceed 300 characters"),

  imageUrl: imageSchema,
});

export type THomeOurFeaturedForm = z.infer<typeof homeOurFeaturedSchema>;

export type THomeOurFeatured = THomeOurFeaturedForm & {
  id: string;
  order: number;
  status: boolean;
};
