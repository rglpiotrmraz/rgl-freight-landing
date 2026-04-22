import { z } from "zod";

export const subscriptionSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  nazwaFirmy: z.string().min(1, "Company name is required"),
  nazwisko: z.string().min(1, "Last name is required"),
});

export type SubscriptionFormData = z.infer<typeof subscriptionSchema>;
