import crypto from "node:crypto";
import bcrypt from "bcrypt";

export const CODE_LENGTH = 6;
export const CODE_TTL_MINUTES = 15;
export const MAX_CODE_ATTEMPTS = 5;

const CODE_UPPER_BOUND = 10 ** CODE_LENGTH;

export const generateVerificationCode = (): string =>
  String(crypto.randomInt(0, CODE_UPPER_BOUND)).padStart(CODE_LENGTH, "0");

export const hashVerificationCode = (code: string): Promise<string> =>
  bcrypt.hash(code, 10);

export const compareVerificationCode = (
  code: string,
  hash: string,
): Promise<boolean> => bcrypt.compare(code, hash);

export const verificationCodeExpiry = (): Date =>
  new Date(Date.now() + CODE_TTL_MINUTES * 60 * 1000);
