import {PrismaClient} from "@prisma/client";
import {PrismaClientDatasource} from "../../database/prisma/PrismaClientDatasource";

export class EstadoDAO {
  private prisma: PrismaClient

  constructor() {
    this.prisma = PrismaClientDatasource.getPrisma();
  }

  async findByName(estado: string) {
    return this.prisma.estados.findFirst({
      where: {
        nome: estado
      }
    })
  }
}