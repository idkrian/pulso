import type { Request, Response } from "express";
import { ipKeyGenerator, rateLimit } from "express-rate-limit";
import { HttpStatus } from "../constants/http-status.js";
import { requestErrorHandler } from "../utils/requestHandlers.js";

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;

const rejectRequest = (_req: Request, res: Response) => {
  requestErrorHandler(
    res,
    "Too many requests. Try again later",
    HttpStatus.TOO_MANY_REQUESTS,
  );
};

const byEmail = (req: Request): string => {
  const email = req.body?.email;

  if (typeof email === "string" && email.length > 0) {
    return `email:${email.trim().toLowerCase()}`;
  }

  return ipKeyGenerator(req.ip ?? "");
};

const baseOptions = {
  standardHeaders: "draft-8",
  legacyHeaders: false,
  handler: rejectRequest,
} as const;

export const loginLimiter = rateLimit({
  ...baseOptions,
  windowMs: 15 * MINUTE,
  limit: 10,
  skipSuccessfulRequests: true,
});

export const codeVerificationLimiter = rateLimit({
  ...baseOptions,
  windowMs: 15 * MINUTE,
  limit: 20,
});

export const emailDispatchLimiterByIp = rateLimit({
  ...baseOptions,
  windowMs: 1 * HOUR,
  limit: 15,
});

export const emailDispatchLimiterByEmail = rateLimit({
  ...baseOptions,
  windowMs: 1 * HOUR,
  limit: 3,
  keyGenerator: byEmail,
});
