import { Request, Response } from "express-serve-static-core";
import { CreateReportDTO, Report } from "../types/report.type";
import { Database } from "../utilities/database";

export class ReportController {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  public create = async (request: Request, response: Response): Promise<void> => {
    try {
      const reportEntry: CreateReportDTO = request.body;

      // create report entry
      await this.db.create("report", reportEntry);

      response.status(201).json({
        success: true,
        message: "Thank you for your report!",
      });
    } catch (error) {
      console.error("Error creating report:", error);
      response.status(500).json({
        success: false,
        message: "Failed to create report",
      });
    }
  };

  // Used for admin to see all reviews of FireGuard
  public getAllReports = async (request: Request, response: Response): Promise<void> => {
    try {
      const reports = await this.db.findAll<Report>("report");

      response.status(200).json({
        success: true,
        results: reports,
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
