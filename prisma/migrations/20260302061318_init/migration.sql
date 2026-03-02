-- CreateTable
CREATE TABLE "Scan" (
    "id" SERIAL NOT NULL,
    "imagePath" TEXT NOT NULL,
    "spots" INTEGER NOT NULL,
    "severity" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Scan_pkey" PRIMARY KEY ("id")
);
