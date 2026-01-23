// app/checkout/schema/checkoutSchema.ts
import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phoneNumber: z.string().min(2, "Phone number is required"),
  streetAddress: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  postalCode: z.string().min(4, "Postal code must be at least 4 characters"),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
