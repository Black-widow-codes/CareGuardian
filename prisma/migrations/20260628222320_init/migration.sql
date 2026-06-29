-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "diagnosis" TEXT NOT NULL,
    "dischargeDate" TEXT NOT NULL,
    "medicationReconciled" BOOLEAN NOT NULL,
    "followUpScheduled" BOOLEAN NOT NULL,
    "pendingTests" BOOLEAN NOT NULL,
    "providerAssigned" BOOLEAN NOT NULL,
    "dischargeInstructionsGiven" BOOLEAN NOT NULL,
    "homeCareReferral" BOOLEAN NOT NULL,
    "issue" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "risk" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);
