import express, { Application } from "express";
import { MainRouter } from "./router";
import { Config } from "./types/config.type";
export class App {
  private app: Application;
  private config: Config;

  constructor(config: Config) {
    this.app = express();
    this.config = config;
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private setupRoutes(): void {
    const router = new MainRouter();
    this.app.use("/api", router.getRouter());
  }

  public start(): void {
    this.app.listen(this.config.port, () => {
      console.log(`Server is running on port ${this.config.port}`);
    });
  }

  // For testing purposes:
  public getApp(): Application {
    return this.app;
  }
}
