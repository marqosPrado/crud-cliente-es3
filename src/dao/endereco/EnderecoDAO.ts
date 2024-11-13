import {PrismaClient} from "@prisma/client";
import {PrismaClientDatasource} from "../../database/prisma/PrismaClientDatasource";
import {Endereco} from "../../domain/endereco/Endereco";

export class EnderecoDAO {
  private prisma: PrismaClient

  constructor() {
    this.prisma = PrismaClientDatasource.getPrisma();
  }

  async save(endereco: Endereco, clienteId: number) {
    this.prisma.enderecos.create({
      data: {
        logradouro: 'Av. Paulista',
        tipoLogradouro: 'Avenida',
        numero: 1000,
        bairro: 'Bela Vista',
        cep: '01310-100',
        complemento: 'Apt 101',
        observacoes: 'Próximo ao metrô',

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