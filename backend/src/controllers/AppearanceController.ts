import { Controller, Post, Get, UseBefore, Locals, Patch, BodyParams, Res } from '@tsed/common';
import { RequireAuth } from '../middleware/RequireAuth';
import { RequireFormAccess } from '../middleware/RequireFormAccess';
import { Form } from '@prisma/client';
import { db } from '../Prisma';
import { EditAppearanceModel } from './models/EditAppearanceModel';
import { BadRequest } from 'ts-httpexceptions';
import { Response } from 'express';

@Controller('/appearance')
export class AppearanceController {
  @Get('/:formId')
  @UseBefore(RequireAuth, RequireFormAccess)
  async get(@Locals('form') form: Form) {
    return await db.form.findOne({ where: { id: form.id } }).appearance();
  }

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
    const appearance = await db.form.findOne({ where: { id: form.id } }).appearance();

    if (appearance!.successMode == 'Custom' && appearance!.successCustomRedirect) {
      let url = appearance!.successCustomRedirect;

      if (!url.includes('http')) url = `https://` + url;

      return res.redirect(url);
    }

    return res.render('success', { origin: '', appearance });
  }

  @Get('/:formId/preview/error')
  @UseBefore(RequireAuth, RequireFormAccess)
  async previewError(@Locals('form') form: Form, @Res() res: Response) {
    const appearance = await db.form.findOne({ where: { id: form.id } }).appearance();

    if (appearance!.errorMode == 'Custom' && appearance!.errorCustomRedirect) {
      let url = appearance!.errorCustomRedirect;

      if (!url.includes('http')) url = `https://` + url;

      return res.redirect(url);
    }

    return res.render('validationerror', { appearance, error: 'Email must be unique' });
  }
}
