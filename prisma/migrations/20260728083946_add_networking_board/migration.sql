-- CreateEnum
CREATE TYPE "NetworkingPostType" AS ENUM ('ANNOUNCEMENT', 'REQUEST', 'OFFER');

-- CreateTable
CREATE TABLE "NetworkingPost" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "type" "NetworkingPostType" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NetworkingPost_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NetworkingPost" ADD CONSTRAINT "NetworkingPost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
