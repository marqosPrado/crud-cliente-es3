import {PrismaClient} from "@prisma/client";
import {PrismaClientDatasource} from "../../database/prisma/PrismaClientDatasource";

export class PaisDAO {
  private prisma: PrismaClient

  constructor() {
    this.prisma = PrismaClientDatasource.getPrisma();
  }

  async findById(id: number) {
    return this.prisma.paises.findFirst({
      where: {
        id: id
      }
    })
  }

  async findAll() {
    return this.prisma.paises.findMany({
      include: {
        estados: true
      }
    });
  }

  async findEstadosByPais(paisId: number) {
    return this.prisma.estados.findMany({
      where: {
        pais: {
          id: paisId
        }
      }
    });
  }
}