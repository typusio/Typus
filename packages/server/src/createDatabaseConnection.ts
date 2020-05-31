import { createConnection } from 'typeorm';

export async function createDatabaseConnection() {
  await createConnection();
}
