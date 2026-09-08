import type { ExerciseDto } from "./exercise.dto";
import type { TrainingSplitDto } from "./training-splits.dto";

export interface WorkoutSetDto {
  id: number;
  setNumber: number;
  reps: number;
  weight: number | null;
  rpe: number | null;
}

export interface WorkoutExerciseLogDto {
  id: number;
  exerciseId: number;
  exercise: ExerciseDto;
  notes: string | null;
  workoutSets: WorkoutSetDto[];
}

export interface WorkoutSessionDto {
  id: number;
  createdAt: string;
  updatedAt: string;
  trainingSplitId: number | null;
  trainingSplit: TrainingSplitDto | null;
  notes: string | null;
  durationSeconds: number;
  workoutExerciseLogs: WorkoutExerciseLogDto[];
}
