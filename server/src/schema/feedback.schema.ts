import { z } from "zod";

export const feedbackSchema = {
  create: z
    .object({
      full_name: z.string().min(1, { message: "this field cannot be empty." }).max(50, { message: "this field cannot exceed more than 50 characters." }),
      email: z.string().email(),
      feedback: z.string({ message: "this field cannot be empty" }),
    })
    .required(),
};
