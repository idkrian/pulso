import { Router } from "express";
import { exerciseController } from "./exercise.controller.js";
import { validateRequest } from "../../shared/middlewares/validate-request.js";
import {
  createExerciseSchema,
  updateExerciseSchema,
} from "./exercise.schema.js";

const exerciseRouter = Router();

exerciseRouter.post(
  "/",
  validateRequest(createExerciseSchema),
  exerciseController.createExercise,
);

exerciseRouter.get("/", exerciseController.getAllExercises);

exerciseRouter.get(
  "/muscle-groups",
  exerciseController.getAllExercisesByMuscleGroup,
);

exerciseRouter.get("/performance", exerciseController.getExercisePerformances);

exerciseRouter.get("/:id/stats", exerciseController.getExerciseStats);

exerciseRouter.put(
  "/:id",
  validateRequest(updateExerciseSchema),
  exerciseController.updateExercise,
);

exerciseRouter.delete("/:id", exerciseController.deleteExercise);

export default exerciseRouter;
