import { Request, Response } from "express-serve-static-core";
import { CreateFeedbackDTO, Feedback } from "../types/feedback.type";
import { Database } from "../utilities/database";
import { BaseController } from "./base-controller";

export class FeedbackController extends BaseController {
  private db: Database;

  constructor() {
    super();
    this.db = Database.getInstance();
  }

  public create = async (request: Request, response: Response): Promise<void> => {
    try {
      const userFeedback: CreateFeedbackDTO = request.body;
      await this.db.create("feedback", userFeedback);

      response.status(201).json({
        success: true,
        message: "Thank you for your feedback!",
      });
    } catch (error) {
      console.error("Error creating feedback:", error);
      response.status(500).json({
        success: false,
        message: "Failed to create feedback",
      });
    }
  };

  // Used for admin to see all reviews of FireGuard
  public getAllFeedback = async (request: Request, response: Response): Promise<void> => {
    try {
      const feedbacks = await this.db.findAll<Feedback>("feedback");

      response.status(200).json({
        success: true,
        data: feedbacks,
      });
    } catch (error) {
      console.error("Error fetching feedback:", error);
      response.status(500).json({
        success: false,
        message: "Failed to fetch feedback",
      });
    }
  };
}
