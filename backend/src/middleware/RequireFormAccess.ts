import { Middleware, Req, PathParams, Locals } from '@tsed/common';
import { Request } from 'express';
import { db } from '../Prisma';
import { NotFound, BadRequest } from 'ts-httpexceptions';
import { hasFormAccess } from '../util/hasFormAccess';

@Middleware()
export class RequireFormAccess {
  async use(@Req() req: Request, @PathParams('formId') formId: string, @Locals() locals: any) {
    const form = await db.form.findOne({ where: { id: formId } });

    if (!form) throw new NotFound('Form not found');

    if (!(await hasFormAccess(form.id, req.session!.user))) throw new BadRequest('You must be the owner of the form to do this');

    locals.form = form;
  }
}
