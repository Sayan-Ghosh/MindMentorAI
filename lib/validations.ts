import * as z from "zod";

export const journalFormSchema = z.object({
  content: z.string().min(20, {
    message: "Journal entry must be at least 20 characters.",
  }).max(5000, {
    message: "Journal entry is too long.",
  }),
});
