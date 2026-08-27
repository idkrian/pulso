import { userRepository } from "./user.repository.js";
import type {
  CreateUserRequestDto,
  UpdateMeRequestDto,
} from "./user.schema.js";
import { DEFAULT_LOCALE, type Locale } from "../../shared/constants/locales.js";
import bcrypt from "bcrypt";

export const userService = {
  async createUser(data: CreateUserRequestDto, locale: Locale = DEFAULT_LOCALE) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return await userRepository.createUser({
      ...data,
      password: hashedPassword,
      languagePreference: locale,
    });
  },

  async getMe(userId: number) {
    return await userRepository.getUserById(userId);
  },

  async updateMe(userId: number, data: UpdateMeRequestDto) {
    return await userRepository.updateMe(userId, data);
  },
};
