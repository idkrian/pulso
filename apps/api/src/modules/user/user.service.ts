import { userRepository } from "./user.repository.js";
import type { UpdateMeRequestDto } from "./user.schema.js";

export const userService = {
  async getMe(userId: number) {
    return await userRepository.getUserById(userId);
  },

  async updateMe(userId: number, data: UpdateMeRequestDto) {
    return await userRepository.updateMe(userId, data);
  },
};
