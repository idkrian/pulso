import { userRepository } from "../user/user.repository.js";
import { pendingRegistrationRepository } from "./pending-registration.repository.js";
import type {
  LoginRequestDto,
  RegisterRequestDto,
  ResendCodeRequestDto,
  VerifyRegistrationRequestDto,
} from "./auth.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../../shared/config/env.js";
import { AppError } from "../../shared/middlewares/request-error-handler.js";
import { HttpStatus } from "../../shared/constants/http-status.js";
import type { Locale } from "../../shared/constants/locales.js";
import { emailService } from "../../shared/services/email.service.js";
import {
  CODE_TTL_MINUTES,
  MAX_CODE_ATTEMPTS,
  compareVerificationCode,
  generateVerificationCode,
  hashVerificationCode,
  verificationCodeExpiry,
} from "../../shared/utils/verification-code.js";

const signAuthToken = (userId: number) =>
  jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: "30d" });

const invalidCodeError = () =>
  new AppError("Invalid or expired code", HttpStatus.BAD_REQUEST);

export const authService = {
  async login(data: LoginRequestDto) {
    const user = await userRepository.getUserByEmail(data.email);

    if (!user) {
      throw new AppError("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new AppError("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }

    const token = signAuthToken(user.id);

    const { password, ...publicUser } = user;

    return { ...publicUser, token };
  },

  async register(data: RegisterRequestDto, locale: Locale) {
    await pendingRegistrationRepository.deleteExpired();

    const passwordHash = await bcrypt.hash(data.password, 10);
    const code = generateVerificationCode();
    const codeHash = await hashVerificationCode(code);

    const existingUser = await userRepository.getUserByEmail(data.email);

    if (existingUser) {
      await emailService.sendAccountExistsNotice(data.email, locale);
      return;
    }

    await pendingRegistrationRepository.upsert({
      email: data.email,
      name: data.name,
      password: passwordHash,
      codeHash,
      expiresAt: verificationCodeExpiry(),
      languagePreference: locale,
    });

    await emailService.sendVerificationCode(
      data.email,
      data.name,
      code,
      CODE_TTL_MINUTES,
      locale,
    );
  },

  async verifyRegistration(data: VerifyRegistrationRequestDto) {
    const pending = await pendingRegistrationRepository.getByEmail(data.email);

    if (!pending || pending.expiresAt < new Date()) {
      throw invalidCodeError();
    }

    if (pending.attempts >= MAX_CODE_ATTEMPTS) {
      throw new AppError(
        "Too many attempts. Request a new code",
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    const isCodeValid = await compareVerificationCode(
      data.code,
      pending.codeHash,
    );

    if (!isCodeValid) {
      await pendingRegistrationRepository.incrementAttempts(pending.id);
      throw invalidCodeError();
    }

    const user = await pendingRegistrationRepository.promoteToUser(pending);
    const token = signAuthToken(user.id);

    return { ...user, token };
  },

  async resendCode(data: ResendCodeRequestDto) {
    const pending = await pendingRegistrationRepository.getByEmail(data.email);

    if (!pending) return;

    const code = generateVerificationCode();
    const codeHash = await hashVerificationCode(code);

    await pendingRegistrationRepository.refreshCode(
      pending.id,
      codeHash,
      verificationCodeExpiry(),
    );

    await emailService.sendVerificationCode(
      pending.email,
      pending.name,
      code,
      CODE_TTL_MINUTES,
      pending.languagePreference as Locale,
    );
  },
};
