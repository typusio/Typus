import * as crypto from 'crypto';

import { Controller, Post, UseAuth, Middleware, UseBefore, Req, Session, BodyParams, Get, PathParams, Delete, Locals } from '@tsed/common';
import { CreateFormModel } from './models/CreateFormModel';
import { db } from '../Prisma';
import { RequireAuth } from '../middleware/RequireAuth';

import { Request } from 'express';
import { NotFound, Unauthorized, BadRequest } from 'ts-httpexceptions';
import { RequireFormOwner } from '../middleware/RequireFormOwner';
import { Form } from '@prisma/client';
import { RequireFormAccess } from '../middleware/RequireFormAccess';

@Controller('/form')
export class FormController {
  private generateUrl(name: string) {
    return name.trimLeft().trimRight().toLowerCase().split(' ').join('-') + '-' + crypto.randomBytes(2).toString('hex');
  }

  @Post('/')
  @UseBefore(RequireAuth)
  async create(@BodyParams() { name }: CreateFormModel, @Req() req: Request) {
    const form = await db.form.create({
      data: {
        id: this.generateUrl(name),
        owner: { connect: { id: req.session!.user } },
        name,
        appearance: { create: {} },
      },
    });

    return form;
  }

  @Delete('/:formId')
  @UseBefore(RequireAuth, RequireFormAccess)
  async delete(@PathParams('formId') formId: string, @Req() req: Request, @Locals('form') form: Form) {
    await db.form.delete({ where: { id: formId } });

    return 'Form deleted';
  }

  @Get('/dashboard')
  @UseBefore(RequireAuth)
  async dashboard(@Req() req: Request) {
    const user = await db.user.findOne({ where: { id: req.session!.user }, include: { forms: true, collaboratingForms: true } });

    const result = [];

    for (const form of [...user!.forms, ...user!.collaboratingForms]) {
      const submissions = await db.submission.count({ where: { formId: form.id } });

      result.push({
        form,
        submissions,
      });
    }

    return result;
  }

  @Get('/:formId')
  @UseBefore(RequireAuth, RequireFormAccess)
  async get(@PathParams('formId') formId: string, @Req() req: Request, @Locals('form') form: Form) {
    return await db.form.findOne({ where: { id: form.id }, include: { owner: true } });
  }

  @Get('/:formId/counts')
  @UseBefore(RequireAuth, RequireFormAccess)
  async counts(@PathParams('formId') formId: string, @Locals('form') form: Form) {
    const startToday = new Date().setHours(0);

    const submissions = await db.submission.count({ where: { formId: form.id, spam: false } });
    const spam = await db.submission.count({ where: { formId: form.id, spam: true } });
    const today = await db.submission.count({ where: { createdAt: { gt: new Date(startToday) } } });

    return { submissions, spam, today };
  }
}
