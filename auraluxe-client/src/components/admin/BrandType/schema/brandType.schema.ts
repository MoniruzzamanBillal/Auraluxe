import { z } from "zod";

export const brandTypeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Brand type name is required")
    .max(50, "Brand type name cannot exceed 50 characters"),

  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(500, "Description cannot exceed 200 characters"),
});

export type TBrandTypeForm = z.infer<typeof brandTypeSchema>;

export type TBrandType = TBrandTypeForm & {
  id: string;
  status: boolean;
};
