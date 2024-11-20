import {PrismaClient} from "@prisma/client";
import {PrismaClientDatasource} from "../../database/prisma/PrismaClientDatasource";

export class EstadoDAO {
  private prisma: PrismaClient

  constructor() {
    this.prisma = PrismaClientDatasource.getPrisma();
  }

  async findById(id: number) {
    return this.prisma.estados.findFirst({
      where: {
        id: id
      }
    })
  }

  async findByCountryName(pais: string) {
    return this.prisma.estados.findMany({
      where: {
        pais: {
          nome: pais
        }
      }
    })
  }

  async findCidadesByEstado(estadoId: number) {
    return this.prisma.cidades.findMany({
      where: {
        estadoId: estadoId
      }
    })
  }
}