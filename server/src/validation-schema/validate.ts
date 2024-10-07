import { Request, Response, NextFunction } from "express-serve-static-core";
import { ZodError, ZodObject, ZodSchema } from "zod";

const validateRequestBody = (schema: ZodSchema) => {
  return (request: Request, response: Response, next: NextFunction) => {
    try {
      schema.parse(request.body);
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        // const errorMessage = error.errors.map()
      }
    }
  };
};
