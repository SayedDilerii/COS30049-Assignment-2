import { Router } from "express";
import { Request, Response } from "express-serve-static-core";
import { FeedbackController } from "./controllers/feedback.controller";
import { ModelController } from "./controllers/model.controller";
import { ReportController } from "./controllers/report.controller";
import { validationMiddleware } from "./middleware/validation.middleware";
import { feedbackSchema } from "./schema/feedback.schema";
import { modelSchema } from "./schema/model.schema";
import { reportSchema } from "./schema/report.schema";

export class MainRouter {
  private router: Router;
  private feedbackController: FeedbackController;
  private modelController: ModelController;
  private reportController: ReportController;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
    this.feedbackController = new FeedbackController();
    this.modelController = new ModelController();
    this.reportController = new ReportController();
  }

  private initializeRoutes(): void {
    /**
     * @openapi
     * /api/health-check:
     *   get:
     *     tags:
     *       - Health Check
     *     summary: Welcome message
     *     description: Returns a welcome message for the API
     *     responses:
     *       200:
     *         description: Welcome message
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     */
    this.router.get("/health-check", (request: Request, response: Response) => {
      response.json({ message: "Welcome to the API" });
    });

    // Model route - it should allow for querying of the machine learning model and return risk and data for charts
    this.router.get("/model", validationMiddleware(modelSchema.get), (request: Request, response: Response) => this.modelController.query(request, response));

    // Notifications route - it should allow for client to query and return random instances of bushfire predictions to mimmic "News Alerts".
    this.router.get("/notifications", (request: Request, response: Response) => {
      response.json({ results: ["Hello there, there's a bushfire at Shillicon Valley yeah!!"] });
    });

    /**
     * @openapi
     * /api/feedback:
     *   post:
     *     tags:
     *        - Feedback
     *     $ref: '#/components/schemas/PostFeedback'
     */
    this.router.post("/feedback", validationMiddleware(feedbackSchema.create), (request: Request, response: Response) => this.feedbackController.create(request, response));

    /**
     * @openapi
     * /api/feedback:
     *   get:
     *     tags:
     *        - Feedback
     *     $ref: '#/components/schemas/GetFeedback'
     */
    this.router.get("/feedback", (request: Request, response: Response) => this.feedbackController.getAllFeedback(request, response));

    // Report route - create report entry
    this.router.post("/report", validationMiddleware(reportSchema.create), (request: Request, response: Response) => this.reportController.create(request, response));

    // Report route - get all reports
    this.router.get("/report", (request: Request, response: Response) => this.reportController.getAllReports(request, response));
  }

  public getRouter(): Router {
    return this.router;
  }
}
