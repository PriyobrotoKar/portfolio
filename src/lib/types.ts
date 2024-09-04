import { z } from "astro/zod";

export const contactSchema = z.object({
  name: z.string().min(1, { message: "Name is required!" }),
  email: z.string().email().min(1, { message: "Email is required." }),
  message: z
    .string()
    .min(1, { message: "A message is required" })
    .max(500, { message: "Message cannot be more than 500 letters" }),
});
