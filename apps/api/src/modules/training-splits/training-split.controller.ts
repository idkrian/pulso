import type { NextFunction, Request, Response } from "express";
import { trainingSplitService } from "./training-split.service.js";
import { requestSuccessHandler } from "../../shared/utils/requestHandlers.js";
import { trainingSplitRepository } from "./training-split.repository.js";

export const trainingSplitController = {
  async createTrainingSplit(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.userId);
      const trainingSplit = await trainingSplitService.createTrainingSplit(
        userId,
        req.body,
      );

      requestSuccessHandler(
        res,
        trainingSplit,
        "Training Split created succesfully!",
      );
    } catch (error) {
      next(error);
    }
  },

  async getAllUserTrainingSplits(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = Number(req.userId);
      const trainingSplits =
        await trainingSplitService.getAllUserTrainingSplits(userId, req.locale);

      requestSuccessHandler(
        res,
        trainingSplits,
        "Training Splits retrieved successfully!",
      );
    } catch (error) {
      next(error);
    }
  },

  async getUserTrainingSplitById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = Number(req.userId);
      const trainingSplitId = Number(req.params.id);
      const trainingSplit = await trainingSplitService.getUserTrainingSplitById(
        userId,
        trainingSplitId,
        req.locale,
      );

      requestSuccessHandler(
        res,
        trainingSplit,
        "Training Splits retrieved successfully!",
      );
    } catch (error) {
      next(error);
    }
  },

  async updateUserTrainingSplit(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = Number(req.userId);
      const trainingSplitId = Number(req.params.id);
      const trainingSplit = await trainingSplitService.updateUserTrainingSplit(
        userId,
        trainingSplitId,
        req.body,
        res,
        req.locale,
      );

      requestSuccessHandler(
        res,
        trainingSplit,
        "Training Split Updated Succesfully!",
      );
    } catch (error) {
      next(error);
    }
  },

  async deleteUserTrainingSplit(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = Number(req.userId);
      const trainingSplitId = Number(req.params.id);
      const trainingSplit = await trainingSplitService.deleteUserTrainingSplit(
        userId,
        trainingSplitId,
        res,
      );

      requestSuccessHandler(
        res,
        trainingSplit,
        "Training Split Deleted Succesfully!",
      );
    } catch (error) {
      next(error);
    }
  },
};
