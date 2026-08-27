import { trainingSplitDaysRepository } from "./training-split-day.repository.js";
import type {
  CreateTrainingSplitDayRequestDto,
  UpdateTrainingSplitDayRequestDto,
} from "./training-split-day.scheme.js";
import type { Locale } from "../../shared/constants/locales.js";

export const trainingSplitDaysService = {
  async createTrainingSplitDay(
    userId: number,
    data: CreateTrainingSplitDayRequestDto,
  ) {
    return await trainingSplitDaysRepository.createTrainingSplitDay(
      userId,
      data,
    );
  },

  async getAllTrainingSplitDays(userId: number, locale: Locale) {
    return await trainingSplitDaysRepository.getAllTrainingSplitDays(
      userId,
      locale,
    );
  },

  async updateTrainingSplitDay(
    userId: number,
    id: number,
    data: UpdateTrainingSplitDayRequestDto,
  ) {
    return await trainingSplitDaysRepository.updateTrainingSplitDay(
      userId,
      id,
      data,
    );
  },

  async deleteTrainingSplitDay(userId: number, id: number) {
    return await trainingSplitDaysRepository.deleteTrainingSplitDay(userId, id);
  },
};
