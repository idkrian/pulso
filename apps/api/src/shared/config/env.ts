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
  RESEND_API_KEY: requireEnv("RESEND_API_KEY"),
  EMAIL_FROM: requireEnv("EMAIL_FROM"),
};
