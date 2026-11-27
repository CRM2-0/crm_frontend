import { z } from "zod";
export const customerSchema = z.object({
  name: z.string().trim().min(2, "Name must have at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
});
