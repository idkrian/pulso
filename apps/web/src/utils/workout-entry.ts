import type { ExerciseDto } from "@/dtos/exercise.dto";
import type { TrainingSplitExerciseDto } from "@/dtos/training-split-exercise.dto";
import type { LoggedSet, WorkoutEntry } from "@/dtos/workout.dto";

let sequence = 0;

export const createEntryId = () =>
  `${Date.now().toString(36)}-${(sequence++).toString(36)}`;

export const emptySet = (): LoggedSet => ({
  weight: 0,
  reps: 0,
  rpe: 7,
  completed: false,
});

export const entryFromSplitExercise = (
  splitExercise: TrainingSplitExerciseDto,
): WorkoutEntry => ({
  entryId: createEntryId(),
  exerciseId: splitExercise.exerciseId,
  exercise: splitExercise.exercise,
  targetSets: splitExercise.sets,
  targetReps: splitExercise.reps,
  sets: Array.from({ length: splitExercise.sets }, emptySet),
  notes: "",
});

export const entryFromExercise = (
  exercise: ExerciseDto,
  targetSets = 3,
  targetReps = "8-12",
): WorkoutEntry => ({
  entryId: createEntryId(),
  exerciseId: exercise.id,
  exercise,
  targetSets,
  targetReps,
  sets: Array.from({ length: targetSets }, emptySet),
  notes: "",
});

export const entriesFromSplit = (
  splitExercises: TrainingSplitExerciseDto[],
): WorkoutEntry[] =>
  [...splitExercises]
    .sort((a, b) => a.order - b.order)
    .map(entryFromSplitExercise);
