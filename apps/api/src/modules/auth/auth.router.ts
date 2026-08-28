import { Router } from "express";
import { authController } from "./auth.controller.js";
import { validateRequest } from "../../shared/middlewares/validate-request.js";
import {
  codeVerificationLimiter,
  emailDispatchLimiterByEmail,
  emailDispatchLimiterByIp,
  loginLimiter,
} from "../../shared/middlewares/rate-limit.js";
import {
  loginSchema,
  registerSchema,
  resendCodeSchema,
  verifyRegistrationSchema,
} from "./auth.schema.js";

const authRouter = Router();

authRouter.post(
  "/login",
  loginLimiter,
  validateRequest(loginSchema),
  authController.login,
);

authRouter.post(
  "/register",
  emailDispatchLimiterByIp,
  validateRequest(registerSchema),
  emailDispatchLimiterByEmail,
  authController.register,
);

authRouter.post(
  "/register/verify",
  codeVerificationLimiter,
  validateRequest(verifyRegistrationSchema),
  authController.verifyRegistration,
);

authRouter.post(
  "/register/resend",
  emailDispatchLimiterByIp,
  validateRequest(resendCodeSchema),
  emailDispatchLimiterByEmail,
  authController.resendCode,
);

export default authRouter;
