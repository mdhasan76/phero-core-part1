/*
  Warnings:

  - You are about to drop the column `semesterRegestrationId` on the `offered_courses` table. All the data in the column will be lost.
  - Added the required column `semesterRegistrationId` to the `offered_courses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "offered_courses" DROP CONSTRAINT "offered_courses_semesterRegestrationId_fkey";

-- AlterTable
ALTER TABLE "offered_courses" DROP COLUMN "semesterRegestrationId",
ADD COLUMN     "semesterRegistrationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "offered_courses" ADD CONSTRAINT "offered_courses_semesterRegistrationId_fkey" FOREIGN KEY ("semesterRegistrationId") REFERENCES "semester_registrations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
