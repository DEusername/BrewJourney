/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Grinders" (
    "id" SERIAL NOT NULL,
    "grinderName" TEXT NOT NULL,
    "minSettingFine" INTEGER NOT NULL,
    "maxSettingCoarse" INTEGER NOT NULL,

    CONSTRAINT "Grinders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "grinderId" INTEGER,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BrewMethods" (
    "id" SERIAL NOT NULL,
    "methodName" TEXT NOT NULL,
    "defaultRatio" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "BrewMethods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BrewLogs" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "grinderId" INTEGER NOT NULL,
    "brewMethodId" INTEGER NOT NULL,
    "coffeeName" TEXT NOT NULL,
    "roastLevel" INTEGER NOT NULL,
    "targetRatio" TEXT NOT NULL,
    "doseGrams" INTEGER NOT NULL,
    "targetWaterGrams" INTEGER NOT NULL,
    "actualWaterGrams" INTEGER NOT NULL,
    "grindSize" INTEGER NOT NULL,
    "brewTimeSeconds" DOUBLE PRECISION NOT NULL,
    "waterTemp" DOUBLE PRECISION NOT NULL,
    "resultRating" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BrewLogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conversations" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Messages" (
    "id" SERIAL NOT NULL,
    "conversationId" INTEGER NOT NULL,
    "context" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_grinderId_key" ON "Users"("grinderId");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_grinderId_fkey" FOREIGN KEY ("grinderId") REFERENCES "Grinders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrewLogs" ADD CONSTRAINT "BrewLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrewLogs" ADD CONSTRAINT "BrewLogs_grinderId_fkey" FOREIGN KEY ("grinderId") REFERENCES "Grinders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrewLogs" ADD CONSTRAINT "BrewLogs_brewMethodId_fkey" FOREIGN KEY ("brewMethodId") REFERENCES "BrewMethods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversations" ADD CONSTRAINT "Conversations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
