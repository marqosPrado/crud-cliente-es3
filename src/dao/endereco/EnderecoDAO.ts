import {PrismaClient} from "@prisma/client";
import {PrismaClientDatasource} from "../../database/prisma/PrismaClientDatasource";
import {Endereco} from "../../domain/endereco/Endereco";

export class EnderecoDAO {
  private readonly prisma: PrismaClient

  constructor() {
    this.prisma = PrismaClientDatasource.getPrisma();
  }

  async save(endereco: Endereco, clienteId: number) {
    this.prisma.enderecos.create({
      data: {
        logradouro: endereco.logradouro,
        tipoLogradouro: endereco.tipoLograduro,
        numero: endereco.numero,
        bairro: endereco.bairro,
        cep: endereco.bairro,
        complemento: endereco.complemento,
        observacoes: endereco.observacoes,
        eEnderecoEntrega: endereco.eEnderecoEntrega,

        pais: {
          connect: { id: endereco.pais.id },
        },
        estado: {
          connect: { id: endereco.estado.id },
        },
        cidade: {
          connect: { id: endereco.cidade.id },
        },
        cliente: {
          connect: { id: clienteId },
        },
      },
    });
  }
}