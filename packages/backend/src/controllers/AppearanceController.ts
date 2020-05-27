import { Controller, Post, Get, UseBefore, Locals, Patch, BodyParams, Res } from '@tsed/common';
import { RequireAuth } from '../middleware/RequireAuth';
import { RequireFormAccess } from '../middleware/RequireFormAccess';
import { Form } from '@prisma/client';
import { db } from '../Prisma';
import { EditAppearanceModel } from './models/EditAppearanceModel';
import { BadRequest } from 'ts-httpexceptions';
import { Response } from 'express';
import { RenderService } from '../services/RenderService';

@Controller('/appearance')
export class AppearanceController {
  public constructor(private readonly renderService: RenderService) {}

  @Patch('/:formId')
  @UseBefore(RequireAuth, RequireFormAccess)
  async edit(@BodyParams() body: EditAppearanceModel, @Locals('form') form: Form) {
    if (body.successMode && !['Our', 'Custom'].includes(body.successMode)) throw new BadRequest('successMode must be either Our or Custom.');

    const appearance = await db.form.findOne({ where: { id: form.id } }).appearance();

    return await db.appearance.update({ where: { id: appearance!.id }, data: body });
  }

  @Get('/:formId/preview/success')
  @UseBefore(RequireAuth, RequireFormAccess)
  async previewSuccess(@Locals('form') form: Form, @Res() res: Response) {
    return this.renderService.renderSuccess(res, form.id);
  }

  @Get('/:formId/preview/error')
  @UseBefore(RequireAuth, RequireFormAccess)
  async previewError(@Locals('form') form: Form, @Res() res: Response) {
    return this.renderService.renderError({ error: 'Email must be unique', title: 'Validation Error' }, res, form.id);
  }
}
