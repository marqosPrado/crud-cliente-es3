// prisma/seed.ts

import { PrismaClient, Prisma } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';

const prisma = new PrismaClient();

interface Estado {
  nome: string;
  codigo: string;
}

interface Cidade {
  nome: string;
  estadoCodigo: string;
}

export async function importEstados(prisma: Prisma.TransactionClient, paisId: number) {
  const estadosCSV = path.join(__dirname, 'data', 'estados.csv');
  const estados: Estado[] = [];

  return new Promise<void>((resolve, reject) => {
    fs.createReadStream(estadosCSV)
      .pipe(csvParser())
      .on('data', (row) => {
        estados.push({ nome: row.nome, codigo: row.codigo });
      })
      .on('end', async () => {
        try {
          for (const estado of estados) {
            await prisma.estados.upsert({
              where: { codigo_paisId: { codigo: estado.codigo, paisId: paisId } },
              update: {},
              create: {
                nome: estado.nome,
                codigo: estado.codigo,
                paisId: paisId,
              },
            });
          }
          console.log('Estados importados com sucesso!');
          resolve();
        } catch (error) {
          reject(error);
        }
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

export async function importCidades(prisma: Prisma.TransactionClient, paisId: number) {
  const cidadesCSV = path.join(__dirname, 'data', 'cidades.csv');
  const cidades: Cidade[] = [];

  return new Promise<void>((resolve, reject) => {
    fs.createReadStream(cidadesCSV)
      .pipe(csvParser())
      .on('data', (row) => {
        cidades.push({ nome: row.nome, estadoCodigo: row.estadoCodigo });
      })
      .on('end', async () => {
        try {
          for (const cidade of cidades) {
            // Encontrar o estado correspondente
            const estado = await prisma.estados.findUnique({
              where: { codigo_paisId: { codigo: cidade.estadoCodigo, paisId: paisId } },
            });

            if (!estado) {
              console.warn(`Estado com código ${cidade.estadoCodigo} não encontrado. Pulando cidade ${cidade.nome}.`);
              continue;
            }

            await prisma.cidades.upsert({
              where: { nome_estadoId: { nome: cidade.nome, estadoId: estado.id } },
              update: {},
              create: {
                nome: cidade.nome,
                estadoId: estado.id,
              },
            });
          }
          console.log('Cidades importadas com sucesso!');
          resolve();
        } catch (error) {
          reject(error);
        }
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

export async function runSeed() {
  try {
    await prisma.$transaction(async (tx) => {
      // Verificar e inserir o país Brasil
      const brasil = await tx.paises.findFirst({
        where: { codigo: 'BR' },
      });

      let brasilId: number;

      if (!brasil) {
        const novoBrasil = await tx.paises.create({
          data: {
            nome: 'Brasil',
            codigo: 'BR',
          },
        });
        brasilId = novoBrasil.id;
        console.log('País Brasil inserido.');
      } else {
        brasilId = brasil.id;
        console.log('País Brasil já existe.');
      }

      // Verificar e importar estados
      const countEstados = await tx.estados.count({
        where: { paisId: brasilId },
      });

      if (countEstados === 0) {
        await importEstados(tx, brasilId);
      } else {
        console.log('Estados já estão populados.');
      }

      // Verificar e importar cidades
      const countCidades = await tx.cidades.count({
        where: { estado: { paisId: brasilId } },
      });

      if (countCidades === 0) {
        await importCidades(tx, brasilId);
      } else {
        console.log('Cidades já estão populadas.');
      }
    });
  } catch (error) {
    console.error('Erro durante o seed:', error);
  } finally {
    await prisma.$disconnect();
  }
}