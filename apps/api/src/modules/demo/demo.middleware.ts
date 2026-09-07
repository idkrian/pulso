import type { NextFunction, Request, Response } from "express";
import { createHash, timingSafeEqual } from "node:crypto";
import { env } from "../../shared/config/env.js";
import { HttpStatus } from "../../shared/constants/http-status.js";
import { AppError } from "../../shared/middlewares/request-error-handler.js";
import { demoService } from "./demo.service.js";

const digest = (value: string): Buffer =>
  createHash("sha256").update(value).digest();

const matchesSecret = (provided: string, expected: string): boolean =>
  timingSafeEqual(digest(provided), digest(expected));

export const authorizeDemoReset = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const secret = env.DEMO_RESET_SECRET;

  if (!secret || !demoService.isEnabled()) {
    next(new AppError("Not found", HttpStatus.NOT_FOUND));
    return;
  }

  const provided = req.get("x-demo-secret");

  if (!provided || !matchesSecret(provided, secret)) {
    next(new AppError("Invalid demo reset secret", HttpStatus.UNAUTHORIZED));
    return;
  }

  next();
};
