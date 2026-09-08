import { env } from "../config/env.js";
import { AppError } from "../middlewares/request-error-handler.js";
import { HttpStatus } from "../constants/http-status.js";
import type { Locale } from "../constants/locales.js";
import {
  accountExistsEmail,
  verificationCodeEmail,
} from "./email-templates.js";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const REQUEST_TIMEOUT_MS = 10_000;

interface SendParams {
  to: string;
  subject: string;
  html: string;
  text: string;
}

const send = async ({ to, subject, html, text }: SendParams) => {
  let response: Response;

  try {
    response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.EMAIL_FROM,
        to,
        subject,
        html,
        text,
      }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (error) {
    console.error("Email delivery failed: could not reach Resend.", error);
    throw new AppError("Could not send email", HttpStatus.BAD_GATEWAY);
  }

  if (!response.ok) {
    const details = await response.text().catch(() => "<unreadable response>");
    console.error(
      `Email delivery failed: Resend responded ${response.status}.`,
      details,
    );
    throw new AppError("Could not send email", HttpStatus.BAD_GATEWAY);
  }
};

export const emailService = {
  async sendVerificationCode(
    to: string,
    name: string,
    code: string,
    expiresInMinutes: number,
    locale: Locale,
  ) {
    const content = verificationCodeEmail(name, code, expiresInMinutes, locale);
    await send({ to, ...content });
  },

  async sendAccountExistsNotice(to: string, locale: Locale) {
    const content = accountExistsEmail(`${env.FRONTEND_URL}/login`, locale);
    await send({ to, ...content });
  },
};
