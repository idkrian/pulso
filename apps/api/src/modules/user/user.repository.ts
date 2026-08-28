import type { UnitPreference } from "../../../database/prisma/generated/prisma/client.js";
import { prisma } from "../../../database/prisma/prisma.js";
import type { UpdateMeRequestDto } from "./user.schema.js";

export const publicUserSelect = {
  id: true,
  createdAt: true,
  updatedAt: true,
  name: true,
  email: true,
  unitPreference: true,
  languagePreference: true,
} as const;

export const userRepository = {
  async getUserById(userId: number) {
    return await prisma.users.findUnique({
      where: { id: userId },
      select: publicUserSelect,
    });
  },

  async getUserByEmail(email: string) {
    return await prisma.users.findUnique({ where: { email } });
  },

  async updateMe(userId: number, data: UpdateMeRequestDto) {
    const updateData: {
      name?: string;
      unitPreference?: UnitPreference;
      languagePreference?: string;
    } = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.unitPreference !== undefined)
      updateData.unitPreference = data.unitPreference;
    if (data.languagePreference !== undefined)
      updateData.languagePreference = data.languagePreference;

    return await prisma.users.update({
      where: { id: userId },
      data: updateData,
      select: publicUserSelect,
    });
  },
};
