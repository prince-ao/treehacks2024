-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profile_image" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TerraAccount" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "terraUserId" TEXT NOT NULL,
    "terraResource" TEXT NOT NULL,
    "terraReferenceId" TEXT NOT NULL,

    CONSTRAINT "TerraAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicationRecommendation" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "recommendedDosage" TEXT,
    "dateOfRecommendation" TIMESTAMP(3) NOT NULL,
    "price" TEXT NOT NULL,
    "reasonForRecommendation" TEXT NOT NULL,
    "medicationImage" TEXT NOT NULL,
    "medicationName" TEXT NOT NULL,

    CONSTRAINT "MedicationRecommendation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurrentMedication" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "medicationName" TEXT NOT NULL,
    "dosage" TEXT NOT NULL,

    CONSTRAINT "CurrentMedication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedMessage" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "messages" JSONB NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SavedMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SettingPreference" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "darkMode" BOOLEAN NOT NULL,

    CONSTRAINT "SettingPreference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "TerraAccount" ADD CONSTRAINT "TerraAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicationRecommendation" ADD CONSTRAINT "MedicationRecommendation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrentMedication" ADD CONSTRAINT "CurrentMedication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedMessage" ADD CONSTRAINT "SavedMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SettingPreference" ADD CONSTRAINT "SettingPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
