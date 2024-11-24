/*
  Warnings:

  - Added the required column `nome` to the `CartoesCredito` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartoesCredito" ADD COLUMN     "nome" VARCHAR(255) NOT NULL;
