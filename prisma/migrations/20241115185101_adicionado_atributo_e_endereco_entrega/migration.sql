/*
  Warnings:

  - Added the required column `eEnderecoCobranca` to the `Enderecos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Enderecos" ADD COLUMN     "eEnderecoCobranca" BOOLEAN NOT NULL;
