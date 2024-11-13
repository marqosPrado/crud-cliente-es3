/*
  Warnings:

  - You are about to drop the `Cliente` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Cliente";

-- CreateTable
CREATE TABLE "Clientes" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "dataNascimento" DATE NOT NULL,
    "genero" CHAR(10) NOT NULL,
    "codigo" CHAR(6) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "cpf" VARCHAR(15) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paises" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "codigo" CHAR(4),

    CONSTRAINT "Paises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estados" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "codigo" CHAR(2) NOT NULL,
    "paisId" INTEGER NOT NULL,

    CONSTRAINT "Estados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cidades" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "estadoId" INTEGER NOT NULL,

    CONSTRAINT "Cidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enderecos" (
    "id" SERIAL NOT NULL,
    "logradouro" VARCHAR(255) NOT NULL,
    "tipoLogradouro" CHAR(7) NOT NULL,
    "numero" INTEGER NOT NULL,
    "bairro" VARCHAR(50) NOT NULL,
    "cep" VARCHAR(9) NOT NULL,
    "complemento" VARCHAR(255),
    "observacoes" VARCHAR(255),
    "paisId" INTEGER NOT NULL,
    "estadoId" INTEGER NOT NULL,
    "cidadeId" INTEGER NOT NULL,
    "clienteId" INTEGER NOT NULL,

    CONSTRAINT "Enderecos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Estados_codigo_paisId_key" ON "Estados"("codigo", "paisId");

-- CreateIndex
CREATE UNIQUE INDEX "Cidades_nome_estadoId_key" ON "Cidades"("nome", "estadoId");

-- CreateIndex
CREATE INDEX "Enderecos_paisId_idx" ON "Enderecos"("paisId");

-- CreateIndex
CREATE INDEX "Enderecos_estadoId_idx" ON "Enderecos"("estadoId");

-- CreateIndex
CREATE INDEX "Enderecos_cidadeId_idx" ON "Enderecos"("cidadeId");

-- CreateIndex
CREATE INDEX "Enderecos_clienteId_idx" ON "Enderecos"("clienteId");

-- AddForeignKey
ALTER TABLE "Estados" ADD CONSTRAINT "Estados_paisId_fkey" FOREIGN KEY ("paisId") REFERENCES "Paises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cidades" ADD CONSTRAINT "Cidades_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "Estados"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enderecos" ADD CONSTRAINT "Enderecos_paisId_fkey" FOREIGN KEY ("paisId") REFERENCES "Paises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enderecos" ADD CONSTRAINT "Enderecos_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "Estados"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enderecos" ADD CONSTRAINT "Enderecos_cidadeId_fkey" FOREIGN KEY ("cidadeId") REFERENCES "Cidades"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enderecos" ADD CONSTRAINT "Enderecos_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Clientes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
