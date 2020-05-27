import { Controller, Post, UseBefore, Locals, BodyParams, Get, Delete, Req } from '@tsed/common';
import { RequireAuth } from '../middleware/RequireAuth';
import { RequireFormOwner } from '../middleware/RequireFormOwner';
import { Form } from '@prisma/client';
import { db } from '../Prisma';
import { AddCollaboratorModel } from './models/AddCollaboratorModel';
import { NotFound, BadRequest } from 'ts-httpexceptions';
import { RequireFormAccess } from '../middleware/RequireFormAccess';
import { Request } from 'express';

@Controller('/collaborator')
export class CollaboratorController {
  // todo
  @Post('/:formId')
  @UseBefore(RequireAuth, RequireFormOwner)
  async add(@Locals('form') f: Form, @BodyParams() { email }: AddCollaboratorModel) {
    const collaborators = await db.form.findOne({ where: { id: f.id } }).collaborators();
    const user = await db.user.findOne({ where: { email } });

    if (!user) throw new NotFound('User not found');
    if (collaborators.some(c => c.id === user.id)) throw new BadRequest('This user is already a collaborator');

    await db.form.update({ where: { id: f.id }, data: { collaborators: { connect: { id: user.id } } } });

    return user;
  }

  @Get('/:formId')
  @UseBefore(RequireAuth, RequireFormOwner)
  async get(@Locals('form') f: Form) {
    return await db.form.findOne({ where: { id: f.id } }).collaborators();
  }

  @Delete('/:formId')
  @UseBefore(RequireAuth, RequireFormOwner)
  async delete(@Locals('form') f: Form, @BodyParams() { email }: AddCollaboratorModel) {
    const collaborators = await db.form.findOne({ where: { id: f.id } }).collaborators();
    const user = await db.user.findOne({ where: { email } });

    if (!user) throw new NotFound('User not found');
    if (!collaborators.some(c => c.id === user.id)) throw new BadRequest('This is not a collaborator');

    await db.form.update({ where: { id: f.id }, data: { collaborators: { disconnect: { id: user.id } } } });

    return 'Collaborator removed';
  }

  @Delete('/:formId/leave')
  @UseBefore(RequireAuth, RequireFormAccess)
  async leave(@Req() req: Request, @Locals('form') f: Form) {
    await db.form.update({ where: { id: f.id }, data: { collaborators: { disconnect: { id: req.session!.user } } } });

    return 'Left form';
  }
}
