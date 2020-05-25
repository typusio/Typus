import { GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings } from '@tsed/common';
import '@tsed/ajv';

const rootDir = __dirname;

import * as session from 'express-session';
import * as connectRedis from 'connect-redis';

import * as bodyParser from 'body-parser';
import * as compress from 'compression';
import * as cookieParser from 'cookie-parser';
import * as methodOverride from 'method-override';
import * as cors from 'cors';
import * as fileUpload from 'express-fileupload';

import { redis } from './Redis';
import { ValidationController } from './controllers/ValidationController';
import { UserController } from './controllers/UserController';

@ServerSettings({
  rootDir,
  acceptMimes: ['application/json'],
  httpPort: process.env.PORT || 4000,
  httpsPort: false, // CHANGE
  mount: {
    '/': [UserController, ValidationController, `${rootDir}/controllers/**/*.ts`],
  },
  exclude: ['**/*.spec.ts'],
  ajv: { errorFormat: (error: any) => `'${error.data}' ${error.message}`, options: { verbose: false } },
  logger: { level: process.env.NODE_ENV == 'production' ? 'error' : 'info' },
  componentsScan: [`${rootDir}/services/**/*.ts`, `${rootDir}/middleware/**/*.ts`],
})
export class Server extends ServerLoader {
  $beforeRoutesInit() {
    const RedisStore = connectRedis(session);

    this.use(cors({ credentials: true, origin: (o, cb) => cb(null, true) }))
      .use(GlobalAcceptMimesMiddleware)
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true,
        }),
      )
      .use(
        session({
          store: new RedisStore({ client: redis as any }),
          name: 'qid',
          secret: process.env.SESSION_SECRET!,
          resave: false,
          saveUninitialized: false,
          cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
          },
        }),
      )
      .set('views', `${rootDir}/views`)
      .set('view engine', 'ejs')
      .use(fileUpload({ path: './uploads', upload: true, createParentPath: true }));

    if (process.env.NODE_ENV == 'production') {
      this.set('trust proxy', 1);
    }

    return null;
  }
}
