import { imageSchema } from "@/components/share/schema/imageSchema";
import { z } from "zod";

export const HomePageBannerSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(80, "Title cannot exceed 80 characters"),

  bannerImage: imageSchema,

  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(200, "Description cannot exceed 200 characters"),
});

export type THomePageBannerFormData = z.infer<typeof HomePageBannerSchema>;

export type THomePageBanner = THomePageBannerFormData & {
  status: boolean;
  order: number;
  id: string;
};
