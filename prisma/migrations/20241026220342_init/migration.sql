-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "dataNascimento" DATE NOT NULL,
    "genero" CHAR(1) NOT NULL,
    "codigo" CHAR(6) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "cpf" VARCHAR(15) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);
