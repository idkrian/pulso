import type { Response } from "express";
import { requestErrorHandler } from "../../shared/utils/requestHandlers.js";
import { trainingSplitRepository } from "./training-split.repository.js";
import type {
  CreateTrainingSplitRequestDto,
  UpdateTrainingSplitRequestDto,
} from "./training-split.scheme.js";
import type { Locale } from "../../shared/constants/locales.js";
import { withTranslatedSplitExercises } from "../../shared/utils/exercise-translation.js";

export const trainingSplitService = {
  async createTrainingSplit(
    userId: number,
    data: CreateTrainingSplitRequestDto,
  ) {
    return await trainingSplitRepository.createTrainingSplit(userId, data);
  },

  async getAllUserTrainingSplits(userId: number, locale: Locale) {
    const splits = await trainingSplitRepository.getAllUserTrainingSplits(
      userId,
      locale,
    );

    return splits.map(withTranslatedSplitExercises);
  },

  async getUserTrainingSplitById(
    userId: number,
    trainingSplitId: number,
    locale: Locale,
  ) {
    const split = await trainingSplitRepository.getUserTrainingSplitById(
      userId,
      trainingSplitId,
      locale,
    );

    return split ? withTranslatedSplitExercises(split) : split;
  },

  async updateUserTrainingSplit(
    userId: number,
    trainingSplitId: number,
    data: UpdateTrainingSplitRequestDto,
    res: Response,
    locale: Locale,
  ) {
    if (!trainingSplitId) {
      requestErrorHandler(res, "Training Split ID not informed!");
    }

    const split = await trainingSplitRepository.updateUserTrainingSplit(
      userId,
      trainingSplitId,
      data,
      locale,
    );

    return withTranslatedSplitExercises(split);
  },

  async deleteUserTrainingSplit(
    userId: number,
    trainingSplitId: number,
    res: Response,
  ) {
    if (!trainingSplitId) {
      requestErrorHandler(res, "Training Split ID not informed!");
    }

    return await trainingSplitRepository.deleteUserTrainingSplit(
      userId,
      trainingSplitId,
    );
  },
};
