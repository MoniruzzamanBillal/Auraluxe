import { imageSchema } from "@/components/share/schema/imageSchema";
import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string({ message: "Username is required" })
    .nonempty("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must be less than 50 characters"),

  email: z
    .string({ message: "Email is required" })
    .nonempty("Email is required")
    .email("Invalid email address"),

  profileImage: imageSchema,

  password: z
    .string({ message: "Password is required" })
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const updateProfileSchema = z.object({
  name: z
    .string({ message: "Username is required" })
    .nonempty("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must be less than 50 characters")
    .optional(),

  email: z
    .string({ message: "Email is required" })
    .email("Invalid email address")
    .optional(),

  profileImage: imageSchema,
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export type TRegisteredUser = RegisterFormData & { id: string };
