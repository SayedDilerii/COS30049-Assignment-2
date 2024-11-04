import { z } from "zod";

export const reportSchema = {
  create: z
    .object({
      full_name: z.string().min(1, { message: "this field cannot be empty" }),
      contact_number: z.string().min(1, { message: "this field is required" }),
      state: z.string().min(1, { message: "this field is required" }).max(35, { message: "this field cannot exceed over 35 characters" }),
      nearest_town: z.string().min(1, { message: "this field is required" }),
      datetime: z.object({
        discovery_date: z.string().min(1, { message: "this field is required" }),
        discovery_time: z.string().min(1, { message: "this field is required" }),
      }),
      severity: z.enum(["extreme", "high", "moderate", "light"]),
      cause: z.enum(["unknown", "human", "natural"]),
      estimated_size: z.string().min(1, { message: "this field is required" }),
      status: z.enum(["active", "contained", "extinguished"]),
      evacuation_status: z.enum(["none", "advisory", "mandatory"]),
      description: z.string().optional(),
    })
    .required(),
};
