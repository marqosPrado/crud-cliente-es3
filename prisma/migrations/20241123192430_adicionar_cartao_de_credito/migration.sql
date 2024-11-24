/*
  Warnings:

  - You are about to alter the column `nome` on the `CartoesCredito` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE "CartoesCredito" ALTER COLUMN "nome" SET DATA TYPE VARCHAR(50);
