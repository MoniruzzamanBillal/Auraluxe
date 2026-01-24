import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Category name is required")
    .max(50, "Category name cannot exceed 50 characters"),
});

export type TCategoryForm = z.infer<typeof categorySchema>;

export type TCategory = TCategoryForm & {
  id: string;

  createdAt: string;
  updatedAt: string;
};
