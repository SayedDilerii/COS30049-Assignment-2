import z from "zod";

const user = z.object({
  first_name: z.string().min(2).max(30),
  middle_name: z.string().min(2).max(30).optional(),
  last_name: z.string().min(2).max(30),
  email: z.string().email(),
  access_pin: z.string().min(4).max(4),
  date_of_birth: z.coerce.date(),
  gender: z.enum(["Male", "Female", "Other", "Prefer to not say"]),
  country: z.string(),
  timezone: z.string(),
});
