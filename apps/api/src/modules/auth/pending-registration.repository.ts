import { prisma } from "../../../database/prisma/prisma.js";
import type { Locale } from "../../shared/constants/locales.js";
import { publicUserSelect } from "../user/user.repository.js";

interface UpsertPendingRegistrationData {
  email: string;
  name: string;
  password: string;
  codeHash: string;
  expiresAt: Date;
  languagePreference: Locale;
}

interface PromotablePendingRegistration {
  id: number;
  email: string;
  name: string;
  password: string;
  languagePreference: string;
}

export const pendingRegistrationRepository = {
  async upsert(data: UpsertPendingRegistrationData) {
    const { email, ...rest } = data;

    return await prisma.pending_registrations.upsert({
      where: { email },
      create: { email, ...rest },
      update: { ...rest, attempts: 0 },
    });
  },

  async getByEmail(email: string) {
    return await prisma.pending_registrations.findUnique({ where: { email } });
  },

  async incrementAttempts(id: number) {
    return await prisma.pending_registrations.update({
      where: { id },
      data: { attempts: { increment: 1 } },
    });
  },

  async refreshCode(id: number, codeHash: string, expiresAt: Date) {
    return await prisma.pending_registrations.update({
      where: { id },
      data: { codeHash, expiresAt, attempts: 0 },
    });
  },

  async promoteToUser(pending: PromotablePendingRegistration) {
    const [user] = await prisma.$transaction([
      prisma.users.create({
        data: {
          name: pending.name,
          email: pending.email,
          password: pending.password,
          languagePreference: pending.languagePreference,
        },
        select: publicUserSelect,
      }),
      prisma.pending_registrations.delete({ where: { id: pending.id } }),
    ]);

    return user;
  },

  async deleteExpired() {
    return await prisma.pending_registrations.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    });
  },
};
