import nodemailer from "nodemailer";
import { env } from "../config/env.js";
import { AppError } from "../middlewares/request-error-handler.js";
import { HttpStatus } from "../constants/http-status.js";
import type { Locale } from "../constants/locales.js";
import {
  accountExistsEmail,
  verificationCodeEmail,
} from "./email-templates.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.GMAIL_USER,
    pass: env.GMAIL_APP_PASSWORD.replace(/\s/g, ""),
  },
});

interface SendParams {
  to: string;
  subject: string;
  html: string;
  text: string;
}

const send = async ({ to, subject, html, text }: SendParams) => {
  try {
    await transporter.sendMail({
      from: env.EMAIL_FROM,
      to,
      subject,
      html,
      text,
    });
  } catch (error) {
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
