import { z } from "zod";

const BLOCKED_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "aol.com",
  "icloud.com",
  "mail.com",
  "protonmail.com",
  "zoho.com",
  "yandex.com",
  "gmx.com",
  "live.com",
  "me.com",
  "msn.com",
];

export const waitlistSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email address")
    .email("Please enter a valid email address")
    .refine(
      (email) => {
        const domain = email.split("@")[1]?.toLowerCase();
        return !BLOCKED_DOMAINS.includes(domain);
      },
      {
        message:
          "Please use your work email so we can prioritize your team's access",
      }
    ),
});

export type WaitlistFormData = z.infer<typeof waitlistSchema>;
