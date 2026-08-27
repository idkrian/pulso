import type { TrainingSplitExerciseDto } from "./training-split-exercise.dto";

export interface TrainingSplitDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  exercises: TrainingSplitExerciseDto[];
}

export interface CreateTrainingSplitRequestDto {
  title: string;
  exercises: {
    exerciseId: number;
    sets: number;
    reps: string;
    order: number;
  }[];
}
