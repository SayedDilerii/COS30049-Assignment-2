export type Feedback = {
  id: number;
  full_name: string;
  email: string;
  feedback: string;
  created_at: string;
};

export type CreateFeedbackDTO = Pick<Feedback, "full_name" | "email" | "feedback">;
