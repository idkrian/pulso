import type { NextFunction, Request, Response } from "express";
import { workoutService } from "./workout.service.js";
import {
  requestSuccessHandler,
  requestErrorHandler,
} from "../../shared/utils/requestHandlers.js";
import { HttpStatus } from "../../shared/constants/http-status.js";
import type { MuscleStatsPeriod } from "./workout.scheme.js";

export const workoutController = {
  async createWorkout(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.userId);
      const data = req.body;
      const workout = await workoutService.createWorkout(userId, data);
      requestSuccessHandler(res, workout, "Workout created successfully!");
    } catch (error) {
      next(error);
    }
  },

  async getAllWorkouts(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.userId);
      const workouts = await workoutService.getAllWorkouts(userId, req.locale);
      requestSuccessHandler(res, workouts, "Workouts retrieved successfully!");
    } catch (error) {
      next(error);
    }
  },

  async getWorkoutById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.userId);
      const id = Number(req.params.id);
      const workout = await workoutService.getWorkoutById(
        userId,
        id,
        req.locale,
      );

      if (!workout) {
        return requestErrorHandler(
          res,
          "Workout not found",
          HttpStatus.NOT_FOUND,
        );
      }

      requestSuccessHandler(res, workout, "Workout retrieved successfully!");
    } catch (error) {
      next(error);
    }
  },

  async getMuscleStats(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.userId);
      const period = req.params.period as MuscleStatsPeriod;
      const stats = await workoutService.getMuscleStats(userId, { period });
      requestSuccessHandler(res, stats, "Muscle stats retrieved successfully!");
    } catch (error) {
      next(error);
    }
  },

  async getMuscleGroupStats(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.userId);
      const period = req.params.period as MuscleStatsPeriod;
      const stats = await workoutService.getMuscleGroupStats(userId, {
        period,
      });
      requestSuccessHandler(
        res,
        stats,
        "Muscle group stats retrieved successfully!",
      );
    } catch (error) {
      next(error);
    }
  },

  async getSummaryStats(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.userId);
      const stats = await workoutService.getSummaryStats(userId);
      requestSuccessHandler(
        res,
        stats,
        "Summary stats retrieved successfully!",
      );
    } catch (error) {
      next(error);
    }
  },
};
