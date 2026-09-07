import express from "express";
import cors from "cors";
import exerciseRouter from "./modules/exercises/exercise.routes.js";
import { requestErrorHandlerMiddleware } from "./shared/middlewares/request-error-handler.js";
import trainingSplitRouter from "./modules/training-splits/training-split.router.js";
import trainingSplitDayRouter from "./modules/training-split-day/training-split-day.router.js";
import workoutRouter from "./modules/workout/workout.router.js";
import userRouter from "./modules/user/user.router.js";
import authRouter from "./modules/auth/auth.router.js";
import bodyWeightRouter from "./modules/body-weight/body-weight.router.js";
import demoRouter from "./modules/demo/demo.router.js";
import { authenticate } from "./shared/middlewares/authenticate.js";
import { localeMiddleware } from "./shared/middlewares/locale.js";
import { env } from "./shared/config/env.js";

const app = express();

if (env.TRUST_PROXY > 0) {
  app.set("trust proxy", env.TRUST_PROXY);
}
app.use(
  cors({
    origin: env.FRONTEND_URL,
    allowedHeaders: ["Content-Type", "Authorization", "Accept-Language"],
  }),
);
app.use(express.json());
app.use(localeMiddleware);

app.use("/exercise", authenticate, exerciseRouter);
app.use("/training-split", authenticate, trainingSplitRouter);
app.use("/training-split-day", authenticate, trainingSplitDayRouter);
app.use("/workout", authenticate, workoutRouter);
app.use("/body-weight", authenticate, bodyWeightRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/demo", demoRouter);

app.use(requestErrorHandlerMiddleware);

export default app;
