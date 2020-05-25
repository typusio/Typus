import { Controller, Get, UseBefore, Locals, Patch, BodyParams } from '@tsed/common';
import { RequireAuth } from '../middleware/RequireAuth';
import { RequireFormAccess } from '../middleware/RequireFormAccess';
import { Form } from '@prisma/client';
import { db } from '../Prisma';
import { EditSecurityModel } from './models/EditSecurityModel';

@Controller('/security')
export class SecurityController {
  @Get('/:formId')
  @UseBefore(RequireAuth, RequireFormAccess)
  async get(@Locals('form') form: Form) {
    return await db.form.findOne({ where: { id: form.id } }).security();
  }

  @Patch('/:formId')
  @UseBefore(RequireAuth, RequireFormAccess)
  async edit(@BodyParams() data: EditSecurityModel, @Locals('form') form: Form) {
    const security = await db.form.findOne({ where: { id: form.id } }).security();

    return await db.security.update({ where: { id: security!.id }, data });
  }
}
