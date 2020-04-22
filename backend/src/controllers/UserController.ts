import { Controller, Get, UseBefore, Req } from '@tsed/common';
import { RequireAuth } from '../middleware/RequireAuth';

import { Request } from 'express';
import { db } from '../Prisma';

@Controller('/user')
export class UserController {
  @Get('/me')
  @UseBefore(RequireAuth)
  async me(@Req() req: Request) {
    return await db.user.findOne({ where: { id: req.session!.user }, include: { forms: true } });
  }
}
