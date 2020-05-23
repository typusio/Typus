import { Middleware, Req, PathParams, Locals } from '@tsed/common';
import { Request } from 'express';
import { db } from '../Prisma';
import { NotFound, BadRequest } from 'ts-httpexceptions';
import { hasFormAccess } from '../util/hasFormAccess';

@Middleware()
export class RequireSubmissionAccess {
  async use(@Req() req: Request, @PathParams('submissionId') submissionId: number, @Locals() locals: any) {
    const submission = await db.submission.findOne({ where: { id: submissionId }, include: { form: { include: { owner: true } }, ip: true } });

    if (!submission) throw new NotFound('Submission not found');

    console.log(submission.form.owner.id);
    console.log(req.session!.user);

    if (submission.form.owner.id !== req.session!.user) throw new BadRequest('You must have access to the submission to do this.');

    locals.submission = submission;
  }
}
