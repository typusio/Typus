import { Controller, Post, UseBefore, Locals, Req, Get, Patch, BodyParams, Delete } from '@tsed/common';
import { RequireAuth } from '../middleware/RequireAuth';
import { Form } from '@prisma/client';
import { Request } from 'express';
import { db } from '../Prisma';
import { NotFound, BadRequest } from 'ts-httpexceptions';
import { EditConfirmationModel } from './models/EditConfirmationModel';
import { RequireFormAccess } from '../middleware/RequireFormAccess';

@Controller('/confirmation')
export class ConfirmationController {
  @Post('/:formId')
  @UseBefore(RequireAuth, RequireFormAccess)
  async create(@Locals('form') f: Form, @Req() req: Request) {
    const form = (await db.form.findOne({ where: { id: f.id }, include: { confirmation: true } }))!;

    if (form.confirmation) throw new BadRequest('Form already has a confirmation setup');

    const response = await db.confirmation.create({ data: { form: { connect: { id: f.id } } } });

    return response;
  }

  @Get('/:formId')
  @UseBefore(RequireAuth, RequireFormAccess)
  async get(@Locals('form') f: Form) {
    const response = await db.form.findOne({ where: { id: f.id } }).confirmation();

    if (!response) throw new NotFound('Form does not have a confirmation setup');

    return response;
  }

  @Patch('/:formId')
  @UseBefore(RequireAuth, RequireFormAccess)
  async update(@BodyParams() data: EditConfirmationModel, @Locals('form') form: Form) {
    const response = await db.form.findOne({ where: { id: form.id } }).confirmation();

    if (!response) throw new NotFound('Confirmation not found');

    const res = await db.confirmation.update({ where: { id: response.id }, data });

    return res;
  }

  @Delete('/:formId')
  @UseBefore(RequireAuth, RequireFormAccess)
  async delete(@Locals('form') form: Form) {
    const confirmation = await db.form.findOne({ where: { id: form.id } }).confirmation();

    await db.confirmation.delete({ where: { id: confirmation?.id } });

    return 'confirmation_deleted';
  }
}
