import {PrismaClient} from '@prisma/client';

export class PrismaClientDatasource {
  static getPrisma() {
    return new PrismaClient();
  }
}