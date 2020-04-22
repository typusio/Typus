import { PrismaClient } from '@prisma/client';
import { $log } from '@tsed/common';

export const db = new PrismaClient();

export async function createDatabaseConnection() {
  await db.connect();

  $log.info('Connected to database');
}
