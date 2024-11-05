import swaggerJSDoc from "swagger-jsdoc";
import { getFeedbackSchema } from "../docs/get-feedback";
import { postFeedbackSchema } from "../docs/post-feedback";

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
        PostFeedback: postFeedbackSchema,
        GetFeedback: getFeedbackSchema,
      },
    },
  },
  apis: ["./src/router.ts", "./src/docs/*.ts", "./src/controllers/*.ts"],
};

export const specs = swaggerJSDoc(options);

// Export for use in express app
export default specs;
