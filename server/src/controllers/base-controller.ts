import { Response } from "express-serve-static-core";

export abstract class BaseController {
  protected sendSuccess(res: Response, data: any, status: number = 200): Response {
    return res.status(status).json({
      success: true,
      data,
    });
  }

  protected sendError(res: Response, message: string, status: number = 400): Response {
    return res.status(status).json({
      success: false,
      error: message,
    });
  }
}
