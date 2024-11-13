/*
  Warnings:

  - A unique constraint covering the columns `[codigo]` on the table `Paises` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Paises_codigo_key" ON "Paises"("codigo");
