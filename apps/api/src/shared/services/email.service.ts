import { Resend } from "resend";
import { env } from "../config/env.js";
import { AppError } from "../middlewares/request-error-handler.js";
import { HttpStatus } from "../constants/http-status.js";
import type { Locale } from "../constants/locales.js";
import {
  accountExistsEmail,
  verificationCodeEmail,
} from "./email-templates.js";

const resend = new Resend(env.RESEND_API_KEY);

interface SendParams {
  to: string;
  subject: string;
  html: string;
  text: string;
}

const send = async ({ to, subject, html, text }: SendParams) => {
  const { error } = await resend.emails.send({
    from: env.EMAIL_FROM,
    to,
    subject,
    html,
    text,
  });

  if (error) {
    console.error("Email delivery failed:", error);
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
