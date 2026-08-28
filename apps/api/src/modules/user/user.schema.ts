import z from "zod";
import { UnitPreference } from "../../../database/prisma/generated/prisma/client.js";
import { SUPPORTED_LOCALES } from "../../shared/constants/locales.js";

export const updateMeSchema = z.object({
  name: z.string().max(255).optional(),
  unitPreference: z.enum(UnitPreference).optional(),
  languagePreference: z.enum(SUPPORTED_LOCALES).optional(),
});

export type UpdateMeRequestDto = z.infer<typeof updateMeSchema>;
