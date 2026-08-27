import type { NextFunction, Request, Response } from "express";
import { requestSuccessHandler } from "../../shared/utils/requestHandlers.js";
import { trainingSplitDaysService } from "./training-split-day.service.js";

export const trainingSplitDayController = {
  async createTrainingSplitDay(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = Number(req.userId);
      const trainingSplitDay =
        await trainingSplitDaysService.createTrainingSplitDay(userId, req.body);

      requestSuccessHandler(
        res,
        trainingSplitDay,
        "Training Splits Day created successfully!",
      );
    } catch (error) {
      next(error);
    }
  },

  async getAllTrainingSplitDays(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = Number(req.userId);
      const trainingSplitDays =
        await trainingSplitDaysService.getAllTrainingSplitDays(
          userId,
          req.locale,
        );

      requestSuccessHandler(
        res,
        trainingSplitDays,
        "Training Splits Days retrieved successfully!",
      );
    } catch (error) {
      next(error);
    }
  },

  async updateTrainingSplitDay(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = Number(req.userId);
      const id = Number(req.params.id);
      const trainingSplitDay =
        await trainingSplitDaysService.updateTrainingSplitDay(
          userId,
          id,
          req.body,
        );
      requestSuccessHandler(
        res,
        trainingSplitDay,
        "Training Splits Day updated successfully!",
      );
    } catch (error) {
      next(error);
    }
  },

  async deleteTrainingSplitDay(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = Number(req.userId);
      const id = Number(req.params.id);
      await trainingSplitDaysService.deleteTrainingSplitDay(userId, id);
      requestSuccessHandler(
        res,
        null,
        "Training Splits Day deleted successfully!",
      );
    } catch (error) {
      next(error);
    }
  },
};
