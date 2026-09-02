/*
  Warnings:

  - A unique constraint covering the columns `[mrn]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "genderIdentity" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "middleName" TEXT,
ADD COLUMN     "mrn" TEXT,
ADD COLUMN     "preferredName" TEXT,
ADD COLUMN     "pronouns" TEXT,
ADD COLUMN     "sexAtBirth" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Patient_mrn_key" ON "Patient"("mrn");
