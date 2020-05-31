import express from 'express';
import { createDatabaseConnection } from './createDatabaseConnection';
import { authRouter } from './modules/auth/authRoutrer';

const app = express();

app.use(express.json());

app.use('/auth', authRouter);

const port = parseInt(process.env.PORT || '4000', 10);

async function bootstrap() {
  await createDatabaseConnection();

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${port}`);
  });
}

bootstrap();
