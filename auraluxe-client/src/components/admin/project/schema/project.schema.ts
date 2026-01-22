import { imageSchema } from "@/components/share/schema/imageSchema";
import { z } from "zod";

export const projectSchema = z.object({
  projectName: z.string().trim().min(1, "Project name is required").max(100),
  projectImg: imageSchema,
  location: z.string().trim().min(1, "Location is required"),
  client: z.string().trim().min(1, "Client is required"),
  architects: z.string().trim().min(1, "Architects are required"),
  website: z.string().trim(),
  facebookLink: z.string().trim().optional(),
  instagramLink: z.string().trim().optional(),
  linkedinLink: z.string().trim().optional(),
  xLink: z.string().trim().optional(),
  description: z.string().trim().max(1000).optional(),
  projectTypeId: z.string().min(1, "Project type is required"),
});

export type TProjectForm = z.infer<typeof projectSchema>;

export type TProject = TProjectForm & {
  id: string;
  status: boolean;
};
