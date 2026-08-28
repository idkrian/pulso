import type { Locale } from "../constants/locales.js";

interface EmailContent {
  subject: string;
  html: string;
  text: string;
}

const BRAND = "#6366f1";
const BRAND_DARK = "#4338ca";

const layout = (heading: string, body: string) => `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
            <tr>
              <td style="background:linear-gradient(135deg,${BRAND},${BRAND_DARK});padding:28px 32px;">
                <span style="color:#ffffff;font-size:22px;font-weight:800;letter-spacing:-0.5px;">Pulso</span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <h1 style="margin:0 0 16px;font-size:20px;font-weight:700;color:#18181b;">${heading}</h1>
                ${body}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

const codeBlock = (code: string) => `
<div style="margin:24px 0;padding:20px;background-color:#f4f4f5;border-radius:12px;text-align:center;">
  <span style="font-family:'SF Mono',Menlo,Consolas,monospace;font-size:32px;font-weight:700;letter-spacing:10px;color:${BRAND_DARK};">${code}</span>
</div>
`;

const paragraph = (text: string) =>
  `<p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#52525b;">${text}</p>`;

const footnote = (text: string) =>
  `<p style="margin:20px 0 0;padding-top:20px;border-top:1px solid #e4e4e7;font-size:13px;line-height:1.5;color:#a1a1aa;">${text}</p>`;

export const verificationCodeEmail = (
  name: string,
  code: string,
  expiresInMinutes: number,
  locale: Locale,
): EmailContent => {
  if (locale === "pt") {
    return {
      subject: `${code} é o seu código de verificação do Pulso`,
      html: layout(
        `Olá, ${name}!`,
        paragraph("Use o código abaixo para confirmar seu e-mail e ativar sua conta.") +
          codeBlock(code) +
          paragraph(`O código expira em ${expiresInMinutes} minutos.`) +
          footnote(
            "Se você não criou uma conta no Pulso, ignore este e-mail. Nenhuma conta foi criada.",
          ),
      ),
      text: `Olá, ${name}!\n\nSeu código de verificação do Pulso é: ${code}\n\nO código expira em ${expiresInMinutes} minutos.\n\nSe você não criou uma conta no Pulso, ignore este e-mail.`,
    };
  }

  return {
    subject: `${code} is your Pulso verification code`,
    html: layout(
      `Hi, ${name}!`,
      paragraph("Use the code below to confirm your email and activate your account.") +
        codeBlock(code) +
        paragraph(`This code expires in ${expiresInMinutes} minutes.`) +
        footnote(
          "If you did not sign up for Pulso, you can ignore this email. No account was created.",
        ),
    ),
    text: `Hi, ${name}!\n\nYour Pulso verification code is: ${code}\n\nThis code expires in ${expiresInMinutes} minutes.\n\nIf you did not sign up for Pulso, you can ignore this email.`,
  };
};

export const accountExistsEmail = (
  loginUrl: string,
  locale: Locale,
): EmailContent => {
  if (locale === "pt") {
    return {
      subject: "Tentativa de cadastro no Pulso",
      html: layout(
        "Você já tem uma conta",
        paragraph(
          "Alguém tentou criar uma conta no Pulso com este endereço de e-mail. Como você já tem uma conta, nenhuma nova foi criada e nada mudou.",
        ) +
          paragraph(
            `Se foi você, é só <a href="${loginUrl}" style="color:${BRAND_DARK};font-weight:600;">entrar normalmente</a>.`,
          ) +
          footnote(
            "Se não foi você, nenhuma ação é necessária — sua conta segue segura e ninguém teve acesso a ela.",
          ),
      ),
      text: `Você já tem uma conta no Pulso.\n\nAlguém tentou criar uma conta com este endereço de e-mail. Como você já tem uma, nenhuma nova foi criada.\n\nSe foi você, entre em: ${loginUrl}\n\nSe não foi você, nenhuma ação é necessária.`,
    };
  }

  return {
    subject: "Pulso sign-up attempt",
    html: layout(
      "You already have an account",
      paragraph(
        "Someone tried to create a Pulso account with this email address. Since you already have one, no new account was created and nothing changed.",
      ) +
        paragraph(
          `If this was you, just <a href="${loginUrl}" style="color:${BRAND_DARK};font-weight:600;">sign in</a>.`,
        ) +
        footnote(
          "If this was not you, no action is needed — your account is safe and nobody gained access to it.",
        ),
    ),
    text: `You already have a Pulso account.\n\nSomeone tried to create an account with this email address. Since you already have one, no new account was created.\n\nIf this was you, sign in at: ${loginUrl}\n\nIf this was not you, no action is needed.`,
  };
};
