-- CreateTable
CREATE TABLE "CartoesCredito" (
    "id" SERIAL NOT NULL,
    "numero" VARCHAR(16) NOT NULL,
    "bandeira" VARCHAR(16) NOT NULL,
    "validade" VARCHAR(7) NOT NULL,
    "cvv" CHAR(3) NOT NULL,
    "isMain" BOOLEAN NOT NULL,
    "clienteId" INTEGER NOT NULL,

    CONSTRAINT "CartoesCredito_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CartoesCredito" ADD CONSTRAINT "CartoesCredito_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
