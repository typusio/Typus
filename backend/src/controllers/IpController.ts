import { Controller, Get, PathParams, UseBefore, Req } from '@tsed/common';
import { RequireAuth } from '../middleware/RequireAuth';

import { Request } from 'express';
import { db } from '../Prisma';
import { NotFound, BadRequest } from 'ts-httpexceptions';
import { RequireFormOwner } from '../middleware/RequireFormOwner';
import { RequireFormAccess } from '../middleware/RequireFormAccess';

@Controller('/ip')
export class IpController {
  @Get('/:formId/:ipId')
  @UseBefore(RequireAuth, RequireFormAccess)
  async get(@PathParams('formId') formId: string, @PathParams('ipId') ipId: string, @Req() req: Request) {
    const submissions = await db.ip.findOne({ where: { address: ipId } }).submissions();

    if (!submissions) throw new BadRequest('This user has not made any submissions');

    return submissions.filter(s => s.formId === formId);
  }
}
