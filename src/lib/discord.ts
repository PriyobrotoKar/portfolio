import type { TypeOf, z } from "astro/zod";
import type { contactSchema } from "./types";

const createEmbed = (data: z.infer<typeof contactSchema>) => {
  // create the embed json
};

const sendDiscordNotification = (payload: z.infer<typeof contactSchema>) => {
  // send the webhook message to my discord server
};
