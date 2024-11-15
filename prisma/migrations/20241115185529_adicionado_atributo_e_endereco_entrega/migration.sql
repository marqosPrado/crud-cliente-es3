/*
  Warnings:

  - You are about to drop the column `eEnderecoEndereco` on the `Enderecos` table. All the data in the column will be lost.
  - Added the required column `eEnderecoEntrega` to the `Enderecos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Enderecos" DROP COLUMN "eEnderecoEndereco",
ADD COLUMN     "eEnderecoEntrega" BOOLEAN NOT NULL;
