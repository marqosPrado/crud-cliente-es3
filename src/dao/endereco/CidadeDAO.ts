import {PrismaClient} from "@prisma/client";
import {PrismaClientDatasource} from "../../database/prisma/PrismaClientDatasource";

export class CidadeDAO {
  private prisma: PrismaClient

  constructor() {
    this.prisma = PrismaClientDatasource.getPrisma();
  }

  async findById(id: number) {
    return this.prisma.cidades.findFirst({
      where: {
        id: id
      }
    })
  }

  async findByStateName(estado: string) {
    return this.prisma.cidades.findMany({
      where: {
        estado: {
          nome: estado
        }
      }
    })
  }
}