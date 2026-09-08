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

function nullableEnv(name: string): string | undefined {
  return process.env[name] || undefined;
}

export const env = {
  JWT_SECRET: requireEnv("JWT_SECRET"),
  FRONTEND_URL: requireEnv("FRONTEND_URL"),
  RESEND_API_KEY: requireEnv("RESEND_API_KEY"),
  EMAIL_FROM: requireEnv("EMAIL_FROM"),
  TRUST_PROXY: Number(optionalEnv("TRUST_PROXY", "0")),
  DEMO_EMAIL: nullableEnv("DEMO_EMAIL"),
  DEMO_PASSWORD: nullableEnv("DEMO_PASSWORD"),
  DEMO_RESET_SECRET: nullableEnv("DEMO_RESET_SECRET"),
};
