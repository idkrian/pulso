import z from "zod";
import { CODE_LENGTH } from "../../shared/utils/verification-code.js";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6).max(100),
});

export const registerSchema = z.object({
  name: z.string().trim().min(1).max(255),
  email: z.email(),
  password: z.string().min(8).max(100),
});

export const verifyRegistrationSchema = z.object({
  email: z.email(),
  code: z.string().regex(new RegExp(`^\\d{${CODE_LENGTH}}$`)),
});

export const resendCodeSchema = z.object({
  email: z.email(),
});

export type LoginRequestDto = z.infer<typeof loginSchema>;

export type RegisterRequestDto = z.infer<typeof registerSchema>;

export type VerifyRegistrationRequestDto = z.infer<
  typeof verifyRegistrationSchema
>;

export type ResendCodeRequestDto = z.infer<typeof resendCodeSchema>;
