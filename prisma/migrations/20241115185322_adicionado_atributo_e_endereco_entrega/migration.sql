/*
  Warnings:

  - You are about to drop the column `eEnderecoCobranca` on the `Enderecos` table. All the data in the column will be lost.
  - Added the required column `eEnderecoEndereco` to the `Enderecos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Enderecos" DROP COLUMN "eEnderecoCobranca",
ADD COLUMN     "eEnderecoEndereco" BOOLEAN NOT NULL;
