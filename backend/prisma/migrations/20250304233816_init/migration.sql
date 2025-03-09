-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Key" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Key_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserStatistics" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserStatistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GlobalStatistics" (
    "id" SERIAL NOT NULL,
    "caesarEncryptions" INTEGER NOT NULL DEFAULT 0,
    "caesarDecryptions" INTEGER NOT NULL DEFAULT 0,
    "substitutionEncryptions" INTEGER NOT NULL DEFAULT 0,
    "substitutionDecryptions" INTEGER NOT NULL DEFAULT 0,
    "OTPEncryptions" INTEGER NOT NULL DEFAULT 0,
    "OTPDecryptions" INTEGER NOT NULL DEFAULT 0,
    "VigenereEncryptions" INTEGER NOT NULL DEFAULT 0,
    "VigenereDecryptions" INTEGER NOT NULL DEFAULT 0,
    "A51Encryptions" INTEGER NOT NULL DEFAULT 0,
    "A51Decryptions" INTEGER NOT NULL DEFAULT 0,
    "RC4Encryptions" INTEGER NOT NULL DEFAULT 0,
    "RC4Decryptions" INTEGER NOT NULL DEFAULT 0,
    "DESEncryptions" INTEGER NOT NULL DEFAULT 0,
    "DESDecryptions" INTEGER NOT NULL DEFAULT 0,
    "AESEncryptions" INTEGER NOT NULL DEFAULT 0,
    "AESDecryptions" INTEGER NOT NULL DEFAULT 0,
    "TEAEncryptions" INTEGER NOT NULL DEFAULT 0,
    "TEADecryptions" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "GlobalStatistics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Key" ADD CONSTRAINT "Key_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStatistics" ADD CONSTRAINT "UserStatistics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
