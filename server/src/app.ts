import cors from "cors";
import express, { Application } from "express";
import swaggerUi from "swagger-ui-express";
import { MainRouter } from "./router";
import { Config } from "./types/config.type";
import { specs } from "./utilities/swagger";

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5178", "http://localhost:5179"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
  exposedHeaders: ["Content-Range", "X-Content-Range", "X-Total-Count"],
  maxAge: 86400, // 24 hours
};

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
    this.app.use(cors(corsOptions));
    this.app.use(
      "/docs",
      swaggerUi.serve,
      swaggerUi.setup(specs, {
        swaggerOptions: {
          defaultModelsExpandDepth: -1, // Hide schemas section by default
        },
      })
    );
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
