import { Router } from "express";
import { demoResetLimiter } from "../../shared/middlewares/rate-limit.js";
import { demoController } from "./demo.controller.js";
import { authorizeDemoReset } from "./demo.middleware.js";

const demoRouter = Router();

demoRouter.post(
  "/reset",
  demoResetLimiter,
  authorizeDemoReset,
  demoController.reset,
);

export default demoRouter;
