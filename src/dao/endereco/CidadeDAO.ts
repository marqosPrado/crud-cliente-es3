import {PrismaClient} from "@prisma/client";
import {PrismaClientDatasource} from "../../database/prisma/PrismaClientDatasource";

export class CidadeDAO {
  private prisma: PrismaClient

  constructor() {
    this.prisma = PrismaClientDatasource.getPrisma();
  }

  async findByName(cidade: string) {
    return this.prisma.cidades.findFirst({
      where: {
        nome: cidade
      }
    })
  }
}