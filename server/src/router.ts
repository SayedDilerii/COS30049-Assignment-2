import { Router } from "express";
import { Request, Response } from "express-serve-static-core";

export class MainRouter {
  private router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get("/", (req: Request, res: Response) => {
      res.json({ message: "Welcome to the API" });
    });

    // Notifications route - it should allow for client to query and return random instances of bushfire predictions to mimmic "News Alerts".
    this.router.get("/notifications", (req: Request, res: Response) => {
      res.json({ results: ["Hello there, there's a bushfire at Shillicon Valley yeah!!"] });
    });

    // Model route - it should allow for querying of the machine learning model and return risk and data for charts
    this.router.get("/model/:state/:date/:tmin/:tmax", (req: Request, res: Response) => {
      const { state, date, tmin, tmax } = req.params;
      res.json({ results: "Machine learning model response: ", state: state, date: date, tmin: tmin, tmax: tmax });
    });

    // Feedback route - submit a feedback form
    this.router.post("/feedback", (req: Request, res: Response) => {
      const feedback = req.body;
      res.json({ Results: "User feedback: ", feedback });
    });

    // Feedback route - get all user feedback (for admin)
    this.router.get("/feedback", (req: Request, res: Response) => {
      res.json({ Results: "User feedback: ", feedback: "I like this app, it's very useful!" });
    });
  }

  // Method to get the router instance
  public getRouter(): Router {
    return this.router;
  }
}
