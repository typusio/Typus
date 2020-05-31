import { createDatabaseConnection } from './createDatabaseConnection';

async function bootstrap() {
  await createDatabaseConnection();
}

bootstrap();
