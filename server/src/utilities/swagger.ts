import swaggerJSDoc from "swagger-jsdoc";
import { getFeedbackSchema } from "../docs/get-feedback";
import { getModelPredictionSchema } from "../docs/get-model";
import { getReportsSchema } from "../docs/get-report";
import { postFeedbackSchema } from "../docs/post-feedback";
import { postReportSchema } from "../docs/post-report";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FireGuard API Documentation",
      version: "1.0.8",
      description: "API documentation for Bushfire Risk Assessment application - FireGuard",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        // Feedback
        GetFeedback: getFeedbackSchema,
        PostFeedback: postFeedbackSchema,
        // Model
        GetModelPrediction: getModelPredictionSchema,
        // Report
        GetReport: getReportsSchema,
        PostReport: postReportSchema,
      },
    },
  },
  apis: ["./src/router.ts", "./src/docs/*.ts", "./src/controllers/*.ts"],
};

export const specs = swaggerJSDoc(options);

// Export for use in express app
export default specs;
