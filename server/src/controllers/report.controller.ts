import { Request, Response } from "express-serve-static-core";
import { Feedback } from "../types/feedback.type";
import { Database } from "../utilities/database";

export class ReportController {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  public create = async (request: Request, response: Response): Promise<void> => {
    try {
      response.status(201).json({
        success: true,
        message: "Thank you for your report!",
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
  public getAllReports = async (request: Request, response: Response): Promise<void> => {
    try {
      const feedbacks = await this.db.findAll<Feedback>("report");

      response.status(200).json({
        success: true,
        results: feedbacks,
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
