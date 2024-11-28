/*
  Warnings:

  - You are about to alter the column `telefone` on the `Clientes` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.

*/
-- AlterTable
ALTER TABLE "Clientes" ALTER COLUMN "telefone" SET DATA TYPE VARCHAR(20);
