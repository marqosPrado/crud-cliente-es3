import {PrismaClient} from "@prisma/client";
import {PrismaClientDatasource} from "../database/prisma/PrismaClientDatasource";
import {Cliente} from "../domain/cliente/Cliente";

export class ClienteDAO {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = PrismaClientDatasource.getPrisma();
  }

  async save(cliente: Cliente) {
    return this.prisma.cliente.create({
      data: {
        nome: cliente.nome,
        dataNascimento: cliente.dataNascimento,
        genero: cliente.genero,
        codigo: cliente.codigo,
        email: cliente.email,
        cpf: cliente.cpf,
        senha: cliente.senha,
        status: cliente.status
      }
    });
  }

  async findByUser(email: string) {
    return this.prisma.cliente.findFirst({
      where: {
        email: email,
      }
    })
  }

  async findByCpf(cpf: string) {
    return this.prisma.cliente.findFirst({
      where: {
        cpf: cpf
      }
    })
  }
}