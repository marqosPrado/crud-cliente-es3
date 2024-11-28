import {PrismaClient} from "@prisma/client";
import {PrismaClientDatasource} from "../database/prisma/PrismaClientDatasource";
import {Cliente} from "../domain/cliente/Cliente";
import {CartaoCredito} from "../domain/cartaoCredito/CartaoCredito";

export class ClienteDAO {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = PrismaClientDatasource.getPrisma();
  }

  async save(cliente: Cliente) {
    const endereco = cliente.enderecos[0]
    const cartao: CartaoCredito = cliente.cartoes[0]
    return this.prisma.clientes.create({
      data: {
        nome: cliente.nome,
        dataNascimento: cliente.dataNascimento,
        genero: cliente.genero,
        codigo: cliente.codigo,
        email: cliente.email,
        cpf: cliente.cpf,
        telefone: cliente.telefone,
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
        },
        cartoes: {
          create: {
            nome: cartao.nome,
            numero: cartao.numero,
            bandeira: cartao.bandeira,
            validade: cartao.validade,
            cvv: cartao.cvv,
            isMain: cartao.ePrincipal
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

  async findClientById(clientId: number) {
    return this.prisma.clientes.findFirst({
      where: {
        id: clientId
      },
      include: {
        enderecos: {
          include: {
            pais: true,
            estado: true,
            cidade: true
          }
        },
        cartoes: true
      }
    })
  }

  async updateClient(clientId: number, clientData: { nome: string, cpf: string, genero: string, telefone: string }) {
    const client =  this.prisma.clientes.update({
      where: {
        id: clientId
      },
      data: {
        nome: clientData.nome,
        cpf: clientData.cpf,
        genero: clientData.genero,
        telefone: clientData.telefone
      }
    })
    return client;
  }

  async findClientByFilter(filter: { nome: string, cpf: string, email: string }) {
    return this.prisma.clientes.findMany({
      where: {
        nome: {
          contains: filter.nome
        },
        cpf: {
          contains: filter.cpf
        },
        email: {
          contains: filter.email
        }
      },
      include: {
        enderecos: {
          include: {
            pais: true,
            estado: true,
            cidade: true
          }
        }
      }
    })
  }
}