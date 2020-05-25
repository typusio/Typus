import { Controller, Get, UseBefore, Locals, Patch, BodyParams } from '@tsed/common';
import { RequireAuth } from '../middleware/RequireAuth';
import { RequireFormAccess } from '../middleware/RequireFormAccess';
import { Form } from '@prisma/client';
import { db } from '../Prisma';
import { EditNotificationsModel } from './models/EditNotificationsModel';

@Controller('/notifications')
export class NotificationsController {
  @Get('/:formId')
  @UseBefore(RequireAuth, RequireFormAccess)
  async get(@Locals('form') form: Form) {
    return await db.form.findOne({ where: { id: form.id } }).notifications();
  }

  @Patch('/:formId')
  @UseBefore(RequireAuth, RequireFormAccess)
  async edit(@Locals('form') form: Form, @BodyParams() data: EditNotificationsModel) {
    const notifications = await db.form.findOne({ where: { id: form.id } }).notifications();

    return await db.notifications.update({ where: { id: notifications!.id }, data });
  }
}
