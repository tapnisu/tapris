-- CreateTable
CREATE TABLE "Guild" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "queue" TEXT[],
    "gun" BOOLEAN[],

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("id")
);
