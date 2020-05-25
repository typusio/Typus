import { Controller, Post, BodyParams, Req, Res } from '@tsed/common';
import { RegisterModel } from './models/RegisterModel';
import { db } from '../Prisma';

import { BadRequest } from 'ts-httpexceptions';
import { hash, verify } from 'argon2';

import { Request, Response } from 'express';
import { LoginModel } from './models/LoginModel';

@Controller('/auth')
export class AuthController {
  @Post('/register')
  async register(@BodyParams() { email, password }: RegisterModel, @Req() req: Request) {
    if (await db.user.findOne({ where: { email } })) throw new BadRequest('Email in use');

    const user = await db.user.create({ data: { email, password: await hash(password) } });

    req.session!.user = user.id;

    return user;
  }

  @Post('/login')
  async login(@BodyParams() { email, password }: LoginModel, @Req() req: Request) {
    const user = await db.user.findOne({ where: { email } });

    if (!user) throw new BadRequest('Invalid username/password combination');
    if (!(await verify(user.password, password))) throw new BadRequest('Invalid username/password combination');

    req.session!.user = user.id;

    return user;
  }

  @Post('/logout')
  async logout(@Req() req: Request, @Res() resp: Response) {
    return new Promise((res, rej) =>
      req.session!.destroy(err => {
        if (err) {
          return rej(false);
        }

        resp.clearCookie('qid');
        return res(true);
      }),
    );
  }
}
