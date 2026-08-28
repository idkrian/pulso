import type { Request, Response, NextFunction } from "express";
import { requestSuccessHandler } from "../../shared/utils/requestHandlers.js";
import { authService } from "./auth.service.js";

export const authController = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await authService.login(req.body);
      requestSuccessHandler(res, user, "User logged in successfully!");
    } catch (error) {
      next(error);
    }
  },

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.register(req.body, req.locale);
      requestSuccessHandler(res, null, "Verification code sent!");
    } catch (error) {
      next(error);
    }
  },

  async verifyRegistration(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await authService.verifyRegistration(req.body);
      requestSuccessHandler(res, user, "Account created successfully!");
    } catch (error) {
      next(error);
    }
  },

  async resendCode(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.resendCode(req.body);
      requestSuccessHandler(res, null, "Verification code sent!");
    } catch (error) {
      next(error);
    }
  },
};
