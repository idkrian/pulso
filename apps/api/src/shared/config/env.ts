function optionalEnv(name: string, fallback: string): string {
  return process.env[name] || fallback;
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  JWT_SECRET: requireEnv("JWT_SECRET"),
  FRONTEND_URL: requireEnv("FRONTEND_URL"),
  GMAIL_USER: requireEnv("GMAIL_USER"),
  GMAIL_APP_PASSWORD: requireEnv("GMAIL_APP_PASSWORD"),
  EMAIL_FROM: requireEnv("EMAIL_FROM"),
  TRUST_PROXY: Number(optionalEnv("TRUST_PROXY", "0")),
};
