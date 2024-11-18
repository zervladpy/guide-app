/*
  Warnings:

  - You are about to drop the column `autor_id` on the `Document` table. All the data in the column will be lost.
  - Added the required column `author_id` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_autor_id_fkey";

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "autor_id",
ADD COLUMN     "author_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
