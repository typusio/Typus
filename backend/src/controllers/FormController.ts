import * as crypto from 'crypto';

import { Controller, Post, UseAuth, Middleware, UseBefore, Req, Session, BodyParams, Get, PathParams, Delete, Locals, Patch, Res } from '@tsed/common';
import { CreateFormModel } from './models/CreateFormModel';
import { db } from '../Prisma';
import { RequireAuth } from '../middleware/RequireAuth';

import { Request } from 'express';
import { Form, Submission } from '@prisma/client';
import { RequireFormAccess } from '../middleware/RequireFormAccess';
import { EditFormModel } from './models/EditFormModel';

import { Response } from 'express';
import { ExportService } from '../services/ExportService';

@Controller('/form')
export class FormController {
  public constructor(private readonly exportService: ExportService) {}

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
        security: { create: { recaptchaSecret: '', honey: crypto.randomBytes(2).toString('hex'), allowedDomains: '' } },
        notifications: { create: {} },
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
  async get(@Req() req: Request, @Locals('form') form: Form) {
    return await db.form.findOne({ where: { id: form.id }, include: { owner: true } });
  }

  @Patch('/:formId')
  @UseBefore(RequireAuth, RequireFormAccess)
  async patch(@Req() req: Request, @Locals('form') form: Form, @BodyParams() data: EditFormModel) {
    return await db.form.update({ where: { id: form.id }, data });
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

  @Get('/:formId/data.json')
  @UseBefore(RequireAuth, RequireFormAccess)
  async exportJson(@Locals('form') form: Form) {
    return this.exportService.exportJson(form.id);
  }

  @Get('/:formId/data.csv')
  @UseBefore(RequireAuth, RequireFormAccess)
  async exportCsv(@Locals('form') form: Form, @Res() res: Response) {
    return Buffer.from(await this.exportService.exportCsv(form.id));
  }
}
