import { Prisma } from "../../../database/prisma/generated/prisma/client.js";
import { prisma } from "../../../database/prisma/prisma.js";
import type {
  CreateTrainingSplitDayRequestDto,
  UpdateTrainingSplitDayRequestDto,
} from "./training-split-day.scheme.js";
import { AppError } from "../../shared/middlewares/request-error-handler.js";
import { HttpStatus } from "../../shared/constants/http-status.js";
import type { Locale } from "../../shared/constants/locales.js";
import {
  exerciseTranslationInclude,
  withTranslatedSplitExercises,
} from "../../shared/utils/exercise-translation.js";

async function assertSplitOwnership(
  tx: Prisma.TransactionClient,
  userId: number,
  trainingSplitId: number,
) {
  const split = await tx.training_splits.findFirst({
    where: { id: trainingSplitId, userId },
    select: { id: true },
  });
  if (!split) {
    throw new AppError("Training split not found", HttpStatus.NOT_FOUND);
  }
}

export const trainingSplitDaysRepository = {
  async createTrainingSplitDay(
    userId: number,
    data: CreateTrainingSplitDayRequestDto,
  ) {
    return await prisma.$transaction(async (tx) => {
      await assertSplitOwnership(tx, userId, data.trainingSplitId);
      await tx.training_split_days.deleteMany({
        where: { dayOfWeek: data.dayOfWeek, trainingSplit: { userId } },
      });
      return await tx.training_split_days.create({ data });
    });
  },

  async getAllTrainingSplitDays(userId: number, locale: Locale) {
    const trainingSplitDays = await prisma.training_split_days.findMany({
      where: { trainingSplit: { userId } },
      include: {
        trainingSplit: {
          include: {
            exercises: {
              include: {
                exercise: { include: exerciseTranslationInclude(locale) },
              },
            },
          },
        },
      },
    });

    return trainingSplitDays.reduce(
      (acc, day) => {
        acc[day.dayOfWeek] = {
          id: day.id,
          restDay: day.restDay,
          trainingSplit: withTranslatedSplitExercises(day.trainingSplit),
        };
        return acc;
      },
      {} as Record<number, any>,
    );
  },

  async updateTrainingSplitDay(
    userId: number,
    id: number,
    data: UpdateTrainingSplitDayRequestDto,
  ) {
    const updateData: {
      dayOfWeek?: number;
      trainingSplitId?: number;
      restDay?: boolean;
    } = {};
    if (data.dayOfWeek !== undefined) updateData.dayOfWeek = data.dayOfWeek;
    if (data.trainingSplitId !== undefined)
      updateData.trainingSplitId = data.trainingSplitId;
    if (data.restDay !== undefined) updateData.restDay = data.restDay;

    return await prisma.$transaction(async (tx) => {
      const current = await tx.training_split_days.findFirst({
        where: { id, trainingSplit: { userId } },
      });
      if (!current) {
        throw new AppError("Training split day not found", HttpStatus.NOT_FOUND);
      }

      if (updateData.trainingSplitId !== undefined) {
        await assertSplitOwnership(tx, userId, updateData.trainingSplitId);
      }

      const targetDayOfWeek = updateData.dayOfWeek ?? current.dayOfWeek;
      await tx.training_split_days.deleteMany({
        where: {
          dayOfWeek: targetDayOfWeek,
          id: { not: id },
          trainingSplit: { userId },
        },
      });

      return await tx.training_split_days.update({
        where: { id },
        data: updateData,
      });
    });
  },

  async deleteTrainingSplitDay(userId: number, id: number) {
    const { count } = await prisma.training_split_days.deleteMany({
      where: { id, trainingSplit: { userId } },
    });
    if (count === 0) {
      throw new AppError("Training split day not found", HttpStatus.NOT_FOUND);
    }
    return { id };
  },
};
