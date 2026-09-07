import type { NextFunction, Request, Response } from "express";
import { requestSuccessHandler } from "../../shared/utils/requestHandlers.js";
import { demoService } from "./demo.service.js";

export const demoController = {
  async reset(_req: Request, res: Response, next: NextFunction) {
    try {
      const result = await demoService.reset();
      requestSuccessHandler(res, result, "Demo data reset successfully!");
    } catch (error) {
      next(error);
    }
  },
};
