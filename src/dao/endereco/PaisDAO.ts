import {PrismaClient} from "@prisma/client";
import {PrismaClientDatasource} from "../../database/prisma/PrismaClientDatasource";

export class PaisDAO {
  private prisma: PrismaClient

  constructor() {
    this.prisma = PrismaClientDatasource.getPrisma();
  }

  async findByName(pais: string) {
    return this.prisma.paises.findFirst({
      where: {
        nome: pais
      }
    })
  }
}