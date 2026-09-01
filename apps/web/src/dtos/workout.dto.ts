import type { ExerciseDto } from "./exercise.dto";

export interface LoggedSet {
  weight: number;
  reps: number;
  rpe: number;
  completed: boolean;
}

export interface WorkoutEntry {
  entryId: string;
  exerciseId: number;
  exercise: ExerciseDto;
  targetSets: number;
  targetReps: string;
  sets: LoggedSet[];
  notes: string;
}
