import {PrismaClient} from "@prisma/client";
import {PrismaClientDatasource} from "../database/prisma/PrismaClientDatasource";
import {Cliente} from "../domain/cliente/Cliente";

export class ClienteDAO {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = PrismaClientDatasource.getPrisma();
  }

  async save(cliente: Cliente) {
    const endereco = cliente.enderecos[0]
    return this.prisma.clientes.create({
      data: {
        nome: cliente.nome,
        dataNascimento: cliente.dataNascimento,
        genero: cliente.genero,
        codigo: cliente.codigo,
        email: cliente.email,
        cpf: cliente.cpf,
        senha: cliente.senha,
        status: cliente.status,
        enderecos: {
          create: {
            logradouro: endereco.logradouro,
            tipoLogradouro: endereco.tipoLograduro,
            numero: endereco.numero,
            bairro: endereco.bairro,
            cep: endereco.cep,
            complemento: endereco.complemento,
            observacoes: endereco.observacoes,
            eEnderecoEntrega: endereco.eEnderecoEntrega,
            paisId: endereco.pais.id,
            estadoId: endereco.estado.id,
            cidadeId: endereco.cidade.id
          }
        }
      },
      include: {
        enderecos: true
      }
    });
  }

  async findByUser(email: string) {
    return this.prisma.clientes.findFirst({
      where: {
        email: email,
      }
    })
  }

  async findByCpf(cpf: string) {
    return this.prisma.clientes.findFirst({
      where: {
        cpf: cpf
      }
    })
  }

  async findAllActiveClients() {
    return this.prisma.clientes.findMany({
      include: {
        enderecos: {
          include: {
            estado: true,
            cidade: true
          }
        }
      },
      where: {
        status: true
      }
    })
  }

  async disableClient(clientId: number) {
    return this.prisma.clientes.update({
      where: {
        id: clientId
      },
      data: {
        status: false
      }
    })
  }
}