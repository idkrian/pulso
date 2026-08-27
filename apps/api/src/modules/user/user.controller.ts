import type { Request, Response, NextFunction } from "express";
import { userService } from "./user.service.js";
import { requestSuccessHandler } from "../../shared/utils/requestHandlers.js";

export const userController = {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.createUser(req.body, req.locale);
      requestSuccessHandler(res, user, "User created successfully!");
    } catch (error) {
      next(error);
    }
  },

  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.userId);
      const user = await userService.getMe(userId);
      requestSuccessHandler(res, user, "User retrieved successfully!");
    } catch (error) {
      next(error);
    }
  },

  async updateMe(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.userId);
      const user = await userService.updateMe(userId, req.body);
      requestSuccessHandler(res, user, "User updated successfully!");
    } catch (error) {
      next(error);
    }
  },

};
