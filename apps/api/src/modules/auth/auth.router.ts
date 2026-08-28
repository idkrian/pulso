import { Router } from "express";
import { authController } from "./auth.controller.js";
import { validateRequest } from "../../shared/middlewares/validate-request.js";
import {
  loginSchema,
  registerSchema,
  resendCodeSchema,
  verifyRegistrationSchema,
} from "./auth.schema.js";

const authRouter = Router();

authRouter.post("/login", validateRequest(loginSchema), authController.login);

authRouter.post(
  "/register",
  validateRequest(registerSchema),
  authController.register,
);

authRouter.post(
  "/register/verify",
  validateRequest(verifyRegistrationSchema),
  authController.verifyRegistration,
);

authRouter.post(
  "/register/resend",
  validateRequest(resendCodeSchema),
  authController.resendCode,
);

export default authRouter;
