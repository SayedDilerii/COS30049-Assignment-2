import { Router } from "express";
import { Request, Response } from "express-serve-static-core";
import { FeedbackController } from "./controllers/feedback.controller";
import { validationMiddleware } from "./middleware/validation.middleware";
import { feedbackSchema } from "./schema/feedback.schema";

export class MainRouter {
  private router: Router;
  private feedbackController: FeedbackController;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
    this.feedbackController = new FeedbackController();
  }

  private initializeRoutes(): void {
    this.router.get("/", (request: Request, response: Response) => {
      response.json({ message: "Welcome to the API" });
    });

    // Notifications route - it should allow for client to query and return random instances of bushfire predictions to mimmic "News Alerts".
    this.router.get("/notifications", (request: Request, response: Response) => {
      response.json({ results: ["Hello there, there's a bushfire at Shillicon Valley yeah!!"] });
    });

    // Model route - it should allow for querying of the machine learning model and return risk and data for charts
    this.router.get("/model/:state/:date/:tmin/:tmax", (request: Request, response: Response) => {
      const { state, date, tmin, tmax } = request.params;
      response.json({ results: "Machine learning model response: ", state: state, date: date, tmin: tmin, tmax: tmax });
    });

    // Feedback route - submit a feedback form
    this.router.post("/feedback", validationMiddleware(feedbackSchema.create), (request: Request, response: Response) => this.feedbackController.create(request, response));

    // Feedback route - get all user feedback (for admin)
    this.router.get("/feedback", (request: Request, response: Response) => this.feedbackController.getAllFeedback(request, response));
  }

  public getRouter(): Router {
    return this.router;
  }
}
