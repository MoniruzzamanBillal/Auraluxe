import { z } from "zod";

export const projectTypeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Project type name is required")
    .max(50, "Project type name cannot exceed 50 characters"),

  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(500, "Description cannot exceed 200 characters"),
});

export type TProjectTypeForm = z.infer<typeof projectTypeSchema>;

export type TProjectType = TProjectTypeForm & {
  id: string;
  status: boolean;

  createdAt: string;
  updatedAt: string;
};
