import { z } from "zod";

export const modelSchema = {
  get: z
    .object({
      state: z.string().min(1).max(2),
      date: z.string().date(),
      tmin: z
        .string()
        .min(1)
        .max(3)
        .transform(Number)
        .refine((n) => n >= -150 && n <= 150, "Temperature must be between -150 and 150"),
      tmax: z
        .string()
        .min(1)
        .max(3)
        .transform(Number)
        .refine((n) => n >= -150 && n <= 150, "Temperature must be between -150 and 150"),
    })
    .required()
    .refine((data) => Number(data.tmin) <= Number(data.tmax), {
      message: "must be less than or equal to tmax",
      path: ["tmin"],
    }),
};
