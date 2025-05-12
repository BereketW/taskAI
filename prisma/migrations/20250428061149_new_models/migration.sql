-- CreateEnum
CREATE TYPE "RoleInTeam" AS ENUM ('TEAM_MEMBER', 'TEAM_LEAD', 'MANAGER', 'SOLO_USER', 'OTHER');

-- CreateEnum
CREATE TYPE "TeamSize" AS ENUM ('JUST_ME', 'S_2_5', 'S_6_10', 'S_11_25', 'S_26_PLUS');

-- CreateEnum
CREATE TYPE "WorkStyle" AS ENUM ('REMOTE', 'IN_OFFICE', 'HYBRID');

-- CreateEnum
CREATE TYPE "TaskView" AS ENUM ('LIST', 'BOARD', 'CALENDAR');

-- CreateEnum
CREATE TYPE "CalendarProvider" AS ENUM ('GOOGLE', 'OUTLOOK', 'APPLE', 'NONE');

-- CreateEnum
CREATE TYPE "CommTool" AS ENUM ('SLACK', 'TEAMS', 'DISCORD', 'NONE');

-- CreateEnum
CREATE TYPE "FileStorageProvider" AS ENUM ('GDRIVE', 'DROPBOX', 'ONEDRIVE', 'NONE');

-- CreateTable
CREATE TABLE "Onboarding" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "jobTitle" TEXT,
    "company" TEXT,
    "roleInTeam" "RoleInTeam" DEFAULT 'TEAM_MEMBER',
    "teamSize" "TeamSize",
    "workStyle" "WorkStyle" DEFAULT 'HYBRID',
    "primaryWorkType" TEXT,
    "biggestChallenge" TEXT,
    "preferredView" "TaskView" DEFAULT 'LIST',
    "currentTools" TEXT[],
    "productivityPeaks" TEXT[],
    "calendarIntegration" "CalendarProvider",
    "communicationTool" "CommTool",
    "fileStorage" "FileStorageProvider",
    "aiFeatures" TEXT[] DEFAULT ARRAY['suggestions', 'prioritization', 'insights']::TEXT[],
    "aiAssistanceAreas" TEXT[],
    "primaryGoal" TEXT,
    "lastCompletedStep" INTEGER DEFAULT 0,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Onboarding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "visibility" VARCHAR(7) NOT NULL DEFAULT 'private',

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message_v2" (
    "id" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "role" VARCHAR NOT NULL,
    "parts" JSONB NOT NULL,
    "attachments" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_v2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vote_v2" (
    "chatId" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "isUpvoted" BOOLEAN NOT NULL,

    CONSTRAINT "Vote_v2_pkey" PRIMARY KEY ("chatId","messageId")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "kind" VARCHAR(5) NOT NULL DEFAULT 'text',
    "userId" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Suggestion" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "documentCreatedAt" TIMESTAMP(3) NOT NULL,
    "originalText" TEXT NOT NULL,
    "suggestedText" TEXT NOT NULL,
    "description" TEXT,
    "isResolved" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Suggestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Onboarding_userId_key" ON "Onboarding"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Document_id_createdAt_key" ON "Document"("id", "createdAt");

-- AddForeignKey
ALTER TABLE "Onboarding" ADD CONSTRAINT "Onboarding_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message_v2" ADD CONSTRAINT "Message_v2_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote_v2" ADD CONSTRAINT "Vote_v2_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote_v2" ADD CONSTRAINT "Vote_v2_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message_v2"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Suggestion" ADD CONSTRAINT "Suggestion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Suggestion" ADD CONSTRAINT "Suggestion_documentId_documentCreatedAt_fkey" FOREIGN KEY ("documentId", "documentCreatedAt") REFERENCES "Document"("id", "createdAt") ON DELETE CASCADE ON UPDATE CASCADE;
