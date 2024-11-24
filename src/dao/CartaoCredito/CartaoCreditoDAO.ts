import {PrismaClient} from "@prisma/client";
import {PrismaClientDatasource} from "../../database/prisma/PrismaClientDatasource";

export class CartaoCreditoDAO {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = PrismaClientDatasource.getPrisma();
  }
}