import { z } from "zod";

export const materialSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(300, "Description cannot exceed 300 characters"),
});

export type TMaterialForm = z.infer<typeof materialSchema>;

export type TMaterial = TMaterialForm & {
  id: string;
  status: boolean;
};
