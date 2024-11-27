import {PrismaClient} from "@prisma/client";
import {PrismaClientDatasource} from "../../database/prisma/PrismaClientDatasource";
import {Endereco} from "../../domain/endereco/Endereco";

export class EnderecoDAO {
  private readonly prisma: PrismaClient

  constructor() {
    this.prisma = PrismaClientDatasource.getPrisma();
  }

  async save(endereco: Endereco, clienteId: number) {
    return this.prisma.enderecos.create({
      data: {
        logradouro: endereco.logradouro,
        tipoLogradouro: endereco.tipoLograduro,
        numero: endereco.numero,
        bairro: endereco.bairro,
        cep: endereco.cep,
        complemento: endereco.complemento,
        observacoes: endereco.observacoes,
        eEnderecoEntrega: endereco.eEnderecoEntrega,
        cidadeId: endereco.cidade.id,
        estadoId: endereco.estado.id,
        paisId: endereco.pais.id,
        clienteId: clienteId
      },
    });
  }

  async findById(enderecoId: number) {
    return this.prisma.enderecos.findUnique({
      where: {
        id: enderecoId
      }
    });
  }

  async update(addressId: number, endereco: Endereco) {
    return this.prisma.enderecos.update({
      where: {
        id: addressId
      },
      data: {
        logradouro: endereco.logradouro,
        tipoLogradouro: endereco.tipoLograduro,
        numero: endereco.numero,
        bairro: endereco.bairro,
        cep: endereco.cep,
        complemento: endereco.complemento,
        observacoes: endereco.observacoes,
        eEnderecoEntrega: endereco.eEnderecoEntrega,
        cidadeId: endereco.cidade.id,
        estadoId: endereco.estado.id,
        paisId: endereco.pais.id
      }
    });
  }
}