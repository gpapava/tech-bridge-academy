-- CreateEnum
CREATE TYPE "SuggestionStatus" AS ENUM ('PENDING', 'APPLIED', 'REJECTED');

-- CreateTable
CREATE TABLE "TranslationSuggestion" (
    "id" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "pageUrl" TEXT NOT NULL,
    "originalText" TEXT NOT NULL,
    "suggestedText" TEXT NOT NULL,
    "comment" TEXT,
    "authorName" TEXT,
    "authorEmail" TEXT,
    "userId" TEXT,
    "status" "SuggestionStatus" NOT NULL DEFAULT 'PENDING',
    "adminNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TranslationSuggestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TranslationSuggestion_status_createdAt_idx" ON "TranslationSuggestion"("status", "createdAt");
