CREATE TABLE "pending_registrations" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "codeHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMPTZ(3) NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "languagePreference" TEXT NOT NULL DEFAULT 'en',

    CONSTRAINT "pending_registrations_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "pending_registrations_email_key" ON "pending_registrations"("email");

CREATE INDEX "pending_registrations_expiresAt_idx" ON "pending_registrations"("expiresAt");
