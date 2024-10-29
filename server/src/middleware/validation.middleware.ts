import { NextFunction, Request, Response } from "express-serve-static-core";
import { ZodError, ZodIssue, ZodSchema } from "zod";

export const validationMiddleware = (schema: ZodSchema) => {
  return (request: Request, response: Response, next: NextFunction) => {
    try {
      if (request.method === "POST") {
        schema.parse(request.body);
        next();
      }

      if (request.method === "GET" && request.params) {
        schema.parse(request.params);
        next();
      }
    } catch (error: any) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: ZodIssue) => ({
          message: `${issue.path.join(".")} - ${issue.message}`,
        }));
        response.status(400).json({ error: "Invalid data", details: errorMessages });
      } else {
        response.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
};
