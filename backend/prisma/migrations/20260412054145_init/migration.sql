-- CreateTable
CREATE TABLE "express_users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "express_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "express_papers" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "examType" TEXT NOT NULL,
    "batch" TEXT NOT NULL DEFAULT 'IT',
    "pdf" TEXT NOT NULL,
    "pdfPublicId" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "express_papers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "express_users_email_key" ON "express_users"("email");
